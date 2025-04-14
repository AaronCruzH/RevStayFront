import { useState, useEffect, useContext } from "react";
import axios, { AxiosRequestConfig, Method } from "axios";
import { authContext } from "../App";

axios.defaults.baseURL = "http://localhost:8080/";

interface AxiosFetchParams {
  url: string;
  method: Method;
  body?: any;
  params?: any;
  executeImmediately?: boolean | null;
}

export const useAxiosFetch = (params: AxiosFetchParams) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(params.executeImmediately !== false);

  const token = useContext(authContext)?.token;


  const fetchData = async (): Promise<void> => {
    try {
      let config: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
        url: params.url,
        method: params.method,
        withCredentials: true,
      };

      if (params.method.toUpperCase() === "POST" && params.body) {
        config.data = params.body;
      } else if (params.method.toUpperCase() === "GET" && params.body) {
        const queryParams = new URLSearchParams(params.body);
        config.url += `?${queryParams.toString()}`;
      }

      if (params.method.toUpperCase() === "PUT" && params.body) {
        config.data = params.body;
      }
      setLoading(true);
      const response = await axios.request(config);
      setData(response.data);
    } catch (error) {
      setData([]);
      if (axios.isAxiosError(error)) {
        setError("Axios Error with Message: " + error.message);
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };  


  useEffect(() => {
    if (params.executeImmediately === false) {
      return;
    }
    fetchData();
  }, [params.executeImmediately]);

  return [data, error, loading, fetchData] as const;
};
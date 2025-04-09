import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, Method } from "axios";

axios.defaults.baseURL = "http://localhost:8080/";

interface AxiosFetchParams {
  url: string;
  method: Method;
  body?: any;
  params?: any;
}

export const useAxiosFetch = (params: AxiosFetchParams) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (): Promise<void> => {
    try {
      let config: AxiosRequestConfig = {
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

      const response = await axios.request(config);
      setData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("Axios Error with Message: " + error.message);
      } else {
        setError(error);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };  


  useEffect(() => {
    fetchData();
  }, []);

  return [data, error, loading, fetchData] as const;
};
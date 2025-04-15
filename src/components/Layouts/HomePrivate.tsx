import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { authContext } from "../../App";

export const HomePrivate = () => {

    const token = useContext(authContext)?.token;
    const role = useContext(authContext)?.role;

    const navigate = useNavigate();

    useEffect(() => {
      if (!token || !role) {
        console.log("No user found");
        const error: string = "You must be logged in to access this page";
        navigate("/login", { state: { error } });
      }
    }, [token, role, navigate]);
  
    // Still return some JSX
    if (!token || !role) {
      return null;
    }
  
  return (
    <>
      <Outlet />
    </>

  )
}

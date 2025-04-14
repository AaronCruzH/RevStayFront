/*import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HotelsUser } from "./HotelsUser";
import { HotelsAdmin } from "./HotelsAdmin";

export const HotelsLayout = () => {
    // TODO: Change useState to useContext to get the role from the context
    const navigate = useNavigate();
    const [rol, setRole] = useState<string>('USER');
  return (
    <>

        <div>HotelsLayout</div>
        <button onClick={() => setRole('USER')}>User</button>
        <button onClick={() => setRole('ADMIN')}>Admin</button>

        {rol === 'USER' && <HotelsUser />}
        {rol === 'ADMIN' && <HotelsAdmin />}

    </>

  )
}*/
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HotelsUser } from "./HotelsUser";
import { HotelsAdmin } from "./HotelsAdmin";
import { authContext } from "../../App";
import "./HotelsLayout.css";

export const HotelsLayout = () => {
  const navigate = useNavigate();
  // Get role from context if available
  const authCtx = useContext(authContext);
  const contextRole = authCtx?.role;
  
  // Use role from context if available, otherwise default to 'USER'
  const [role, setRole] = useState<string>(contextRole || 'USER');
  
  // Update role when context changes
  useEffect(() => {
    if (contextRole) {
      setRole(contextRole);
    }
  }, [contextRole]);
  
  // Switch to user view
  const handleUserRole = () => {
    setRole('USER');
  };
  
  // Switch to admin view
  const handleAdminRole = () => {
    setRole('ADMIN');
  };
  
  return (
    <div className="layout-container">
      <div className="layout-header">
        <h1 className="layout-title">Hotel Management System</h1>
        <p className="layout-subtitle">
          View hotel information, rooms, and reservations
        </p>
      </div>
      
      <div className="role-switch">
        <div>
          <h2 className="role-switch-title">View Mode</h2>
          <div className="role-buttons">
            <button 
              className={`role-button ${role === 'USER' ? 'active' : ''}`}
              onClick={handleUserRole}
            >
              <span className="role-icon">👤</span>
              User View
            </button>
            <button 
              className={`role-button ${role === 'ADMIN' ? 'active' : ''}`}
              onClick={handleAdminRole}
            >
              <span className="role-icon">⚙️</span>
              Admin View
            </button>
          </div>
        </div>
      </div>
      
      <div className="role-content-transition">
        {role === 'USER' && <HotelsUser />}
        {role === 'ADMIN' && <HotelsAdmin />}
      </div>
    </div>
  );
};
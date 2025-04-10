import { useState } from "react";
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
}

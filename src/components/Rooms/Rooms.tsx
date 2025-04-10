import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { authContext } from "../../App"
import { IRoom } from "../../interfaces/IRoom"

function Rooms() {
  const [rooms, setRooms] = useState<IRoom[]>([])
const sessionToken = useContext(authContext)?.token

  useEffect(()=>{
    axios.get<IRoom[]>("http://localhost:8080/rooms",
      {
        headers:{
          Authorization:`Bearer ${sessionToken}`
        }
      }
    )
    .then((res) => {
      setRooms(res.data)
    })
    .catch((err) =>{
      console.log(err)
      console.log("Caracoles")
    })
  }, []) //Solo se dispara cuando el componente se monta

  return (
    <div>
      Rooms
      {rooms.length}
    </div>
  )
}

export default Rooms
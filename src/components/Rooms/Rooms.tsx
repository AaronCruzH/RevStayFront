import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { authContext } from "../../App"
import { IRoom } from "../../interfaces/IRoom"
import RoomContainer from "./RoomContainer"
import { useNavigate } from "react-router-dom"

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
      console.log(rooms)
    })
    .catch((err) =>{
      console.log(err)
      console.log("Caracoles")
    })
  }, []) //Solo se dispara cuando el componente se monta
  const navigate = useNavigate()

  return (
    <div>
      <button onClick={()=>navigate('/rooms/register')}>Register new room</button>
      <br/>
      <br/>
      <h1>Registered rooms</h1>
      <table style={{ border: '1px solid black', width: '100%', textAlign: 'left' }}>
      <tr style={{}}>
        <td >Room ID</td>
        <td>Room number</td>
        <td>Capacity</td>
        <td>Type</td>
        <td>Price</td>
        <td>Hotel ID</td>
      </tr>

      {
        rooms.map((room) => {
          return <RoomContainer{...room}
          key={room.roomID}></RoomContainer>
        })
      }
</table>
    </div>
  )
}

export default Rooms
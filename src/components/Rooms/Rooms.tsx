import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { authContext } from "../../App"
import { IRoom } from "../../interfaces/IRoom"
import RoomContainer from "./RoomContainer"

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
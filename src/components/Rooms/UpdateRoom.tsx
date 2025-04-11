import { ChangeEvent, useContext, useState } from "react"
import { IRoom } from "../../interfaces/IRoom"
import { authContext } from "../../App"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function UpdateRoom() {
    const [roomID, setRoomID] = useState(0)

let changeRoomIDValue = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomID(Number(e.target.value))
}

const sessionToken = useContext(authContext)?.token
const navigate = useNavigate()

function searchRoom() : void
    {

        axios.get<IRoom>(`http://localhost:8080/rooms/id/${roomID}`,
            {
              headers:{
                Authorization:`Bearer ${sessionToken}`
              }
            }
          )
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) =>{
            console.log(err)
            console.log("Caracoles")
          })
    }

  return (
    <div>
           <button onClick={()=>navigate("/rooms")}>Back</button>
        <br/>
        <br/>
        <br/>
      <label>Room ID <input type="text" value={roomID} onChange={changeRoomIDValue}></input></label>
      <br/>
      <br/>
      <br/>
      <button onClick={searchRoom}>Search</button>
    </div>
  )
}

export default UpdateRoom
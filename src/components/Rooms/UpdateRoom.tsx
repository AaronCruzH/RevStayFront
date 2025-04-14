import { ChangeEvent, useContext, useState } from "react"
import { IRoom } from "../../interfaces/IRoom"
import { authContext } from "../../App"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function UpdateRoom() {
    const [roomID, setRoomID] = useState(0)
    const [currentRoomID, setCurrentRoomID] = useState(0)

let changeRoomIDValue = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomID(Number(e.target.value))
}

const sessionToken = useContext(authContext)?.token
const sessionRole = useContext(authContext)?.role
const navigate = useNavigate()

const [roomWasFound, setRoomWasFound] = useState(false)

async function searchRoom(): Promise<void> {
    try {
      const response = await axios.get<IRoom>(
        `http://localhost:8080/rooms/id/${roomID}`,
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );

      const room = response.data
      console.log(room)
  
      setPrice(String(room.price));
      setRoomNumber(String(room.roomNumber))
      setRoomCapacity(String(room.capacity))
      setRoomType(String(room.roomType))
      setCurrentRoomID(room.roomID)
      setRoomWasFound(true);
  
    } catch (error) {
      console.log(error)
      console.log("Caracoles")
      setRoomWasFound(false)
    }
  }

  async function updateRoom(): Promise<void> {
    try {

        let updatedRoom : IRoom = {
            roomType: roomType,
            capacity: Number(roomCapacity),
            roomNumber: Number(roomNumber),
            price: Number(price),
            hotel: null,
            roomID: currentRoomID 
        }

      const response = await axios.put<IRoom>(
        `http://localhost:8080/rooms/update/${currentRoomID}`, updatedRoom,
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );
  
      const updatedRoomResult = response.data;
      console.log(updatedRoomResult)
  
    } catch (error) {
      console.log(error)
      console.log("Caracoles")
    }
  }
  


    const [roomNumber, setRoomNumber] = useState('')

    let changeRoomNumber = (e: ChangeEvent<HTMLInputElement>) =>{
        setRoomNumber(e.target.value)
    }

    const [roomCapacity, setRoomCapacity] = useState('')

    let changeCapacity = (e: ChangeEvent<HTMLInputElement>) =>{
        setRoomCapacity(e.target.value)
    }

    const [price, setPrice] = useState('')

    let changePrice = (e: ChangeEvent<HTMLInputElement>) =>{
        setPrice(e.target.value)
    }

    const [roomType, setRoomType] = useState('')

    let changeRoomType = (e: ChangeEvent<HTMLInputElement>) =>{
        setRoomType(e.target.value)
    }

  return (
    <>
    {sessionRole == "ADMIN" &&
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
}
{ roomWasFound &&
    <div>
      <br/>
      <br/>
      <label>
        Room number <input type="text" value={roomNumber} onChange={changeRoomNumber}/>
      </label>
      <br/>
      <br/>
      <label>
        Capacity <input type="text" value={roomCapacity} onChange={changeCapacity}/>
      </label>
      <br/>
      <br/>
      <label>
        Price <input type="text" value={price} onChange={changePrice}/>
      </label>
      <br/>
      <br/>
      <label>
        Room type <input type="text" value={roomType} onChange={changeRoomType}/>
      </label>
      <br/>
        <br/>
        <br/>
        <button onClick={updateRoom}>Update</button>
    </div>
}


    </>
  )
}

export default UpdateRoom
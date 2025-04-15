import { ChangeEvent, useContext, useEffect, useState } from "react"
import { IRoom } from "../../interfaces/IRoom"
import { authContext } from "../../App"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function UpdateRoom() {
    const [roomID, setRoomID] = useState('')
    const [currentRoomID, setCurrentRoomID] = useState(0)

let changeRoomIDValue = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomID(e.target.value)
}

const sessionToken = useContext(authContext)?.token
const sessionRole = useContext(authContext)?.role
const navigate = useNavigate()

const [roomWasFound, setRoomWasFound] = useState(false)
const [isSubmitting, setIsSubmitting] = useState(false)
const [isUpdating, setIsUpdating] = useState(false)
const [success, setSuccess] = useState<string | null>(null)



async function searchRoom(): Promise<void> {
  setIsSubmitting(true)
  setSuccess(null)
 
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
    } finally{
    setIsSubmitting(false)
    }
  }

  async function updateRoom(): Promise<void> {
    setIsUpdating(true)
    setSuccess(null)
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
      setSuccess("Room updated successfully!")

  
    } catch (error) {
      setSuccess(null)
      console.log(error)
      console.log("Caracoles")
    }finally{
      setIsUpdating(false)
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

    const [roomType, setRoomType] = useState('Single')

    let changeRoomType = (e: ChangeEvent<HTMLInputElement>) =>{
        setRoomType(e.target.value)
    }
    
    const roomTypes = [
      'SINGLE',
      'DOUBLE',
      'SUITE'
    ]

    useEffect(() => {
      setSuccess(null)
    }, [sessionToken])
  return (
    
    <>
    {sessionRole == "ADMIN" &&
    <div className="register-room-container">
    <div className="register-room-header">
      <br/>
      <br/>
           <button 
          className="back-button" 
          onClick={() => navigate("/rooms")}>
          ← Back to Rooms
        </button>
        <br/>
        <br/>
        <br/>
        <h1 className="register-room-title">Update Room</h1>
        </div>
      <div className="room-form">
      <label htmlFor="roomID">Room ID</label>
      <input 
            id="roomID"
            className="form-control"
            type="text" 
            value={roomID}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setRoomID(e.target.value)}
            placeholder="Enter the room ID"
          />

          <div className="form-actions">
      <button 
            className="submit-button" 
            onClick={searchRoom}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Searching..." : "Search"}
          </button>
      </div>
      </div>
    </div>
}
{ roomWasFound &&
    <div className="register-room-container">
      <br/>
      <br/>
      <div className="room-form">
      <div className="form-group">
        <h2>Updating room with ID: {currentRoomID}</h2>
        <br/>
      <label htmlFor="roomNumber">
        Room number
      </label>
      <input 
            id="roomNumber"
            className="form-control"
            type="text" 
            value={roomNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setRoomNumber(e.target.value)}
            placeholder="Enter the room number"
          />
      </div>
      </div>
      <br/>
      <br/>
      <div className="form-group">
        <br/>
      <label htmlFor="roomCapacity">
        Room capacity
      </label>
      <input 
            id="roomCapacity"
            className="form-control"
            type="text" 
            value={roomCapacity}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setRoomCapacity(e.target.value)}
            placeholder="Enter the room max capacity"
          />
      </div>
      <br/>
      <br/>
      <div className="form-group">
        <br/>
      <label htmlFor="roomCapacity">
        Room price
      </label>
      <input 
            id="roomPrice"
            className="form-control"
            type="text" 
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
            placeholder="Enter the room's price"
          />
      </div>
      <br/>
      <br/>
      <div className="form-group">
          <label htmlFor="roomType">Room Type</label>
          <select 
            id="roomType"
            className="form-select"
            value={roomType}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setRoomType(e.target.value)}
          >
            {roomTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        {success && <div className="success-message">✓ {success}</div>}
      <br/>
        <br/>
        <br/>
        <div className="form-actions">
      <button 
            className="submit-button" 
            onClick={updateRoom}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update"}
          </button>
        <button onClick={updateRoom}>Update</button>
    </div>
    </div>
}
    </>
  )
}

export default UpdateRoom
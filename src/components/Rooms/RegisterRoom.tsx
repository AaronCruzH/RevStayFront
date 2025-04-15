/*import axios from "axios"
import { ChangeEvent, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { IRoom } from "../../interfaces/IRoom"
import { authContext } from "../../App"
import { IHotel } from "../../interfaces/IHotel"

function RegisterRoom() {

    const [hotelId, setHotelId] = useState('')

    let changeHotelId = (e: ChangeEvent<HTMLInputElement>) =>{
        setHotelId(e.target.value)
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

    const sessionToken = useContext(authContext)?.token

     function registerRoom() : void
    {

        let room: IRoom = {
            roomType: roomType,
            capacity: Number(roomCapacity),
            roomNumber: Number(roomNumber),
            price: Number(price),
            hotel: null,
            roomID: 0
        }

        axios.post<IRoom>(`http://localhost:8080/rooms/register/${hotelId}`, room,
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

    const navigate = useNavigate()

    const sessionRole = useContext(authContext)?.token
  return (

    <>
    {sessionRole == "ADMIN" &&
    <div>
        <button onClick={()=>navigate("/rooms")}>Back</button>
        <br/>
        <br/>
        <br/>
      <label>
        Hotel Id <input type="text" value={hotelId} onChange={changeHotelId}/>
      </label>
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
        <button onClick={registerRoom}>Register</button>
    </div>}
    </>
  )
}

export default RegisterRoom*/

import axios from "axios"
import { ChangeEvent, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { IRoom } from "../../interfaces/IRoom"
import { authContext } from "../../App"
import "./RegisterRoom.css"

function RegisterRoom() {
  const [hotelId, setHotelId] = useState('')
  const [roomNumber, setRoomNumber] = useState('')
  const [roomCapacity, setRoomCapacity] = useState('')
  const [price, setPrice] = useState('')
  const [roomType, setRoomType] = useState('Standard')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const sessionToken = useContext(authContext)?.token
  const navigate = useNavigate()
  
  // Input validation
  const isFormValid = () => {
    if (!hotelId) {
      setError("Please enter a Hotel ID")
      return false
    }
    if (!roomNumber || isNaN(Number(roomNumber))) {
      setError("Please enter a valid Room Number")
      return false
    }
    if (!roomCapacity || isNaN(Number(roomCapacity)) || Number(roomCapacity) <= 0) {
      setError("Please enter a valid Capacity")
      return false
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setError("Please enter a valid Price")
      return false
    }
    if (!roomType) {
      setError("Please select a Room Type")
      return false
    }
    return true
  }
  
  const registerRoom = async () => {
    // Reset messages
    setError(null)
    setSuccess(null)
    
    // Validate form
    if (!isFormValid()) return
    
    // Set submitting state
    setIsSubmitting(true)
    
    let room: IRoom = {
      roomType: roomType,
      capacity: Number(roomCapacity),
      roomNumber: Number(roomNumber),
      price: Number(price),
      hotel: null,
      roomID: 0
    }
    
    try {
      const response = await axios.post<IRoom>(
        `http://localhost:8080/rooms/register/${hotelId}`, 
        room,
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`
          }
        }
      )
      
      console.log(response.data)
      setSuccess("Room registered successfully!")
      
      // Reset form
      setRoomNumber('')
      setRoomCapacity('')
      setPrice('')
      setRoomType('Standard')
      
      // Redirect after short delay
      setTimeout(() => {
        navigate("/rooms")
      }, 2000)
      
    } catch (err: any) {
      console.error(err)
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message)
      } else {
        setError("Failed to register room. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Room type options
  const roomTypes = [
    'Standard',
    'Deluxe',
    'Suite',
    'Executive',
    'Family',
    'Single'
  ]
  
  return (
    <div className="register-room-container">
      <div className="register-room-header">
        <button 
          className="back-button" 
          onClick={() => navigate("/rooms")}
        >
          ← Back to Rooms
        </button>
        <h1 className="register-room-title">Register New Room</h1>
      </div>
      
      <div className="room-form">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">✓ {success}</div>}
        
        <div className="form-group">
          <label htmlFor="hotelId">Hotel ID</label>
          <input 
            id="hotelId"
            className="form-control"
            type="text" 
            value={hotelId}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setHotelId(e.target.value)}
            placeholder="Enter the hotel ID"
          />
          <span className="helper-text">ID of the hotel this room belongs to</span>
        </div>
        
        <div className="form-group">
          <label htmlFor="roomNumber">Room Number</label>
          <input 
            id="roomNumber"
            className="form-control"
            type="number" 
            value={roomNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setRoomNumber(e.target.value)}
            placeholder="Enter room number"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="roomCapacity">Capacity</label>
          <input 
            id="roomCapacity"
            className="form-control"
            type="number" 
            min="1"
            value={roomCapacity}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setRoomCapacity(e.target.value)}
            placeholder="Enter maximum number of guests"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="price">Price per Night</label>
          <input 
            id="price"
            className="form-control"
            type="number" 
            min="0"
            step="0.01"
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
            placeholder="Enter price per night"
          />
        </div>
        
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
        
        <div className="form-actions">
          <button 
            className="cancel-button" 
            onClick={() => navigate("/rooms")}
          >
            Cancel
          </button>
          <button 
            className="submit-button" 
            onClick={registerRoom}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register Room"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RegisterRoom
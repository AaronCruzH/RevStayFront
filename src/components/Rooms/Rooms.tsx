/*import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { authContext } from "../../App"
import { IRoom } from "../../interfaces/IRoom"
import RoomContainer from "./RoomContainer"
import { useNavigate } from "react-router-dom"

function Rooms() {
  const [rooms, setRooms] = useState<IRoom[]>([])
const sessionToken = useContext(authContext)?.token
const sessionRole = useContext(authContext)?.role

  useEffect(()=>{

    if(sessionRole != "ADMIN"){
      return
    }
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
    <>
    {sessionRole == "ADMIN" &&
    <div>
      <button onClick={()=>navigate('/rooms/register')}>Register new room</button>
      <button onClick={()=>navigate('/rooms/update')}>Update room</button>
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
    </div>}
    </>
  )
}

export default Rooms*/
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { authContext } from "../../App"
import { IRoom } from "../../interfaces/IRoom"
import RoomContainer from "./RoomContainer"
import { useNavigate } from "react-router-dom"
import "./RoomTable.css"

function Rooms() {
  const [rooms, setRooms] = useState<IRoom[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const sessionToken = useContext(authContext)?.token
  const navigate = useNavigate()
  
  useEffect(() => {
    setLoading(true)
    axios.get<IRoom[]>("http://localhost:8080/rooms",
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      }
    )
    .then((res) => {
      setRooms(res.data)
      setLoading(false)
    })
    .catch((err) => {
      console.log(err)
      setError("Failed to load rooms. Please try again.")
      setLoading(false)
    })
  }, [sessionToken]) // Only triggered when component mounts or token changes
  
  // Function to get appropriate class for room type
  const getRoomTypeClass = (type: string) => {
    const lowerType = type.toLowerCase()
    if (lowerType.includes('deluxe')) return 'type-deluxe'
    if (lowerType.includes('suite')) return 'type-suite'
    if (lowerType.includes('executive')) return 'type-executive'
    return 'type-standard'
  }

  return (
    <div className="rooms-container">
      <div className="rooms-header">
        <h1 className="rooms-title">Rooms Management</h1>
        <button 
          onClick={() => navigate('/rooms/register')} 
          className="register-room-button"
        >
          <span>+</span> Add New Room
        </button>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading rooms...</p>
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : rooms.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏨</div>
          <h2>No rooms found</h2>
          <p>Start by adding a new room using the button above</p>
        </div>
      ) : (
        <div className="rooms-table-container">
          <table className="rooms-table">
            <thead>
              <tr>
                <th>Room ID</th>
                <th>Room Number</th>
                <th>Capacity</th>
                <th>Type</th>
                <th>Price</th>
                <th>Hotel ID</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <RoomContainer 
                  {...room} 
                  key={room.roomID}
                  typeClass={getRoomTypeClass(room.roomType)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Rooms
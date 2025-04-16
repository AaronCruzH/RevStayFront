import { ChangeEvent, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { authContext } from "../../App"
import axios from "axios"
import { IRoom } from "../../interfaces/IRoom"
import RoomContainer from "./RoomContainer"

function DeleteRoom() {
    const [roomID, setRoomID]= useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [roomWasFound, setRoomWasFound] = useState(false)
    const [success, setSuccess] = useState<string | null>(null)
    const [fail, setFail] = useState<string | null>(null)
    const [foundRoom, setFoundRoom] = useState<IRoom>()
    const [isDeleting, setIsDeleting] = useState(false)


    const sessionToken = useContext(authContext)?.token
    const navigate = useNavigate()

    function Clear(): void{
        setRoomID('')
        setRoomWasFound(false)
        setFoundRoom(undefined)
      }

    async function searchRoom(): Promise<void> {
        setIsSubmitting(true)
        setSuccess(null)
        setFail(null)
        setRoomWasFound(false)
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
            setRoomWasFound(true);  
            setFoundRoom(response.data)
        } catch (error) {
            console.log(error)
            console.log("Caracoles")
            setRoomWasFound(false)
            setFail("Something went worng.")
          } finally{
          setIsSubmitting(false)
        }
    }

    async function DeleteRoom() {
        setIsDeleting(false)
        try{
            setIsDeleting(true)
        const response = await axios.delete<IRoom>(
            `http://localhost:8080/rooms/${roomID}`,
            {
              headers: {
                Authorization: `Bearer ${sessionToken}`,
              },
            }
          );

          console.log(response.status)
          console.log(response.statusText)
          const deletedRoomID = roomID
          setSuccess(`Room with ID ${deletedRoomID} deleted successfully!`)
          Clear()
        } catch(error){
            console.log(error)
            console.log(error)
            console.log("Caracoles")
            setFail("Something went worng.")
        } finally {
            setIsDeleting(false)
        }
    }

    // Function to get appropriate class for room type
    const getRoomTypeClass = (type: string | undefined) => {
    const lowerType = type?.toLowerCase()
    if (lowerType?.includes('deluxe')) return 'type-deluxe'
    if (lowerType?.includes('suite')) return 'type-suite'
    if (lowerType?.includes('executive')) return 'type-executive'
    return 'type-standard'
    }


    return (
    <>
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
                <h1 className="register-room-title">Delete Room</h1>
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
            {success && <div className="success-message">✓ {success}</div>}
            {fail && <div className="error-message">{fail}</div>}
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
                    <RoomContainer 
                        {...foundRoom} 
                        typeClass={getRoomTypeClass(foundRoom?.roomType)}
                    />
                </tbody>
            </table>
        </div>
        <div className="form-actions">
            <button 
                className="submit-button" 
                onClick={DeleteRoom}
                disabled={!(isDeleting || roomWasFound)}
            >
                {isDeleting ? "Deleting..." : "Delete"}
            </button>
        </div>
    </>
  )
}

export default DeleteRoom
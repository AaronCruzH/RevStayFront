import axios from "axios"
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

  return (
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
    </div>
  )
}

export default RegisterRoom
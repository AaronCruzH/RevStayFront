import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

function RegisterRoom() {

    const [hotelId, setHotelId] = useState('')

    let changeHotelId = (e: ChangeEvent<HTMLInputElement>) =>{
        setHotelId(e.target.value)
    }

    const [roomNumber, setRoomNumber] = useState('')

    let changeRoomNumber = (e: ChangeEvent<HTMLInputElement>) =>{
        setRoomNumber(e.target.value)
    }

    const [capacity, setCapacity] = useState('')

    let changeCapacity = (e: ChangeEvent<HTMLInputElement>) =>{
        setCapacity(e.target.value)
    }

    const [price, setPrice] = useState('')

    let changePrice = (e: ChangeEvent<HTMLInputElement>) =>{
        setPrice(e.target.value)
    }

    const [roomType, setRoomType] = useState('')

    let changeRoomType = (e: ChangeEvent<HTMLInputElement>) =>{
        setRoomType(e.target.value)
    }

    function registerRoom() : void
    {
        console.log("Aqui registramos rooms")
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
        Capacity <input type="text" value={capacity} onChange={changeCapacity}/>
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
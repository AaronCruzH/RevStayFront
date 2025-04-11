import { IRoomProps } from "../../interfaces/IRoomProps"

function RoomContainer(props:IRoomProps) {
  return (
    <tr>
        <td>{props.roomID}</td>
        <td>{props.roomNumber}</td>
        <td>{props.capacity}</td>
        <td>{props.roomType}</td>
        <td>{props.price}</td>
        <td>{props.hotel.hotelId}</td>
    </tr>
  )
}

export default RoomContainer
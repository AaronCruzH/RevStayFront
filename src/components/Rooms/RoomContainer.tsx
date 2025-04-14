/*import { IRoomProps } from "../../interfaces/IRoomProps"

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

export default RoomContainer*/
import { IRoomProps } from "../../interfaces/IRoomProps"

// Update the interface to include the typeClass property
interface ExtendedRoomProps extends IRoomProps {
  typeClass?: string;
}

function RoomContainer(props: ExtendedRoomProps) {
  return (
    <tr>
      <td>{props.roomID}</td>
      <td>{props.roomNumber}</td>
      <td>{props.capacity}</td>
      <td>
        <span className={`room-type ${props.typeClass || 'type-standard'}`}>
          {props.roomType}
        </span>
      </td>
      <td className="price-cell">${props.price.toFixed(2)}</td>
      <td>{props.hotel.hotelId}</td>
    </tr>
  )
}

export default RoomContainer
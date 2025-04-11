import { IHotel } from "./IHotel";

export interface IRoomProps{
    roomID:number,
    hotel: IHotel | null,
    capacity:number;
    roomNumber:number,
    price:number,
    roomType:string
}
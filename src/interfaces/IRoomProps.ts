import { IHotel } from "./IHotel";

export interface IRoomProps{
    roomID:number,
    hotel?: IHotel | null | undefined,
    capacity:number;
    roomNumber:number,
    price:number,
    roomType:string
}
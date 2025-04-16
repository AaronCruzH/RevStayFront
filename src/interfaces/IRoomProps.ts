import { IHotel } from "./IHotel";

export interface IRoomProps{
    roomID?:number | undefined,
    hotel?: IHotel | null | undefined,
    capacity?:number | undefined;
    roomNumber?:number|undefined,
    price?:number|undefined,
    roomType?:string|undefined
}
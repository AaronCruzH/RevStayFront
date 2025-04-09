import { IHotel } from "./IHotel";

export interface IRoom {
    roomID: number;
    hotelRoomId?: number;
    roomType: string; // single, double, king, suite
    capacity: number;
    roomNumber: number;
    price: number;
    // Optional fields
    hotel: IHotel | null; // Optional hotel object
}
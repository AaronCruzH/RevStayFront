import { IRoom } from "./IRoom";
import { IUser } from "./IUser";

export interface IReservation {
    reservationId: number,
    user: IUser,
    room: IRoom,
    totalGuests: number,
    checkIn: Date,
    checkOut: Date,
    createdAt: Date,
    total: number,
    reservationStatus: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED' | 'CONFIRMED' | 'COMPLETED'
}
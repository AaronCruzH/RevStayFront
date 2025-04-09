import { IHotel } from "./IHotel";

export interface IHotelImage {
    hotelAmenityId: number;
    name: string; 
    description: string;
    url: string; 
    hotel?: IHotel; // Optional hotel ID if the amenity is associated with a specific hotel
}

import { IHotelAmenity } from "./IHotelAmenity";
import { IHotelImage } from "./IHotelImage";

export interface IHotel {
    hotelId: number;
    name: string;
    country: string;
    state: string;
    city: string;
    street: string;
    houseNumber: string;
    postalCode: string;
    // Optional fields
    images?: IHotelImage[];
    amenities?: IHotelAmenity[];
}
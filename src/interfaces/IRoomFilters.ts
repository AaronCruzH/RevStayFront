export interface IRoomFilters {
    hotelName?: string;
    hotelCountry?: string;
    hotelState?: string;
    hotelCity?: string;
    roomType?: string; // single, double, king, suite
    capacity?: number;
    priceMin?: number;
    priceMax?: number;
    checkInDate?: string; // YYYY-MM-DD format
    checkOutDate?: string; // YYYY-MM-DD format
    // Optional fields
    hotelId? : number | null; // Optional hotel ID
    roomId? : number | null; // Optional room ID
}
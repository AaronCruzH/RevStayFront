/*import { useAxiosFetch } from "../../hooks/useAxiosFetch";
import { IRoom } from "../../interfaces/IRoom";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { IRoomFilters } from "../../interfaces/IRoomFilters";
import "./hotels.css"; // Importa el CSS
import { Error } from "../generics/Error";
import { Loading } from "../generics/Loading";
import { authContext } from "../../App";
import { IReservation } from "../../interfaces/IReservation";
import axios from "axios";

export const HotelsUser = () => {
  const [rooms, setRooms] = useState<Array<IRoom>>([]);
  const [filters, setFilters] = useState<IRoomFilters>({});

  const sessionToken = useContext(authContext)?.token;

  const [data, error, loading, fetchData] = useAxiosFetch({
    method: "POST",
    url: "/rooms/filter",
    params: null,
    body: filters
  });

  function bookRoom(roomId: number): void {
    console.log(roomId);
      const body = {
        "room": {
            "roomID": roomId
        },
        "totalGuests": filters.capacity,
        "checkIn":  filters.checkInDate,
        "checkOut":  filters.checkOutDate      
      };
    
    axios.post<IReservation[]>(
      "http://localhost:8080/reservations",
      body,  // Segundo argumento: los datos que quieres enviar (el cuerpo)
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      }  // Tercer argumento: configuración, incluidos los headers
    )
    .then((res) => {
      // setRooms(res.data)
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
      console.log("Caracoles")
    })
  }

  useEffect(() => {
    if (data) {
      setRooms(data);
      console.log(data);
    } else {
      setRooms([]);
    }
  }, [data]);

  const searchRooms = () => {
    fetchData();
  };

  const resetFilters = () => {
    setFilters({});

    for (const input of document.querySelectorAll("input")) {
      (input as HTMLInputElement).value = "";
    }

    for (const select of document.querySelectorAll("select")) {
      (select as HTMLSelectElement).value = "";
    }

    searchRooms();
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;

    // si el valor es "", eliminar la propiedad del objeto filters
    if (value.trim() === "") {
      setFilters((prevFilters) => {
        const newFilters = { ...prevFilters };
        delete newFilters[name as keyof IRoomFilters];
        return newFilters;
      });
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  }

  return (
    <>
      <div className="container">

      <div className="titleDiv">
            <h2>Rooms List</h2>
          </div>


        <div className="searchForm">
          <form onSubmit={(e) => e.preventDefault()}>
            <h2>Search Rooms</h2>
            <div className="formRow">
              <div className="formGroup">

                <label htmlFor="hotelName">Hotel Name</label>
                <input type="text" id="hotelName" name="hotelName" value={filters.hotelName} onChange={handleChange} />
              </div>

              <div className="formGroup">

                <label htmlFor="hotelCountry">Hotel Country</label>
                <input type="text" id="hotelCountry" name="hotelCountry" value={filters.hotelCountry} onChange={handleChange} />
              </div>

              <div className="formGroup">

                <label htmlFor="hotelState">Hotel State</label>
                <input type="text" id="hotelState" name="hotelState" value={filters.hotelState} onChange={handleChange} />
              </div>

              <div className="formGroup">

                <label htmlFor="hotelCity">Hotel City</label>
                <input type="text" id="hotelCity" name="hotelCity" value={filters.hotelCity} onChange={handleChange} />
              </div>

            </div>
            <div className="formRow">
              <div className="formGroup">

                <label htmlFor="roomType">Room Type</label>
                <select id="roomType" name="roomType" value={filters.roomType} onChange={handleChange}>
                  <option value="">Select Room Type</option>
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                  <option value="king">King</option>
                  <option value="suite">Suite</option>
                </select>
              </div>

              <div className="formGroup">

                <label htmlFor="capacity">Capacity</label>
                <input type="number" id="capacity" name="capacity" min={1} max={10} value={filters.capacity} onChange={handleChange} />
              </div>

              <div className="formGroup">

                <label htmlFor="priceMin">Price Min</label>
                <input type="number" id="priceMin" name="priceMin" min={0} step={0.01} value={filters.priceMin} onChange={handleChange} />
              </div>

              <div className="formGroup">

                <label htmlFor="priceMax">Price Max</label>
                <input type="number" id="priceMax" name="priceMax" min={0} step={0.01} value={filters.priceMax} onChange={handleChange} />
              </div>

            </div>
            <div className="formRow">
              <div className="formGroup">

                <label htmlFor="checkInDate">Check In Date</label>
                <input type="date" id="checkInDate" name="checkInDate" value={filters.checkInDate} onChange={handleChange} />
              </div>

              <div className="formGroup">

                <label htmlFor="checkOutDate">Check Out Date</label>
                <input type="date" id="checkOutDate" name="checkOutDate" value={filters.checkOutDate} onChange={handleChange} />
              </div>

              <div className="formGroup">

                <button type="submit" onClick={searchRooms}>Search</button>
                <button type="button" onClick={resetFilters}>Reset</button>
              </div>

            </div>

          </form>
        </div>

        <div className="searchResults">
                {error && <Error error={error}/>}
                {loading && <Loading />}
                {rooms.length === 0 && <div>No results found</div>}
          <div className="search-results">
            {rooms.map((room) => (
              <div className="card" key={room.hotelRoomId}>

                {room.hotel?.images && room.hotel?.images.length > 0 && (
                  <img src={room.hotel?.images[0].url} alt="Hotel Room" className="hotel-image" />
                )}
                <div className="card-content">
                  <h3>{room.hotel?.name}</h3>
                  <p>Address: {`${room.hotel?.city}, ${room.hotel?.state}, ${room.hotel?.country}`}</p>
                  <p>Capacity: {room.capacity}</p>
                  <p>Price: ${room.price}</p>
                  <button onClick={() => bookRoom(room.roomID)}>Reserve</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};*/

import { useAxiosFetch } from "../../hooks/useAxiosFetch";
import { IRoom } from "../../interfaces/IRoom";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { IRoomFilters } from "../../interfaces/IRoomFilters";
import "./HotelsUser.css"; // Make sure to update the CSS file name
import { Error } from "../generics/Error";
//import { Loading } from "../generics/Loading";
import { authContext } from "../../App";
import { IReservation } from "../../interfaces/IReservation";
import axios from "axios";

export const HotelsUser = () => {
  const [rooms, setRooms] = useState<Array<IRoom>>([]);
  const [filters, setFilters] = useState<IRoomFilters>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [bookingRoom, setBookingRoom] = useState<number | null>(null);

  const sessionToken = useContext(authContext)?.token;

  const [data, error, loading, fetchData] = useAxiosFetch({
    method: "POST",
    url: "/rooms/filter",
    params: null,
    body: filters
  });

  function bookRoom(roomId: number): void {
    if (!filters.checkInDate || !filters.checkOutDate || !filters.capacity) {
      alert("Please select check-in date, check-out date, and capacity to make a reservation.");
      return;
    }
    
    setBookingRoom(roomId);
    setSuccessMessage(null);
    
    const body = {
      "room": {
        "roomID": roomId
      },
      "totalGuests": filters.capacity,
      "checkIn": filters.checkInDate,
      "checkOut": filters.checkOutDate      
    };
  
    axios.post<IReservation[]>(
      "http://localhost:8080/reservations",
      body,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      }
    )
    .then((res) => {
      console.log(res);
      setSuccessMessage("Room booked successfully! Your reservation is pending confirmation.");
      
      // Remove room from available list
      setRooms(prevRooms => prevRooms.filter(room => room.roomID !== roomId));
    })
    .catch((err) => {
      console.log(err);
      alert("Failed to book the room. Please try again.");
    })
    .finally(() => {
      setBookingRoom(null);
    });
  }

  useEffect(() => {
    if (data) {
      setRooms(data);
      console.log(data);
    } else {
      setRooms([]);
    }
  }, [data]);

  const searchRooms = () => {
    setSuccessMessage(null);
    fetchData();
  };

  const resetFilters = () => {
    setFilters({});
    setSuccessMessage(null);

    for (const input of document.querySelectorAll("input")) {
      (input as HTMLInputElement).value = "";
    }

    for (const select of document.querySelectorAll("select")) {
      (select as HTMLSelectElement).value = "";
    }

    searchRooms();
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;

    // si el valor es "", eliminar la propiedad del objeto filters
    if (value.trim() === "") {
      setFilters((prevFilters) => {
        const newFilters = { ...prevFilters };
        delete newFilters[name as keyof IRoomFilters];
        return newFilters;
      });
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="hotels-container">
      <div className="hotels-header">
        <h1 className="hotels-title">Find Your Perfect Room</h1>
      </div>

      <div className="search-form-container">
        <h2 className="search-form-title">Search Rooms</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="hotelName">Hotel Name</label>
              <input 
                type="text" 
                id="hotelName" 
                name="hotelName" 
                className="form-control"
                value={filters.hotelName || ''} 
                onChange={handleChange} 
                placeholder="Enter hotel name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="hotelCountry">Country</label>
              <input 
                type="text" 
                id="hotelCountry" 
                name="hotelCountry" 
                className="form-control"
                value={filters.hotelCountry || ''} 
                onChange={handleChange} 
                placeholder="Enter country"
              />
            </div>

            <div className="form-group">
              <label htmlFor="hotelState">State/Province</label>
              <input 
                type="text" 
                id="hotelState" 
                name="hotelState" 
                className="form-control"
                value={filters.hotelState || ''} 
                onChange={handleChange} 
                placeholder="Enter state or province"
              />
            </div>

            <div className="form-group">
              <label htmlFor="hotelCity">City</label>
              <input 
                type="text" 
                id="hotelCity" 
                name="hotelCity" 
                className="form-control"
                value={filters.hotelCity || ''} 
                onChange={handleChange} 
                placeholder="Enter city"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="roomType">Room Type</label>
              <select 
                id="roomType" 
                name="roomType" 
                className="form-select"
                value={filters.roomType || ''} 
                onChange={handleChange}
              >
                <option value="">Select Room Type</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="king">King</option>
                <option value="suite">Suite</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="capacity">Capacity</label>
              <input 
                type="number" 
                id="capacity" 
                name="capacity" 
                className="form-control"
                min={1} 
                max={10} 
                value={filters.capacity || ''} 
                onChange={handleChange} 
                placeholder="Number of guests"
              />
            </div>

            <div className="form-group">
              <label htmlFor="priceMin">Minimum Price</label>
              <input 
                type="number" 
                id="priceMin" 
                name="priceMin" 
                className="form-control"
                min={0} 
                step={0.01} 
                value={filters.priceMin || ''} 
                onChange={handleChange} 
                placeholder="Min price"
              />
            </div>

            <div className="form-group">
              <label htmlFor="priceMax">Maximum Price</label>
              <input 
                type="number" 
                id="priceMax" 
                name="priceMax" 
                className="form-control"
                min={0} 
                step={0.01} 
                value={filters.priceMax || ''} 
                onChange={handleChange} 
                placeholder="Max price"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="checkInDate">Check In Date</label>
              <input 
                type="date" 
                id="checkInDate" 
                name="checkInDate" 
                className="form-control"
                value={filters.checkInDate || ''} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label htmlFor="checkOutDate">Check Out Date</label>
              <input 
                type="date" 
                id="checkOutDate" 
                name="checkOutDate" 
                className="form-control"
                value={filters.checkOutDate || ''} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" onClick={searchRooms}>
              Search Rooms
            </button>
            <button type="button" className="btn btn-secondary" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        </form>
      </div>

      <div className="search-results-container">
        {successMessage && (
          <div className="success-message">✓ {successMessage}</div>
        )}
        
        {error && <Error error={error} />}
        
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Searching for available rooms...</p>
          </div>
        )}
        
        {!loading && !error && rooms.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🏨</div>
            <h2>No rooms found</h2>
            <p>Try adjusting your search criteria or select different dates</p>
          </div>
        )}
        
        {!loading && !error && rooms.length > 0 && (
          <div className="room-cards-grid">
            {rooms.map((room) => (
              <div className="room-card" key={room.roomID}>
                {room.hotel?.images && room.hotel?.images.length > 0 ? (
                  <img src={room.hotel?.images[0].url} alt={`${room.hotel?.name} Room`} className="room-image" />
                ) : (
                  <div className="room-image-placeholder"></div>
                )}
                
                <div className="room-content">
                  <h3 className="room-title">{room.hotel?.name}</h3>
                  <p className="room-address">{`${room.hotel?.city}, ${room.hotel?.state}, ${room.hotel?.country}`}</p>
                  
                  <div className="room-details">
                    <div className="room-detail">
                      <span className="room-detail-label">Room Type:</span>
                      <span className="room-detail-value">{room.roomType}</span>
                    </div>
                    <div className="room-detail">
                      <span className="room-detail-label">Capacity:</span>
                      <span className="room-detail-value">{room.capacity} guests</span>
                    </div>
                    <div className="room-detail">
                      <span className="room-detail-label">Room Number:</span>
                      <span className="room-detail-value">{room.roomNumber}</span>
                    </div>
                    
                    <div className="room-features">
                      {room.roomType === "suite" && <span className="room-feature">Luxury</span>}
                      {room.capacity >= 3 && <span className="room-feature">Family Friendly</span>}
                      <span className="room-feature">Free WiFi</span>
                      <span className="room-feature">Air Conditioning</span>
                    </div>
                  </div>
                  
                  <div className="room-price">
                    {formatCurrency(room.price)} / night
                  </div>
                  
                  <button 
                    className="reserve-button"
                    onClick={() => bookRoom(room.roomID)}
                    disabled={bookingRoom === room.roomID}
                  >
                    {bookingRoom === room.roomID ? "Processing..." : "Reserve Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
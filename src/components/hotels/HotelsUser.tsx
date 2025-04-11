import { useAxiosFetch } from "../../hooks/useAxiosFetch";
import { IRoom } from "../../interfaces/IRoom";
import { ChangeEvent, useEffect, useState } from "react";
import { IRoomFilters } from "../../interfaces/IRoomFilters";
import "./hotels.css"; // Importa el CSS
import { Error } from "../generics/Error";
import { Loading } from "../generics/Loading";

export const HotelsUser = () => {
  const [rooms, setRooms] = useState<Array<IRoom>>([]);
  const [filters, setFilters] = useState<IRoomFilters>({});

  const [data, error, loading, fetchData] = useAxiosFetch({
    method: "POST",
    url: "/rooms/filter",
    params: null,
    body: filters
  });

  function bookRoom(roomId: number): void {
    console.log(roomId);
    useAxiosFetch({
      method: "POST",
      url: "/reservations",
      params: null,
      body: {
        "room": {
            "roomID": roomId
        },
        "totalGuests": filters.capacity,
        "checkIn":  filters.checkInDate,
        "checkOut":  filters.checkOutDate      
      }
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
};
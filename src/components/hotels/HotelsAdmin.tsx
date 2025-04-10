import { ChangeEvent, useEffect, useState } from "react";
import { IHotel } from "../../interfaces/IHotel";
import { IHotelFilters } from "../../interfaces/IHotelFilters";
import { useAxiosFetch } from "../../hooks/useAxiosFetch";
import './hotels.css'
import { useNavigate } from "react-router-dom";
import { Loading } from "../generics/Loading";
import { Error } from "../generics/Error";

export const HotelsAdmin = () => {
  const navigate = useNavigate();

  const [hotels, setHotels] = useState<Array<IHotel>>([]);
  const [filters, setFilters] = useState<IHotelFilters>({});

  const [data, error, loading, fetchData] = useAxiosFetch({
    method: "POST",
    url: "/hotels/filter",
    params: null,
    body: filters
  });

  useEffect(() => {
    if (data) {
      setHotels(data);
      console.log(data);
    } else {
      setHotels([]);
    }
  }, [data]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;

    // si el valor es "", eliminar la propiedad del objeto filters
    if (value.trim() === "") {
      setFilters((prevFilters) => {
        const newFilters = { ...prevFilters };
        delete newFilters[name as keyof IHotelFilters];
        return newFilters;
      });
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  }


  const searchHotels = () => {
    fetchData();
  };

  const resetFilters = () => {
    setFilters({});

    for (const input of document.querySelectorAll("input")) {
      (input as HTMLInputElement).value = "";
    }

    searchHotels();
  }

  const handlerImages = (hotelId: number, name: string) => {
    navigate(`${hotelId}/images`, { state: { hotelId, name } });
  }

  const handlerAmenities = (hotelId: number, name: string) => {
    navigate(`${hotelId}/amenities`, { state: { name } });
  }
  return (
    <>
      <div className="container">

      <div className="titleDiv">
            <h2>Hotels List</h2>
            <button type="button" onClick={() => navigate("new")}>New Hotel</button>
          </div>

        <div className="searchForm">
          <form onSubmit={(e) => e.preventDefault()}>
          <div className="formRow">
          <h2>Search Hotels</h2>
          </div>
            <div className="formRow">
              <div className="formGroup">
                <label htmlFor="hotelName">Hotel Name:</label>
                <input type="text" id="name" name="name" value={filters.name} onChange={handleChange} />
              </div>
              <div className="formGroup">
                <label htmlFor="hotelCountry">Hotel Country:</label>
                <input type="text" id="country" name="country" value={filters.country} onChange={handleChange} />
              </div>

              <div className="formGroup">
                <label htmlFor="hotelState">Hotel State:</label>
                <input type="text" id="state" name="state" value={filters.state} onChange={handleChange} />
              </div>

              <div className="formGroup">
                <label htmlFor="hotelCity">Hotel City:</label>
                <input type="text" id="city" name="city" value={filters.city} onChange={handleChange} />
              </div>
            </div>

            <div className="formRow">
              <button type="submit" onClick={searchHotels}>Search</button>
              <button type="button" onClick={resetFilters}>Reset</button>
            </div>
          </form>
        </div>

        <div className="searchResults">
          {error && <Error error={error}/>}
          {loading && <Loading />}
          <table>
            <thead>
              <tr>
                <th>Hotel Name</th>
                <th>Hotel Country</th>
                <th>Hotel State</th>
                <th>Hotel City</th>
                <th>Hotel Street</th>
                <th>Hotel House Number</th>
                <th>Hotel Postal Code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel) => (
                <tr key={hotel.hotelId}>
                  <td>{hotel.name}</td>
                  <td>{hotel.country}</td>
                  <td>{hotel.state}</td>
                  <td>{hotel.city}</td>
                  <td>{hotel.street}</td>
                  <td>{hotel.houseNumber}</td>
                  <td>{hotel.postalCode}</td>
                  <td>
                    <button onClick={() => navigate(`${hotel.hotelId}/update`)}>Update</button>
                    <button onClick={() => handlerImages(hotel.hotelId, hotel.name)}>Images</button>
                    <button onClick={() => handlerAmenities(hotel.hotelId, hotel.name)}>Amenities</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </>

  )
}

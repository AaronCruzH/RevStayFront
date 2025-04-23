/*import { ChangeEvent, useEffect, useState } from "react";
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
          {error && <Error error={error} />}
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
}*/
import { ChangeEvent, useEffect, useState } from "react";
import { IHotel } from "../../interfaces/IHotel";
import { IHotelFilters } from "../../interfaces/IHotelFilters";
import { useAxiosFetch } from "../../hooks/useAxiosFetch";
import { useNavigate } from "react-router-dom";
//import { Loading } from "../generics/Loading";
import { Error } from "../generics/Error";
import "./HotelsAdmin.css";

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

  useEffect(() => {
    // Initial data fetch when component mounts
    fetchData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;

    // If the value is empty, remove the property from the filters object
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
    <div className="hotels-admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Hotels Management</h1>
        <button 
          className="new-hotel-button" 
          onClick={() => navigate("new")}
        >
          <span>+</span> Add New Hotel
        </button>
      </div>

      <div className="search-form-container">
        <h2 className="search-form-title">Search Hotels</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Hotel Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className="form-control"
                value={filters.name || ''} 
                onChange={handleChange} 
                placeholder="Enter hotel name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input 
                type="text" 
                id="country" 
                name="country" 
                className="form-control"
                value={filters.country || ''} 
                onChange={handleChange} 
                placeholder="Enter country"
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State/Province</label>
              <input 
                type="text" 
                id="state" 
                name="state" 
                className="form-control"
                value={filters.state || ''} 
                onChange={handleChange} 
                placeholder="Enter state/province"
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input 
                type="text" 
                id="city" 
                name="city" 
                className="form-control"
                value={filters.city || ''} 
                onChange={handleChange} 
                placeholder="Enter city"
              />
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary" 
              onClick={searchHotels}
            >
              Search Hotels
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        </form>
      </div>

      <div className="hotels-results-container">
        {error && <Error error={error} />}
        
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading hotels...</p>
          </div>
        ) : hotels.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏨</div>
            <h2>No hotels found</h2>
            <p>Try adjusting your search criteria or add a new hotel</p>
          </div>
        ) : (
          <div className="hotels-table-container">
            <table className="hotels-table">
              <thead>
                <tr>
                  <th>Hotel Name</th>
                  <th>Country</th>
                  <th>State/Province</th>
                  <th>City</th>
                  <th>Street</th>
                  <th>House Number</th>
                  <th>Postal Code</th>
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
                      <div className="action-buttons">
                        <button 
                          className="action-button action-update"
                          onClick={() => navigate(`${hotel.hotelId}/update`)}
                        >
                          Update
                        </button>
                        <button 
                          className="action-button action-images"
                          onClick={() => handlerImages(hotel.hotelId, hotel.name)}
                        >
                          Images
                        </button>
                        <button 
                          className="action-button action-amenities"
                          onClick={() => handlerAmenities(hotel.hotelId, hotel.name)}
                        >
                          Amenities
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

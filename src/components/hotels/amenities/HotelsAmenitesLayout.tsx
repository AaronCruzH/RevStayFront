/*import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../images_amenities.css';
import { useAxiosFetch } from '../../../hooks/useAxiosFetch';
import { IHotelAmenity } from '../../../interfaces/IHotelAmenity';
import { Error } from '../../generics/Error';
import { Loading } from '../../generics/Loading';

export const HotelsAmenitesLayout = () => {
  const [images, setImages] = useState<Array<IHotelAmenity>>([]);

  const navigate = useNavigate();
  const { hotelId } = useParams<{ hotelId: string }>();
  const location = useLocation();
  const name = location.state?.name as string;
  const [data, error, loading, fetchData] = useAxiosFetch({
    method: 'GET',
    url: `/hotels/${hotelId}/amenities`,
    params: null,
    body: null,
  });

  useEffect(() => {
    if (data) {
      setImages(data);
    } else {
      setImages([]);
    }
  }, [data]);

  return (
    <div className="imagesContainer">

      <div className="titleDiv">
        <h2>Amenities for Hotel: {name}</h2>
        <button type="button" onClick={() => navigate("new")}>New amenity</button>
      </div>

      <div className="searchResults">
        {error && <Error error={error} />}
        {loading && <Loading />}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image) => (
              <tr key={image.hotelAmenityId}>
                <td>{image.name}</td>
                <td>{image.description}</td>
                <td>
                  <a href={image.url} target="_blank" rel="noopener noreferrer">
                    View Image
                  </a>
                </td>
                <td>
                  <button onClick={() => navigate(`${image.hotelAmenityId}/update`)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};*/
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAxiosFetch } from '../../../hooks/useAxiosFetch';
import { IHotelAmenity } from '../../../interfaces/IHotelAmenity';
import { Error } from '../../generics/Error';
import './HotelAmenities.css';

export const HotelsAmenitesLayout = () => {
  const [amenities, setAmenities] = useState<Array<IHotelAmenity>>([]);
  const navigate = useNavigate();
  const { hotelId } = useParams<{ hotelId: string }>();
  const location = useLocation();
  const hotelName = location.state?.name as string;
  
  const [data, error, loading, fetchData] = useAxiosFetch({
    method: 'GET',
    url: `/hotels/${hotelId}/amenities`,
    params: null,
    body: null,
  });
  
  useEffect(() => {
    if (data) {
      setAmenities(data);
    } else {
      setAmenities([]);
    }
  }, [data]);
  
  return (
    <div className="amenities-container">
      <div className="amenities-header">
        <div>
          <h1 className="amenities-title">Hotel Amenities</h1>
          {hotelName && (
            <p className="hotel-subtitle">for {hotelName}</p>
          )}
        </div>
        <div className="header-actions">
          <button 
            className="back-button" 
            onClick={() => navigate(-1)}
          >
            ← Back to Hotels
          </button>
          <button 
            className="new-amenity-button" 
            onClick={() => navigate("new")}
          >
            <span>+</span> Add New Amenity
          </button>
        </div>
      </div>
      
      {error && <Error error={error} />}
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading amenities...</p>
        </div>
      ) : amenities.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏨</div>
          <h2>No amenities found</h2>
          <p>Start by adding amenities to this hotel</p>
        </div>
      ) : (
        <div className="amenities-table-container">
          <table className="amenities-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {amenities.map((amenity) => (
                <tr key={amenity.hotelAmenityId}>
                  <td>{amenity.name}</td>
                  <td>{amenity.description}</td>
                  <td>
                    <a 
                      href={amenity.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="view-link"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      View Image
                    </a>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-button action-update"
                        onClick={() => navigate(`${amenity.hotelAmenityId}/update`)}
                      >
                        Update
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
  );
};
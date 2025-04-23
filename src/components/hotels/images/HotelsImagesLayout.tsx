/*import { useEffect, useState } from 'react';
import { IHotelImage } from '../../../interfaces/IHotelImage';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../images_amenities.css';
import { useAxiosFetch } from '../../../hooks/useAxiosFetch';
import { Error } from '../../generics/Error';
import { Loading } from '../../generics/Loading';


export const HotelsImagesLayout = () => {
  const [images, setImages] = useState<IHotelImage[]>([]);

  const navigate = useNavigate();
  const { hotelId } = useParams<{ hotelId: string }>(); // Obtiene solo hotelId de los parámetros
  const location = useLocation();
  const name = location.state?.name as string; // Obtiene name del state
  const [data, error, loading, fetchData] = useAxiosFetch({
    method: 'GET',
    url: `/hotels/${hotelId}/images`,
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
        <h2>Images for Hotel: {name}</h2>
        <button type="button" onClick={() => navigate("new")}>New image</button>
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
              <tr key={image.hotelImageId}>
                <td>{image.name}</td>
                <td>{image.description}</td>
                <td>
                  <a href={image.url} target="_blank" rel="noopener noreferrer">
                    View Image
                  </a>
                </td>
                <td>
                  <button onClick={() => navigate(`${image.hotelImageId}/update`)}>Update</button>
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
import { IHotelImage } from '../../../interfaces/IHotelImage';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAxiosFetch } from '../../../hooks/useAxiosFetch';
import { Error } from '../../generics/Error';
import './HotelImages.css';

export const HotelsImagesLayout = () => {
  const [images, setImages] = useState<IHotelImage[]>([]);
  const navigate = useNavigate();
  const { hotelId } = useParams<{ hotelId: string }>();
  const location = useLocation();
  const hotelName = location.state?.name as string;
  
  const [data, error, loading] = useAxiosFetch({
    method: 'GET',
    url: `/hotels/${hotelId}/images`,
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
    <div className="images-container">
      <div className="images-header">
        <div>
          <h1 className="images-title">Hotel Images</h1>
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
            className="new-image-button" 
            onClick={() => navigate("new")}
          >
            <span>+</span> Add New Image
          </button>
        </div>
      </div>
      
      {error && <Error error={error} />}
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading images...</p>
        </div>
      ) : images.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🖼️</div>
          <h2>No images found</h2>
          <p>Start by adding images to this hotel</p>
        </div>
      ) : (
        <div className="images-table-container">
          <table className="images-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {images.map((image) => (
                <tr key={image.hotelImageId}>
                  <td>{image.name}</td>
                  <td>{image.description}</td>
                  <td>
                    <div className="image-preview-container">
                      <img 
                        src={image.url} 
                        alt={image.name}
                        className="image-thumbnail"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://via.placeholder.com/80x60?text=No+Image";
                        }}
                      />
                      <a 
                        href={image.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="view-link"
                        style={{ marginLeft: '12px' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        View Full Size
                      </a>
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-button action-update"
                        onClick={() => navigate(`${image.hotelImageId}/update`)}
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
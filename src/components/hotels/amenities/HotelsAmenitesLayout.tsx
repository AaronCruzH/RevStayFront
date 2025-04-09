import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../images_amenities.css';
import { useAxiosFetch } from '../../../hooks/useAxiosFetch';
import { IHotelAmenity } from '../../../interfaces/IHotelAmenity';

export const HotelsAmenitesLayout = () => {
  const [images, setImages] = useState<Array<IHotelAmenity>>([]);

  const navigate = useNavigate();
  const { hotelId } = useParams<{ hotelId: string }>(); // Obtiene solo hotelId de los parámetros
  const location = useLocation();
  const name = location.state?.name as string; // Obtiene name del state
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
      <h2>Amenities for Hotel: {name}</h2>
      {error && <div className="error">Error: {error}</div>}
      {loading && <div className="loading">Loading...</div>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>URL</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
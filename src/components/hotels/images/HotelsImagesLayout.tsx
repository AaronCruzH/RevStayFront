import { useEffect, useState } from 'react';
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
};
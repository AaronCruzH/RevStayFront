import { useEffect, useState } from 'react';
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
};
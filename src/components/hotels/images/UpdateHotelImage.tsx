/*import { useState, useEffect, ChangeEvent, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAxiosFetch } from "../../../hooks/useAxiosFetch";
import "../hotels.css"; // Importa el CSS
import { Loading } from "../../generics/Loading";
import { IHotelImage} from "../../../interfaces/IHotelImage";

export const UpdateHotelImage = () => {
    const { hotelId, hotelImageId } = useParams<{ hotelId: string,  hotelImageId: string }>();
    const navigate = useNavigate();
    const [Image, setImage] = useState<IHotelImage>({
        hotelImageId: 0,
        name: "",
        description: "",
        url: ""
    });

    const [fetchDataImage, errorImage, loadingImage, fetchDataImageFunction] = useAxiosFetch({
        method: "GET",
        url: `/hotels/${hotelId}/images/${hotelImageId}`,
        params: null,
        body: null,
        executeImmediately: false
    });

    const [fetchUpdateImage, errorUpdate, loadingUpdate, fetchUpdateHotelFunction] = useAxiosFetch({
        method: "PUT",
        url: `/hotels/${hotelId}/images/${hotelImageId}`,
        params: null,
        body: Image,
        executeImmediately: false
    });

    // Memoriza la función fetchDataImageFunction
    const memoizedfetchDataImage = useCallback(fetchDataImageFunction, [hotelId]);

    useEffect(() => {
        memoizedfetchDataImage();
    }, [hotelId, memoizedfetchDataImage]);

    useEffect(() => {
        if (fetchDataImage) {
            setImage(fetchDataImage);
        }
    }, [fetchDataImage]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let { name, value } = e.target;

        if (typeof value === "string") {
            value = value.trim();
        }

        setImage((prevImage) => ({
            ...prevImage,
            [name]: value,
        }));
    };

    const updateImage = () => {
        fetchUpdateHotelFunction();
    };

    useEffect(() => {
        if (fetchUpdateImage && !errorUpdate) {
            alert("Image updated successfully!");
            navigate(-1);
        }
    }, [fetchUpdateImage, errorUpdate]);

    return (
        <div className="container">
            <div className="searchForm">
                <h2>Update Image</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="formRow">
                    <div className="formGroup">
                                <label htmlFor="hotelName">Name:</label>
                                <input type="text" id="name" name="name" value={Image.name} onChange={handleChange} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="hotelCountry">Country:</label>
                                <input type="text" id="country" name="country" value={Image.description} onChange={handleChange} />
                            </div>

                            <div className="formGroup">
                                <label htmlFor="hotelState">State:</label>
                                <input type="text" id="state" name="state" value={Image.url} onChange={handleChange} />
                            </div>
                    </div>
                    <div className="formRow">
                        <button type="submit" onClick={updateImage}>Update Image</button>
                    </div>
                </form>
                {loadingImage && <Loading />}
                {loadingUpdate && <Loading />}

                {errorImage && <div>Error loading hotel data: {errorImage}</div>}
            </div>
        </div>
    );
};*/
import { useState, useEffect, ChangeEvent, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAxiosFetch } from "../../../hooks/useAxiosFetch";
import { IHotelImage } from "../../../interfaces/IHotelImage";
import './HotelImages.css';

export const UpdateHotelImage = () => {
  const { hotelId, hotelImageId } = useParams<{ hotelId: string, hotelImageId: string }>();
  const navigate = useNavigate();
  
  const [image, setImage] = useState<IHotelImage>({
    hotelImageId: 0,
    name: "",
    description: "",
    url: ""
  });
  
  const [formValid, setFormValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const [fetchDataImage, errorImage, loadingImage, fetchDataImageFunction] = useAxiosFetch({
    method: "GET",
    url: `/hotels/${hotelId}/images/${hotelImageId}`,
    params: null,
    body: null,
    executeImmediately: false
  });
  
  const [fetchUpdateImage, errorUpdate, loadingUpdate, fetchUpdateImageFunction] = useAxiosFetch({
    method: "PUT",
    url: `/hotels/${hotelId}/images/${hotelImageId}`,
    params: null,
    body: image,
    executeImmediately: false
  });
  
  // Memorize the fetchDataImageFunction
  const memoizedFetchDataImage = useCallback(fetchDataImageFunction, [hotelId, hotelImageId]);
  
  useEffect(() => {
    memoizedFetchDataImage();
  }, [hotelId, hotelImageId, memoizedFetchDataImage]);
  
  useEffect(() => {
    if (fetchDataImage) {
      setImage(fetchDataImage);
    }
  }, [fetchDataImage]);
  
  // Validate form
  useEffect(() => {
    const isValid = 
      image.name.trim() !== "" && 
      image.description.trim() !== "" && 
      image.url.trim() !== "";
    
    setFormValid(isValid);
  }, [image]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;
    
    if (typeof value === "string") {
      value = value.trim();
    }
    
    setImage((prevImage) => ({
      ...prevImage,
      [name]: value,
    }));
  };
  
  const isValidImageUrl = (url: string) => {
    return url.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i) !== null;
  }
  
  const updateImage = () => {
    setSuccessMessage(null);
    
    // Validate image URL
    if (!isValidImageUrl(image.url)) {
      alert("Please enter a valid image URL (must end with .jpg, .png, .gif, etc.)");
      return;
    }
    
    fetchUpdateImageFunction();
  };
  
  useEffect(() => {
    if (fetchUpdateImage && !errorUpdate) {
      setSuccessMessage("Image updated successfully!");
      
      // Redirect after a short delay
      const timer = setTimeout(() => {
        navigate(-1);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [fetchUpdateImage, errorUpdate, navigate]);
  
  return (
    <div className="images-container">
      <div className="image-form-container">
        <div className="form-header">
          <h1 className="form-title">Update Image</h1>
          <button 
            className="back-button" 
            onClick={() => navigate(-1)}
          >
            ← Back to Images
          </button>
        </div>
        
        {successMessage && (
          <div className="success-message">✓ {successMessage}</div>
        )}
        
        {errorImage && (
          <div className="error-message">
            Error loading image data: {errorImage}
          </div>
        )}
        
        {errorUpdate && (
          <div className="error-message">
            Error updating image: {errorUpdate}
          </div>
        )}
        
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="required-field">Image Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className="form-control" 
                value={image.name} 
                onChange={handleChange}
                placeholder="Enter image name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description" className="required-field">Description</label>
              <input 
                type="text" 
                id="description" 
                name="description" 
                className="form-control" 
                value={image.description} 
                onChange={handleChange}
                placeholder="Enter image description"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="url" className="required-field">Image URL</label>
              <input 
                type="text" 
                id="url" 
                name="url" 
                className="form-control" 
                value={image.url} 
                onChange={handleChange}
                placeholder="Enter image URL"
              />
              
              {image.url && (
                <div className="image-preview-container">
                  {isValidImageUrl(image.url) ? (
                    <img 
                      src={image.url} 
                      alt="Preview" 
                      className="image-preview"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const parent = (e.target as HTMLImageElement).parentNode;
                        if (parent) {
                          const placeholder = document.createElement('div');
                          placeholder.className = 'preview-placeholder';
                          placeholder.textContent = 'Invalid image URL';
                          parent.appendChild(placeholder);
                        }
                      }}
                    />
                  ) : (
                    <div className="preview-placeholder">
                      {image.url ? 'Invalid image URL' : 'Enter URL to preview image'}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="form-actions">
            <button 
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              onClick={updateImage}
              disabled={!formValid || loadingUpdate}
            >
              {loadingUpdate ? "Updating..." : "Update Image"}
            </button>
          </div>
        </form>
      </div>
      
      {loadingImage && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};
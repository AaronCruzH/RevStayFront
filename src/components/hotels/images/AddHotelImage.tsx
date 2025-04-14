/*import { ChangeEvent, useEffect, useState } from "react";
import { useAxiosFetch } from "../../../hooks/useAxiosFetch";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../generics/Loading";
import { Error } from "../../generics/Error";
import { IHotelImage } from "../../../interfaces/IHotelImage";

export const AddHotelImage = () => {
    const { hotelId } = useParams<{ hotelId: string }>();
    const navigate = useNavigate();
    const [Image, setImage] = useState<IHotelImage>({
        hotelImageId: 0,
        name: "",
        description: "",
        url: ""
    });

    const [data, error, loading, fetchData] = useAxiosFetch({
        method: "POST",
        url: `/hotels/${hotelId}/images`,
        params: null,
        body: [Image],
        executeImmediately: false
    });


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let { name, value } = e.target;

        if (typeof value === "string") {
            value = value.trim();
        }

        setImage((prevImage) => ({
            ...prevImage,
            [name]: value,
        }));
    }

    const resetFilters = () => {
        setImage({
            hotelImageId: 0,
            name: "",
            description: "",
            url: ""
        });

        for (const input of document.querySelectorAll("input")) {
            (input as HTMLInputElement).value = "";
        }
    }


    const addNewImage = async () => {

        // check if all fields are filled
        if (Object.values(Image).some(value => value === "")) {
            alert("Please fill all fields");
            return;
        }


        fetchData();

    };


    useEffect(() => {
        if (data && !error) {
            alert("Image added successfully!");
            resetFilters();
            navigate(-1);
        }

    }, [data, error]);

    return (
        <>
            <div className="container">
                <div className="searchForm">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <h2>New hotel</h2>

                        {error && <Error error={error} />}
                        {loading && <Loading />}
                        <div className="formRow">
                            <div className="formGroup">
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" name="name" value={Image.name} onChange={handleChange} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="description">Description:</label>
                                <input type="text" id="description" name="description" value={Image.description} onChange={handleChange} />
                            </div>

                            <div className="formGroup">
                                <label htmlFor="url">Url:</label>
                                <input type="text" id="url" name="url" value={Image.url} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="formRow">
                            <button type="submit" onClick={addNewImage}>Save</button>
                            <button type="button" onClick={resetFilters}>Clean</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}*/
import { ChangeEvent, useEffect, useState } from "react";
import { useAxiosFetch } from "../../../hooks/useAxiosFetch";
import { useNavigate, useParams } from "react-router-dom";
import { Error } from "../../generics/Error";
import { IHotelImage } from "../../../interfaces/IHotelImage";
import './HotelImages.css';

export const AddHotelImage = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();
  
  const [image, setImage] = useState<IHotelImage>({
    hotelImageId: 0,
    name: "",
    description: "",
    url: ""
  });
  
  const [formValid, setFormValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [data, error, loading, fetchData] = useAxiosFetch({
    method: "POST",
    url: `/hotels/${hotelId}/images`,
    params: null,
    body: [image],
    executeImmediately: false
  });
  
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
  }
  
  const resetForm = () => {
    setImage({
      hotelImageId: 0,
      name: "",
      description: "",
      url: ""
    });
    setSuccessMessage(null);
    setErrorMessage(null);
  }
  
  const isValidImageUrl = (url: string) => {
    return url.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i) !== null;
  }
  
  const addNewImage = async () => {
    // Clear previous messages
    setSuccessMessage(null);
    setErrorMessage(null);
    
    // Check required fields
    if (!formValid) {
      setErrorMessage("Please fill all fields");
      return;
    }
    
    // Validate image URL
    if (!isValidImageUrl(image.url)) {
      setErrorMessage("Please enter a valid image URL (must end with .jpg, .png, .gif, etc.)");
      return;
    }
    
    fetchData();
  };
  
  useEffect(() => {
    if (data && !error) {
      setSuccessMessage("Image added successfully!");
      
      // Redirect after a short delay
      const timer = setTimeout(() => {
        resetForm();
        navigate(-1);
      }, 2000);
      
      return () => clearTimeout(timer);
    } else if (error) {
      setErrorMessage(error);
    }
  }, [data, error, navigate]);
  
  return (
    <div className="images-container">
      <div className="image-form-container">
        <div className="form-header">
          <h1 className="form-title">Add New Image</h1>
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
        
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}
        
        {error && <Error error={error} />}
        
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
              onClick={resetForm}
            >
              Clear Form
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              onClick={addNewImage}
              disabled={!formValid || loading}
            >
              {loading ? "Adding..." : "Save Image"}
            </button>
          </div>
        </form>
      </div>
      
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
}

/*import { useState, useEffect, ChangeEvent, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAxiosFetch } from "../../../hooks/useAxiosFetch";
import "../hotels.css"; // Importa el CSS
import { Loading } from "../../generics/Loading";
import { IHotelAmenity } from "../../../interfaces/IHotelAmenity";

export const UpdateHotelAmenity = () => {
    const { hotelId, hotelAmenityId } = useParams<{ hotelId: string,  hotelAmenityId: string }>();
    const navigate = useNavigate();
    const [amenity, setAmenity] = useState<IHotelAmenity>({
        hotelAmenityId: 0,
        name: "",
        description: "",
        url: ""
    });

    const [fetchDataAmenity, errorAmenity, loadingAmenity, fetchDataAmenityFunction] = useAxiosFetch({
        method: "GET",
        url: `/hotels/${hotelId}/amenities/${hotelAmenityId}`,
        params: null,
        body: null,
        executeImmediately: false
    });

    const [fetchUpdateAmenity, errorUpdate, loadingUpdate, fetchUpdateHotelFunction] = useAxiosFetch({
        method: "PUT",
        url: `/hotels/${hotelId}/amenities/${hotelAmenityId}`,
        params: null,
        body: amenity,
        executeImmediately: false
    });

    // Memoriza la función fetchDataAmenityFunction
    const memoizedfetchDataAmenity = useCallback(fetchDataAmenityFunction, [hotelId]);

    useEffect(() => {
        memoizedfetchDataAmenity();
    }, [hotelId, memoizedfetchDataAmenity]);

    useEffect(() => {
        if (fetchDataAmenity) {
            setAmenity(fetchDataAmenity);
        }
    }, [fetchDataAmenity]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let { name, value } = e.target;

        if (typeof value === "string") {
            value = value.trim();
        }

        setAmenity((prevAmenity) => ({
            ...prevAmenity,
            [name]: value,
        }));
    };

    const updateAmenity = () => {
        fetchUpdateHotelFunction();
    };

    useEffect(() => {
        if (fetchUpdateAmenity && !errorUpdate) {
            alert("Amenity updated successfully!");
            navigate(-1);
        }
    }, [fetchUpdateAmenity, errorUpdate]);

    return (
        <div className="container">
            <div className="searchForm">
                <h2>Update Amenity</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="formRow">
                    <div className="formGroup">
                                <label htmlFor="hotelName">Name:</label>
                                <input type="text" id="name" name="name" value={amenity.name} onChange={handleChange} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="hotelCountry">Country:</label>
                                <input type="text" id="country" name="country" value={amenity.description} onChange={handleChange} />
                            </div>

                            <div className="formGroup">
                                <label htmlFor="hotelState">State:</label>
                                <input type="text" id="state" name="state" value={amenity.url} onChange={handleChange} />
                            </div>
                    </div>
                    <div className="formRow">
                        <button type="submit" onClick={updateAmenity}>Update Amenity</button>
                    </div>
                </form>
                {loadingAmenity && <Loading />}
                {loadingUpdate && <Loading />}

                {errorAmenity && <div>Error loading hotel data: {errorAmenity}</div>}
            </div>
        </div>
    );
};*/
import { useState, useEffect, ChangeEvent, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAxiosFetch } from "../../../hooks/useAxiosFetch";
import { IHotelAmenity } from "../../../interfaces/IHotelAmenity";
import './HotelAmenities.css';

export const UpdateHotelAmenity = () => {
  const { hotelId, hotelAmenityId } = useParams<{ hotelId: string, hotelAmenityId: string }>();
  const navigate = useNavigate();
  
  const [amenity, setAmenity] = useState<IHotelAmenity>({
    hotelAmenityId: 0,
    name: "",
    description: "",
    url: ""
  });
  
  const [formValid, setFormValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const [fetchDataAmenity, errorAmenity, loadingAmenity, fetchDataAmenityFunction] = useAxiosFetch({
    method: "GET",
    url: `/hotels/${hotelId}/amenities/${hotelAmenityId}`,
    params: null,
    body: null,
    executeImmediately: false
  });
  
  const [fetchUpdateAmenity, errorUpdate, loadingUpdate, fetchUpdateAmenityFunction] = useAxiosFetch({
    method: "PUT",
    url: `/hotels/${hotelId}/amenities/${hotelAmenityId}`,
    params: null,
    body: amenity,
    executeImmediately: false
  });
  
  // Memorize the fetchDataAmenityFunction
  const memoizedFetchDataAmenity = useCallback(fetchDataAmenityFunction, [hotelId, hotelAmenityId]);
  
  useEffect(() => {
    memoizedFetchDataAmenity();
  }, [hotelId, hotelAmenityId, memoizedFetchDataAmenity]);
  
  useEffect(() => {
    if (fetchDataAmenity) {
      setAmenity(fetchDataAmenity);
    }
  }, [fetchDataAmenity]);
  
  // Validate form
  useEffect(() => {
    const isValid = 
      amenity.name.trim() !== "" && 
      amenity.description.trim() !== "" && 
      amenity.url.trim() !== "";
    
    setFormValid(isValid);
  }, [amenity]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;
    
    if (typeof value === "string") {
      value = value.trim();
    }
    
    setAmenity((prevAmenity) => ({
      ...prevAmenity,
      [name]: value,
    }));
  };
  
  const updateAmenity = () => {
    setSuccessMessage(null);
    fetchUpdateAmenityFunction();
  };
  
  useEffect(() => {
    if (fetchUpdateAmenity && !errorUpdate) {
      setSuccessMessage("Amenity updated successfully!");
      
      // Redirect after a short delay
      const timer = setTimeout(() => {
        navigate(-1);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [fetchUpdateAmenity, errorUpdate, navigate]);
  
  return (
    <div className="amenities-container">
      <div className="amenity-form-container">
        <div className="form-header">
          <h1 className="form-title">Update Amenity</h1>
          <button 
            className="back-button" 
            onClick={() => navigate(-1)}
          >
            ← Back to Amenities
          </button>
        </div>
        
        {successMessage && (
          <div className="success-message">✓ {successMessage}</div>
        )}
        
        {errorAmenity && (
          <div className="error-message">
            Error loading amenity data: {errorAmenity}
          </div>
        )}
        
        {errorUpdate && (
          <div className="error-message">
            Error updating amenity: {errorUpdate}
          </div>
        )}
        
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="required-field">Amenity Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className="form-control" 
                value={amenity.name} 
                onChange={handleChange}
                placeholder="Enter amenity name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description" className="required-field">Description</label>
              <input 
                type="text" 
                id="description" 
                name="description" 
                className="form-control" 
                value={amenity.description} 
                onChange={handleChange}
                placeholder="Enter amenity description"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="url" className="required-field">Image URL</label>
              <input 
                type="text" 
                id="url" 
                name="url" 
                className="form-control" 
                value={amenity.url} 
                onChange={handleChange}
                placeholder="Enter image URL"
              />
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
              onClick={updateAmenity}
              disabled={!formValid || loadingUpdate}
            >
              {loadingUpdate ? "Updating..." : "Update Amenity"}
            </button>
          </div>
        </form>
      </div>
      
      {loadingAmenity && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};
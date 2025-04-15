/*import { ChangeEvent, useEffect, useState } from "react";
import { useAxiosFetch } from "../../../hooks/useAxiosFetch";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../generics/Loading";
import { Error } from "../../generics/Error";
import { IHotelAmenity } from "../../../interfaces/IHotelAmenity";

export const AddHotelAmenity = () => {
    const { hotelId } = useParams<{ hotelId: string }>();
    const navigate = useNavigate();
    const [amenity, setAmenity] = useState<IHotelAmenity>({
        hotelAmenityId: 0,
        name: "",
        description: "",
        url: ""
    });

    const [data, error, loading, fetchData] = useAxiosFetch({
        method: "POST",
        url: `/hotels/${hotelId}/amenities`,
        params: null,
        body: [amenity],
        executeImmediately: false
    });


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let { name, value } = e.target;

        if (typeof value === "string") {
            value = value.trim();
        }

        setAmenity((prevAmenity) => ({
            ...prevAmenity,
            [name]: value,
        }));
    }

    const resetFilters = () => {
        setAmenity({
            hotelAmenityId: 0,
            name: "",
            description: "",
            url: ""
        });

        for (const input of document.querySelectorAll("input")) {
            (input as HTMLInputElement).value = "";
        }
    }


    const addNewAmenity = async () => {

        // check if all fields are filled
        if (Object.values(amenity).some(value => value === "")) {
            alert("Please fill all fields");
            return;
        }


        fetchData();

    };


    useEffect(() => {
        if (data && !error) {
            alert("Amenity added successfully!");
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
                                <input type="text" id="name" name="name" value={amenity.name} onChange={handleChange} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="description">Description:</label>
                                <input type="text" id="description" name="description" value={amenity.description} onChange={handleChange} />
                            </div>

                            <div className="formGroup">
                                <label htmlFor="url">Url:</label>
                                <input type="text" id="url" name="url" value={amenity.url} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="formRow">
                            <button type="submit" onClick={addNewAmenity}>Save</button>
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
import { IHotelAmenity } from "../../../interfaces/IHotelAmenity";
import './HotelAmenities.css';

export const AddHotelAmenity = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();
  
  const [amenity, setAmenity] = useState<IHotelAmenity>({
    hotelAmenityId: 0,
    name: "",
    description: "",
    url: ""
  });
  
  const [formValid, setFormValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [data, error, loading, fetchData] = useAxiosFetch({
    method: "POST",
    url: `/hotels/${hotelId}/amenities`,
    params: null,
    body: [amenity],
    executeImmediately: false
  });
  
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
  }
  
  const resetForm = () => {
    setAmenity({
      hotelAmenityId: 0,
      name: "",
      description: "",
      url: ""
    });
    setSuccessMessage(null);
    setErrorMessage(null);
  }
  
  const addNewAmenity = async () => {
    // Clear previous messages
    setSuccessMessage(null);
    setErrorMessage(null);
    
    // Check required fields
    if (!formValid) {
      setErrorMessage("Please fill all fields");
      return;
    }
    
    fetchData();
  };
  
  useEffect(() => {
    if (data && !error) {
      setSuccessMessage("Amenity added successfully!");
      
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
    <div className="amenities-container">
      <div className="amenity-form-container">
        <div className="form-header">
          <h1 className="form-title">Add New Amenity</h1>
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
        
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}
        
        {error && <Error error={error} />}
        
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
              onClick={resetForm}
            >
              Clear Form
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              onClick={addNewAmenity}
              disabled={!formValid || loading}
            >
              {loading ? "Adding..." : "Save Amenity"}
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

/*import { useState, useEffect, ChangeEvent, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IHotel } from "../../interfaces/IHotel";
import { useAxiosFetch } from "../../hooks/useAxiosFetch";
import "./hotels.css"; // Importa el CSS
import { Loading } from "../generics/Loading";

export const UpdateHotel = () => {
    const { hotelId } = useParams<{ hotelId: string }>();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState<IHotel>({
        hotelId: 0,
        name: "",
        country: "",
        state: "",
        city: "",
        street: "",
        houseNumber: "",
        postalCode: ""
    });

    const [fetchDataHotel, errorHotel, loadingHotel, fetchDataHotelFunction] = useAxiosFetch({
        method: "GET",
        url: `/hotels/${hotelId}`,
        params: null,
        body: null,
        executeImmediately: false
    });

    const [fetchUpdateHotel, errorUpdate, loadingUpdate, fetchUpdateHotelFunction] = useAxiosFetch({
        method: "PUT",
        url: `/hotels/${hotelId}`,
        params: null,
        body: hotel,
        executeImmediately: false
    });

    // Memoriza la función fetchDataHotelFunction
    const memoizedFetchDataHotel = useCallback(fetchDataHotelFunction, [hotelId]);

    useEffect(() => {
        memoizedFetchDataHotel();
    }, [hotelId, memoizedFetchDataHotel]);

    useEffect(() => {
        if (fetchDataHotel) {
            setHotel(fetchDataHotel);
        }
    }, [fetchDataHotel]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let { name, value } = e.target;

        if (typeof value === "string") {
            value = value.trim();
        }

        setHotel((prevHotel) => ({
            ...prevHotel,
            [name]: value,
        }));
    };

    const updateHotel = () => {
        fetchUpdateHotelFunction();
    };

    useEffect(() => {
        if (fetchUpdateHotel && !errorUpdate) {
            alert("Hotel updated successfully!");
            navigate(-1);
        }
    }, [fetchUpdateHotel, errorUpdate]);

    return (
        <div className="container">
            <div className="searchForm">
                <h2>Update Hotel</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="formRow">
                    <div className="formGroup">
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" name="name" value={hotel.name} onChange={handleChange} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="country">Country:</label>
                                <input type="text" id="country" name="country" value={hotel.country} onChange={handleChange} />
                            </div>

                            <div className="formGroup">
                                <label htmlFor="state">State:</label>
                                <input type="text" id="state" name="state" value={hotel.state} onChange={handleChange} />
                            </div>

                            <div className="formGroup">
                                <label htmlFor="city">City:</label>
                                <input type="text" id="city" name="city" value={hotel.city} onChange={handleChange} />
                            </div>

                            
                            <div className="formGroup">
                                <label htmlFor="hotelCity">Street:</label>
                                <input type="text" id="street" name="street" value={hotel.street} onChange={handleChange} />
                            </div>

                            
                            <div className="formGroup">
                                <label htmlFor="houseNumber">House number:</label>
                                <input type="text" id="houseNumber" name="houseNumber" value={hotel.houseNumber} onChange={handleChange} />
                            </div>

                            
                            <div className="formGroup">
                                <label htmlFor="postalCode">Postal code:</label>
                                <input type="text" id="postalCode" name="postalCode" value={hotel.postalCode} onChange={handleChange} />
                            </div>
                    </div>
                    <div className="formRow">
                        <button type="submit" onClick={updateHotel}>Update Hotel</button>
                    </div>
                </form>
                {loadingHotel && <Loading />}
                {loadingUpdate && <Loading />}

                {errorHotel && <div>Error loading hotel data: {errorHotel}</div>}
            </div>
        </div>
    );
};*/
import { useState, useEffect, ChangeEvent, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IHotel } from "../../interfaces/IHotel";
import { useAxiosFetch } from "../../hooks/useAxiosFetch";
import "./UpdateHotel.css";

export const UpdateHotel = () => {
    const { hotelId } = useParams<{ hotelId: string }>();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState<IHotel>({
        hotelId: 0,
        name: "",
        country: "",
        state: "",
        city: "",
        street: "",
        houseNumber: "",
        postalCode: ""
    });
    const [formValid, setFormValid] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [fetchDataHotel, errorHotel, loadingHotel, fetchDataHotelFunction] = useAxiosFetch({
        method: "GET",
        url: `/hotels/${hotelId}`,
        params: null,
        body: null,
        executeImmediately: false
    });

    const [fetchUpdateHotel, errorUpdate, loadingUpdate, fetchUpdateHotelFunction] = useAxiosFetch({
        method: "PUT",
        url: `/hotels/${hotelId}`,
        params: null,
        body: hotel,
        executeImmediately: false
    });

    // Memorize the fetchDataHotelFunction
    const memoizedFetchDataHotel = useCallback(fetchDataHotelFunction, [hotelId]);

    useEffect(() => {
        memoizedFetchDataHotel();
    }, [hotelId, memoizedFetchDataHotel]);

    useEffect(() => {
        if (fetchDataHotel) {
            setHotel(fetchDataHotel);
        }
    }, [fetchDataHotel]);

    // Validate form
    useEffect(() => {
        const isValid = 
            hotel.name.trim() !== "" && 
            hotel.country.trim() !== "" && 
            hotel.city.trim() !== "";
        
        setFormValid(isValid);
    }, [hotel]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let { name, value } = e.target;

        if (typeof value === "string") {
            value = value.trim();
        }

        setHotel((prevHotel) => ({
            ...prevHotel,
            [name]: value,
        }));
    };

    const updateHotel = () => {
        setSuccessMessage(null);
        fetchUpdateHotelFunction();
    };

    useEffect(() => {
        if (fetchUpdateHotel && !errorUpdate) {
            setSuccessMessage("Hotel updated successfully!");
            
            // Redirect after a short delay
            const timer = setTimeout(() => {
                navigate(-1);
            }, 2000);
            
            return () => clearTimeout(timer);
        }
    }, [fetchUpdateHotel, errorUpdate, navigate]);

    return (
        <div className="update-hotel-container">
            <div className="hotel-form-container">
                <div className="form-header">
                    <h1 className="form-title">Update Hotel</h1>
                    <button 
                        className="back-button" 
                        onClick={() => navigate(-1)}
                    >
                        ← Back to Hotels
                    </button>
                </div>
                
                {successMessage && (
                    <div className="success-message">✓ {successMessage}</div>
                )}
                
                {errorHotel && (
                    <div className="error-message">
                        Error loading hotel data: {errorHotel}
                    </div>
                )}
                
                {errorUpdate && (
                    <div className="error-message">
                        Error updating hotel: {errorUpdate}
                    </div>
                )}
                
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Hotel Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                className="form-control" 
                                value={hotel.name} 
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
                                value={hotel.country} 
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
                                value={hotel.state} 
                                onChange={handleChange}
                                placeholder="Enter state or province"
                            />
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input 
                                type="text" 
                                id="city" 
                                name="city" 
                                className="form-control" 
                                value={hotel.city} 
                                onChange={handleChange}
                                placeholder="Enter city"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="street">Street</label>
                            <input 
                                type="text" 
                                id="street" 
                                name="street" 
                                className="form-control" 
                                value={hotel.street} 
                                onChange={handleChange}
                                placeholder="Enter street name"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="houseNumber">House Number</label>
                            <input 
                                type="text" 
                                id="houseNumber" 
                                name="houseNumber" 
                                className="form-control" 
                                value={hotel.houseNumber} 
                                onChange={handleChange}
                                placeholder="Enter house number"
                            />
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="postalCode">Postal Code</label>
                            <input 
                                type="text" 
                                id="postalCode" 
                                name="postalCode" 
                                className="form-control" 
                                value={hotel.postalCode} 
                                onChange={handleChange}
                                placeholder="Enter postal code"
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
                            onClick={updateHotel}
                            disabled={!formValid || loadingUpdate}
                        >
                            {loadingUpdate ? "Updating..." : "Update Hotel"}
                        </button>
                    </div>
                </form>
            </div>
            
            {loadingHotel && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            )}
        </div>
    );
};
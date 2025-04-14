/*import { ChangeEvent, useEffect, useState } from "react";
import { IHotel } from "../../interfaces/IHotel";
import { useAxiosFetch } from "../../hooks/useAxiosFetch";
import { useNavigate } from "react-router-dom";
import { Loading } from "../generics/Loading";
import { Error } from "../generics/Error";

export const AddHotel = () => {

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


    const [data, error, loading, fetchData] = useAxiosFetch({
        method: "POST",
        url: "/hotels",
        params: null,
        body: hotel,
        executeImmediately: false
    });


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let { name, value } = e.target;

        if (typeof value === "string") {
            value = value.trim();
        }

        setHotel((pervHotel) => ({
            ...pervHotel,
            [name]: value,
        }));
    }

    const resetFilters = () => {
        setHotel({
            hotelId: 0,
            name: "",
            country: "",
            state: "",
            city: "",
            street: "",
            houseNumber: "",
            postalCode: ""
        });

        for (const input of document.querySelectorAll("input")) {
            (input as HTMLInputElement).value = "";
        }
    }


    const addNewHotel = async () => {

        // check if all fields are filled
        if (Object.values(hotel).some(value => value === "")) {
            alert("Please fill all fields");
            return;
        }


        fetchData();

    };


    useEffect(() => {
        if (data && !error) {
            alert("Hotel added successfully!");
            resetFilters(); // Limpiar el formulario
            navigate(-1); // Redirigir a la lista de hoteles
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
                            <button type="submit" onClick={addNewHotel}>Save</button>
                            <button type="button" onClick={resetFilters}>Clean</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}*/

import { ChangeEvent, useEffect, useState } from "react";
import { IHotel } from "../../interfaces/IHotel";
import { useAxiosFetch } from "../../hooks/useAxiosFetch";
import { useNavigate } from "react-router-dom";
import { Error } from "../generics/Error";
import "./AddHotel.css";

export const AddHotel = () => {
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
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [data, error, loading, fetchData] = useAxiosFetch({
        method: "POST",
        url: "/hotels",
        params: null,
        body: hotel,
        executeImmediately: false
    });

    // Validate form
    useEffect(() => {
        const requiredFields = ['name', 'country', 'city'];
        const missingRequiredFields = requiredFields.some(field => !hotel[field as keyof IHotel]);
        setFormValid(!missingRequiredFields);
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

    const resetForm = () => {
        setHotel({
            hotelId: 0,
            name: "",
            country: "",
            state: "",
            city: "",
            street: "",
            houseNumber: "",
            postalCode: ""
        });
        setSuccessMessage(null);
        setErrorMessage(null);
    };

    const addNewHotel = async () => {
        // Clear previous messages
        setSuccessMessage(null);
        setErrorMessage(null);

        // Check required fields
        if (!formValid) {
            setErrorMessage("Please fill all required fields");
            return;
        }

        fetchData();
    };

    useEffect(() => {
        if (data && !error) {
            setSuccessMessage("Hotel added successfully!");
            
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
        <div className="add-hotel-container">
            <div className="hotel-form-container">
                <div className="form-header">
                    <h1 className="form-title">Add New Hotel</h1>
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
                
                {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                )}
                
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-section">
                        <h2 className="form-section-title">Hotel Information</h2>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name" className="required-field">Hotel Name</label>
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
                                <label htmlFor="country" className="required-field">Country</label>
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
                    </div>
                    
                    <div className="form-section">
                        <h2 className="form-section-title">Address Details</h2>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="city" className="required-field">City</label>
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
                                <label htmlFor="houseNumber">Building/House Number</label>
                                <input 
                                    type="text" 
                                    id="houseNumber" 
                                    name="houseNumber" 
                                    className="form-control" 
                                    value={hotel.houseNumber} 
                                    onChange={handleChange}
                                    placeholder="Enter building or house number"
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
                            onClick={addNewHotel}
                            disabled={!formValid || loading}
                        >
                            {loading ? "Adding Hotel..." : "Save Hotel"}
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
};

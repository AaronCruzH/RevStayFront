import { useState, useEffect, ChangeEvent, useCallback } from "react";
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
        if (fetchUpdateHotel) {
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
                            <label htmlFor="hotelName">Name:</label>
                            <input type="text" id="name" name="name" value={hotel.name} onChange={handleChange} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="hotelCountry">Country:</label>
                            <input type="text" id="country" name="country" value={hotel.country} onChange={handleChange} />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="hotelState">State:</label>
                            <input type="text" id="state" name="state" value={hotel.state} onChange={handleChange} />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="hotelCity">City:</label>
                            <input type="text" id="city" name="city" value={hotel.city} onChange={handleChange} />
                        </div>


                        <div className="formGroup">
                            <label htmlFor="hotelCity">Street:</label>
                            <input type="text" id="street" name="street" value={hotel.street} onChange={handleChange} />
                        </div>


                        <div className="formGroup">
                            <label htmlFor="hotelCity">House number:</label>
                            <input type="text" id="houseNumber" name="houseNumber" value={hotel.houseNumber} onChange={handleChange} />
                        </div>


                        <div className="formGroup">
                            <label htmlFor="hotelCity">Postal code:</label>
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
};
import { ChangeEvent, useEffect, useState } from "react";
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
}

import { ChangeEvent, useEffect, useState } from "react";
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
}

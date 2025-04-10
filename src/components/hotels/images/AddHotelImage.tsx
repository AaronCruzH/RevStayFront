import { ChangeEvent, useEffect, useState } from "react";
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
}

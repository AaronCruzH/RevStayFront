import { useState, useEffect, ChangeEvent, useCallback } from "react";
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
};
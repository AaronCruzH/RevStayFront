import { useContext, useEffect, useState } from "react";
import { IReservation } from "../../interfaces/IReservation";
import { authContext } from "../../App";
import axios from "axios";

export const ReservationsAdmin = () => {
    const [reservations, setReservations] = useState<IReservation[]>([]);
    const sessionToken = useContext(authContext)?.token;

    useEffect(() => {
        if (!sessionToken) return;

        axios.get<IReservation[]>("http://localhost:8080/reservations", {
            headers: { Authorization: `Bearer ${sessionToken}` }
        })
        .then(res => {
            setReservations(res.data);
            console.log(res.data); // mostramos los datos correctamente
        })
        .catch(err => console.error("Error fetching reservations:", err));
    }, [sessionToken]); // agregamos sessionToken a dependencias

    return (
        <>    
            <div className="searchResults">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>User Id</th>
                            <th>Room Id</th>
                            <th>Total Guests</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Created At</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation) => (
                            <tr key={reservation.reservationId}>
                                <td>{reservation.reservationId}</td>
                                <td>{reservation.user?.userID}</td>
                                <td>{reservation.room?.roomID}</td>
                                <td>{reservation.totalGuests}</td>
                                <td>{new Date(reservation.checkIn).toLocaleDateString()}</td>
                                <td>{new Date(reservation.checkOut).toLocaleDateString()}</td>
                                <td>{new Date(reservation.createdAt).toLocaleDateString()}</td>
                                <td>{reservation.total}</td>
                                <td>{reservation.reservationStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>    
        </>
    );
};

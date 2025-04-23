/*import { useContext, useEffect, useState } from "react";
import { IReservation } from "../../interfaces/IReservation";
import { authContext } from "../../App";
import axios from "axios";

export const ReservationsAdmin = () => {
    const [reservations, setReservations] = useState<IReservation[]>([]);
    const sessionToken = useContext(authContext)?.token;
    const role = useContext(authContext)?.role;

    useEffect(() => {
        if (!sessionToken) return;

        axios.get<IReservation[]>("http://3.85.92.181:8080/reservations", {
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation) => (
                            <tr key={reservation.reservationId}>
                                <td>{reservation.reservationId}</td>
                                <td>{reservation.user?.id}</td>
                                <td>{reservation.room?.roomID}</td>
                                <td>{reservation.totalGuests}</td>
                                <td>{new Date(reservation.checkIn).toLocaleDateString()}</td>
                                <td>{new Date(reservation.checkOut).toLocaleDateString()}</td>
                                <td>{new Date(reservation.createdAt).toLocaleDateString()}</td>
                                <td>{reservation.total}</td>
                                <td>{reservation.reservationStatus}</td>
                                <td>
                                    {role === "OWNER" || role === "ADMIN" ? (
                                        <>
                                            <button>Accept</button>
                                            <button>Reject</button>
                                        </>
                                    ) : (
                                        <button>Cancel</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>    
        </>
    );
};*/
import { useContext, useEffect, useState } from "react";
import { IReservation } from "../../interfaces/IReservation";
import { authContext } from "../../App";
import axios from "axios";
import "./reservations.css";

export const ReservationsAdmin = () => {
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  
  const sessionToken = useContext(authContext)?.token;
  const role = useContext(authContext)?.role;
  
  useEffect(() => {
    if (!sessionToken) return;
    
    setLoading(true);
    axios.get<IReservation[]>("http://3.85.92.181:8080/reservations", {
      headers: { Authorization: `Bearer ${sessionToken}` }
    })
    .then(res => {
      setReservations(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching reservations:", err);
      setError("Failed to load reservations. Please try again.");
      setLoading(false);
    });
  }, [sessionToken]); // Added sessionToken as dependency
  
  // Handler for accepting a reservation
  const handleAcceptReservation = async (reservationId: number) => {
    try {
      await axios.put(
        `http://3.85.92.181:8080/reservations/${reservationId}/confirm`,
        {},
        { headers: { Authorization: `Bearer ${sessionToken}` } }
      );
      
      // Update the reservation status in our local state
      setReservations(prevReservations => 
        prevReservations.map(reservation => 
          reservation.reservationId === reservationId 
            ? { ...reservation, reservationStatus: "CONFIRMED" } 
            : reservation
        )
      );
    } catch (err) {
      console.error("Error accepting reservation:", err);
      alert("Failed to accept reservation. Please try again.");
    }
  };
  
  // Handler for rejecting a reservation
  const handleRejectReservation = async (reservationId: number) => {
    if (!window.confirm("Are you sure you want to reject this reservation?")) return;
    
    try {
      await axios.put(
        `http://3.85.92.181:8080/reservations/${reservationId}/reject`,
        {},
        { headers: { Authorization: `Bearer ${sessionToken}` } }
      );
      
      // Update the reservation status in our local state
      setReservations(prevReservations => 
        prevReservations.map(reservation => 
          reservation.reservationId === reservationId 
            ? { ...reservation, reservationStatus: "CANCELED" } 
            : reservation
        )
      );
    } catch (err) {
      console.error("Error rejecting reservation:", err);
      alert("Failed to reject reservation. Please try again.");
    }
  };
  
  // Handler for cancelling a reservation (for regular users)
  const handleCancelReservation = async (reservationId: number) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) return;
    
    try {
      await axios.put(
        `http://3.85.92.181:8080/reservations/${reservationId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${sessionToken}` } }
      );
      
      // Update the reservation status in our local state
      setReservations(prevReservations => 
        prevReservations.map(reservation => 
          reservation.reservationId === reservationId 
            ? { ...reservation, reservationStatus: "CANCELED" } 
            : reservation
        )
      );
    } catch (err) {
      console.error("Error cancelling reservation:", err);
      alert("Failed to cancel reservation. Please try again.");
    }
  };
  
  // Get the appropriate status class for styling
  const getStatusClass = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('pending')) return 'status-pending';
    if (statusLower.includes('confirmed')) return 'status-confirmed';
    if (statusLower.includes('cancelled')) return 'status-cancelled';
    if (statusLower.includes('completed')) return 'status-completed';
    return '';
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  // Filter reservations based on selected status
  const filteredReservations = reservations.filter(reservation => 
    statusFilter === "ALL" || reservation.reservationStatus === statusFilter
  );

  return (
    <div className="reservations-admin-container">
      <div className="reservations-header">
        <h1 className="reservations-title">Reservations Management</h1>
        
        <div className="reservations-actions">
          <label htmlFor="status-filter">Filter by status:</label>
          <select
            id="status-filter"
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Reservations</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading reservations...</p>
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : filteredReservations.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <h2>No reservations found</h2>
          <p>
            {statusFilter !== "ALL" 
              ? `There are no ${statusFilter.toLowerCase()} reservations` 
              : "There are no reservations in the system yet"}
          </p>
        </div>
      ) : (
        <div className="reservations-table-container">
          <table className="reservations-table">
            <thead>
              <tr>
                <th className="col-id">ID</th>
                <th>User</th>
                <th>Room</th>
                <th>Guests</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Created</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((reservation) => (
                <tr key={reservation.reservationId}>
                  <td className="col-id">{reservation.reservationId}</td>
                  <td>{reservation.user?.userID}</td>
                  <td>{reservation.room?.roomID}</td>
                  <td>{reservation.totalGuests}</td>
                  <td>{new Date(reservation.checkIn).toLocaleDateString()}</td>
                  <td>{new Date(reservation.checkOut).toLocaleDateString()}</td>
                  <td>{new Date(reservation.createdAt).toLocaleDateString()}</td>
                  <td className="col-total">{formatCurrency(reservation.total)}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(reservation.reservationStatus)}`}>
                      {reservation.reservationStatus}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {(role === "OWNER" || role === "ADMIN") && 
                        reservation.reservationStatus === "PENDING" && (
                        <>
                          <button 
                            className="btn btn-accept"
                            onClick={() => handleAcceptReservation(reservation.reservationId)}
                          >
                            Accept
                          </button>
                          <button 
                            className="btn btn-reject"
                            onClick={() => handleRejectReservation(reservation.reservationId)}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      
                      {role === "USER" && 
                        (reservation.reservationStatus === "PENDING" || 
                         reservation.reservationStatus === "CONFIRMED") && (
                        <button 
                          className="btn btn-cancel"
                          onClick={() => handleCancelReservation(reservation.reservationId)}
                        >
                          Cancel
                        </button>
                      )}
                      
                      {(reservation.reservationStatus === "CANCELED" || 
                        reservation.reservationStatus === "COMPLETED") && (
                        <span>No actions available</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReservationsAdmin;

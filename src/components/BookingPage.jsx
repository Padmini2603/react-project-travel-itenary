import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function BookingPage({ onAddBooking }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const place = searchParams.get("place") || "Unknown Place";

  const [userName, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const booking = { place, userName, date, people };
    onAddBooking(booking);
    navigate("/bookings");
  };

  return (
    <div className="booking-form">
      <h2>Book Place: {place}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Number of People:</label>
          <input
            type="number"
            min="1"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="book-btn">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default BookingPage;

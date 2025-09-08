import { useEffect, useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BookingPage from "./components/BookingPage";
import ItineraryForm from "./components/ItineraryForm";
import ItineraryList from "./components/ItineraryList";

function App() {
  const [itinerary, setItinerary] = useState([]);
  const [savedPlans, setSavedPlans] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Load saved data from localStorage on app start
  useEffect(() => {
    const saved = localStorage.getItem("savedPlans");
    const savedBookings = localStorage.getItem("bookings");
    if (saved) setSavedPlans(JSON.parse(saved));
    if (savedBookings) setBookings(JSON.parse(savedBookings));
  }, []);

  useEffect(() => {
    localStorage.setItem("savedPlans", JSON.stringify(savedPlans));
  }, [savedPlans]);

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const handleGenerate = (plan) => setItinerary(plan);

  const handleSavePlan = () => {
    setSavedPlans((prev) => [...prev, itinerary]);
    setItinerary([]);
  };

  const handleDeletePlan = (index) => {
    const updated = [...savedPlans];
    updated.splice(index, 1);
    setSavedPlans(updated);
  };

  const handleAddBooking = (booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  return (
    <Router>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/bookings">My Bookings</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div className="home-page">
              <h1>✈️ Travel Itinerary Planner</h1>
              <ItineraryForm onGenerate={handleGenerate} />

              {itinerary.length > 0 && (
                <button onClick={handleSavePlan} className="save-btn">
                  Save Current Plan
                </button>
              )}

              <ItineraryList
                itinerary={itinerary}
                savedPlans={savedPlans}
                onDelete={handleDeletePlan}
              />
            </div>
          }
        />

        <Route
          path="/book"
          element={<BookingPage onAddBooking={handleAddBooking} />}
        />

        <Route
          path="/bookings"
          element={
            <div className="my-bookings">
              <h1>My Bookings</h1>
              {bookings.length === 0 ? (
                <p>No bookings yet.</p>
              ) : (
                bookings.map((b, idx) => (
                  <div key={idx} className="booking-card">
                    <p><strong>Place:</strong> {b.place}</p>
                    <p><strong>Name:</strong> {b.userName}</p>
                    <p><strong>Date:</strong> {b.date}</p>
                    <p><strong>People:</strong> {b.people}</p>
                  </div>
                ))
              )}
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

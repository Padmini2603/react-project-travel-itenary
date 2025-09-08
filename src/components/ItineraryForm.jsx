import { useState } from "react";

function ItineraryForm({ onGenerate }) {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [error, setError] = useState("");

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setPreferences((prev) =>
      checked ? [...prev, value] : prev.filter((p) => p !== value)
    );
  };

  const generateMockPlan = () => {
    if (!destination || !startDate || !endDate) {
      setError("Please fill in all fields before generating your plan.");
      return;
    }
    setError("");
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    if (days <= 0) {
      setError("End date must be after start date.");
      return;
    }

    const mockPlaces = [
      { name: "Central Park", description: "Relax in nature", type: "Nature" },
      { name: "City Museum", description: "Explore culture", type: "Culture" },
      { name: "Local Market", description: "Try amazing food", type: "Food" },
      { name: "Adventure Park", description: "Fun rides & thrills", type: "Adventure" },
      { name: "Beachside", description: "Enjoy sunset & sea breeze", type: "Nature" },
    ];

    const availablePlaces =
      preferences.length > 0
        ? mockPlaces.filter((p) => preferences.includes(p.type))
        : mockPlaces;

    if (availablePlaces.length === 0) {
      setError("No places match your selected preferences.");
      return;
    }

    const plan = Array.from({ length: days }, (_, i) => {
      const place = availablePlaces[i % availablePlaces.length];
      return {
        day: i + 1,
        date: new Date(start.getTime() + i * 86400000).toDateString(),
        ...place,
      };
    });

    onGenerate(plan);
  };

  return (
    <div className="form-box">
      <h2>✈️ Travel Itenary</h2>

      <div className="form-row">
        <div className="form-group">
          <label>Destination</label>
          <input
            type="text"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Preferences</label>
        <div className="preferences">
          <label>
            <input type="checkbox" value="Food" onChange={handleCheckbox} /> Food
          </label>
          <label>
            <input type="checkbox" value="Culture" onChange={handleCheckbox} /> Culture
          </label>
          <label>
            <input type="checkbox" value="Nature" onChange={handleCheckbox} /> Nature
          </label>
          <label>
            <input type="checkbox" value="Adventure" onChange={handleCheckbox} /> Adventure
          </label>
        </div>
      </div>

      {preferences.length > 0 && (
        <div className="selected-tags">
          {preferences.map((p, i) => (
            <span key={i} className="tag">{p}</span>
          ))}
        </div>
      )}

      {error && <p className="error">{error}</p>}

      <button
        onClick={generateMockPlan}
        disabled={!destination || !startDate || !endDate}
      >
        Generate Itinerary
      </button>
    </div>
  );
}

export default ItineraryForm;

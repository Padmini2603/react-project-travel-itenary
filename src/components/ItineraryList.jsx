import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ItineraryList({ itinerary, savedPlans, onDelete }) {
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="list-box">
      <h2>Current Itinerary</h2>
      {itinerary.length === 0 ? (
        <p>No itinerary generated yet.</p>
      ) : (
        <div>
          {itinerary.map((item) => (
            <div key={item.day} className="day-card">
              <h3>Day {item.day}: {item.name}</h3>
              <p>{item.description}</p>
              <button
                onClick={() =>
                  navigate(`/book?place=${encodeURIComponent(item.name)}`)
                }
                className="book-now-btn"
              >
                🏨 Book Now
              </button>
            </div>
          ))}
        </div>
      )}

      <h2>📚 Saved Plans</h2>
      {savedPlans.length === 0 ? (
        <p>No saved plans yet.</p>
      ) : (
        savedPlans.map((plan, idx) => (
          <div key={idx} className="saved-plan">
            <div
              className="saved-plan-header"
              onClick={() => setExpanded(expanded === idx ? null : idx)}
            >
              <span>Plan {idx + 1} – {plan.length} stops</span>
              <span>{expanded === idx ? "▲" : "▼"}</span>
            </div>

            {expanded === idx && (
              <div className="saved-details">
                <ul>
                  {plan.map((stop, i) => (
                    <li key={i}>
                      Day {stop.day}: {stop.name} – {stop.description}
                      <button
                        onClick={() =>
                          navigate(`/book?place=${encodeURIComponent(stop.name)}`)
                        }
                        className="book-now-btn"
                      >
                        Book Now
                      </button>
                    </li>
                  ))}
                </ul>

                <button onClick={() => onDelete(idx)} className="delete-btn">
                  Delete Plan
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ItineraryList;

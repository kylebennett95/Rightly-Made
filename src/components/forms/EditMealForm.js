import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditEventForm.css";

export const EditEventForm = () => {
  const [event, setEvent] = useState({
    attractionName: "",
    description: "",
    date: "",
    isSaved: false,
  });
  const { attractionsId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/recipes/${recipesId}`)
      .then((response) => response.json())
      .then((data) => {
        setEvent(data);
      });
  }, [attractionsId]);

  const handleSaveButtonClick = (e) => {
    e.preventDefault();

    return fetch(`http://localhost:8088/attractions/${event.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/StaffUpcomingEvents");
      });
  };

  return (
    <form className="eventForm">
      <h2 className="eventForm__title">Edit Event</h2>
      <div className="formContainer">
        <fieldset>
          <div className="form-group">
            <label htmlFor="attractionName">Name:</label>
            <input
              required
              autoFocus
              type="text"
              className="form-control"
              placeholder="Add event name"
              value={event.attractionName}
              onChange={(evt) => {
                const copy = { ...event };
                copy.attractionName = evt.target.value;
                setEvent(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              required
              autoFocus
              type="text"
              className="form-control"
              placeholder="Brief description of problem"
              value={event.description}
              onChange={(evt) => {
                const copy = { ...event };
                copy.description = evt.target.value;
                setEvent(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              required
              autoFocus
              type="date"
              className="form-control"
              value={event.date}
              onChange={(evt) => {
                const copy = { ...event };
                copy.date = evt.target.value;
                setEvent(copy);
              }}
            />
          </div>
        </fieldset>

        <button
          onClick={(clickEvent) => {
            handleSaveButtonClick(clickEvent);
          }}
          className="editEvent"
        >
          Edit Event
        </button>
      </div>
    </form>
  );
};
import React, { useState } from "react";

const BookingPage = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("");
  const [availableTimes] = useState(["13:00", "15:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!date || !time || !guests || !occasion) {
      alert("⚠️ Please fill out all fields before submitting your reservation.");
      return;
    }

    const formData = { date, time, guests, occasion };

    try {
      const response = await fetch("http://localhost:8000/api/tables/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // include token if auth is required
          // "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✅ Your restaurant booking has been confirmed!");
      } else {
        const errorData = await response.json();
        alert("❌ Booking failed: " + JSON.stringify(errorData));
      }
    } catch (error) {
      alert("❌ Error submitting form: " + error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "grid", maxWidth: "200px", gap: "20px" }}
    >
      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      >
        <option value="">Select a time</option>
        {availableTimes.map((availableTime, index) => (
          <option key={index} value={availableTime}>
            {availableTime}
          </option>
        ))}
      </select>

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        placeholder="1"
        min="1"
        max="50"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
      />

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
      >
        <option value="">Select an occasion</option>
        <option value="Casual">Casual</option>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>

      <input type="submit" value="Make Your Reservation" />
    </form>
  );
};

export default BookingPage;
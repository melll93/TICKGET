import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AddEventForm from "./AddEventForm";

function MyCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h2>My Calendar</h2>
      <Calendar value={selectedDate} onClickDay={handleDateClick} />
      <p>Selected date: {selectedDate.toLocaleDateString()}</p>
      <AddEventForm date={selectedDate} />
    </div>
  );
}

export default MyCalendar;
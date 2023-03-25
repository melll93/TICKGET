import React, { useState } from "react";
import Calendar from "react-calendar";
import "../../styles/Calendar.css"; // css import

const MainCalendar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar className="react_calendar" onChange={onChange} value={value} />
    </div>
  );
};

export default MainCalendar;

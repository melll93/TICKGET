import { addMonths, subMonths } from 'date-fns';
import React, { useState } from 'react'
import '../../styles/calendarcategory.css'; 
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import RenderHeader from '../../components/CalendarTab.jsx/RenderHeader';
import RenderDays from '../../components/CalendarTab.jsx/RenderDays';
import RenderCells from '../../components/CalendarTab.jsx/RenderCells';


const CalendarPage = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1))
    }

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1))
    }

    const onDateClick = (date) => {
        setSelectedDate(date);
        console.log("Clicked date:", date);
  };

  return (
    <>
          <Sidebar />
      <div className="center">
        <Header />


<section className="calendar_main_section">

        <div className='calendar'>
            <RenderHeader currentMonth={currentMonth} prevMonth ={prevMonth} nextMonth ={nextMonth} />
            <RenderDays/>
            <RenderCells currentMonth={currentMonth} selectedDate={selectedDate} onDateClick={onDateClick} />
        </div>
</section>

        </div>

    </>
    );
};
export default CalendarPage;
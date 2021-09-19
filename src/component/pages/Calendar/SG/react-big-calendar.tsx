import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import Calendar from "rc-year-calendar";
// import "rc-year-calendar/dist/rc-year-calendar.css";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "react-big-calendar/lib/sass/styles.scss";
import moment from "moment";

function CalendarPg() {
  const initEvents: any = [
    {
      id: 0,
      title: "All Day Event very long title",
      allDay: true,
      start: new Date(2015, 3, 0),
      end: new Date(2015, 3, 1),
    },
    {
      id: 1,
      title: "Long Event",
      start: new Date(2015, 3, 7),
      end: new Date(2015, 3, 10),
    },
  ];

  const [events, setEvents] = useState(initEvents) as any;
  const handleSelect = ({ start, end }: any) => {
    const title = window.prompt("New Event name");
    if (title)
      setEvents([
        ...events,
        {
          start,
          end,
          title,
        },
      ]);
  };

  const localizer = momentLocalizer(moment);

  return (
    <div>
      <Navbar />
      <h1>Calendar</h1>
      {/* <Calendar onChange={onChange} onClickDay={onClickDay} value={date} /> */}
      {/* {date.toString()} */}
      {/* <Calendar /> */}
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        defaultView={Views.MONTH}
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date(2015, 3, 12)}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </div>
  );
}

export default CalendarPg;

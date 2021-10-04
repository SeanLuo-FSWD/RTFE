import React, { useState, useEffect, useRef } from "react";
import MainCalendar from "../../MainCalendar/MainCalendar";
import Navbar from "../../Navbar/Navbar";
import { Helmet } from "react-helmet";
import "react-calendar/dist/Calendar.css";
import "./CalendarPg.scss";

function CalendarPg() {
  return (
    <div id="calendarPg">
      <Navbar />
      <Helmet>
        <title>Calendar Page</title>
      </Helmet>
      <h2>Calendar Page</h2>
      <MainCalendar />
    </div>
  );
}

export default CalendarPg;

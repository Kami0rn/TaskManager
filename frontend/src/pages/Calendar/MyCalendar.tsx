// // Calendar.tsx
// import React from 'react';
// import { Calendar } from 'antd';
// import moment, { Moment } from 'moment'; // Import Moment for date handling

// function MyCalendar() {
//   const handleDateSelect = (date: Moment) => {
//     console.log('Panel Select:', date.format('YYYY-MM-DD'));
//   };

//   return (
//     <div>
//       {/* Your component content here */}
//       <Calendar
//         onSelect={(date, { source }) => {
//           if (source === 'date') {
//             handleDateSelect(date as Moment);
//           }
//         }}
//       />
//     </div>
//   );
// }

import React, { useState } from "react";
import { Calendar } from "antd";
import dayjs, { Dayjs } from "dayjs";
import ProjectSidebar from '../Project/ProjectSidebar'

interface Booking {
  start: Dayjs;
  end: Dayjs;
  title: string;
}

function MyCalendar() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Add a booking for 20th December 2020
  const initialBooking: Booking = {
    start: dayjs("2024-01-20"),
    end: dayjs("2024-01-27").endOf("day"), // Adjust end time as needed
    title: "Initial Booking",
  };

  // Initialize state with the initial booking
  const [initialBookings] = useState<Booking[]>([initialBooking]);
  const [currentBookings, setCurrentBookings] =
    useState<Booking[]>(initialBookings);

  const handleDateSelect = (date: Dayjs) => {
    // Assuming you want to add a new booking for the selected date
    const newBooking: Booking = {
      
      start: date.clone(),
      end: date.clone().endOf("day"), // Adjust end time as needed
      title: "New Booking",
    };
    console.log(newBooking)

    setCurrentBookings([...currentBookings, newBooking]);
  };

  const dateCellRender = (value: Dayjs) => {
    
    const bookingsOnDate = currentBookings.filter(
      (booking) =>
        value.isSame(booking.start, "day") ||
        (value.isAfter(booking.start, "day") &&
          value.isBefore(booking.end, "day"))
    );

    return (
      <ul>
        {bookingsOnDate.map((booking, index) => (
          <li className="bg-cyan-400 rounded" key={index}>
            {booking.title}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex ">
      
      <ProjectSidebar  />
      
      <div className="flex h-full w-11/12 flex-col">
        {" "}
        <Calendar className=""
          onSelect={(date, { source }) => {
            if (source === "date") {
              handleDateSelect(date as Dayjs);
            }
          }}
          dateCellRender={dateCellRender}
        />
      </div>
    </div>
  );
}

export default MyCalendar;

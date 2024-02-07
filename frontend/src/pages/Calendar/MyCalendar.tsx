import React, { useState, useEffect } from "react";
import { Calendar } from "antd";
import dayjs, { Dayjs } from "dayjs";
import ProjectSidebar from "../Project/ProjectSidebar";
import { DeadlineInterface } from "../../interfaces/Ideadline";
import { GetCalendarByProjectId } from "../../services/http/deadline/deadline";

interface Booking {
  start: Dayjs;
  end: Dayjs;
  title: string;
}

function MyCalendar() {
  const [deadlines, setDeadlines] = useState<DeadlineInterface[]>([]);

  useEffect(() => {
    // Fetch calendar data from the API using the provided function
    const fetchCalendarData = async () => {
      try {
         // Replace with the actual calendar ID or get it dynamically
        const calendarId = Number(localStorage.getItem("projectId"));
        const result = await GetCalendarByProjectId(calendarId);

        console.log(result); // Log the entire result object

        if (result && result.deadlines) {
          setDeadlines(result.deadlines);
        } else {
          console.error("API returned unexpected data:", result);
        }
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      }
    };

    fetchCalendarData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const handleDateSelect = (date: Dayjs) => {
    // You can add logic here to handle date selection if needed
  };

  const dateCellRender = (date: Dayjs) => {
    const deadlinesOnDate = deadlines.filter(
      (deadline) =>
        date.isSame(dayjs(deadline.StartDate), "day") ||
        (date.isAfter(dayjs(deadline.StartDate), "day") &&
          date.isBefore(dayjs(deadline.EndDate), "day"))
    );

    return (
      <ul>
        {deadlinesOnDate.map((deadline) => (
          <li className="text-white bg-gradient-to-b from-amber-700 to-amber-500 rounded my-1 hover:from-amber-800 hover:to-amber-800" key={deadline.ID}>
            {String(deadline.DeadlineName)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex">
      <ProjectSidebar />
      <div className="flex h-full w-11/12 flex-col">
        <Calendar
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

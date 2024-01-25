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
        const calendarId = 1; // Replace with the actual calendar ID or get it dynamically
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
          <li className="bg-cyan-400 rounded my-1" key={deadline.ID}>
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

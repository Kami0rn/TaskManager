import React, { useState, useEffect } from "react";
import { Calendar } from "antd";
import dayjs, { Dayjs } from "dayjs";
import ProjectSidebar from "../Project/ProjectSidebar";
import { DeadlineInterface } from "../../interfaces/Ideadline";
import { GetCalendarByProjectId } from "../../services/http/deadline/deadline";
import CalendarMenu from "./CalendarMenu"; // Import your CalendarMenu component

interface MyCalendarProps {
  // Add any additional props if needed
}

function MyCalendar(props: MyCalendarProps) {
  const [deadlines, setDeadlines] = useState<DeadlineInterface[]>([]);
  const [selectedDeadlineID, setSelectedDeadlineID] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Fetch calendar data from the API using the provided function
    const fetchCalendarData = async () => {
      try {
        const calendarId = Number(localStorage.getItem("projectId"));
        const result = await GetCalendarByProjectId(calendarId);

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
  }, []);

  const handleDateSelect = (date: Dayjs) => {
    const deadlineOnSelectedDate = deadlines.find(
      (deadline) =>
        date.isSame(dayjs(deadline.StartDate), "day") ||
        (date.isAfter(dayjs(deadline.StartDate), "day") &&
          date.isBefore(dayjs(deadline.EndDate), "day"))
    );

    if (deadlineOnSelectedDate && deadlineOnSelectedDate.ID !== undefined) {
      setSelectedDeadlineID(deadlineOnSelectedDate.ID);
      setIsModalVisible(true);
    }
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
          <li
            className="text-white bg-gradient-to-b from-amber-700 to-amber-500 rounded my-1 hover:from-amber-800 hover:to-amber-800"
            key={deadline.ID}
          >
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
        {/* Render CalendarMenu modal */}
        {isModalVisible && (
          <CalendarMenu
            isVisible={isModalVisible}
            deadlineID={selectedDeadlineID}
            onClose={() => setIsModalVisible(false)}
          />
        )}
      </div>
    </div>
  );
}

export default MyCalendar;

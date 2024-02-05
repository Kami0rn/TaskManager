import React from 'react'
import { CarlendarInterface } from "../../../interfaces/Icalendar";
const apiUrl = "http://localhost:8081";

export async function GetCalendarByProjectId(calendarId: number) {
  const userToken = localStorage.getItem("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(
      `${apiUrl}/users/projectGetDeadlineFromID/${calendarId}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.deadlines) {
      return data;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    return false;
  }
}

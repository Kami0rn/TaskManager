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

// yourApiFunctions.js

export async function CreateDeadline(formData:any) {
  const userToken = localStorage.getItem('token');
   // Update with your API URL

  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };

  try {
    const response = await fetch(
      `${apiUrl}/users/createDeadlineFromCalendarID`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating deadline:', error);
    return false;
  }
}


export async function DeleteDeadlineByID(DeadlineId: Number | undefined) {
  const userToken = localStorage.getItem("token");
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(
    `${apiUrl}/users/deleteDeadlineFromID/${DeadlineId}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}


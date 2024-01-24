import React from 'react'
import { CarlendarInterface } from "../../../interfaces/Icalendar";
const apiUrl = "http://localhost:8080";

async function GetCalendarByProjectId(carlendarId: number) {
  const userToken = localStorage.getItem("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(
    `${apiUrl}/users/projectGetDeadlineFromID/${carlendarId}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((res) => {
      if (res.deadline) {
        return res;
      } else {
        return false;
      }
    });
  console.log(res);
  return res;
}
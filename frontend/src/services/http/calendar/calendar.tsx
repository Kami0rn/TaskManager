import React from "react";

const apiUrl = "http://localhost:8081";

async function GetCalendarByProjectId(projectId: number) {
  const userToken = localStorage.getItem("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(
    `${apiUrl}/users/projectGetCalendarFromID/${projectId}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((res) => {
      if (res.calendar) {
        return res;
      } else {
        return false;
      }
    });
  console.log(res);
  return res;
}

async function CreateCalendar(projectId: number) {
  const userToken = localStorage.getItem("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },

  };

  try {
    const response = await fetch(
      `${apiUrl}/users/projectCreateCarlendarFromProjectID/${projectId}`,
      requestOptions
    );

    if (response.ok) {
      // Check if the response is successful
      const data = await response.json();

      if (data.status === "ok") {
        return { status: "ok", message: data.message, card: data.card };
      } else {
        // If the response is successful but contains an error, handle it here
        const errorMessage = data.error || "Failed to create carlendar.";
        console.error("Error creating carlendar:", errorMessage);

        return { status: "error", message: errorMessage };
      }
    } else {
      // If the response is not successful, handle the error
      const errorMessage = (await response.text()) || "Failed to create carlendar.";
      console.error("Error creating carlendar:", errorMessage);

      return { status: "error", message: errorMessage };
    }
  } catch (error) {
    console.error("Error creating carlendar:", error);
    return { status: "error", message: "Failed to create carlendar." };
  }
}


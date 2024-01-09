import { TeamInterface } from "../../../interfaces/Iteam";


const apiUrl = "http://localhost:8084";

async function CreateTeam(data: TeamInterface) {
    const requestOptions = {
      method: "POST",
  
      headers: { "Content-Type": "application/json" },
  
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/teams`, requestOptions)
      .then((response) => response.json())
  
      .then((res) => {
        if (res.data) {
          return { status: true, message: res.data };
        } else {
          return { status: false, message: res.error };
        }
      });
  
    return res;
}

async function GetTeams() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/teams`, requestOptions)
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


async function UpdateTeam(data: TeamInterface) {
  const requestOptions = {
    method: "PATCH",

    headers: { "Content-Type": "application/json" },

    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/teams`, requestOptions)
    .then((response) => response.json())

    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

export {

    CreateTeam,
    UpdateTeam,
    GetTeams,

};
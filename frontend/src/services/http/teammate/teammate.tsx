import { TeammateInterface } from "../../../interfaces/Iteammate";


const apiUrl = "http://localhost:8084";

async function CreateLeader(data: TeammateInterface) {
  const requestOptions = {
    method: "POST",

    headers: { "Content-Type": "application/json" },

    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/leaders`, requestOptions)
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

async function CreateTeammate(data: TeammateInterface) {
    const requestOptions = {
      method: "POST",
  
      headers: { "Content-Type": "application/json" },
  
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/teammates`, requestOptions)
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

async function GetTeammates() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/teammates`, requestOptions)
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
  
  async function GetTeammateById(id: Number | undefined) {
    const requestOptions = {
      method: "GET"
    };
  
    let res = await fetch(`${apiUrl}/teammate/${id}`, requestOptions)
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

  async function GetUserFromTeamID(id: Number | undefined) {
    const requestOptions = {
      method: "GET"
    };
  
    let res = await fetch(`${apiUrl}/teammates/team/${id}`, requestOptions)
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

  async function GetTeammate() {
    const requestOptions = {
      method: "GET"
    };
  
    let res = await fetch(`${apiUrl}/teammate`, requestOptions)
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

  async function DeleteSelectedTeammate(id: number | undefined) {
    const requestOptions = {
      method: "DELETE",
    };

    let res = await fetch(`${apiUrl}/teammate/${id}`, requestOptions)
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
  CreateTeammate,
  GetTeammates,
  GetTeammateById, CreateLeader, GetUserFromTeamID, GetTeammate, DeleteSelectedTeammate
};
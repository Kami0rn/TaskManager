import { TeamInterface } from "../../../interfaces/Iteam";


const apiUrl = "http://localhost:8084";


async function GetTeamById(id: number) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const response = await fetch(`${apiUrl}/team/${id}`, requestOptions);
    const data = await response.json();
  
    if (response.ok) {
      return data.data as TeamInterface;
    } else {
      return null;
    }
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


export {
    GetTeamById,
    GetTeams

};
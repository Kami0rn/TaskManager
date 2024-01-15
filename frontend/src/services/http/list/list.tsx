import { UserInterface } from "../../../interfaces/Iuser";


const apiUrl = "http://localhost:8080";

//start
async function GetListByProjectId(projectId :number) {
  const userToken = localStorage.getItem('token');
  const requestOptions = {
    
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/users/projectGetListsFromID/${projectId}`, requestOptions)
  .then((response) => response.json())
  .then((res) => {
    if (res.lists) {
      return res;
    } else {
      return false;
    }
  });
console.log(res);
return res;
}



async function DeleteUserByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE"
  };

  let res = await fetch(`${apiUrl}/users/${id}`, requestOptions)
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


async function GetUserById(id: Number | undefined) {
  const requestOptions = {
    method: "GET"
  };

  let res = await fetch(`${apiUrl}/user/${id}`, requestOptions)
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


async function GetUserByHash(hashed_password: string | undefined) {
  const requestOptions = {
    method: "GET"
  };

  let res = await fetch(`${apiUrl}/user/hash/${hashed_password}`, requestOptions)
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

async function CreateUser(data: UserInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/register`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.status === "ok")  {
        return { status: "ok", message: res.message };
      } else {
        return { status: "error", message: res.message };
      }
    });

  return res;
}

async function UpdateUser(data: UserInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/users`, requestOptions)
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

    GetListByProjectId,
    CreateUser,
    DeleteUserByID,
    GetUserById,
    UpdateUser,
    GetUserByHash
  };




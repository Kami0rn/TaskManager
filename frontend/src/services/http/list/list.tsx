import { UserInterface } from "../../../interfaces/Iuser";
import {ListInterface} from "../../../interfaces/Ilist";


const apiUrl = "http://localhost:8081";

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

async function GetListById(listIDForMenu:number) {
  const userToken = localStorage.getItem('token');
  const requestOptions = {
    
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/users/getListsFromID/${listIDForMenu}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.list) {
        console.log(res);
        return res;
      } else {
        return false;
      }
  });
  return res;
}



async function DeleteListByID(ListId: Number | undefined) {
  const userToken = localStorage.getItem('token');
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/users/deleteListFromID/${ListId}`, requestOptions)
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
  const userToken = localStorage.getItem('token');
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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

async function UpdateList(data: ListInterface) {
  const userToken = localStorage.getItem('token');
  const requestOptions = {
    
    method: "PATCH", 
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${apiUrl}/users/updateList`, requestOptions);

    if (!response.ok) {
      // Handle HTTP error responses
      const errorMessage = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}. ${errorMessage}`);
    }

    // Check if response is not empty
    const responseBody = await response.text();
    if (!responseBody) {
      throw new Error("Empty response received from the server.");
    }

    const responseData = JSON.parse(responseBody);

    // Check if the server response contains an error property
    if (responseData.error) {
      return { status: false, message: responseData.error };
    }

    // Assuming successful response structure
    return { status: true, message: responseData.data };
  } catch (error) {
    console.error("Error updating list:", error);
    return { status: false, message: "An unexpected error occurred." };
  }
}








// async function UpdateUser(data: UserInterface) {
//   const requestOptions = {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   };

//   let res = await fetch(`${apiUrl}/users`, requestOptions)
//     .then((response) => response.json())
//     .then((res) => {
//       if (res.data) {
//         return { status: true, message: res.data };
//       } else {
//         return { status: false, message: res.error };
//       }
//     });

//   return res;
// }





export {

    GetListByProjectId,
    CreateUser,
    DeleteListByID,
    GetUserById,
    // UpdateUser,
    GetUserByHash,
    UpdateList,
    GetListById
  };





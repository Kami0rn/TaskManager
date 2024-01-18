import { WorkspaceInterface } from "../../../interfaces/Iworkspace";
import {WorkspaceStatusInterface} from "../../../interfaces/Iworkspacestatus"
const apiUrl = "http://localhost:8084";




async function ListWorkspaces(options: { statusID: number }) {
  try {
    const response = await fetch(`${apiUrl}/workspaces`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      const workspaces = data.data;

      // ดึง WorkspaceStatus สำหรับทุก workspace
      const workspacesWithStatus = await Promise.all(
        workspaces.map(async (workspace: WorkspaceInterface) => {
          const status = await GetWorkspaceStatusById(workspace.WorkspaceStatusID || 0);
          return { ...workspace, WorkspaceStatus: status };
        })
      );

      // กรอง workspaces โดยให้แสดงเฉพาะที่มี statusID ตรงกับที่ระบุ
      const filteredWorkspaces = workspacesWithStatus.filter(workspace => workspace.WorkspaceStatus?.ID === options.statusID);

      return filteredWorkspaces;
    } else {
      console.error("Failed to fetch workspace data");
      return [];
    }
  } catch (error) {
    console.error("Error while fetching data:", error);
    throw error;
  }
}


async function GetWorkspaceById(id: number) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(`${apiUrl}/workspace/${id}`, requestOptions);
  const data = await response.json();

  if (response.ok) {
    return data.data as WorkspaceInterface;
  } else {
    return null;
  }
}




async function CreateWorkspace(data: WorkspaceInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/workspaces`, requestOptions)
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

async function GetWorkspaceStatusById(id: number) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(`${apiUrl}/workspace_statuses/${id}`, requestOptions);
  const data = await response.json();

  if (response.ok) {
    return data.data as WorkspaceStatusInterface;
  } else {
    return null;
  }
}


async function UpdateWorkspace(data: WorkspaceInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/workspaces/${data.ID}`, requestOptions)
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

async function DeleteWorkspaceByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE"
  };

  let res = await fetch(`${apiUrl}/workspaces/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.message) {
        return res.message;
      } else {
        return false;
      }
    });

  return res;
}



async function ListWorkspaceByTeamID(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/getWorkspaceTeamID/${id}`, requestOptions)
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
  CreateWorkspace,
  GetWorkspaceById,
  ListWorkspaces,
  UpdateWorkspace,
  GetWorkspaceStatusById,
  DeleteWorkspaceByID,
  ListWorkspaceByTeamID
};



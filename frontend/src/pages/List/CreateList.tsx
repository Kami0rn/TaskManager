import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateList() {
  const navigate = useNavigate();
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");

  const handleCreateList = async () => {
    try {



      const projectId = localStorage.getItem("projectId");
      const token = localStorage.getItem("token");
      console.log("projectId:", projectId);

      if (!projectId) {
        console.error("projectId not found in localStorage");
        return;
      }

      if (!token) {
        navigate("/login");
        return;
      }

      console.log("Data to be sent:", {
        projectId,
        listName,
        listDescription,
      });

      const response = await fetch(
        `http://localhost:8080/users/createList/${projectId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listName,
            listDescription,
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json().catch(() => ({}));
        throw new Error(
          `HTTP error! Status: ${response.status}, Error: ${JSON.stringify(
            errorResponse
          )}`
        );
      }

      const responseData = await response.json();
      console.log("List created successfully:", responseData);
      // Add any additional logic, such as closing the form or updating state
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  return (
    <div>
      <h2 className="text-cyan-500">Create List</h2>
      <form>
        <label>
          List Name:
          <input
            className="my-2 bg-slate-200"
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
        </label>
        <br />
        <label>
          List Description:
          <textarea
            className="my-2 bg-slate-200"
            value={listDescription}
            onChange={(e) => setListDescription(e.target.value)}
          />
        </label>
        <br />
        <button
          type="button"
          className="my-4 w-40 rounded-md bg-slate-400"
          onClick={handleCreateList}
        >
          Create List
        </button>
      </form>
    </div>
  );
}

export default CreateList;

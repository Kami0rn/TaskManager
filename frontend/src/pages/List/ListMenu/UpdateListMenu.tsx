import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {GetListById,UpdateList} from "../../../services/http/list/list"
import { ListInterface } from "../../../interfaces/Ilist";
import Swal from "sweetalert2";

function UpdateListMenu() {
  const navigate = useNavigate();
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");
  const listIDForMenuUpdate = localStorage.getItem("listIDForMenu");
  const [listState, setListState] = useState<ListInterface>()
  

  console.log(listIDForMenuUpdate);
  const handleUpdateList = async () => {
    
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const updatedList: ListInterface = {
        ID: Number(listIDForMenuUpdate),
        ListName: listName,
        ListDescription: listDescription,
        // Include other properties from ListInterface as needed
      };

      // Call the UpdateList function to send the update request
      console.log("uptList", updatedList)
      const response = await UpdateList(updatedList);

      if (response.status == true) {
        console.log("List updated successfully");

        Swal.fire({
          icon: "success",
          title: "List Updated!",
          text: "The list has been updated successfully.",
        }).then(() => {
          // Redirect or perform any other action after successful deletion
          window.location.reload();
        });
        // Optionally, navigate the user to another page after the update
        // navigate("/updated-list-success-page");

      } else {
        console.error("Error updating list:", response.message);
      }
    } catch (error) {
      console.error("Error updating list:", error);
    }
  };
  
  

  const GetListState = async () => {
    let res = await GetListById(Number(listIDForMenuUpdate))
    console.log(res)
    if(res) {
      setListState(res);  // Assuming 'res.list' is the data you want to set
      console.log("res:",res)
    }
    setListName(res.list.ListName);
    setListDescription(res.list.ListDescription);
  }
  useEffect(() => {
    GetListState()
  },[])
  return (
    <div>
      UpdateListMenu {listIDForMenuUpdate}
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
          onClick={handleUpdateList}
        >
          Update List
        </button>
      </form>
    </div>
  );
}

export default UpdateListMenu;

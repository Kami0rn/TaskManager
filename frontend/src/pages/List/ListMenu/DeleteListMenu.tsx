import React from "react";
import { DeleteListByID } from "../../../services/http/list/list";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function DeleteListMenu() {
  const [deleteResult, setDeleteResult] = useState<boolean | null>(null);
  const listIDForMenuDelete = localStorage.getItem("listIDForMenu");
  const handleDeleteList = async () => {
    if (listIDForMenuDelete) {
      const result = await DeleteListByID(Number(listIDForMenuDelete));

      // Handle the result accordingly, you might want to show a message or redirect
      setDeleteResult(result);

      // Example: Redirect to a different page after successful deletion
      if (result) {
        Swal.fire({
          icon: "success",
          title: "List Deleted!",
          text: "The list has been deleted successfully.",
        }).then(() => {
          // Redirect or perform any other action after successful deletion
          window.location.reload();
        });
      }
    }
  };
  console.log(listIDForMenuDelete);
  return (
    <div>
      <header>DeleteListMenu {listIDForMenuDelete}</header>

      <button
        onClick={handleDeleteList}
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 my-10"
      >
        Delete List
      </button>

    </div>
  );
}

export default DeleteListMenu;

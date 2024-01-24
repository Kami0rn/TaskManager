import React from "react";
import { DeleteCardByID } from "../../../services/http/card/card";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function DeleteCardMenu() {
  const [deleteResult, setDeleteResult] = useState<boolean | null>(null);
  const cardIDForMenuDelete = localStorage.getItem("cardIDForMenu");
  const handleDeleteList = async () => {
    if (cardIDForMenuDelete) {
      const result = await DeleteCardByID(Number(cardIDForMenuDelete));

      // Handle the result accordingly, you might want to show a message or redirect
      setDeleteResult(result);

      // Example: Redirect to a different page after successful deletion
      if (result) {
        Swal.fire({
          icon: "success",
          title: "Card Deleted!",
          text: "The list has been deleted successfully.",
        }).then(() => {
          // Redirect or perform any other action after successful deletion
          window.location.reload();
        });
      }
    }
  };
  console.log(cardIDForMenuDelete);
  return (
    <div>
      <header>DeleteCardMenu {cardIDForMenuDelete}</header>

      <button
        onClick={handleDeleteList}
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 my-10"
      >
        Delete List
      </button>

    </div>
  );
}

export default DeleteCardMenu;

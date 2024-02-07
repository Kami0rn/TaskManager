import React from "react";
import { DeleteDeadlineByID } from "../../services/http/deadline/deadline";
import Swal from "sweetalert2";

interface CalendarMenuProps {
  isVisible: boolean;
  deadlineID: number | null;
  onClose: () => void;
}

async function handleDeleteDeadline(deadlineID: number | null) {
  if (deadlineID !== null) {
    const deleted = await DeleteDeadlineByID(deadlineID);
    if (deleted) {
      Swal.fire({
        icon: "success",
        title: "Dealine Deleted!",
        text: "The deadline has been deleted.",
      }).then(() => {
        window.location.reload();
      });
      // You can add logic here for additional actions after deletion
      console.log(`Deadline with ID ${deadlineID} deleted successfully`);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete deadline. Please try again.",
      });
      console.error(`Failed to delete deadline with ID ${deadlineID}`);
    }
  }
}

function CalendarMenu({ isVisible, deadlineID, onClose }: CalendarMenuProps) {
  const overlayClasses = `fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50 z-50 ${
    isVisible ? "block" : "hidden"
  }`;

  const modalClasses = `fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-md z-50 ${
    isVisible ? "block" : "hidden"
  }`;

  const closeButtonClasses =
    "absolute top-4 right-4 text-white cursor-pointer z-10 bg-red-600 px-2 rounded-md";

  const deleteButtonClasses =
    "bg-red-600 px-2 rounded-md text-white mt-10 cursor-pointer";

  return (
    <div>
      <div className={overlayClasses} onClick={onClose}></div>
      <div className={modalClasses}>
        <button className={closeButtonClasses} onClick={onClose}>
          x
        </button>
        <h1 className="text-xl font-bold mb-4 mt-5">Modal Content</h1>
        <p>Deadline ID: {deadlineID}</p>
        <button
          className={deleteButtonClasses}
          onClick={() => handleDeleteDeadline(deadlineID)}
        >
          Delete Deadline
        </button>
      </div>
    </div>
  );
}

export default CalendarMenu;

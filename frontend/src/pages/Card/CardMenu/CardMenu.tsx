import React from "react";
import { useEffect, useState } from "react";
import UpdateCardMenu from "./UpdateCardMenu";
import DeleteCardMenu from "./DeleteCardMenu";
import CreateDeadline from "./CeateDeadline"

function CardMenu() {
  const listIDForMenu = localStorage.getItem("cardIDForMenu");
  console.log(listIDForMenu);

  const [showUpdateList, setShowUpdateList] = useState(false);
  const [showDeleteList, setShowDeleteeList] = useState(false);
  const [showDeadline, setShowDeadline] = useState(false);

  const handleUpdateListClick = (listIDForMenuUpdate: number) => {
    console.log("listIDForMenuUpdate :");
    console.log(listIDForMenuUpdate);
    console.log(":end");
    setShowUpdateList(true);
  };
  const handleUpdateListClose = () => {
    setShowUpdateList(false);
  };

  const handleDeleteListClick = (listIDForMenuDelete: number) => {
    console.log("listIDForMenuDelete :");
    console.log(listIDForMenuDelete);
    console.log(":end");
    setShowDeleteeList(true);
  };
  const handleDeleteListClose = () => {
    setShowDeleteeList(false);
  };

  const handleCreateDeadlineClick = (listIDForMenuDeadline: number) => {
    console.log("listIDForAddDeadline :");
    console.log(listIDForMenuDeadline);
    console.log(":end");
    setShowDeadline(true);
  };
  const handleCreateDeadlineClose = () => {
    setShowDeadline(false);
  };

  return (
    <div>
      <h1 className="text-sky-400/100">Edit Card {listIDForMenu}</h1>
      <body className="flex flex-col">
        <button
          className="bg-cyan-500 rounded-md my-2"
          onClick={() =>
            handleUpdateListClick(
              listIDForMenu !== null ? parseInt(listIDForMenu, 10) : 0
            )
          }
        >
          Update
        </button>
        <button
          className="bg-red-500 rounded-md text-white my-2"
          onClick={() =>
            handleDeleteListClick(
              listIDForMenu !== null ? parseInt(listIDForMenu, 10) : 0
            )
          }
        >
          Delete
        </button>
        <button
          className="bg-green-500 rounded-md text-white my-2"
          onClick={() =>
            handleCreateDeadlineClick(
              listIDForMenu !== null ? parseInt(listIDForMenu, 10) : 0
            )
          }
        >
          Set Deadline
        </button>
      </body>

      {showUpdateList && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleUpdateListClose}>
              &times;
            </span>
            <UpdateCardMenu />
          </div>
        </div>
      )}
      {showDeleteList && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleDeleteListClose}>
              &times;
            </span>
            <DeleteCardMenu />
          </div>
        </div>
      )}
      {showDeadline && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCreateDeadlineClose}>
              &times;
            </span>
            <CreateDeadline />
          </div>
        </div>
      )}
    </div>
  );
}

export default CardMenu;

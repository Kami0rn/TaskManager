import React from "react";
import { useEffect, useState } from "react";
import UpdateListMenu from "./UpdateListMenu";
import DeleteListMenu from "./DeleteListMenu";

function ListMenu() {
  const listIDForMenu = localStorage.getItem("listIDForMenu");
  console.log(listIDForMenu);

  const [showUpdateList, setShowUpdateList] = useState(false);
  const [showDeleteList, setShowDeleteeList] = useState(false);

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

  return (
    <div>
      <h1 className="text-sky-400/100">Edit List {listIDForMenu}</h1>
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
      </body>

      {showUpdateList && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleUpdateListClose}>
              &times;
            </span>
            <UpdateListMenu />
          </div>
        </div>
      )}
      {showDeleteList && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleDeleteListClose}>
              &times;
            </span>
            <DeleteListMenu />
          </div>
        </div>
      )}
    </div>
  );
}

export default ListMenu;

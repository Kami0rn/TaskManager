import React from "react";

function DeleteListMenu() {
  const listIDForMenuDelete = localStorage.getItem("listIDForMenu");
  console.log(listIDForMenuDelete);
  return (
    <div>
      <header>DeleteListMenu {listIDForMenuDelete}</header>
    </div>
  );
}

export default DeleteListMenu;

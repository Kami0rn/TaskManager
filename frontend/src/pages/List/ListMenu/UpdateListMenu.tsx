import React from 'react'

function UpdateListMenu() {
    const listIDForMenuUpdate= localStorage.getItem("listIDForMenu");
    console.log(listIDForMenuUpdate);
  return (
    <div>UpdateListMenu {listIDForMenuUpdate}</div>
  )
}

export default UpdateListMenu
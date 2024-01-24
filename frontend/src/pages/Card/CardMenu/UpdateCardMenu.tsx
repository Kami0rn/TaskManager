import React from 'react'

function UpdateCardMenu() {
    const listIDForMenuUpdate= localStorage.getItem("listIDForMenu");
    console.log(listIDForMenuUpdate);
  return (
    <div>UpdateListMenu {listIDForMenuUpdate}</div>
  )
}

export default UpdateCardMenu
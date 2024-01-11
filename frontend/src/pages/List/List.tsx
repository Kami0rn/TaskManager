import React from "react";
import { GetListByProjectId } from "../../services/http/list/list";
import { useState, useEffect } from "react";
import { ListInterface } from "../../interfaces/Ilist";
import CreateList from "./CreateList";
import "./List.css"

function List() {
  const handleCreateListClick = () => {
    setShowCreateList(true);
  };
  const handleCreateListClose = () => {
    setShowCreateList(false);
  };
  const [lists, setLists] = useState<ListInterface[]>([]);
  const [showCreateList, setShowCreateList] = useState(false);
  useEffect(() => {
    async function fetchListData() {
      const projectId = 1; // Replace this with the project ID
      const data = await GetListByProjectId(projectId);

      if (data) {
        setLists(data.lists || []);
      }
    }

    fetchListData();
  }, []);
  return (
    <div>
      <h1>List Items</h1>
      <ul className="flex">
        {lists.map((list, index) => (
          <li
            key={list.ID}
            className="ListBox bg-slate-400 rounded-md mx-2 w-2/12 flex flex-col justify-center align-center"
          >
            <h3 className="m-3 ">{list.ListName}</h3>
            <button className="bg-slate-500 w-11/12 flex my-3 mx-2 rounded-md">
              <div>+ Add new card</div>
            </button>
          </li>
          
        ))}
        <button className="w-10 h-10 bg-slate-400 rounded-md" onClick={handleCreateListClick}>+</button>
      </ul>
      {showCreateList && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCreateListClose}>
              &times;
            </span>
            <CreateList />
          </div>
        </div>
      )}
    </div>
  );
}

export default List;

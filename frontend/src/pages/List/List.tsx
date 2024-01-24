import React, { useState, useEffect } from "react";
import { GetListByProjectId } from "../../services/http/list/list";
import { ListInterface } from "../../interfaces/Ilist";
import CreateList from "./CreateList";
import CreateCardComponent from "../Card/CreateCardComponent";
import ListMenu from "./ListMenu/ListMenu";
import CardMenu from "../Card/CardMenu/CardMenu";
import "./List.css";

function List() {
  const handleCreateListClick = () => {
    setShowCreateList(true);
  };
  const handleCreateListClose = () => {
    setShowCreateList(false);
  };

  const handleCreateCardClick = (listID: number) => () => {
    setShowCreateCard(true);
    localStorage.setItem("listID", listID.toString());
  };

  const handleCreateCardClose = () => {
    setShowCreateCard(false);
  };
  const [lists, setLists] = useState<ListInterface[]>([]);
  const [showCreateList, setShowCreateList] = useState(false);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [showListMenu, setShowListMenu] = useState(false);
  const [showCardMenu, setShowCardMenu] = useState(false);

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

  const handleListMenuClick = (listID: number) => {
    setShowListMenu(true);
    console.log("ListIdForMenu");
    console.log(listID);
    localStorage.setItem("listIDForMenu", listID.toString());
  };
  const handleListMenuClose = () => {
    setShowListMenu(false);
  };
  const handleCardMenuClick = (cardID: number) => {
    setShowCardMenu(true);
    console.log("ListIdForMenu");
    console.log(cardID);
    localStorage.setItem("cardIDForMenu", cardID.toString());
  };
  const handleCardMenuClose = () => {
    setShowCardMenu(false);
  };

  return (
    <div className="pt-5 pl-2">
      <ul className="flex">
        {lists.map((list, index) => (
          <li
            key={list.ID}
            className="ListBox bg-slate-400 rounded-md mx-2 w-2/12 flex flex-col  align-center "
          >
            <div className="w-full grid justify-items-end">
              <button
                className="mr-5"
                onClick={() => handleListMenuClick(list.ID)}
              >
                ...
              </button>
            </div>

            <h3 className="m-3">{list.ListName}</h3>
            <ul>
              {list.Cards &&
                list.Cards.map((card) => (
                  <li
                    key={card.ID}
                    className="CardBox flex flex-col m-2 p-2 bg-slate-200 rounded-md relative"
                  >
                    <button
                      onClick={() => handleCardMenuClick(card.ID || 0)}
                      className="absolute top-0 right-0 mr-3 text-stone-400"
                    >
                      +
                    </button>
                    <h4>{card.CardName}</h4>
                    <p className="text-xs text-stone-500">
                      {card.CardDescription}
                    </p>
                  </li>
                ))}
            </ul>
            <button
              className="bg-slate-500 w-11/12 flex my-3 mx-2 rounded-md"
              onClick={handleCreateCardClick(list.ID)}
            >
              <div>+ Add new card</div>
            </button>
          </li>
        ))}
        <button
          className="w-10 h-10 bg-slate-400 rounded-md"
          onClick={handleCreateListClick}
        >
          +
        </button>
      </ul>
      {showListMenu && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={handleListMenuClose}
              style={{ position: "absolute", right: "10px" }}
            >
              &times;
            </span>
            <div className="mt-5">
              <ListMenu />
            </div>
          </div>
        </div>
      )}
            {showCardMenu && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={handleCardMenuClose}
              style={{ position: "absolute", right: "10px" }}
            >
              &times;
            </span>
            <div className="mt-5">
              <CardMenu />
            </div>
          </div>
        </div>
      )}
      {showCreateList && (
        <div className="modal">
          <div className="modal-content">
            <span className="close ml-10" onClick={handleCreateListClose}>
              &times;
            </span>
            <CreateList />
          </div>
        </div>
      )}
      {showCreateCard && (
        <div className="modal">
          <div className="modal-content">
            <span className="close ml-10" onClick={handleCreateCardClose}>
              &times;
            </span>
            <CreateCardComponent />
          </div>
        </div>
      )}
    </div>
  );
}

export default List;

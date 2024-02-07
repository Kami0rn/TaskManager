import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {GetCardById,UpdateCard} from "../../../services/http/card/card"
import { CardInterface } from "../../../interfaces/Icard";
import Swal from "sweetalert2";

function UpdateCardMenu() {
  const navigate = useNavigate();
  const [cardName, setCardName] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const cardIDForMenuUpdate = localStorage.getItem("cardIDForMenu");
  const [cardState, setCardState] = useState<CardInterface>()
  

  console.log(cardIDForMenuUpdate);
  const handleUpdateCard = async () => {
    
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const updatedCard: CardInterface = {
        ID: Number(cardIDForMenuUpdate),
        CardName: cardName,
        CardDescription: cardDescription,
        // Include other properties from ListInterface as needed
      };

      // Call the UpdateList function to send the update request
      console.log("uptCard", updatedCard)
      const response = await UpdateCard(updatedCard);

      if (response.status == true) {
        console.log("Card updated successfully");

        Swal.fire({
          icon: "success",
          title: "Card Updated!",
          text: "The card has been updated successfully.",
        }).then(() => {
          // Redirect or perform any other action after successful deletion
          window.location.reload();
        });
        // Optionally, navigate the user to another page after the update
        // navigate("/updated-list-success-page");

      } else {
        console.error("Error updating card:", response.message);
      }
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };
  
  

  const GetCardState = async () => {
    let res = await GetCardById(Number(cardIDForMenuUpdate))
    console.log(res)
    if(res) {
      setCardState(res);  // Assuming 'res.list' is the data you want to set
      console.log("res:",res)
    }
    setCardName(res.card.CardName);
    setCardDescription(res.card.CardDescription);
  }
  useEffect(() => {
    GetCardState()
  },[])
  return (
    <div>
      UpdateCardMenu {cardIDForMenuUpdate}
      <form>
        <label>
          Card Name:
          <input
            className="my-2 bg-slate-200"
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />

        </label>
        <br />
        <label>
          Card Description:
          <textarea
            className="my-2 bg-slate-200"
            value={cardDescription}
            onChange={(e) => setCardDescription(e.target.value)}
          />
        </label>
        <br />
        <button
          type="button"
          className="my-4 w-40 rounded-md bg-slate-400"
          onClick={handleUpdateCard}
        >
          Update Card
        </button>
      </form>
    </div>
  );
}

export default UpdateCardMenu;
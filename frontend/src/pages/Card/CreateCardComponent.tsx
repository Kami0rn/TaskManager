import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { CreateCard } from "../../services/http/card/card";
import { CardInterface } from "../../interfaces/Icard";

interface ApiResponse {
  status: string;
  message: any;
  card?: any;
}

const CreateCardComponent: React.FC = () => {
  const navigate = useNavigate();
  const [cardName, setCardName] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading

  const handleCreateCard = async () => {
    try {
      setLoading(true); // Set loading to true before the async call

      const listID = localStorage.getItem("listID");
      const token = localStorage.getItem("token");

      if (!listID) {
        console.error("listID not found in localStorage");
        return;
      }

      if (!token) {
        navigate("/login");
        return;
      }

      const cardData: CardInterface = {
        CardName: cardName,
        CardDescription: cardDescription,
      };

      const response: ApiResponse = await CreateCard(Number(listID), cardData);

      if (response.status === "ok") {
        console.log("Card created successfully:", response);

        Swal.fire({
          html: `<i>${response.message}</i>`,
          icon: "success",
          customClass: {
            container: "swal-container",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            // Refresh the page if the status is OK
            window.location.reload();
          }
        });
      } else {
        console.error("Error creating card. Status:", response.status);
      }
    } catch (error) {
      console.error("Error creating card:", error);
    } finally {
      setLoading(false); // Set loading to false after the async call
    }
  };

  return (
    <div>
      <h2 className="text-cyan-500">Create Card</h2>
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
          onClick={handleCreateCard}
          disabled={loading} // Disable the button during loading
        >
          {loading ? "Creating..." : "Create Card"}
        </button>
      </form>
    </div>
  );
};

export default CreateCardComponent;

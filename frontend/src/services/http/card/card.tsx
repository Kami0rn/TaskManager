 // Adjust the import based on your actual interface
 import { CardInterface } from "../../../interfaces/Icard";

 const apiUrl = "http://localhost:8080";

async function GetCardsFromListID(listID: number) {
  const userToken = localStorage.getItem('token');
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(`${apiUrl}/users/projectGetCardsFromListID/${listID}`, requestOptions);
    const data = await response.json();

    if (data.cards) {
      return data;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching cards:", error);
    return false;
  }
}

async function CreateCard(listID: number, cardData: CardInterface) {
  const userToken = localStorage.getItem('token');
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...cardData,
      listID: listID,
    }),
  };

  try {
    const response = await fetch(`${apiUrl}/users/projectCreateCardFromListID/${listID}`, requestOptions);
    const data = await response.json();

    if (data.status === "ok") {
      return { status: "ok", message: data.message, card: data.card };
    } else {
      return { status: "error", message: data.error };
    }
  } catch (error) {
    console.error("Error creating card:", error);
    return { status: "error", message: "Failed to create card." };
  }
}

async function UpdateCard(cardID: number, cardData: CardInterface) {
  const userToken = localStorage.getItem('token');
  const requestOptions = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  };

  try {
    const response = await fetch(`${apiUrl}/users/cards/${cardID}`, requestOptions);
    const data = await response.json();

    if (data.status === "ok") {
      return { status: true, message: data.message };
    } else {
      return { status: false, message: data.error };
    }
  } catch (error) {
    console.error("Error updating card:", error);
    return { status: false, message: "Failed to update card." };
  }
}

async function DeleteCard(cardID: number) {
  const userToken = localStorage.getItem('token');
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  try {
    const response = await fetch(`${apiUrl}/users/cards/${cardID}`, requestOptions);
    const data = await response.json();

    if (data.status === "ok") {
      return { status: true, message: data.message };
    } else {
      return { status: false, message: data.error };
    }
  } catch (error) {
    console.error("Error deleting card:", error);
    return { status: false, message: "Failed to delete card." };
  }
}

export {
  GetCardsFromListID,
  CreateCard,
  UpdateCard,
  DeleteCard,
};

// Adjust the import based on your actual interface
import { CardInterface } from "../../../interfaces/Icard";

const apiUrl = "http://localhost:8081";

async function GetCardsFromListID(listID: number) {
  const userToken = localStorage.getItem("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(
      `${apiUrl}/users/projectGetCardsFromListID/${listID}`,
      requestOptions
    );
    const data = await response.json();

    if (data.cards) {
      console.log("Hello");
      console.log("data.cards");
      console.log(data);
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
  const userToken = localStorage.getItem("token");
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
    const response = await fetch(
      `${apiUrl}/users/projectCreateCardFromListID/${listID}`,
      requestOptions
    );

    if (response.ok) {
      // Check if the response is successful
      const data = await response.json();

      if (data.status === "ok") {
        return { status: "ok", message: data.message, card: data.card };
      } else {
        // If the response is successful but contains an error, handle it here
        const errorMessage = data.error || "Failed to create card.";
        console.error("Error creating card:", errorMessage);

        return { status: "error", message: errorMessage };
      }
    } else {
      // If the response is not successful, handle the error
      const errorMessage = (await response.text()) || "Failed to create card.";
      console.error("Error creating card:", errorMessage);

      return { status: "error", message: errorMessage };
    }
  } catch (error) {
    console.error("Error creating card:", error);
    return { status: "error", message: "Failed to create card." };
  }
}

async function UpdateCard(data: CardInterface) {
  const userToken = localStorage.getItem('token');
  const requestOptions = {
    
    method: "PATCH", 
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${apiUrl}/users/updateCard`, requestOptions);

    if (!response.ok) {
      // Handle HTTP error responses
      const errorMessage = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}. ${errorMessage}`);
    }

    // Check if response is not empty
    const responseBody = await response.text();
    if (!responseBody) {
      throw new Error("Empty response received from the server.");
    }

    const responseData = JSON.parse(responseBody);

    // Check if the server response contains an error property
    if (responseData.error) {
      return { status: false, message: responseData.error };
    }

    // Assuming successful response structure
    return { status: true, message: responseData.data };
  } catch (error) {
    console.error("Error updating card:", error);
    return { status: false, message: "An unexpected error occurred." };
  }
}

async function DeleteCardByID(CardId: Number | undefined) {
  const userToken = localStorage.getItem("token");
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(
    `${apiUrl}/users/deleteCardFromID/${CardId}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
async function GetCardById(cardIDForMenu:number) {
  const userToken = localStorage.getItem('token');
  const requestOptions = {
    
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/users/getCardFromID/${cardIDForMenu}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.card) {
        console.log(res);
        return res;
      } else {
        return false;
      }
  });
  return res;
}


export { 
  GetCardsFromListID, 
  GetCardById,
  CreateCard, 
  UpdateCard, 
  DeleteCardByID 
};

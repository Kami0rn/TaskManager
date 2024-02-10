import { CommentInterface } from "../../../interfaces/Icomment";

const apiUrl = "http://localhost:8080";
// GET /comment/:cardID
async function GetCommentByCardID(cardID: number) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/comment/${cardID}`, requestOptions)
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
// GET /comment/edit/:commentID
async function GetCommentByCommentID(commentID: number) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/comment/edit/${commentID}`, requestOptions)
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
// POST /comment
async function CreateComment(data: CommentInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let res = await fetch(`${apiUrl}/comment`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

// DELETE /comment/:commentID
async function DeleteCommentByCommentID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE",
  };

  let res = await fetch(`${apiUrl}/comment/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.message) {
        return res.message;
      } else {
        return false;
      }
    });

  return res;
}
// PATCH /comment
async function UpdateComment(data: CommentInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/comment`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

export {
  GetCommentByCardID,
  GetCommentByCommentID,
  CreateComment,
  DeleteCommentByCommentID,
  UpdateComment,
};

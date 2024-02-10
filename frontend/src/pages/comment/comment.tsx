import React, { useEffect, useState } from "react";

//interface
import { UserInterface } from "../../interfaces/Iuser";
import { CommentInterface } from "../../interfaces/Icomment";

//methods
import { GetUserById } from "../../services/http/user/user";
import {
  CreateComment,
  DeleteCommentByCommentID,
  GetCommentByCardID,
  UpdateComment,
} from "../../services/http/comment/comment";

//ant
import { Form, Layout, message } from "antd";
import Comment_Component from "./Component_Comment";

function Comment() {
  const [user, setUser] = useState<UserInterface>();
  const [messageApi, contextHolder] = message.useMessage();
  const [comment, setComment] = useState<CommentInterface[]>([]);
  //modal
  const [openModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  //userSelect
  const [deleteCommentID, setDeleteCommentID] = useState<Number>();
  const [EditCommentID, setEditCommentID] = useState<CommentInterface>();

  const [newData, setNewData] = React.useState<Partial<CommentInterface>>({});
  //input
  const [input, setInput] = useState({
    CommentText: "",
    EditDatetime: "",
    //fk
    UserID: 0,
    CardID: 0,
  });
  //modal
  const showModal = (val: Number | undefined) => {
    setModalText(`คุณต้องการลบข้อมูลหรือไม่ ?`);
    setDeleteCommentID(val);
    console.log(deleteCommentID);
    setOpenModal(true);
  };

  //get ค่า
  const getCommentByCardID = async (cardID: number) => {
    let res = await GetCommentByCardID(cardID);
    if (res) {
      setComment(res);
    }
  };
  const getUserById = async (id: number) => {
    let res = await GetUserById(id);
    if (res) {
      setUser(res);
    }
  };

  //handle
  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInput({ ...input, [e.target.name]: value });
  };
  const handleSubmit = async (values: CommentInterface) => {
    console.log("input:", input);
    values.EditDatetime = new Date(input.EditDatetime);
    values.CommentText = input.CommentText;
    //fk
    values.UserID = 1;
    values.CardID = 1;
    console.log("values:", values);
    let res = await CreateComment(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      window.location.reload();
      setTimeout(function () {}, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
      });
    }
  };
  const handleDelete = async () => {
    let res = await DeleteCommentByCommentID(deleteCommentID);
    console.log(res);
    if (!res.status) {
      setOpenModal(false);
      messageApi.open({
        type: "success",
        content: "ลบข้อมูลสำเร็จ",
      });
      window.location.reload();
      setTimeout(function () {}, 2000);
    } else {
      setOpenModal(false);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
      });
    }
    setConfirmLoading(false);
  };

  async function EditComment() {
    let data = {
      ID: EditCommentID?.ID,
      CommentText: newData.CommentText ?? "",
      EditDatetime: new Date(),
      //fk
      UserID: EditCommentID?.UserID,
      CardID: EditCommentID?.CardID,
    };

    let res = await UpdateComment(data);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "แก้ไขข้อมูลสำเร็จ",
      });
      window.location.reload();
      setTimeout(function () {}, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
      });
    }
  }
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Comment;
    const { value } = event.target;
    setNewData({ ...newData, [id]: value });
  };

  //useEffect
  useEffect(() => {
    // getUserById(); ยังไม่รู้วิธีทำตอนนี้
    getCommentByCardID(1);
  }, []);

  return (
    <>
      
      <Comment_Component/>
    </>
  );
}
export default Comment;

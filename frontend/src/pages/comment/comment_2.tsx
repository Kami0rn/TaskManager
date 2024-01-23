import React, { useEffect, useState } from "react";

//interface
import { UserInterface } from "../../interfaces/Iuser";
import { CommentInterface } from "../../interfaces/Icomment";
import { CardInterface } from "../../interfaces/Icard";
//methods
import { GetUserById } from "../../services/http/user/user";
import { CreatePayment } from "../../services/http/payment/payment";

//ant
import { Card, Form, Layout, message } from "antd";
import Modal from "antd/es/modal/Modal";

import {
  CreateComment,
  DeleteCommentByCommentID,
  GetCommentByCardID,
  UpdateComment,
} from "../../services/http/comment/comment";

const { Header, Content } = Layout;

function Comment_2() {
  const [moneySlip, setMoneySlip] = useState("");
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
  const handleClickOpenMOdal = () => {
    setOpenModal(true);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };
  const handleButtonPaymentType = () => {
    setOpenModal(false);
  };
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
        content: "บันทึกข้อมูลไม่สำเร็จ",
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
  //   const handleInputChange = (
  //     event: React.ChangeEvent<{ id?: string; value: any }>
  //   ) => {
  //     const id = event.target.id as keyof typeof Comment;
  //     const { value } = event.target;
  //     setNewData({ ...newData, [id]: value });
  //   };

  //useEffect
  useEffect(() => {
    // getUserById(); ยังไม่รู้วิธีทำตอนนี้
    getCommentByCardID(1);
  }, []);

  return (
    <>
      {contextHolder}
      <div className="Header bg-amber-700" style={{ height: "60px" }}></div>
      <div
        className="Comment-Content"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px 10px 10px 10px",
          height: "91.7vh",
          width: "100%",
          backgroundColor: "rgb(15 23 42)",
          justifyContent: "center",
        }}
      >
        <div className="Comment-content relative flex  h-full w-full justify-center items-center bg-slate-600 p-4">
          <div className="flex flex-col h-full w-11/12 bg-white rounded-md">
            <div className="inputForm-Comment flex flex-col w-full h-1/3 bg-slate-800 p-3 rounded-t-md ">
              <div className="InputArea-Comment flex flex-col w-1/3 h-full bg-green-400 justify-center">
                <Form className="" onFinish={handleSubmit}>
                  <div className="formInput-Comment flex flex-col p-2  ">
                    <div className="flex flex-col ">
                      <h2 className="card-title font-bold mb-1">
                        กรองแสดงความคิดเห็น
                      </h2>
                      <div className="mb-2">
                        <input
                          className="p-2 border-2 border-rose-500 rounded-lg"
                          name="CommentText"
                          onChange={handleInput}
                        ></input>
                      </div>
                      <div className="card-actions justify-end">
                        <button className="btn " type="submit">
                          บันทึก
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
            <div className="ShowComment-Comment relative flex flex-col w-full h-2/3 bg-slate-300 p-3 rounded-b-md">
              <div className="ShowArea-Comment flex flex-col w-2/3 h-full bg-sky-800 p-2">
                {comment.map((Comment) => (
                  <>
                    <div className="Comment-Box flex flex-col w-full">
                      <div className="flex flex-row border-2 border-pink-700 rounded-lg mb-2 p-2">
                        <div className="flex flex-col w-4/6">
                          <p className="text-xl">{Comment.User?.UserName}</p>
                          <div className="text-base">{Comment.CommentText}</div>
                        </div>

                        <div className="flex space-x-1 w-2/6 justify-end item-center">
                          <button
                            className="btn btn-outline btn-warning btn-sm"
                            onClick={() => {
                              if (document) {
                                (
                                  document.getElementById(
                                    "my_modal_EditPayment"
                                  ) as HTMLFormElement
                                ).showModal();
                                setEditCommentID(Comment);
                              }
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-outline btn-error btn-sm"
                            onClick={() => showModal(Comment.ID)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Comment_2;

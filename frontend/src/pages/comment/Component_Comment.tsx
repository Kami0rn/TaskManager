import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//interface
import { UserInterface } from "../../interfaces/Iuser";
import { CommentInterface } from "../../interfaces/Icomment";
import { CardInterface } from "../../interfaces/Icard";

//methods
import { GetUserById } from "../../services/http/user/user";
import {
  CreateComment,
  DeleteCommentByCommentID,
  GetCommentByCardID,
  UpdateComment,
} from "../../services/http/comment/comment";
//antd
import { Card, Form, Layout, message } from "antd";

export default function Comment_Component() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInterface>();
  const [messageApi, contextHolder] = message.useMessage();
  const [comment, setComment] = useState<CommentInterface[]>([]);
  //modal
  const [openModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  //userSelect
  const [deleteCommentID, setDeleteCommentID] = useState<CommentInterface>();
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
    let res = await DeleteCommentByCommentID(deleteCommentID?.ID);
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
    setNewData((prevData) => ({ ...prevData, [id]: value }));
  };

  //useEffect
  useEffect(() => {
    const userID = localStorage.getItem("userId");
    getUserById(Number(userID));
    getCommentByCardID(1);
  }, []);
  return (
    <>
      {contextHolder}
      <div className="Comment-content flex flex-col h-full w-full justify-center items-center p-4">
        {/* input Comment */}
        <div className="flex flex-col  h-full w-full border-2 border-[#384148] bg-[#1d2125] rounded-md justify-center">
          <div className="inputForm-Comment flex flex-col w-full h-2/3  p-3 rounded-t-md ">
            <div className="InputArea-Comment flex flex-col w-full h-full bg-[#22272b]  border-2 border-[#384148] p-2 justify-center rounded-lg">
              <Form className="" onFinish={handleSubmit}>
                <div className="formInput-Comment flex flex-col p-2  ">
                  <div className="flex flex-col ">
                    <h2 className="card-title font-bold text-white mb-1">
                      เขียนแสดงความคิดเห็น
                    </h2>
                    <div className="flex mb-2 space-x-2 justify-start items-center">
                      <img src={user?.ProfilePic} className=" w-11 h-11 border-[#384148] rounded-full"/>
                      <input
                        className="p-2 border-2 border-[#384148]  bg-[#22272b] rounded-lg w-4/5"
                        name="CommentText"
                        placeholder="แสดงความคิดเห็น..."
                        onChange={handleInput}
                      ></input>
                    </div>
                    <div className="card-actions justify-end">
                      <button className="btn btn-sm hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:border-transparent hover:text-white" type="submit">
                        บันทึก
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
          {/* show comment*/}
          <div className="ShowComment-Comment relative flex flex-col w-full h-2/3  p-3 rounded-b-md">
            <div className="ShowArea-Comment flex flex-col w-full h-full p-2">
              {comment.map((Comment) => (
                <>
                  <div className="Comment-Box flex flex-col w-full">
                    <div className="flex flex-row text-[#bfcbdb] border-2 border-[#384148] bg-[#22272b] rounded-lg  p-2 mb-1">
                      <div className="flex flex-col w-4/6">
                        <div className="flex w-1/12">
                          <img src={Comment.User?.ProfilePic} className="" />
                        </div>
                        <p className="text-xl font-bold">{Comment.User?.UserName}</p>
                        <div className="contect-test text-base">
                          {Comment.CommentText}
                        </div>
                      </div>

                      
                    </div>
                    <div className="flex space-x-1 w-2/6 justify-start item-center items-center mb-2">
                        <button
                          className="underline inline-block rounded px-1  text-xs font-medium uppercase leading-normal text-slate-500 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
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
                          className="underline inline-block rounded px-1 text-xs font-medium uppercase leading-normal text-red-500 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
                          onClick={() => {
                            if (document) {
                              (
                                document.getElementById(
                                  "my_modal_DeletePayment"
                                ) as HTMLFormElement
                              ).showModal();
                              setDeleteCommentID(Comment);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* modal */}
      {/* Edit-Payment modal */}
      <dialog id="my_modal_EditPayment" className="modal">
        <div className="modal-box ">
          <h3 className="font-bold text-lg">แก้ไข Comment</h3>
          <div className="modal-action flex flex-col">
            <div className="flex">
              <form method="dialog">
                <div>
                  <h1>Comment</h1>
                  <textarea
                    id="CommentText"
                    className="textarea textarea-bordered textarea-xs w-full max-w-xs p-2"
                    rows={5}
                    cols={40}
                    defaultValue={EditCommentID?.CommentText}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="justify-end">
                  <button className="btn" onClick={EditComment}>
                    ok
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </dialog>
      {/* Delete-Payment modal */}
      <dialog id="my_modal_DeletePayment" className="modal">
        <div className="modal-box ">
          <h3 className="font-bold text-lg">คุณต้องการลบข้อมูลหรือไม่ ?</h3>
          <div className="modal-action flex flex-col mt-3">
            <div className="flex flex-col w-full ">
              <div className="flex ">
                <div >คุณต้องการลบข้อความ "{deleteCommentID?.CommentText}"หรือไม่</div>
              </div>
              <div className="flex justify-end">
                <form method="dialog" className="flex space-x-3">
                  <button className="btn btn-sm">Close</button>
                  <button className="btn btn-sm" onClick={handleDelete}>
                    OK
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

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

function Comment() {
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
      {contextHolder}
      <Layout>
        <Header style={{ height: "60px" }}></Header>
        <Content
          style={{
            padding: "10px 10px 10px 10px",
            height: "100vh",
            width: "100%",
          }}
        >
          <div className="flex flex-col justify-center">
            {comment.map((Comment) => (
              <>
                <div className="flex flex-col w-5/6">
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

          <hr></hr>
          <div className="flex flex-col justify-center">
            <Form className="" onFinish={handleSubmit}>
              <div className="">
                <div className="card w-96 bg-base-100 shadow-xl">
                  <div className="card-body ">
                    <h2 className="card-title mb-1">กรองแสดงความคิดเห็น</h2>
                    <div className="mb-2">
                      <input
                        className="p-2 border-2 border-rose-500 rounded-lg"
                        name="CommentText"
                        onChange={handleInput}
                      ></input>
                    </div>
                    <div className="card-actions justify-end">
                      <button className="btn w-24 h-12" type="submit">
                        OK
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
          <Modal
            title="ลบข้อมูล ?"
            centered
            open={openModal}
            onOk={handleDelete}
            onCancel={handleCancel}
            confirmLoading={confirmLoading}
            footer={(_, { OkBtn, CancelBtn }) => (
              <>
                <CancelBtn />
                <OkBtn />
              </>
            )}
          >
            {modalText}
          </Modal>
        </Content>
      </Layout>
    </>
  );
}
export default Comment;

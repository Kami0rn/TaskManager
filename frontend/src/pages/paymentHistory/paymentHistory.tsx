import React, { ChangeEvent, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./paymentHistory.css";

//interface
import { TierInterface } from "../../interfaces/Itier";
import { UserInterface } from "../../interfaces/Iuser";
import { PaymentInterface } from "../../interfaces/Ipayment";
import { PaymentTypeInterface } from "../../interfaces/IpaymentType";
//methods
import { DeleteUserByID, GetUserById } from "../../services/http/user/user";
import { GetTier } from "../../services/http/tier/tier";
import {
  DeletePaymentByID,
  GetPaymentByUserID,
} from "../../services/http/payment/payment";

//components
import Nav from "../../etc/Nav";

//ant
import { Button, Card, Form, Input, Layout, Table, message } from "antd";
import Modal from "antd/es/modal/Modal";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

function PaymentHistory() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [Tier, setTier] = useState<TierInterface[]>([]);
  const [User, setUser] = useState<UserInterface>();
  const [Payment, setPayment] = useState<PaymentInterface[]>([]);

  //modal

  const [openModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();

  //userSelect
  const [deletePaymentID, setDeletePaymentID] = useState<Number>();

  //modal
  const handleClickOpenMOdal = () => {
    setOpenModal(true);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };
  
  const showModal = (val: Number | undefined) => {
    setModalText(`คุณต้องการลบข้อมูลหรือไม่ ?`);
    setDeletePaymentID(val);
    console.log(deletePaymentID);
    setOpenModal(true);
  };

  //handle
  const handleDelete = async () => {
    let res = await DeletePaymentByID(deletePaymentID);
    console.log(res);
    if (!res.status) {
      setOpenModal(false);
      messageApi.open({
        type: "success",
        content: "ลบข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    } else {
      setOpenModal(false);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
      });
    }
    setConfirmLoading(false);
  };

  const handleEdit = async (id: number | undefined) => {
    navigate(`/paymentHistory/edit/${id}`);
  };

  //get ค่า
  const getPaymentByUserID = async (userID: number) => {
    let res = await GetPaymentByUserID(userID);
    if (res) {
      setPayment(res);
      console.log(res);
    }
  };

  useEffect(() => {
    getPaymentByUserID(1);
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
            position: "relative",
            justifyContent: "center",
          }}
        >
          <div className="content_paymentHistory">
            <div className="Header-in_content_paymentHistory"></div>
            <div className="content-in_content_paymentHistory">
              <div style={{ marginTop: 20 }}>
                {/* table */}
                <table cellSpacing={0} className="table">
                  <thead>
                    <tr>
                      <th className="text-center">ลำดับ</th>
                      <th className="text-center">PaymentDate</th>
                      <th className="text-center">TotalPrice</th>
                      <th className="text-center">Note</th>
                      <th className="text-center">MoneySlip</th>
                      <th className="text-center">PaymentType</th>
                      <th className="text-center">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {Payment.map((data, index) => (
                      <tr key={index} className="">
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">
                          {data.PaymentDate.toString()}
                        </td>
                        <td className="text-center">{data.TotalPrice}</td>
                        <td className="text-center">{data.Note}</td>
                        <td className="flex justify-center">
                          <img
                            className="w-24 h-24"
                            src={data.MoneySlip}
                            alt=""
                          />
                        </td>
                        <td className="text-center">
                          {data.PaymentType?.PaymentType}
                        </td>

                        <td className="">
                          <div className="flex space-x-1 justify-center">
                            <button
                              className="btn btn-outline btn-warning btn-sm"
                              onClick={() => handleEdit(data.ID)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-outline btn-error btn-sm"
                              onClick={() => showModal(data.ID)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
export default PaymentHistory;

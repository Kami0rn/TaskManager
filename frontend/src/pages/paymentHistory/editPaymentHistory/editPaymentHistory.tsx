import React, { ChangeEvent, createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//interface
import { TierInterface } from "../../../interfaces/Itier";
import { UserInterface } from "../../../interfaces/Iuser";
import { PaymentInterface } from "../../../interfaces/Ipayment";
import { PaymentTypeInterface } from "../../../interfaces/IpaymentType";
//methods

import {
  GetPaymentByPaymentID,
  GetPaymentByUserID,
  UpdatePayment,
} from "../../../services/http/payment/payment";
import { GetTier } from "../../../services/http/tier/tier";

//ant
import { Form, Layout, message } from "antd";

const { Header, Content } = Layout;

function EditPaymentHistory() {
  let { id } = useParams();
  const ID = Number(id);
  const navigate = useNavigate();
  const [moneySlip, setMoneySlip] = useState<string | undefined>("");
  const [messageApi, contextHolder] = message.useMessage();
  const [Payment, setPayment] = useState<PaymentInterface>();

  const [newData, setNewData] = React.useState<Partial<PaymentInterface>>({});

  //handle
  const handleCan = async () => {
    navigate(`/paymentHistory`);
  };

  async function save() {
    const paymentDate = Object(Payment).PaymentDate!.toString();
    let data = {
      ID: Number(id),
      PaymentDate: paymentDate,
      Note: newData.Note ?? "",
      MoneySlip: moneySlip,
    };

    let res = await UpdatePayment(data);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "แก้ไขข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/paymentHistory");
      }, 2000);
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
    const id = event.target.id as keyof typeof EditPaymentHistory;
    const { value } = event.target;
    setNewData({ ...newData, [id]: value });
  };

  //get ค่า
  const getPaymentByPaymentID = async (paymentID: number) => {
    let res = await GetPaymentByPaymentID(paymentID);
    if (res) {
      setPayment(res);
      setMoneySlip(Payment?.MoneySlip);
      console.log(res);
    }
  };

  //image
  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setMoneySlip(base64);
  };
  const convertBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  useEffect(() => {
    getPaymentByPaymentID(ID);
    
  }, []);

  return (
    <>
      {contextHolder}
      <Layout>
        <Header style={{ height: "60px" }}></Header>
        <Content
          style={{
            padding: "10px 10px 10px 10px",
            height: "91vh",
            width: "100%",
            display: "flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="card  w-3/5 h-5/6 bg-base-100 shadow-xl  ">
            <div className="card-body flex flex-column p-5">
              <h2 className="card-title mb-1 ">แก้ไขการชำระเงิน</h2>
              <h1 className="text-base font-bold ml-1 mb-1">Note</h1>
              <input
                id="Note"
                className="input input-bordered input-info input-md w-full max-w-xs ml-1 mb-1"
                value={newData?.Note}
                onChange={handleInputChange}
              />
              <h1 className="text-base font-bold  ml-1 mb-1">รูปภาพ</h1>
              <input
                className="file-input  file-input-bordered file-input-info file-input-sm w-full max-w-xs mb-3 ml-1 mb-1"
                type="file"
                name="MoneySlip"
                onChange={(e) => {
                  uploadImage(e);
                }}
                id="file"
                data-multiple-caption="{count} files selected"
                multiple
              />
              <div className="my-2">
                <img className=" rounded-lg w-36 h-36 ml-1" src={moneySlip}></img>
              </div> 
              <div className="card-actions justify-end mr-5 space-x-1">
                <button
                  className="btn btn-outline btn-sm  hover:bg-gradient-to-r from-cyan-500 to-blue-500  "
                  type="button"
                  onClick={() => handleCan()}
                >
                  ยกเลิก
                </button>
                <button
                  className="btn btn-active btn-sm text-white bg-cyan-500 hover:bg-gradient-to-r from-cyan-500 to-blue-500"
                  type="submit"
                  onClick={save}
                >
                  ตกลง
                </button>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
}
export default EditPaymentHistory;

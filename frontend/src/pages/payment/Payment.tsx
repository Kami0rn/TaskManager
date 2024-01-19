import { useEffect, useState } from "react";
import "./payment.css";
//interface
import { TierInterface } from "../../interfaces/Itier";
import { UserInterface } from "../../interfaces/Iuser";
import { PaymentInterface } from "../../interfaces/Ipayment";
import { PaymentTypeInterface } from "../../interfaces/IpaymentType";
//methods
import { GetUserById } from "../../services/http/user/user";
import { GetTier } from "../../services/http/tier/tier";
import { GetPaymentType } from "../../services/http/paymentType/paymentType";
import { CreatePayment } from "../../services/http/payment/payment";
//ant
import { Card, Form, Layout, message } from "antd";
import Modal from "antd/es/modal/Modal";



const { Header, Content } = Layout;

function Payment() {
  const [moneySlip, setMoneySlip] = useState("");
  const [tier, setTier] = useState<TierInterface[]>([]);
  const [user, setUser] = useState<UserInterface>();
  const [messageApi, contextHolder] = message.useMessage();
  const [PaymentType, setPaymentType] = useState<PaymentTypeInterface[]>([]);

  const [userSelectTier, setUserSelectTier] = useState<TierInterface[]>([]);
  const [userSelectPaymentType, setUserSelectPaymentType] = useState<
    PaymentTypeInterface[]
  >([]);
  //modal
  const [openModal, setOpenModal] = useState(false);
  //input
  const [input, setInput] = useState({
    PaymentDate: "",
    TotalPrice: 0,
    Note: "",
    MoneySlip: "",
    //fk
    UserID: 0,
    PaymentStatusID: 0,
    PaymentTypeID: 0,
  });

  //get ค่า
  const getTier = async () => {
    let res = await GetTier();
    if (res) {
      setTier(res);
    }
  };
  const getPaymentType = async () => {
    let res = await GetPaymentType();
    if (res) {
      setPaymentType(res);
    }
  };
  const getUserById = async (id: number) => {
    let res = await GetUserById(id);
    if (res) {
      setUser(res);
    }
  };

  //handle
  const handleClickSelectTier = (selectedTier: TierInterface) => {
    setUserSelectTier([selectedTier]);
    console.log(userSelectTier);
    setOpenModal(true);
  };

  const handleClickSelectPaymentType = (selectedPaymentType: PaymentTypeInterface) => {
    setUserSelectPaymentType([selectedPaymentType]);
    console.log(userSelectPaymentType);
    setOpenModal(true);
  };

  const handleInput = (e: any) => {
    const { name, value } = e.target; 
    setInput({ ...input, [e.target.name]: value });
  };
  const handleSubmit = async (values: PaymentInterface) => {
    console.log("input:", input);
    values.PaymentDate = new Date(input.PaymentDate);
    values.TotalPrice = Number(userSelectTier[0].Price);
    values.Note = input.Note;
    values.MoneySlip = moneySlip;
    //fk
    values.UserID = 1;
    values.PaymentStatusID = 1;
    values.PaymentTypeID = Number(userSelectPaymentType[0].ID);
    console.log("values:", values);
    let res = await CreatePayment(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      setTimeout(function () {}, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "บันทึกข้อมูลไม่สำเร็จ",
      });
    }
  };

  //modal
  const handleCancel = () => {
    setOpenModal(false);
  };

  //image
  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setMoneySlip(base64);
    // console.log("Base64" + base64)
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
    // getUserById(); ยังไม่รู้วิธีทำตอนนี้
    getTier();
    getPaymentType();
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
          <div className="content_payment">
            <div className="Header-in_content_payment">
              <div className="Header-Text-in_content_payment">
                <h1>DO YOU WANT TO BE PRO?</h1>
              </div>
            </div>
            <div className="content-in_content_payment">
              {tier.map((tier) => (
                <Card className="Card-info" key={tier.ID}>
                  <div className="Card-info_tier_name">
                    <h1>{tier.TierName}</h1>
                  </div>
                  <div className="Card-info_description">
                    <p>description</p>
                  </div>
                  <div className="Card-info_price">
                    <h2>{tier.Price}</h2>
                    <p>/เดือน สำหรับ 1 คน</p>
                  </div>
                  <div className="Card-info_ability">
                    <h3> ability 1</h3>
                  </div>
                  <div className="Card-info_button_Space">
                    <div
                      className="Card-info_button"
                      onClick={() => handleClickSelectTier(tier)}
                    >
                      click here
                    </div>
                  </div>
                </Card>
              ))}

              <Modal
                title="ชำระเงิน"
                className="Modal-Payment"
                centered
                open={openModal}
                onCancel={handleCancel}
                width={1200}
                style={{ padding: "10px 10px" }}
                footer={(_, { OkBtn, CancelBtn }) => <></>}
              >
                <div className="ant-modal-body-area">
                  <Form
                    className="Modal-Payment-FomrInput"
                    onFinish={handleSubmit}
                  >
                    <div className="ant-modal-content-area">
                      <div className="Modal-Payment-Content">
                        <div className="Modal-Payment-selectPaymentType">
                          <p className="Modal-Payment-InputForm-label_PaymentType">
                            วิธีการชำระ
                          </p>
                          <div className="Modal-Payment-selectPaymentType-Button">
                            {PaymentType.map((paymentType) => (
                              <>
                                <div
                                  className="Modal-PaymentType-button"
                                  onClick={() =>
                                    handleClickSelectPaymentType(paymentType)
                                  }
                                >
                                  {paymentType.PaymentType}
                                </div>
                              </>
                            ))}
                          </div>
                        </div>
                        <div className="Modal-Payment-InputForm">
                          <p className="Modal-Payment-InputForm-label_totalPrice">
                            totalPrice
                          </p>
                          <input
                            className="Modal-Payment-InputForm-inputTotalPrice"
                            name="TotalPrice"
                            value={Object(userSelectTier[0]).Price}
                          ></input>
                          <p className="Modal-Payment-InputForm-label_Date">
                            date
                          </p>
                          <input
                            className="Modal-Payment-InputForm-inputDate"
                            type="date"
                            name="PaymentDate"
                            onChange={handleInput}
                          ></input>
                          <p className="Modal-Payment-InputForm-label_note">
                            note
                          </p>
                          <input
                            className="Modal-Payment-InputForm-inputNote"
                            name="Note"
                            onChange={handleInput}
                          ></input>
                          <p className="Modal-Payment-InputForm-label_uploadImage">
                            image
                          </p>
                          <input
                            className="Modal-Payment-InputForm-inputImage"
                            type="file"
                            name="MoneySlip"
                            onChange={(e) => {
                              uploadImage(e);
                            }}
                            id="file"
                            data-multiple-caption="{count} files selected"
                            multiple
                          />
                          <div className="Modal-Payment-InputForm-ImageArea">
                            <img
                              className="Modal-Payment-InputForm-Image"
                              src={moneySlip}
                              style={{ width: 250 }}
                            ></img>
                          </div>
                        </div>
                        <div className="Modal-Payment-total">
                          <div className="Modal-Payment-total-Top">
                            <p className="Modal-Payment-total-Top-labelTopic">
                              ยอดการชำระ
                            </p>
                          </div>
                          <div className="Modal-Payment-total-Middle">
                            {userSelectTier.map((userSelectTier) => (
                              <>
                                <div className="Modal-PaymentType-total-Middle-text">
                                  {userSelectTier.TierName}
                                </div>
                              </>
                            ))}
                          </div>
                          <div className="Modal-Payment-total-2rdMiddle">
                            <div className="Modal-Payment-total-2rdMiddle-textTotal">
                              <p>Total</p>
                            </div>
                            <div className="Modal-Payment-total-2rdMiddle-space"></div>
                            <div className="Modal-Payment-total-2rdMiddle-textTotalPrice">
                              {userSelectTier.map((userSelectTier) => (
                                <>
                                  <div className="">{userSelectTier.Price}</div>
                                </>
                              ))}
                            </div>
                          </div>
                          <div className="Modal-Payment-total-bottom">
                            <button
                              className="Modal-Payment-total-cancelButton"
                              onClick={handleCancel}
                              type="button"
                            >
                              Cancel
                            </button>
                            <button
                              className="Modal-Payment-total-confirmButton"
                              type="submit"
                            >
                              submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              </Modal>
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
}
export default Payment;

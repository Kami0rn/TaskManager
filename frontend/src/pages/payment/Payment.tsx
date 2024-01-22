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

  const handleClickSelectPaymentType = (
    selectedPaymentType: PaymentTypeInterface
  ) => {
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
    values.PaymentTypeID = Object(userSelectPaymentType[0]).ID;
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
        content: res.message,
      });
    }
  };

  //modal
  const handleCancel = () => {
    setUserSelectTier([]);
    setUserSelectPaymentType([]);
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

      <div style={{ height: "60px" }}></div>
      <div
        style={{
          display: "flex",
          padding: "10px 10px 10px 10px",
          height: "98vh",
          width: "100%",
          backgroundColor: "rgb(15 23 42)",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div className="flex w-full relative justify-center items-center">
          <div className="flex w-full h-11/12 relative justify-center item-center">
            <div className="content_payment tec">
              <div className="Header-in_content_payment">
                <div className="Header-Text-in_content_payment">
                  <h1 className="text-2xl font-bold text-slate-900">
                    DO YOU WANT TO BE PRO?
                  </h1>
                </div>
              </div>
              <hr></hr>
              <div className="content-in_content_payment space-x-6 ">
                {tier.map((tier) => (
                  <div
                    className="Card-info drop-shadow-lg p-4"
                    key={tier.ID}
                    style={{ minWidth: "196px" }}
                  >
                    <div className="Card-info_tier_name ">
                      <h1 className="text-2xl font-bold uppercase text-white">
                        {tier.TierName}
                      </h1>
                    </div>
                    <div className="Card-info_description text-base text-white">
                      <p>description</p>
                    </div>
                    <div className="Card-info_price text-white">
                      <h2 className="text-xl font-bold">{tier.Price} ฿</h2>
                      <p className="text-base">/เดือน สำหรับ 1 คน</p>
                    </div>
                    <div className="Card-info_ability text-base text-white">
                      <h3> ability 1</h3>
                    </div>
                    <div className="Card-info_button_Space text-base ">
                      <button
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={() => handleClickSelectTier(tier)}
                      >
                        click here
                      </button>
                    </div>
                  </div>
                ))}

                <Modal
                  title="ชำระเงิน"
                  className="Modal-Payment"
                  centered
                  open={openModal}
                  onCancel={handleCancel}
                  width={1200}
                  style={{ padding: "10px" }}
                  footer={(_, { OkBtn, CancelBtn }) => <></>}
                >
                  <hr></hr>
                  <div className="ant-modal-body-area">
                    <Form
                      className="Modal-Payment-FomrInput"
                      onFinish={handleSubmit}
                    >
                      <div className="ant-modal-content-area">
                        <div className="Modal-Payment-Content">
                          <div className="Modal-Payment-selectPaymentType mr-2">
                            <p className="Modal-Payment-InputForm-label_PaymentType text-lg font-bold my-1">
                              ชำระด้วยธนาคาร
                            </p>
                            <div className="Modal-Payment-selectPaymentType-Button">
                              {PaymentType.map((paymentType) => (
                                <>
                                  <button
                                    type="button"
                                    className=" w-full min-w-32 text-white bg-gradient-to-r from-cyan-500 to-blue-500 
                                    hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                    onClick={() =>
                                      handleClickSelectPaymentType(paymentType)
                                    }
                                  >
                                    {paymentType.PaymentType}
                                  </button>
                                </>
                              ))}
                            </div>
                          </div>
                          <div className="vl border-l-2 rounded-lg"></div>
                          {/* ----------------------------------------------- */}
                          <div className="Modal-Payment-InputForm mx-2">
                            <p className="Modal-Payment-InputForm-label_totalPrice text-lg font-bold py-1">
                              totalPrice
                            </p>
                            <input
                              className="input input-bordered input-info input-md w-full max-w-xs"
                              name="TotalPrice"
                              value={Object(userSelectTier[0]).Price}
                            ></input>
                            <p className="Modal-Payment-InputForm-label_Date text-lg font-bold py-1">
                              date
                            </p>
                            <input
                              className="input input-bordered input-info input-md w-full max-w-xs"
                              type="date"
                              name="PaymentDate"
                              onChange={handleInput}
                            ></input>
                            <p className="Modal-Payment-InputForm-label_note text-xl font-bold py-1">
                              note
                            </p>
                            <input
                              className="input input-bordered input-info input-md w-full max-w-xs"
                              name="Note"
                              onChange={handleInput}
                            ></input>
                            <p className="Modal-Payment-InputForm-label_uploadImage">
                              image
                            </p>
                            <input
                              className="file-input  file-input-bordered file-input-info file-input-sm w-full max-w-xs mb-3"
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
                                style={{ width: 200 }}
                              ></img>
                            </div>
                          </div>
                          <div className="vl border-l-2 rounded-lg"></div>
                          {/* ----------------------------------------------- */}
                          <div className="Modal-Payment-total  ml-4 border-solid border-2 border-cyan-600 rounded-xl shadow-xl">
                            <div className="Modal-Payment-total-Top">
                              <p className="Modal-Payment-total-Top-labelTopic text-lg font-bold my-1">
                                ยอดการชำระ
                              </p>
                            </div>
                            <hr></hr>
                            <div className="Modal-Payment-total-Middle">
                              {userSelectTier.map((userSelectTier) => (
                                <>
                                  <div className="flex w-1/3 justify-start text-">
                                    {userSelectTier.TierName}
                                  </div>
                                  <div className="flex w-2/3 justify-end">
                                    ฿{userSelectTier.Price}
                                  </div>
                                </>
                              ))}
                            </div>
                            <hr></hr>
                            <div className="Modal-Payment-total-2rdMiddle space-x-4 w-full">
                              <div className="Modal-Payment-total-2rdMiddle-textTotal w-1/3">
                                <p className="text-bold flex justify-start">
                                  Total
                                </p>
                              </div>
                              <div className="Modal-Payment-total-2rdMiddle-textTotalPrice flex w-2/3 justify-end">
                                {userSelectTier.map((userSelectTier) => (
                                  <>
                                    <div className="font-bold text-xl">
                                      ฿{userSelectTier.Price}
                                    </div>
                                  </>
                                ))}
                              </div>
                            </div>
                            <hr></hr>
                            <div className="Modal-Payment-total-bottom space-x-4">
                              <button
                                className="btn btn-outline btn-sm  hover:bg-gradient-to-r from-cyan-500 to-blue-500  "
                                onClick={handleCancel}
                                type="button"
                              >
                                Cancel
                              </button>
                              <button
                                className="btn btn-active btn-sm text-white bg-cyan-500 hover:bg-gradient-to-r from-cyan-500 to-blue-500  "
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
          </div>
        </div>
      </div>
    </>
  );
}
export default Payment;

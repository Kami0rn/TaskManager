import React from "react";
import "./Register.css";
import { Layout, Space,App as sss, Button,Form , message,  Input, } from 'antd';
// import { useNavigate } from "react-router-dom";
import { CreateUser } from "../../services/http/user/user";
import { UserInterface } from "../../interfaces/Iuser";
import BG from '../../assets/etc/BG.png';
import raw from '../../assets/etc/raw.jpg';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom" ;

 

const arrayBufferToHex = (arrayBuffer : any) => {
  const view = new DataView(arrayBuffer);
  let hex = '';
  for (let i = 0; i < view.byteLength; i += 1) {
    const value = view.getUint8(i);
    hex += value.toString(16).padStart(2, '0');
  }
  return hex;
};

const sha256 = async (message : any) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return arrayBufferToHex(hashBuffer);
};

//ตกเเต่งส่วนหัว
const { Header, Content } = Layout;
const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  justifyContent: "center",
  color: 'white',
  height: 60,
  paddingInline: 40,
  lineHeight: '25px',
  display: "flex",
  backgroundColor: 'white',
};
//ตกเเต่งส่วนตัว
const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 650,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#FFF8F0',
    backgroundImage: `url(${BG})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%', // Updated property
};
//ที่เขียนเเบบนี้ไม่รู้เหมือนกันก็อปantมา
const Register: React.FC = () => {
  // Use the useNavigate hook at the component level
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: UserInterface) => {
    const concatenatedString = `${values.UserName}${values.Password}`;
    const hashedPassword = await sha256(concatenatedString);
    values.HashedPassword = hashedPassword;

    let res = await CreateUser(values);

    if (res.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });

      // Use navigate here to navigate to the desired route ("/" in this case)
      navigate('/login');
    } else {
      console.log(res);
    }
  };
  return (
    <>
     <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@500&family=PT+Sans&display=swap');
        </style>
    <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@500&family=PT+Sans&display=swap');
        </style>
      {/* //เกี่ยวกับข้อความเเจ้งเตือน */}
      {contextHolder}
      {/*  */}
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
<div className="registerBox">
    
      <Layout >  
        
        {/* ส่วนหัว */}
        <Header style={headerStyle}>
          <h2>Soyju</h2>
        </Header>    
        {/* ส่วนตัว  */}
        <Content style={contentStyle}>

          <div className='form'>
            
            {/* ใช้ฟอร์มจากant */}
            <Form onFinish={onFinish} autoComplete="off">
              
                
              {/* ส่วนนี้เป็นกล่องinput ชื่อname=ต้องตรงกับinterfacesที่เราต้องการใส่เข้าไป */}
              <div className="registerBox">
                <div className="Box">
                  <img src={raw} alt="" />
                </div>
                <div className="leftRegist">
                <h1 id = "Comname">Syncify</h1>
                <h4 id="Signup">Sign up</h4>
              

                    <Form.Item label="" name="UserName"rules={[{required: true,message: "กรุณากรอก UserName!",},]}>
                        <Input placeholder='UserName'></Input>
                    </Form.Item>
                    <Form.Item label=""name="FullName"rules={[{required: true,message: "กรุณากรอกชื่อ !",},]}>
                        <Input placeholder='FullName'></Input>
                    </Form.Item>
                    <Form.Item label="" name="Email"rules={[{type: "email",message: "รูปแบบอีเมลไม่ถูกต้อง !",},{required: true,message: "กรุณากรอก email!",},]}>
                        <Input placeholder='email'></Input>
                    </Form.Item>
                    <Form.Item label="" name="Password"rules={[{required: true,message: "กรุณากรอก password!",},]}>
                        <Input.Password placeholder='password'></Input.Password>
                    </Form.Item>
                    <Form.Item>
                        <Button className="subBTN" style={{backgroundColor: '#f9b17a'}} block type='primary' htmlType='submit'>Sign Up</Button>
                    </Form.Item>
                    <div id="donthave">
                      <div><h4>Already have an account?</h4></div>
                      {/* <Link to='/register' className={styles.Link}>

                        <h4 className={styles.regisText}>register now!!</h4>
                      </Link> */}
                      <Link id="login" to='/login' className="Link">
                        <h4>Login</h4>
                      </Link>
                    </div>
                </div>
                
                
              </div>
            </Form>
          </div>
        </Content>
      </Layout>
  </div>
<div className="regitFooter">

</div>

    </Space>
    </>
  );
};


export default Register;
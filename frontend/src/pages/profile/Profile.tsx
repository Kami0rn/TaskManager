import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom"; // Use useNavigate instead of useHistory
import { Form, Input, Button, message, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Profile.css";
import BG from "../../assets/etc/BG.png";
import { useUser } from "../../context/context";
import { UserInterface } from "../../interfaces/Iuser";
import team_img from "../../assets/etc/team.png"
import rider from "../../assets/etc/riderBG.jpg"

import { GetUserByHash, GetUserById, GetUsers, UpdateUser, UpdateUsernameBio, } from "../../services/http/user/user";
import { CreateTeam, GetTeams, UpdateTeam } from "../../services/http/team/team";
import { GetTeamStatuses } from "../../services/http/teamStatus/teamStatus";


const arrayBufferToHex = (arrayBuffer: any) => {
  const view = new DataView(arrayBuffer); // Corrected line
  let hex = "";
  for (let i = 0; i < view.byteLength; i += 1) {
    const value = view.getUint8(i);
    hex += value.toString(16).padStart(2, "0");
  }
  return hex;
};

const sha256 = async (message: any) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return arrayBufferToHex(hashBuffer);
};

const ProfilePage = () => {
  const { id } = useParams(); //UserID
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [newData, setNewData] = React.useState<Partial<UserInterface>>({});

  const [fetch, setfetch] = useState(false);

  // const userIdFromLocalStorage = localStorage.getItem("UserID");
  // const userID = userIdFromLocalStorage
  // ? parseInt(userIdFromLocalStorage, 10)
  // : undefined;
  const filteredUser = users.find(
    (users) => users.ID === Number(id) //อาจเปลี่ยนเป็น userID จาก Local
  );

  const fetchData = async () => {
    const data = await GetUsers();
    setUsers(data);
  };

  const handleLogin = async (value: UserInterface) => {
    const concatenatedString = `${value.UserName}${value.Password}`;
    const hashedPassword = await sha256(concatenatedString);
    console.log(value);
    try {
      const user = await GetUserByHash(hashedPassword);

      if (user) {
        login(user);
        message.success("Login successful");
        console.log(user);
        navigate("/home");
      } else {
        message.error("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinish = async (values: UserInterface) => {
    setLoading(true);
    handleLogin(values);
    setLoading(false);
    console.log("Received values of form: ", values);
  };


  const getUser = async () => {
    let res = await GetUsers();
    if (res) {
      setUsers(res);
    }
  };

  const getUserByID = async () => {
    let res = await GetUserById(Number(id));
    if (res) {
      setNewData(res);
      console.log(res)
    }
  };


  useEffect(() => {
    setfetch(false)
    fetchData();
    getUserByID();
  }, [fetch]);

  async function save() {
    let data = {
      ID: Number(id),
      UserName: newData.UserName ?? "",
      Bio: newData.Bio ?? ""
    };

    let res = await UpdateUsernameBio(data);

    if (res.status) {
      message.success("บันทึกข้อมูลสำเร็จ");
      fetchData();
    } else {
      message.error(res.message);
    }
  }

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof ProfilePage;

    const { value } = event.target;

    setNewData({ ...newData, [id]: value });
  };

  return (
    <div className="profile">
        <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@500&family=PT+Sans&display=swap');
        </style>

      <div className="profile-box">
        <div className="profile-name-box">
          <div className="profile-pic">
            <img src={team_img} alt="" />
          </div>
          <div className="profile-name">
            <h3>{filteredUser?.FullName}</h3>
            <p>@{filteredUser?.UserName}</p>
          </div>
        </div> 

        <div className="manage-box">
          <div className="main-box">
            <img src={rider} alt="" />
            <h2>Manage your personal information</h2>
            <h3>About</h3>

            <div className="about-box">
              <h4>Username</h4>
              <input id="UserName" className="username-input" value={newData?.UserName} onChange={handleInputChange}/>
              <h4>Bio</h4>
              <textarea id="Bio" className="bio-input"  value={newData?.Bio} onChange={handleInputChange}/>
            </div>
            <button className="save-button" onClick={save}>Save</button>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default ProfilePage;

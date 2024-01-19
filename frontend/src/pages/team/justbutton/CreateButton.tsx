import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Use useNavigate instead of useHistory
import { Form, Input, Button, message, Divider } from "antd";
import "./CreateButton.css";

import { useUser } from "../../../context/context";
import { UserInterface } from "../../../interfaces/Iuser";

import { GetUserByHash, GetUserById, GetUsers, } from "../../../services/http/user/user";
import CreateTeamPage from "../createteam/CreateTeam";


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

const CreateButtonPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useUser();

  const [showpoppost, setshowpoppost] = useState(false);
  const handleClosepost = () => setshowpoppost(false);
  
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
  
  if (!open) return null;
  return (
    <div className="create-button-page">
        <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@500&family=PT+Sans&display=swap');
        </style>
        <CreateTeamPage open={showpoppost} onClose={handleClosepost} />
        <button onClick={() => setshowpoppost(true)}>create</button>

    </div>
  );
};

export default CreateButtonPage;

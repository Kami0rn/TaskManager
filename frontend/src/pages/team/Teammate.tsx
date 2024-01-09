import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Use useNavigate instead of useHistory
import { Form, Input, Button, message, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Teammate.css";
import BG from "../../assets/etc/BG.png";
import { useUser } from "../../context/context";
import { UserInterface } from "../../interfaces/Iuser";
import { TeamInterface } from "../../interfaces/Iteam";
import { TeammateInterface } from "../../interfaces/Iteammate";
import { TeamStatusInterface } from "../../interfaces/Iteamstatus";
import { RoleInterface } from "../../interfaces/Irole";
import team_img from "../../assets/etc/team.png"

import { GetUserByHash, GetUserById, GetUsers, } from "../../services/http/user/user";
import { CreateTeam, GetTeams, UpdateTeam, } from "../../services/http/team/team";
import { GetTeamStatuses } from "../../services/http/teamStatus/teamStatus";
import { CreateLeader, CreateTeammate, GetTeammates, } from "../../services/http/teammate/teammate";
import { GetRoles } from "../../services/http/role/role";
import { table } from "console";

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

const TeammatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const [newteam, setNewtTeam] = useState<Partial<TeamInterface>>({});
  const [team, setTeam] = useState<Partial<TeamInterface>>({
    TeamStatusID: 1,
  });
  const [teammate, setTeammate] = useState<Partial<TeammateInterface>>({});
  const [teamstatuses, setTeamStatuses] = useState<TeamStatusInterface[]>([]);
  const [user, setUser] = useState<Partial<UserInterface>>({
    ID: 1,
  });
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [teams, setTeams] = useState<TeamInterface[]>([]);
  const [teammates, setTeammates] = useState<TeammateInterface[]>([]);
  const [roles, setRoles] = useState<RoleInterface[]>([]);
  const [invitevalue, setInvitevalue] = useState("");
  const [teamname, setTeamname] = useState("");
  const [teamcreatedate, setTeamcreatedate] = useState(new Date());
  const [names, setNames] = useState<string[]>([]);
  const [selectIndex, setSelectIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState<"first"|"second"|"third">("first");
  const [count, setCount] = useState<number>(0);
  
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

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof TeammatePage;

    const { value } = event.target;

    setTeam({ ...team, [id]: value });
  };

  const getTeamStatus = async () => {
    let res = await GetTeamStatuses();
    if (res) {
      setTeamStatuses(res);
    }
  };

  const getUser = async () => {
    let res = await GetUsers();
    if (res) {
      setUsers(res);
    }
  };

  const getTeam = async () => {
    let res = await GetTeams();
    if (res) {
      setTeams(res);
    }
  };

  const getTeammate = async () => {
    let res = await GetTeammates();
    if (res) {
      setTeammates(res);
    }
  };

  const getRole = async () => {
    let res = await GetRoles();
    if (res) {
      setRoles(res);
    }
  };

  const getUserById = async () => {
    const user = await GetUserById(Number(1));
    setUser(user);
  };

  const getTeammateCount = async () => {

  }

  useEffect(() => {
    getTeamStatus();
    getUser();
    getTeam();
    getTeammate();
    getRole();
    getUserById();
  }, []);

  // ------------------พักทีม----------------------
  async function inactive() {
    let data2 = {
      ID: 1,
      TeamStatusID: 2,
    };

    let res = await UpdateTeam(data2);
    if (res.status) {
      message.success("ทีมคุณเข้าสู่สถานะพัก");
    } else {
      message.error(res.message);
    }
  }

  async function active() {
    let data3 = {
      ID: 1,
      TeamStatusID: 1,
    };

    let res = await UpdateTeam(data3);
    if (res.status) {
      message.success("ทีมคุณอยู่ในสถานะเปิดใช้งาน");
    } else {
      message.error(res.message);
    }
  }
  //-------------------พักทีม------------------------
  async function invitebyvalue(value: string) {
    const selectedUser = users.find(
      (user) => user.Email === value || user.UserName === value
    );
    const existingTeammate = teammates.find(
      (t) => t.UserID === selectedUser?.ID && t.TeamID === 1
    );

    if (existingTeammate) {
      message.error("คนเดิมไอสัส ซ้ำ!");
      return;
    }

    if (selectedUser) {
      let teammateData = {
        UserID: selectedUser?.ID,
        TeamID: 1,
        RoleID: 2,
      };

      let res = await CreateTeammate(teammateData);
      if (res.status) {
        message.success("เชิญ " + selectedUser.UserName +  " สำเร็จ");
        await getTeammate();
      } else {
        message.error(res.message);
      }
    } else {
      message.error("ไม่พบอีเมลหรือ " + value);
    }
  }
  //-------------------เชิญเพื่อนร่วมทีม------------------------
  async function invite() {
    if (names.length === 0) {
      invitebyvalue(invitevalue);
    }
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      invitebyvalue(name);
      setNames([]);
    }
  }

  useEffect(()=>{
    setSelectIndex(0)
  },[invitevalue])

  return (
    <div className="team">
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@500&family=PT+Sans&display=swap');
      </style>

      <div className="teammate-item">
          <div className="header">
            <h1>mumu</h1>
          </div>
          
          <div className="member-text">
            <h1>Members</h1>
          </div>

          <div className="all-member">
            <div className="member-menu">
              <sub>Member of Team</sub>
              <div className="choice">
                <li><a href="#"><h4>Team members</h4></a></li>
                <li><a href="#"><h4>Team status</h4></a></li>
              </div> 
            </div>
            
            <div className="member-main">
              <div className="membercount">
                <h1>Team members({count})</h1>
                <p>Team members can view and join all Workspace visible board and create new boards in Workspace.</p>
              </div>
              
              <div className="invitemember">
                <h1>Invite members to join you</h1>
                <p>Pro Tip! Add teammate by email, or username.</p>

                <Input
              id="EmailOrUserName"
              className="inputbar3"
              placeholder="e.g. garfield@gmail.com"
              value={invitevalue}
              onChange={(e) => {
                setShow(true)
                setInvitevalue(e.target.value)
                
              }}
              onKeyDown={(e) => {
                const filter_user = users.filter((u)=>u.UserName?.includes(invitevalue)).slice(0,6)
                if (e.code === "Enter") {
                  setInvitevalue("");
                  setNames([...names,filter_user.find((_,index)=>index === selectIndex)?.UserName || e.currentTarget.value]);
                }
                if (e.code === "ArrowDown") {
                  
                  if (selectIndex !== filter_user.length - 1) {
                    setSelectIndex(selectIndex+1)
                  }else{
                    setSelectIndex(0)
                  }
                }
                if (e.code === "ArrowUp") {
                  if (selectIndex !== 0) {
                    setSelectIndex(selectIndex-1)
                  }else{
                    setSelectIndex(filter_user.length-1)
                  }
                }
              }}
            />
            
            <table>   
            {show?users.filter((u)=>u.UserName?.includes(invitevalue)).slice(0,6).map((u,index)=>{
              if (invitevalue=="") {
                return
              }
              if (index===selectIndex){
                return <div className= "maybe-thisguy"><div className="listuser"><u style={{color: "#9aa8b6", margin:"0px"}}>{u.UserName} / {u.Email}</u></div></div>
              }
              return <div className= "listuser"style={{color: "#9aa8b6"}}>{u.UserName} / {u.Email}</div>
              }):null}
             </table>
             <button className="create-button2" onClick={invite}>Invite</button>
              </div>
            </div>
          </div>

          <button onClick={inactive}>พักทีม</button>
          <button onClick={active}>เปิดใช้งาน</button>
        
        </div>
      {/*------------------------------------------------------------------------------------------------- */}

      
      
      </div>
  );
};

export default TeammatePage;

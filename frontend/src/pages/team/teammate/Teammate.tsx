import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom"; // Use useNavigate instead of useHistory
import { Form, Input, Button, message, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Teammate.css";
import BG from "../../assets/etc/BG.png";
import { useUser } from "../../../context/context";
import { UserInterface } from "../../../interfaces/Iuser";
import { TeamInterface } from "../../../interfaces/Iteam";
import { TeammateInterface } from "../../../interfaces/Iteammate";
import { TeamStatusInterface } from "../../../interfaces/Iteamstatus";
import { RoleInterface } from "../../../interfaces/Irole";
import team_img from "../../../assets/etc/team.png";

import {
  GetUserByHash,
  GetUserById,
  GetUsers,
} from "../../../services/http/user/user";
import {
  CreateTeam,
  GetTeamByID,
  GetTeams,
  UpdateNumberOfTeammate,
  UpdateTeam,
} from "../../../services/http/team/team";
import { GetTeamStatuses } from "../../../services/http/teamStatus/teamStatus";
import {
  CreateLeader,
  CreateTeammate,
  DeleteSelectedTeammate,
  GetTeammates,
  GetUserFromTeamID,
} from "../../../services/http/teammate/teammate";
import { GetRoles } from "../../../services/http/role/role";
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
  const { id } = useParams(); //TeamID
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const [newData, setNewData] = React.useState<Partial<TeamInterface>>({});
  const [newTeammateData, setNewTeammateData] = useState<TeammateInterface[]>([]);
  const [team, setTeam] = useState<Partial<TeamInterface>>({});
  const [forteamid, setForteamid] = useState<number>();
  const [teamstatuses, setTeamStatuses] = useState<TeamStatusInterface[]>([]);
  const [user, setUser] = useState<Partial<UserInterface>>({});
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [teams, setTeams] = useState<TeamInterface[]>([]);
  const [teammates, setTeammates] = useState<TeammateInterface[]>([]);
  const [roles, setRoles] = useState<RoleInterface[]>([]);
  const [invitevalue, setInvitevalue] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [selectIndex, setSelectIndex] = useState(0);
  const [count, setCount] = useState<number>(0);

  // const userIdFromLocalStorage = localStorage.getItem("UserID");
  // const userID = userIdFromLocalStorage
  // ? parseInt(userIdFromLocalStorage, 10)
  // : undefined;
  // const filteredUser = users.find(
  //   (users) => users.ID === userID
  // );
  // const teamIdFromLocalStorage = localStorage.getItem("TeamID");
  // const teamID = teamIdFromLocalStorage
  // ? parseInt(teamIdFromLocalStorage, 10)
  // : undefined;
  const filteredTeam = teams.find((teams) => teams.ID === Number(id));

  const [fetch, setfetch] = useState(false);

  const fetchData = async () => {
    const data = await GetTeams();
    const data1 = await GetTeammates();
    const data2 = await GetTeamByID(Number(id));
    const data3 = await GetUserFromTeamID(Number(id));
    setTeams(data);
    setTeammates(data1);
    setNewData(data2);
    setNewTeammateData(data3);
  };

  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [clickedRowId, setClickedRowId] = useState<number | null>(null);

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

  const getTeamByID = async () => {
    let res = await GetTeamByID(Number(id));
    if (res) {
      setNewData(res);
      console.log(res);
    }
  };

  const getUserFromTeamID = async () => {
    let res = await GetUserFromTeamID(Number(id));
    if (res) {
      setNewTeammateData(res);
      console.log(res);
      console.log(newTeammateData);
    }
  };

  // ------------------พักทีม----------------------
  async function inactive() {
    let data2 = {
      ID: Number(id),
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
      ID: Number(id),
      TeamStatusID: 1,
    };

    let res = await UpdateTeam(data3);
    if (res.status) {
      console.log(newTeammateData);
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
      (t) => t.UserID === selectedUser?.ID && t.TeamID === Number(id)
    );

    if (existingTeammate) {
      message.error("ผู้ใช้ " + selectedUser?.UserName + " อยู่ในทีมอยู่แล้ว");
      return;
    }

    if (selectedUser) {
      let teammateData = {
        UserID: selectedUser?.ID,
        TeamID: Number(id),
        RoleID: 2,
      };

      let res = await CreateTeammate(teammateData);
      if (res.status) {
        message.success("เชิญ " + selectedUser.UserName + " สำเร็จ");
        let updatedTeamData = {
          ID: Number(id),
          NumberOfTeammate: (filteredTeam?.NumberOfTeammate || 0) + 1,
        };
        await UpdateNumberOfTeammate(updatedTeamData);
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
    fetchData();
  }

  function handlePress(e: React.KeyboardEvent<HTMLInputElement>) {
    console.log(e.code);
    const filter_user = users
      .filter((u) => u.UserName?.includes(invitevalue))
      .slice(0, 6);

    if (e.code === "Enter") {
      const newName =
        filter_user.find((_, index) => index === selectIndex)?.UserName ||
        e.currentTarget.value;
      setInvitevalue("");
      if (names.includes(newName)) {
        return;
      }
      setNames([...names, newName]);
    }
    if (e.code === "ArrowDown") {
      if (selectIndex !== filter_user.length - 1) {
        setSelectIndex(selectIndex + 1);
      } else {
        setSelectIndex(0);
      }
    }
    if (e.code === "ArrowUp") {
      if (selectIndex !== 0) {
        setSelectIndex(selectIndex - 1);
      } else {
        setSelectIndex(filter_user.length - 1);
      }
    }
    if (e.code === "Backspace") {
      if (!invitevalue) {
        setNames(names.slice(0, names.length - 1));
      }
    }
  }

  async function deleteSelectedTeammate(id: number) {
    const teammate = newTeammateData.find(
      (l) => l.ID === id
    );
    if (teammate?.Role?.RoleName === "Leader"){
      return; 
    }
    let res = await DeleteSelectedTeammate(id);
    if (res.status) {
      message.success("ลบ " + res.message.UserName + " สำเร็จ");
      await fetchData();
    } else {
      message.error(res.message);
    }
  }

  useEffect(() => {
    setfetch(false);
    fetchData();
    getTeamStatus();
    getUser();
    getTeam();
    getTeammate();
    getRole();
    getUserById();
    getTeamByID();
    getUserFromTeamID();
    setSelectIndex(0);
  }, [invitevalue, fetch]);

  return (
    <div className="team">
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@500&family=PT+Sans&display=swap');
      </style>

      <div className="teammate-item">
        <div className="header">
          <h1>{filteredTeam?.TeamName}</h1>
        </div>

        <div className="member-text">
          <h1>Members</h1>
        </div>

        <div className="all-member">
          <div className="member-menu">
            <sub>Member of your Team</sub>
            <div className="choice">
              <li>
                <a href="#">
                  <h4 className="teammembers">Team members</h4>
                </a>
              </li>
              <li>
                <a href="#">
                  <h4>Team status</h4>
                </a>
              </li>
            </div>
          </div>

          <div className="member-main">
            <div className="membercount">
              <h1>Team members({newData.NumberOfTeammate})</h1>
              <p>
                Team members can view and join all Workspace visible board and
                create new boards in Workspace.
              </p>
            </div>

            <div className="invitemember">
              <h1>Invite members to join you</h1>
              <p>Pro Tip! Add teammate by email, or username.</p>

              <div className="inputandbutton">
                <div className="input-table-box">
                  <div
                    className="inputbar3"
                    style={{ display: "flex", flexWrap: "wrap", gap: "0px" }}
                  >
                    {names.map((name, index) => (
                      <div key={index}>
                        <p>{name}</p>
                        <button
                          onClick={() => {
                            setNames(
                              names.filter(
                                (name_in_filter) => name_in_filter !== name
                              )
                            );
                          }}
                        >
                          X
                        </button>
                      </div>
                    ))}
                    <input
                      id="EmailOrUserName"
                      className="inputmail2"
                      placeholder={
                        names.length > 0 ? "" : "e.g. garfield@gmail.com"
                      }
                      value={invitevalue}
                      onChange={(e) => {
                        setInvitevalue(e.target.value);
                      }}
                      onKeyDown={handlePress}
                    />
                  </div>
                  <div className="inputandtable2">
                    <table>
                      {users
                        .filter((u) => u.UserName?.includes(invitevalue))
                        .slice(0, 6)
                        .map((u, index) => {
                          if (invitevalue == "") {
                            return;
                          }
                          if (index === selectIndex) {
                            return (
                              <div className="maybe-thisguy2">
                                <div className="listuser2">
                                  <a
                                    style={{ color: "#9aa8b6", margin: "0px" }}
                                  >
                                    {u.UserName} / {u.Email}
                                  </a>
                                </div>
                              </div>
                            );
                          }
                          return (
                            <div
                              className="listuser2"
                              style={{ color: "#9aa8b6" }}
                            >
                              {u.UserName} / {u.Email}
                            </div>
                          );
                        })}
                    </table>
                  </div>
                </div>
                <div className="invite-button2">
                  <button className="create-button2" onClick={invite}>
                    Invite
                  </button>
                </div>
              </div>
            </div>

            <div className="list-member">
              {newTeammateData.map((teammate, index) => (
                <div className="user-box" key={index}>
                  <div className="user-content">
                    <img src={team_img} alt="" />
                    <div className="username-content">
                      <h4>{teammate.User?.FullName}</h4>
                      <p>@{teammate.User?.UserName}</p>
                    </div>
                  </div>
                  <div className="button-box">
                    <p>{teammate.Role?.RoleName}</p>
                    <button
                      onClick={() => deleteSelectedTeammate(teammate.ID!)}
                    >
                      X Leave
                    </button>
                  </div>
                </div>
              ))}
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

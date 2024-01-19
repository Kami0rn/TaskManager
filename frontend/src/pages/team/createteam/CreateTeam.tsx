import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom"; // Use useNavigate instead of useHistory
import { Form, Input, Button, message, Divider } from "antd";
import "./CreateTeam.css";
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
  GetTeams,
  UpdateNumberOfTeammate,
  UpdateTeam,
} from "../../../services/http/team/team";
import { GetTeamStatuses } from "../../../services/http/teamStatus/teamStatus";
import {
  CreateLeader,
  CreateTeammate,
  GetTeammates,
} from "../../../services/http/teammate/teammate";
import { GetRoles } from "../../../services/http/role/role";

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

const CreateTeamPage = ({
  open,
  onClose,
}: {
  open: React.ReactNode;
  onClose: React.MouseEventHandler<HTMLAnchorElement>;
}) => {
  const { id } = useParams(); //UserID
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const [team, setTeam] = useState<Partial<TeamInterface>>({});
  const [teams, setTeams] = useState<TeamInterface[]>([]);
  const [forteamid, setForteamid] = useState<number>();
  const [teamstatuses, setTeamStatuses] = useState<TeamStatusInterface[]>([]);
  const [user, setUser] = useState<Partial<UserInterface>>({});
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [teammates, setTeammates] = useState<TeammateInterface[]>([]);
  const [roles, setRoles] = useState<RoleInterface[]>([]);
  const [invitevalue, setInvitevalue] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [selectIndex, setSelectIndex] = useState(0);
  const [page, setPage] = useState<"first" | "second">("first");

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
    const id = event.target.id as keyof typeof CreateTeamPage;

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
    const user = await GetUserById(Number(id));
    setUser(user);
  };

  const getTeammateCount = async () => {};

  useEffect(() => {
    getTeamStatus();
    getUser();
    getTeam();
    getTeammate();
    getRole();
    getUserById();
  }, []);

  async function createteam() {
    const currentTimestamp = Date.now();
    const currentDate = new Date(currentTimestamp);

    let teamData = {
      TeamName: team.TeamName,
      TeamCreateDate: currentDate,
    };

    let res = await CreateTeam(teamData);
    if (res.status) {
      message.success("สร้างทีมสำเร็จ");
      setForteamid(res.message.ID);
      let leaderdata = {
        UserID: Number(id),
        RoleID: 1,
      };
      let res2 = await CreateLeader(leaderdata);
      if (res2.status) {
        await getTeammate();
        setPage("second");
      }
    } else {
      message.error("มีชื่อทีมนี้อยู่แล้ว กรุณาลองใหม่");
    }
  }

  // async function createteamwithinvite() {
  //   const currentTimestamp = Date.now();
  //   const currentDate = new Date(currentTimestamp);

  //   let teamData = {
  //     TeamName: team.TeamName,
  //     TeamCreateDate: currentDate,
  //     TeamStatusID: team.TeamStatusID,
  //   };

  //   let res = await CreateTeam(teamData);
  //   if (res.status) {
  //     message.success("สร้างทีมสำเร็จ");
  //     let leaderdata = {
  //       UserID: user.ID,
  //       RoleID: 1,
  //     };
  //     let res2 = await CreateLeader(leaderdata);
  //     if (res2.status) {
  //       if ((invitevalue) || (names.length>0)) {
  //         await getTeammate();
  //         await invite();
  //       }
  //     }
  //   } else {
  //     message.error("มีชื่อทีมนี้อยู่แล้ว กรุณาลองใหม่");
  //   }
  // }

  async function invitebyvalue(value: string) {
    const selectedUser = users.find(
      (user) => user.Email === value || user.UserName === value
    );
    const existingTeammate = teammates.find(
      (t) => t.UserID === selectedUser?.ID && t.TeamID === forteamid
    );

    const team = teams.find((t) => t.ID === forteamid);

    if (existingTeammate) {
      message.error("ผู้ใช้ " + selectedUser?.UserName + " อยู่ในทีมอยู่แล้ว");
      return;
    }

    if (selectedUser) {
      let teammateData = {
        UserID: selectedUser?.ID,
        TeamID: forteamid,
        RoleID: 2,
      };

      let res = await CreateTeammate(teammateData);
      if (res.status) {
        message.success("เชิญ " + selectedUser.UserName + " สำเร็จ");
        let updatedTeamData = {
          ID: forteamid,
          NumberOfTeammate: (team?.NumberOfTeammate || 0) + 1,
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
      addName(newName);
    }
    const lastIndex = filter_user.length - 1;
    if (e.code === "ArrowDown") {
      setSelectIndex(selectIndex === lastIndex ? 0 : selectIndex + 1);
    }
    if (e.code === "ArrowUp") {
      setSelectIndex(selectIndex === 0 ? lastIndex : selectIndex - 1);
    }
    if (e.code === "Backspace") {
      if (!invitevalue) {
        setNames(names.slice(0, names.length - 1));
      }
    }
  }
  const addName = (name: string) => {
    if (names.includes(name)) {
      return;
    }
    setNames([...names, name]);
    setInvitevalue("");
  };
  useEffect(() => {
    setSelectIndex(0);
  }, [invitevalue]);

  if (!open) return null;
  return (
    <div className="create-team">
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@500&family=PT+Sans&display=swap');
      </style>

      {page === "first" ? (
        <>
          <div className="createteam-item">
            <div className="team-container">
              <div className="team-item">
                <h1>Let's create your own Team</h1>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Nihil reiciendis repellendus tempora!
                </p>

                <h2>Team name</h2>
                <input
                  id="TeamName"
                  className="inputbar1"
                  placeholder="Lasagna's Co."
                  value={team.TeamName}
                  onChange={handleInputChange}
                />

                <sub>This is the name of your team or organization.</sub>
                <button
                  className="continue-button"
                  onClick={() => {
                    createteam();
                  }}
                >
                  Continue
                </button>
              </div>

              <div className="image-text-container">
                <div className="text-in-container">
                  <a onClick={onClose}>X</a>
                </div>

                <div className="image-container">
                  <img src={team_img} alt="" />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="inviteteam-item">
            <div className="invite-container">
              <div className="invite-item">
                <h1>Invite your Team</h1>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Nihil reiciendis repellendus tempora!
                </p>

                <h2>Team members</h2>

                <div
                  className="inputbar2"
                  style={{ display: "flex", flexWrap: "wrap", gap: "0px" }}
                >
                  {names.map((name, index) => (
                    <div key={index}>
                      <p>{name}</p>
                      <button onClick={() => {
                          setNames(names.filter((name_in_filter) => name_in_filter !== name));
                      }}>
                      X
                      </button>
                    </div>
                  ))}
                  <input
                    id="EmailOrUserName"
                    className="inputusername"
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

                <div className="inputandtable">
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
                            <div className="maybe-thisguy">
                              <div className="listuser">
                                <p
                                  style={{ color: "#9aa8b6", fontSize:"16px", margin: "0px" }}
                                  onClick={() => addName(u.UserName!)}
                                >
                                  {u.UserName} / {u.Email}
                                </p>
                              </div>
                            </div>
                          );
                        }
                        return (
                          <div
                            className="listuser"
                            style={{ color: "#9aa8b6" }}
                            onClick={() => addName(u.UserName!)}
                          >
                            {u.UserName} / {u.Email}
                          </div>
                        );
                      })}
                  </table>
                </div>

                <div className="sub-container">
                  <sub className="pro-tip">Pro Tip!</sub>

                  <sub className="pro-main">
                    Add teammate by email, or username
                  </sub>
                </div>

                {/* <li ><a className="invite-butt" onClick={invite} href="">เชิญเพื่อนร่วมงาน</a></li> */}
                <button className="create-button" onClick={invite}>
                  Invite to Team
                </button>

                <div className="mid-text">
                  <a href="">
                    <u className="later-text">I'll do this later</u>
                  </a>
                </div>

                <button
                  className="back-button"
                  onClick={() => setPage("first")}
                >
                  Back
                </button>
              </div>

              <div className="image-text-container">
                <div className="text-in-container">
                  <a onClick={onClose}>X</a>
                </div>
                <div className="image-container">
                  <img src={team_img} alt="" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/*------------------------------------------------------------------------------------------------- */}
    </div>
  );
};

export default CreateTeamPage;

import React from "react";
import { useNavigate, Link } from "react-router-dom";

function ProjectSidebar() {
  return (
    <div className="sidebarIndex h-screen">
      <div className="sidebarBody bg-neutral-700 size-1/6 h-screen">
        <button className="sidebarHeader bg-neutral-800 mx-10">
          <Link to="/profile" className="sidebarMainBTN text-white">
            หน้าหลัก
          </Link>
        </button>
        <div className="sidebarWorkspaceIndex text-white">
          พื้นที่ทํางาน
          <div className="sidebarWorkspaceProfile">
            <img src="" alt="" />
            <p className="sidebarWorkspaceName text-white">ชื่อ - นามสกุล</p>
          </div>
          <div className="sidebarWorkspaceOther flex flex-col">
            <button className="sidebarWorkspaceOtherBoard bg-neutral-600 my-0.5 mx-1 rounded">กระดาน</button>
            <button className="sidebarWorkspaceOtherMember bg-neutral-600 my-0.5 mx-1 rounded" >สมาชิก</button>
          </div>
        </div>
        <div className="sidebarPOVIndex text-white">
          มุมองพื้นที่ทํางาน
          <div className="sidebarPOVProfile flex flex-col justify-center">
            <button className="sidebarPOVCalendar bg-neutral-300 text-neutral-950 mx-2 w-4/5 rounded-md">
              ปฎิทิน
            </button>
          </div>
        </div>
        <div className="sidebarYouProject flex flex-col justify-center">
          โปรเจคของคุณ
          <div>
            <button className="sidebarYouProjectBTN bg-neutral-400 text-neutral-950 mx-2 w-4/5 rounded-md">
              ProjectName
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectSidebar;

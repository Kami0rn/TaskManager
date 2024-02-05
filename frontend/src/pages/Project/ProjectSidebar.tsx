import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function ProjectSidebar() {
  const [projectData, setProjectData] = useState<any>(null);
  const navigate = useNavigate();

  const fetchData = async (projectId: number) => {
    try {
      const userToken = localStorage.getItem('token');

      if (!userToken) {
        console.error('Token not found in localStorage');
        return;
      }

      const response = await fetch(`http://localhost:8081/users/getProject/${projectId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProjectData(data); // Store the fetched data in state
        console.log(data);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Assuming projectId needs to be obtained from somewhere
    const projectId = 1; // Replace with your logic to get the projectId
    fetchData(projectId);
  }, []); // Empty dependency array means this effect runs once after the initial render

  const handleCalendarClick = () => {
    navigate('/calendar');
  };

  const handleProjectClick = () => {
    navigate('/Project');
  };

  return (
    <div className="sidebarIndex h-screen">
      <div className="sidebarBody bg-neutral-700 size-1/6 h-screen">
        <button className="sidebarHeader bg-neutral-800 mx-10 rounded-md">
          <Link to="/profile" className="sidebarMainBTN text-white ">
            หน้าหลัก
          </Link>
        </button>
        <div className="sidebarWorkspaceIndex text-white">
          พื้นที่ทำงาน
          <div className="sidebarWorkspaceProfile">
            <img src="" alt="" />
            <p className="sidebarWorkspaceName text-white">ชื่อ - นามสกุล</p>
          </div>
          <div className="sidebarWorkspaceOther flex flex-col">
            <button className="sidebarWorkspaceOtherBoard bg-neutral-600 my-0.5 mx-1 rounded">กระดาน</button>
            <button className="sidebarWorkspaceOtherMember bg-neutral-600 my-0.5 mx-1 rounded">สมาชิก</button>
          </div>
        </div>
        <div className="sidebarPOVIndex text-white">
          มุมองพื้นที่ทำงาน
          <div className="sidebarPOVProfile flex flex-col justify-center">
            <button className="sidebarPOVCalendar bg-neutral-300 text-neutral-950 mx-2 w-4/5 rounded-md" onClick={handleCalendarClick}>
              ปฎิทิน
            </button>
          </div>
        </div>
        <div className="sidebarYouProject flex flex-col justify-center" onClick={handleProjectClick}>
          โปรเจคของคุณ
          <div>
            {projectData && (
              <button className="sidebarYouProjectBTN bg-neutral-400 text-neutral-950 mx-2 w-4/5 rounded-md">
                <h3>{projectData.data.ProjectName}</h3>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectSidebar;

import * as React from 'react';
import { useState, useEffect } from 'react';
import { ProjectInterface } from '../../interfaces/IProject';
import { CreateProject, GetProjectById, ListArchivedProject, ListProject, UpdateProject } from "../../services/http/project/project";
import { Button, message } from 'antd';
import "./dashboard.css"
import "./CardSlider.css"
import CardSlider from './CardSlider';
import { ListRecentProjectByUserID } from '../../services/http/projectHistory/projectHistory';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [projectData, setProjectData] = useState<ProjectInterface[]>([]);
    const [archivedProjectData, setArchivedProjectData] = useState<ProjectInterface[]>([]);
    const [recentProjectData, setRecentProjectData] = useState<ProjectInterface[]>([]);
    const navigate = useNavigate();

    const HandleProjectListing = async () => {

        let res = await ListProject()
        if (res) {
            console.log(res);
            setProjectData(res);
        }
        else {
            messageApi.open({
                type: "error",
                content: "Fetch Failed"
            })
            console.log("List Failed");
            console.log(res);
        }
    }

    const HandleListArchivedProject = async () => {
        let res = await ListArchivedProject();

        if (res) {
            console.log("Listed archived projects");
            console.log(res);
            setArchivedProjectData(res);
        }
        else {
            console.log("Connot list archived project");
            console.log(res);
        }
    }
    const HandleListRecentProject = async (userID:number) => {
        let res = await ListRecentProjectByUserID(userID);

        if (res) {
            console.log("Listed recent projects");
            console.log(res);
            setRecentProjectData(res);
        }
        else {
            console.log("cannot list recent project");
            console.log(res);
        }
    }

    useEffect(() => {
        HandleProjectListing();
        // Must receive userID from local storage
        HandleListRecentProject(1);
    }, [])

    return (
        <div className='flex flex-wrap w-screen h-screen pt-20'>
            <div className='w-[140px] h-screen bg-white'>

            </div>
            <div className='ml-12'>
                {contextHolder}
                <div>
                    <h1>Recent</h1>
                    <CardSlider projectData={recentProjectData} isRecent={true} />
                </div>
                <div>
                    <h1>Projects in this workspace</h1>
                    <CardSlider projectData={projectData} isRecent={false}/>
                </div>
                <Button onClick={() => navigate(`/myProject`)}>My project</Button>

            </div>
        </div>
    );
}

export default Dashboard;
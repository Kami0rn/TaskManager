import * as React from 'react';
import { useState, useEffect } from 'react';
import { ProjectInterface } from '../../interfaces/IProject';
import { CreateProject, GetProjectById, ListArchivedProject, ListProject, UpdateProject } from "../../services/http/project/project";
import { Button, message } from 'antd';
import "./dashboard.css"
import "./CardSlider.css"
import CardSlider from './CardSlider';


const Dashboard = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [projectData, setProjectData] = useState<ProjectInterface[]>([]);
    const [archivedProjectData, setArchivedProjectData] = useState<ProjectInterface[]>([]);

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

    useEffect(() => {
        HandleProjectListing();
    }, [])

    return (
        <div className='flex flex-wrap w-screen h-screen pt-20'>
            <div className='w-[140px] h-screen bg-white'>

            </div>
            <div className='ml-12'>
                {contextHolder}
                <div>
                    <h1>Recent</h1>
                    <CardSlider projectData={projectData} />
                </div>
                <div>
                    <h1>Projects in this workspace</h1>
                    <CardSlider projectData={projectData} />
                </div>
                <Button onClick={() => HandleListArchivedProject()}>Achived projects</Button>

            </div>
        </div>
    );
}

export default Dashboard;
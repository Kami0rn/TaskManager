import * as React from 'react';
import { useState, useEffect } from 'react';
import { ProjectInterface } from '../../interfaces/IProject';
import { CreateProject, GetProjectById, ListArchivedProject, ListProject, UpdateProject } from "../../services/http/project/project";
import { Button, message } from 'antd';
import "./dashboard.css"
import "./CardSlider.css"
import CardSlider from './CardSlider';


import { ProjectCreateModal } from './ProjectCreateModal';



const Dashboard = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [projectData, setProjectData] = useState<ProjectInterface[]>([]);

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

    useEffect(() => {
        HandleProjectListing();
    },[])

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        variableWidth: true,
    };

    return (
        <div className='pt-20'>
            {contextHolder}
            <div>
                <h1>Recent</h1>
                <CardSlider projectData={projectData}/>
            </div>
            <div>
                <h1>Projects in this workspace</h1>
                <CardSlider projectData={projectData}/>
            </div>

            
        </div>
    );
}

export default Dashboard;
import { Button, ConfigProvider, Form, Input, Select, message } from 'antd';
import React, { useEffect, useState } from 'react'

import './ProjectCreateModal.css'
import { ProjectInterface } from '../../interfaces/IProject';
import { CreateProject } from '../../services/http/project/project';
import { useNavigate } from 'react-router-dom';
import { ListWorkspaceByTeamID } from '../../services/http/workspace/workspace';
import { WorkspaceInterface } from '../../interfaces/IWorkspace';
import { ProjectHistoryInterface } from '../../interfaces/IProjectHistory';
import { CreateProjectHistory } from '../../services/http/projectHistory/projectHistory';

const { DateTime } = require("luxon");

export const ProjectCreateModal = ({ visible, onClose }: { visible: boolean, onClose: any }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [projectData, setProjectData] = useState<ProjectInterface>();
  const [workspaceData, setWorkspaceData] = useState<WorkspaceInterface[]>([])

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const ListWorkspace = async (teamID:number) => {
    let res = await ListWorkspaceByTeamID(teamID);

    if (res) {
      console.log(res);
      console.log("got workspace");
      setWorkspaceData(res);
    }
    else{
      console.log(res);
      console.log("get no workspace");
    }
  }

  // Must receive teamID from local storage
  useEffect(() => {
    ListWorkspace(1);
  },[])
  /////////////////////////////////////////

  const handleOnclose = (e: any) => {
    if (e.target.id === "dashboard")
      onClose();
  };

  const HandleProjectHistoryCreate = async (projectID:number, userID:number) => {
    console.log("projectDataaaaa");
    console.log(projectData);
    let history:ProjectHistoryInterface = {
      RecentlyUse: DateTime.now(),
      ProjectID: projectID,
      UserID: userID,
    }

    let res = await CreateProjectHistory(history);

    if (res.status) {
      console.log("Created history"); 
      console.log(res); 
      setTimeout(() => {
        // if (projectData) navigate(`/projectPage`, {state: {projectID:projectData.ID},});
      }, 10000)
    }
    else {
      console.log("cannot create history");
      console.log(res);
    }
  }

  // Might be hard code
  const HandleProjectCreation = async (value: ProjectInterface) => {
    value.ProjectCreatedDate = DateTime.now();
    // initialize as default in schema
    value.ProjectSettingID = 1;
    value.ProjectStatusID = 1;
    console.log(value);
    let res = await CreateProject(value)
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "Create successful"
      })
      setProjectData(res.message);
      // console.log("res.message");
      // console.log(res.message);
      setTimeout(() => {
        form.resetFields();
        onClose();
      }, 10000)
      
    }
    else {
      messageApi.open({
        type: "error",
        content: "Something's wrong!"
      })
      console.log("Create Failed");
      console.log(res);
    }
  }

  useEffect(() => {
    if(projectData?.ID !== undefined)
        {HandleProjectHistoryCreate(projectData?.ID, 1);}
  },[projectData])

  if (!visible) return null;
  return (
    <div id='dashboard'
      onClick={handleOnclose}
      className='fixed inset-0 mt-20 mr-5 bg-opacity-30 flex items-start justify-end z-50' >
      {contextHolder}
      <div  className="flex flex-col bg-[#2d2d2d] p-2 rounded w-[400px] shadow-md text-white">
        <h1 className='place-self-center'>Create project</h1>
        <ConfigProvider
          theme={{
            components: {
              Form: {
                labelColor: '#ffff',
              },
            },
          }}
        >
          <Form form={form} layout='vertical' onFinish={HandleProjectCreation}>
            <Form.Item name="ProjectName" label='Project name' 
            rules={[{ required: true, message: 'Project name is required!' }, 
            { min: 3,max: 50, message: 'Project name must be 3-50 characters!' },
            {
              pattern: /^[a-zA-Z0-9 ]*$/,
              message: 'Project name must not contain special characters!',
            },]}>
              <Input placeholder='3-50 characters, not contains special characters'/>
            </Form.Item>
            <Form.Item name="ProjectDetail" label='Detail' 
            rules={[{max: 100, message: 'Project name must not be more than 100 characters!' },]}>
              <Input placeholder='max 100 charaters'/>
            </Form.Item>
            <Form.Item name="WorkspaceID" label='Workspace' rules={[{ required: true, message: 'Please select workspace!' }]}>
              <Select>
                {workspaceData.map((item) => (
                  <Select.Option value={item.ID}>{item.WorkspaceName}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#e09145',
                  },
                  components: {
                    Button: {

                    },
                  },
                }}
              >
                <Button type="primary" htmlType="submit" className='project-create-button' block>Create</Button>
              </ConfigProvider>

            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  )
}

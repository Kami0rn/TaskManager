import React, { useEffect, useState } from 'react'

import './ProjectPage.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { ProjectInterface } from '../../interfaces/IProject';
import { Button } from 'antd';
import { ProjectEditModal } from './EditModal';
import { GetProjectById, UpdateProject } from '../../services/http/project/project';

const { DateTime } = require("luxon");

const ProjectPage = () => {
    const location = useLocation();
    const locationState = location.state as { projectID: number };
    const [showProjectEditModal, setShowProjectEditModal] = useState(false);
    const handleOnClose = () => setShowProjectEditModal(false);
    const [projectData, setProjectData] = useState<ProjectInterface>();
    const navigate = useNavigate();
    const [isDelArchClicked, setIsDelArchClicked] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isArchive, setIsArchive] = useState(false);

    const GetProjectByID = async (projectID: number) => {
        let res = await GetProjectById(projectID);

        if (res) {
            console.log("got the project");
            console.log(res);
            setProjectData(res);
        }
        else {
            console.log("Fetch the project failed");
            console.log(res);
        }
    }

    const handleOnArchive = async (value: ProjectInterface | undefined) => {
        if (value !== undefined) {
            value.ProjectStatusID = 2;

            let res = await UpdateProject(value);
            if (res.status) {
                console.log("the project has been archived");
                console.log(res);
                setTimeout(() => {
                    setIsDelArchClicked(false);
                    setTimeout(() => {
                        navigate(`/dashboard`);
                    }, 1000)
                }, 500)
            }
            else {
                console.log("Cannot archive the project");
                console.log(res);
            }
        }
        else {
            console.log("the projectData is undefined");
        }
    }

    const handleOnDelete = async (value: ProjectInterface | undefined) => {
        if (value !== undefined) {

            value.ProjectStatusID = 3;
            value.DeletedAt = DateTime.now();

            let res = await UpdateProject(value);
            if (res.status) {
                console.log("the project has been deleted");
                console.log(res);
                setTimeout(() => {
                    setIsDelArchClicked(false);
                    setTimeout(() => {
                        navigate(`/dashboard`);
                    }, 1000)
                }, 500)

            }
            else {
                console.log("Cannot delete the project");
                console.log(res);
            }
        }
        else {
            console.log("the projectData is undefined");
        }
    }


    useEffect(() => {
        GetProjectByID(locationState.projectID);
    }, [showProjectEditModal])


    return (
        <div className='flex flex-wrap w-full h-full pt-20'>
            <div className='w-[140px] h-screen bg-white'>

            </div>
            <div className=''>
                <div className='flex flex-row h-10 bg-white space-x-80'>
                    <h1>{projectData?.ProjectName}</h1>
                    <div>
                        <Button onClick={() => { setShowProjectEditModal(true) }}>Edit</Button>
                        <Button>Setting</Button>
                        <Button onClick={() => { setIsDelArchClicked(true); setIsArchive(true); setIsDelete(false); }}>Archive</Button>
                        <Button onClick={() => { setIsDelArchClicked(true); setIsArchive(false); setIsDelete(true); }}>Delete</Button>
                    </div>
                </div>
                {projectData ? <ProjectEditModal onClose={handleOnClose} visible={showProjectEditModal} project={projectData} /> : null}
                <div className='m-auto'>
                    <h1>{projectData?.ID}</h1>
                    <h1>Project Page</h1>
                    <h1>Project Page</h1>
                    <h1>Project Page</h1>
                    <h1>Project Page</h1>
                </div>

                {/* Confirm Delete and Archive Modal */}
                {isDelArchClicked ?
                    <div
                        className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
                        <div className="w-full max-w-md bg-white shadow-lg rounded-md p-6 relative">
                            <svg onClick={() => setIsDelArchClicked(false)} xmlns="http://www.w3.org/2000/svg"
                                className="w-3.5 cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right" viewBox="0 0 320.591 320.591">
                                <path
                                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                    data-original="#000000"></path>
                                <path
                                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                    data-original="#000000"></path>
                            </svg>
                            <div className="my-8 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 fill-red-500 inline" viewBox="0 0 24 24">
                                    <path
                                        d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                        data-original="#000000" />
                                    <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                        data-original="#000000" />
                                </svg>
                                <h4 className="text-lg font-semibold mt-6">Are you sure you want to {(isDelete && !isArchive) ? "delete" : "archive"} this project?</h4>
                                <p className="text-sm text-gray-500 mt-4">This project, {projectData?.ProjectName} will be {(isDelete && !isArchive) ? "deleted permanently." : "archived."}</p>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <button
                                    onClick={() => {
                                        if (isDelete && !isArchive) handleOnDelete(projectData);
                                        else if (!isDelete && isArchive) handleOnArchive(projectData);
                                    }}
                                    type="button"
                                    className="px-6 py-2.5 rounded-md text-white text-sm font-semibold border-none outline-none bg-red-500 hover:bg-red-600 active:bg-red-500">{(isDelete && !isArchive) ? "Delete" : "Archive"}</button>
                                <button onClick={() => setIsDelArchClicked(false)} type="button"
                                    className="px-6 py-2.5 rounded-md text-black text-sm font-semibold border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200">Cancel</button>
                            </div>
                        </div>
                    </div>
                    : null}
            </div>
        </div>
    )
}

export default ProjectPage
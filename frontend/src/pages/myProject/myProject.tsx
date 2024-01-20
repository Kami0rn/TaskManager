import { useEffect, useState } from "react"
import { ProjectInterface } from "../../interfaces/IProject";
import { ListProject } from "../../services/http/project/project";
import { message } from "antd";



const MyProject = () => {
    const [projectData, setProjectData] = useState<ProjectInterface[]>([]);
    const [messageApi, contextHolder] = message.useMessage();

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
    }, [])

    return (
        <div className="p-20 ">
            {contextHolder}
            <div className=" flex flex-col  items-center border border-red-500 "><div className=" flex gap-4 text-white">
                <h1 className=" text-lg border border-red-500 ">Your projects</h1> 
                 <p className=" border border-red-500 text-sm   ">545454545</p>
                 </div>
                <div className="flex flex-wrap w-[1200px] justify-center mt-2 gap-6 border border-red-500 ">
                    {projectData.map((item) => (
                        <div className="w-[262px] h-[150px] rounded-xl p-4 text-xl text-white font-medium bg-gradient-to-tl to-[#FF8888] from-[#FFF500]">
                            <h1>{item.ProjectName}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyProject;
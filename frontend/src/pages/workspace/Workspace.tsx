import React, { useState, useEffect } from 'react';
import { Layout, Input, Form, message, Upload,Popover,Modal,Button,List,Select } from 'antd';
import './Workspace.css';
import {
  CreateWorkspace,
  ListWorkspaces,
  GetWorkspaceStatusById,
  GetWorkspaceById,
  UpdateWorkspace,
  DeleteWorkspaceByID,
} from '../../services/http/workspace/workspace';
import {GetTeams} from '../../services/http/team/team';
import { TeamInterface } from "../../interfaces/Iteam";
import { WorkspaceInterface } from '../../interfaces/Iworkspace';
import { ImageUpload } from '../../interfaces/Iworkspace_upload';
import { PlusOutlined,ExclamationCircleFilled } from "@ant-design/icons";

const { Content } = Layout;
const { TextArea } = Input;
const { confirm } = Modal;

const Workspace = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [workspaces, setWorkspaces] = useState<WorkspaceInterface[]>([]);
  const [image, setImage] = useState<ImageUpload | undefined>();
  const [editingWorkspace, setEditingWorkspace] = useState<WorkspaceInterface | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [showClosedWorkspaces, setShowClosedWorkspaces] = useState(false);
  const [closedWorkspaces, setClosedWorkspaces] = useState<WorkspaceInterface[]>([]);
  const [teams, setTeams] = useState<TeamInterface[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    // ตรวจสอบ editingWorkspace ว่ามีค่าหรือไม่
    if (editingWorkspace) {
      form.setFieldsValue({
        WorkspaceName: editingWorkspace.WorkspaceName,
        Description: editingWorkspace.Description,
      });
    } else {
      //ถ้า editingWorkspace เป็น null (ในกรณีที่กำลังสร้าง Workspace ใหม่) ให้ทำการรีเซ็ตค่าของฟอร์มทั้งหมดใหม่
      form.resetFields();
    }
  }, [editingWorkspace, form]);

  //เปิด Modal สร้าง Workspace
  const showModal = () => {
    setOpen(true);
  };
  //สร้าง Workspace
  const onFinishWorkspace = async (values: WorkspaceInterface) => {
    values.Image = image?.thumbUrl;
  
    const workspaceStatus = await GetWorkspaceStatusById(1);

    if (workspaceStatus) {
      values.WorkspaceStatusID = workspaceStatus.ID;

      console.log("Received JSON:", values);
      const res = await CreateWorkspace(values);

      if (res.status) {
        messageApi.open({
          type: "success",
          content: "บันทึกข้อมูลสำเร็จ",
        });

        setWorkspaces((prevWorkspaces) => [...prevWorkspaces, res.message]);
        message.success("Workspace created successfully.");
      } else {
        messageApi.open({
          type: "error",
          content: "บันทึกข้อมูลไม่สำเร็จ",
        });
      }
    } else {
      console.error("Failed to fetch WorkspaceStatus");
    }

    form.resetFields();
    setOpen(false);
  };
  // ปิด Modal สร้าง Workspace
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
    
  };
  // fileList image
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    setImage(e?.fileList[0])
    return e?.fileList;
  };
  //แสดง Date แบบกำหนด Format
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
  
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  //เปิด Modal การแก้ไข
  const showEditModal = async (workspace: WorkspaceInterface) => {
    setEditingWorkspace(workspace);
    setEditModalOpen(true);
  
    try {
      if (workspace.ID !== undefined) {
        const fullWorkspace = await GetWorkspaceById(workspace.ID);
  
        if (fullWorkspace) {
         
          form.setFieldsValue({
            WorkspaceName: fullWorkspace.WorkspaceName,
            Description: fullWorkspace.Description,
            Image: [
              {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: fullWorkspace.Image,
              },
            ],
          });
        } else {
          console.error("Failed to fetch full workspace data");
        }
      } else {
        console.error("Workspace ID is undefined");
      }
    } catch (error) {
      console.error("Error fetching full workspace data:", error);
    }
  };
  
  // ปิด
  const handleEditCancel = () => {
    setEditModalOpen(false);
    setEditingWorkspace(null);
    form.resetFields();
  };

  //แก้ไข Workspace
  const onEditFinish = async (values: WorkspaceInterface) => {
    values.Image = image?.thumbUrl;
  
    if (editingWorkspace && editingWorkspace.ID) {
      try {
        const [fullWorkspace, workspaceStatus] = await Promise.all([
          GetWorkspaceById(editingWorkspace.ID),
          editingWorkspace.WorkspaceStatusID
            ? GetWorkspaceStatusById(editingWorkspace.WorkspaceStatusID)
            : Promise.resolve(undefined), 
        ]);
  
        if (fullWorkspace && workspaceStatus) {
          // อัปเดตเฉพาะฟิลด์ที่ได้รับในแบบฟอร์ม
          fullWorkspace.WorkspaceName = values.WorkspaceName || fullWorkspace.WorkspaceName;
          fullWorkspace.Description = values.Description || fullWorkspace.Description;
          fullWorkspace.Image = values.Image || fullWorkspace.Image;
  
          // นำข้อมูล WorkspaceStatus มาใส่ใน fullWorkspace
          fullWorkspace.WorkspaceStatus = workspaceStatus;
  
          const updateRes = await UpdateWorkspace(fullWorkspace);
  
          if (updateRes.status) {
            messageApi.open({
              type: "success",
              content: "แก้ไขข้อมูลสำเร็จ",
            });
  
            setWorkspaces((prevWorkspaces) =>
              prevWorkspaces.map((w) => (w.ID === editingWorkspace.ID ? fullWorkspace : w))
            );
  
            message.success("Workspace update successfully.");
            handleEditCancel();
          } else {
            messageApi.open({
              type: "error",
              content: "แก้ไขข้อมูลไม่สำเร็จ",
            });
          }
        } else {
          console.error("Failed to fetch full workspace data or workspace status");
        }
      } catch (error) {
        console.error("Error fetching full workspace data or workspace status:", error);
      }
    }
  };
  
  // ลบ Workspace
  const handleDeleteWorkspace = (workspace: WorkspaceInterface | null) => {
    if (workspace) {
      // Call the function to update WorkspaceStatus to ID = 3
      updateWorkspaceStatus(workspace.ID, 3)
        .then(async () => {
          // อัปเดต UI โดยการลบ workspace จาก state ทันที
          setWorkspaces((prevWorkspaces) =>
            prevWorkspaces.filter((w) => w.ID !== workspace.ID)
          );
  
          // Delete the workspace
          const deleteRes = await DeleteWorkspaceByID(workspace.ID);
  
          if (deleteRes.status) {
            messageApi.open({
              type: "success",
              content: "ลบ Workspace สำเร็จ",
            });
          } else {
            messageApi.open({
              type: "error",
              content: "เกิดข้อผิดพลาดในการลบ Workspace",
            });
            fetchData(); 
          }
        })
        .catch((error) => {
          console.error("Error updating workspace status:", error);
          fetchData();
        });
    }
  };
  
 //ยืนยันการลบ Workspace
  const showConfirm = (workspace: WorkspaceInterface) => {
    confirm({
      title: 'Do you Want to delete this item?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      onOk() {
        handleDeleteWorkspace(workspace);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  //ยืนยันการปิดใช้งาน Workspace
  const showConfirmDisabled = async (workspace: WorkspaceInterface) => {
    try {
      const confirmResult = await new Promise((resolve) => {
        confirm({
          title: 'Do you Want to disable this Workspace?',
          icon: <ExclamationCircleFilled />,
          content: 'This action will disable the Workspace.',
          onOk() {
            resolve(true);
          },
          onCancel() {
            resolve(false);
          },
        });
      });

      if (confirmResult) {
        //เรียกใช้ฟังก์ชัน updateWorkspaceStatus เพื่ออัปเดต WorkspaceStatusID เป็น 2
        await updateWorkspaceStatus(workspace.ID, 2);

        // Manually update the UI by moving the closed workspace to the closedWorkspaces state
        setWorkspaces((prevWorkspaces) =>
          prevWorkspaces.filter((w) => w.ID !== workspace.ID)
        );

        // Add the closed workspace to closedWorkspaces state
        setClosedWorkspaces((prevClosedWorkspaces) => [...prevClosedWorkspaces, workspace]);
      }
    } catch (error) {
      console.error('Error confirming workspace disable:', error);
    }
  };

  //อัปเดต WorkspaceStatus
  const updateWorkspaceStatus = async (workspaceID: number | undefined, statusID: number) => {
    try {
      if (workspaceID === undefined) {
        console.error('Workspace ID is undefined');
        return;
      }

      // Fetch current workspace data
      const currentWorkspace = await GetWorkspaceById(workspaceID);

      if (currentWorkspace) {
        // Update WorkspaceStatusID to the new statusID
        currentWorkspace.WorkspaceStatusID = statusID;

        // Call the function to update the workspace
        await UpdateWorkspace(currentWorkspace);
        messageApi.open({
          type: 'success',
          content: 'Workspace has been disabled successfully.',
        });
      } else {
        console.error('Failed to fetch current workspace data');
      }
    } catch (error) {
      console.error('Error updating workspace status:', error);
    }
  };

  const fetchData = async () => {
    try {
      // Fetch workspaces with WorkspaceStatusID = 1
      const openWorkspaces = await ListWorkspaces({ statusID: 1 });
      setWorkspaces(openWorkspaces);

      // Fetch workspaces with WorkspaceStatusID = 2
      const closedWorkspaces = await ListWorkspaces({ statusID: 2 });
      setClosedWorkspaces(closedWorkspaces);

      const listTeam = await GetTeams();
      setTeams(listTeam);
        
    } catch (error) {
      console.error("Error fetching workspace data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  //เปิดใช้งาน Workspace
  const handleButtonClick = async (workspaceId: number | undefined) => {
    if (workspaceId !== undefined) {
      try {
        // เรียกใช้ฟังก์ชัน updateWorkspaceStatus เพื่ออัปเดต WorkspaceStatusID เป็น 1
        await updateWorkspaceStatus(workspaceId, 1);

        await fetchData();

        console.log(`Button clicked for workspace ID ${workspaceId}`);
      } catch (error) {
        console.error("Error updating workspace status:", error);
      }
    } else {
      console.error("Invalid workspace ID");
    }
  };


  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content>
        <div style={{ padding: 24, minHeight: '100vh', background: "#383838" }}>
          <div className='cards-containerWs1'>
            <div className='card-syncify'></div>
            <div className='card-syncifyimage'></div>
          </div>
          <div className='cards-containerWs2'>
            <div>
              {workspaces.map((workspace: WorkspaceInterface) => (
                <div className='card-workspace' key={workspace.ID}>
                  <h2>{workspace.WorkspaceName}</h2>
                  <p>{workspace.Description}</p>
                  <p>Create Date: {formatDate(workspace.WorkspaceCreatedDate)}</p>
                  {workspace.Image && (
                    <img src={workspace.Image} alt="Workspace Image" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                  )}
                  <p>Status: {workspace.WorkspaceStatus?.WorkspaceStatus || 'N/A'}</p>
                  <p>จำนวน Project: {workspace.NumberOfProject}</p>
                  <div className="menu">
                    <input
                      type="checkbox"
                      className="menu-open"
                      name={`menu-open-${workspace.ID}`}
                      id={`menu-open-${workspace.ID}`}
                    />
                    <label className="menu-open-button" htmlFor={`menu-open-${workspace.ID}`}>
                      <span className="hamburger hamburger-1"></span>
                      <span className="hamburger hamburger-2"></span>
                      <span className="hamburger hamburger-3"></span>
                    </label>
                    <a
                      className="menu-item"
                      onClick={() => showEditModal(workspace)}
                    >
                      แก้ไข
                    </a>
                     
                    <Popover content={<div>Your Popover Content Here
                      <div >
                          <Button  
                          onClick={(e) => {
                            e.preventDefault();
                            showConfirmDisabled(workspace);
                          }}
                          >ปิดใช้งาน</Button>
                          <Button 
                          onClick={(e) => {
                            e.preventDefault();
                            showConfirm(workspace);
                          }}
                          >ลบ</Button>
                         </div>
                      </div>}trigger="click" arrow={{ pointAtCenter: true }}>
                      <a className="menu-item">1</a>
                    </Popover>
      
   
                  </div>
                </div>
              ))}
            </div>

            <div className="card-Createworkspace">
              <a className="create-workspace-button" onClick={showModal}>
                + Create New Workspace
              </a>
            </div>
            {/* ----------------- */}
            {closedWorkspaces.length > 0 && (
              <Button onClick={() => setShowClosedWorkspaces((prev) => !prev)}>
                ดูพื้นที่ทำงานที่ถูกปิดทั้งหมด
              </Button>
            )}

            {showClosedWorkspaces && closedWorkspaces.length > 0 && (
              <List
                header={<div>Closed Workspaces</div>}
                bordered
                dataSource={closedWorkspaces}
                renderItem={workspace => (
                  <List.Item key={workspace.ID}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h2>{workspace.WorkspaceName}</h2>
                        <p>{workspace.Description}</p>
                        {/* Add other details as needed */}
                      </div>
                      <Button onClick={() => handleButtonClick(workspace.ID)} style={{ marginInline: 50 }}>
                        เปิดใหม่อีกครั้ง
                      </Button>
                    </div>
                  </List.Item>
                )}
              />
            )}
          </div>
        </div>
      </Content>

      {open && (
        <div className="custom-modal">
          <div className="modal-content">
            <Form
              form={form}
              name="basic"
              layout="vertical"
              onFinish={onFinishWorkspace}
              autoComplete="off"
              encType="multipart/form-data"
            >
              <Form.Item
                hasFeedback
                label="Name"
                name="WorkspaceName"
                initialValue={editingWorkspace?.WorkspaceName}
                validateTrigger="onBlur"
              >
                <Input placeholder="Validate required onBlur" />
              </Form.Item>
              <Form.Item label="Description" name="Description" initialValue={editingWorkspace?.Description}>
                <TextArea rows={4} style={{ width: '200%' }} />
              </Form.Item>
              <Form.Item
                label="Image"
                name="Image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload maxCount={1} multiple={false} listType="picture-card">
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>อัพโหลด</div>
                  </div>
                </Upload> 
              </Form.Item>
              <Form.Item
                label="Team"
                name="TeamID"  // ตรวจสอบว่ามี name="TeamID" ตรงนี้หรือไม่
                rules={[{ required: true, message: 'Please select a team!' }]}
              >
                <Select>
                {teams.map((team) => (
                  <Select.Option key={team.ID} value={team.ID}>
                    {team.TeamName}
                  </Select.Option>
                ))}
                </Select>
              </Form.Item>
            </Form>
            <a className='button-cancel' onClick={handleCancel}>Cancel</a>
            <a
              className="button-create"
              onClick={(event) => {
                event.preventDefault();
                form.validateFields()
                  .then(async (values: WorkspaceInterface) => {
                    await onFinishWorkspace(values);
                  })
                  .catch((errorInfo) => {
                    console.log("Validation failed:", errorInfo);
                  });
              }}
              style={{ marginLeft: 8, cursor: 'pointer' }}
            >
              {confirmLoading ? 'Creating...' : 'Create'}
            </a>
          </div>
        </div>
      )}

      {editModalOpen && (
        <div className="custom-modal">
          <div className="modal-content">
            <Form
              form={form}
              name="editWorkspace"
              layout="vertical"
              onFinish={onEditFinish}
              autoComplete="off"
              encType="multipart/form-data"
            >
              <Form.Item
                hasFeedback
                label="Name"
                name="WorkspaceName"
                initialValue={editingWorkspace?.WorkspaceName}
                validateTrigger="onBlur"
              >
                <Input placeholder="Validate required onBlur" />
              </Form.Item>
              <Form.Item label="Description" name="Description" initialValue={editingWorkspace?.Description}>
                <TextArea rows={4} style={{ width: '200%' }} />
              </Form.Item>
              <Form.Item
                label="Image"
                name="Image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload maxCount={1} multiple={false} listType="picture-card">
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>อัพโหลด</div>
                  </div>
                </Upload> 
              </Form.Item>
              <a className="button-cancel" onClick={handleEditCancel}>Cancel</a>
              <a
                className="button-update"
                onClick={(event) => {
                  event.preventDefault();
                  form.validateFields()
                  .then(async (values: WorkspaceInterface) => {
                  await onEditFinish(values);
                })
                  .catch((errorInfo) => {
                    console.log("Validation failed:", errorInfo);
                  });
                }}
                style={{ marginLeft: 8, cursor: 'pointer' }}
              >
                {confirmLoading ? 'Updating...' : 'Update'}
              </a>
            </Form>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Workspace;
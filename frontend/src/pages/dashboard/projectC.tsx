import React, { useState } from 'react';
import { Button } from 'antd';
import { ProjectCreateModal } from './ProjectCreateModal ';

const ProjectC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // This ensures that the container takes up the full height of the viewport
      }}
    >
      <Button onClick={handleOpenModal}>Open Project Create Modal</Button>
      <ProjectCreateModal visible={isModalVisible} onClose={handleCloseModal} />
    </div>
  );
};

export default ProjectC;

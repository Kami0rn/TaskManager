import React, { useState, useEffect } from 'react';
import ProjectSidebar from './ProjectSidebar';
import List from '../List/List';

function Project() {
  const [items, setItems] = useState<number | null>(null);
  const [projectData, setProjectData] = useState<any>(null); // Update 'any' to the expected data type

  useEffect(() => {
    const storedItems = localStorage.getItem('projectId');
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      setItems(parsedItems);
    } else {
      // If projectId is not found in localStorage, set a default value of 1
      localStorage.setItem('projectId', JSON.stringify(1));
      setItems(1);
    }
  }, []);

  useEffect(() => {
    if (items !== null) {
      fetchData(items);
    }
  }, [items]);

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
        console.log(data)
        
        
        
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    
  };

  

  return (
    <div className="projectIndex flex">
      
      <ProjectSidebar />
      <div className="projectIndex flex h-full w-11/12 flex-col">
        <div className='projectBar  bg-slate-700 w-full h-14 flex justify-between items-center'>
          <div className='projectBarPojectName ml-6'>
            {projectData && (
              <h1 className='text-white'>{projectData.data.ProjectName}</h1>
            )}
          </div>
          <div className='projectBarTeam mr-5'>picture</div>
          
        </div>
        <List />
            
      </div>
    </div>
  );
}

export default Project;

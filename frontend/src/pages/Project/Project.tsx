import React, { useState, useEffect } from 'react';
import ProjectSidebar from './ProjectSidebar';



function Project() {

  const [items, setItems] = useState<number | null>(null);

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
      // Retrieve token from localStorage
      const userToken = localStorage.getItem('token');
  
      if (!userToken) {
        // Handle case where token is missing from localStorage
        console.error('Token not found in localStorage');
        return;
      }
  
      const response = await fetch(`http://localhost:8080/users/getProject/${projectId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json', // adjust content type if necessary
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        // Handle the retrieved data
        console.log('Data:', data);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Determine or obtain the projectIdValue here
  // Replace 123 with the actual projectId you want to fetch

  // Call fetchData with the obtained projectIdValue
  useEffect(() => {
    if (items) {
      fetchData(items);
    }
  }, [items]);

  return (
    <div className="projectIndex flex">
      <ProjectSidebar />
      <div className="projectIndex flex">
        <div>
          <h1>{data.ProjectName}</h1>
        </div>
      </div>
    </div>
  );
}

export default Project;

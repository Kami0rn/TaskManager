import React from 'react'
import { GetListByProjectId } from '../../services/http/list/list'
import { useState,useEffect } from 'react';
import { ListInterface } from '../../interfaces/Ilist'
function List() {
  const [lists, setLists] = useState<ListInterface[]>([]);
  useEffect(() => {
    async function fetchListData() {
      const projectId = 1; // Replace this with the project ID
      const data = await GetListByProjectId(projectId);

      if (data) {
        setLists(data.lists || []);
      }
    }

    fetchListData();
  }, []);
  return (
    <div>
      <h1>List Items</h1>
      <ul className='flex'>
        {lists.map((list) => (
          <li key={list.ID} className=''>
            <h3>List Name: {list.ListName}</h3>
            <p>List Description: {list.ListDescription}</p>
            {/* Render other list details as needed */}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List
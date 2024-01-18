import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from '../src/etc/Nav';

import Register from './pages/register/Register';
import Router from './pages/router/Router'
import Login from './pages/login/Login';
import Workspace from './pages/workspace/Workspace';
import Setting from './pages/setting/Setting';
import ProjectC from './pages/dashboard/projectC';
import Project from './pages/Project/Project';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Nav />
        
        <Routes> {/* Use Routes instead of Route */}

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/project" element={<ProjectC />} />
          <Route path="/projectS" element={<Project />} />
          <Route path='/router' element={<Router />} />
          
        </Routes>

        
      </div>
    </BrowserRouter>
  );
}

export default App;

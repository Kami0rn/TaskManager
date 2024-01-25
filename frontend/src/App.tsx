import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from '../src/etc/Nav';


import Register from './pages/register/Register';
import Router from './pages/router/Router'
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Project from './pages/Project/Project';
import UseProject from './pages/UseProject/UseProject';
import MyCalendar from './pages/Calendar/MyCalendar';
import Home from "./pages/Home/Home"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      {/* <Nav /> */}
        
        <Routes> {/* Use Routes instead of Route */}


          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/router' element={<Router />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/project' element={<Project />}/>
          <Route path='/useProject' element={<UseProject />}/>
          <Route path='/calendar' element={<MyCalendar />} />
          <Route path="/" element={<Home />} />
          
        </Routes>

        
      </div>
    </BrowserRouter>
  );
}

export default App;

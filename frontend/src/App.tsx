import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from '../src/etc/Nav';

import Register from './pages/register/Register';
import Router from './pages/router/Router'
import Login from './pages/login/Login';
import CreateTeamPage from './pages/team/createteam/CreateTeam';
import TeammatePage from './pages/team/teammate/Teammate';
import ProfilePage from './pages/profile/Profile';
import CreateButtonPage from './pages/team/justbutton/CreateButton';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Nav />
        
        <Routes> {/* Use Routes instead of Route */}

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/router' element={<Router />} />
          <Route path='/createteam/:id' element={<CreateButtonPage />} />
          
          <Route path='/team/:id' element={<TeammatePage />} />
          <Route path='/profile/:id' element={<ProfilePage />} />
          
        </Routes>

        
      </div>
    </BrowserRouter>
  );
}

export default App;

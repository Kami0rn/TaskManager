import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from '../src/etc/Nav';

import Register from './pages/register/Register';
import Router from './pages/router/Router'
import Login from './pages/login/Login';
import CreateTeamPage from './pages/team/CreateTeam';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Nav />
        
        <Routes> {/* Use Routes instead of Route */}

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/router' element={<Router />} />
          <Route path='/createdteam' element={<CreateTeamPage />} />
          <Route path='/teammate' element={<CreateTeamPage />} />
          
        </Routes>

        
      </div>
    </BrowserRouter>
  );
}

export default App;

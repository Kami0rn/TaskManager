import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from '../src/etc/Nav';

import Register2 from './pages/register/Register2';
import Register from './pages/register/Register';
import Router from './pages/router/Router'
import Login from './pages/login/Login2';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
      {/* <Nav /> */}
        
        <Routes> {/* Use Routes instead of Route */}

          <Route path="/register2" element={<Register2 />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login2" element={<Login />} />
          <Route path='/router' element={<Router />} />
          
        </Routes>

        
      </div>
    </BrowserRouter>
  );
}

export default App;

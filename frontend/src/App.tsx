import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from '../src/etc/Nav';

import Register from './pages/register/Register';
import Router from './pages/router/Router'
import Login from './pages/login/Login';
<<<<<<< Updated upstream
import Dashboard from './pages/dashboard/dashboard';
import ProjectPage from './pages/ProjectPage/ProjectPage';
import MyProject from './pages/myProject/myProject';
=======
import Payment from './pages/payment/Payment';
import PaymentHistory from './pages/paymentHistory/paymentHistory';
import EditPaymentHistory from './pages/paymentHistory/editPaymentHistory/editPaymentHistory';
import Comment from './pages/comment/comment';
import Comment_2 from './pages/comment/comment_2';

>>>>>>> Stashed changes


function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Nav />
        
        <Routes> {/* Use Routes instead of Route */}

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/router' element={<Router />} />
<<<<<<< Updated upstream
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/projectPage' element={<ProjectPage />} />
          <Route path='/myProject' element={<MyProject />} />
=======
          <Route path='/payment' element={<Payment />} />
          <Route path='/paymentHistory' element={<PaymentHistory />} />
          <Route path='/paymentHistory/edit/:id' element={<EditPaymentHistory />} />
          <Route path='/comment' element={<Comment />} />
          <Route path='/comment_2' element={<Comment_2/>} />
          

          
>>>>>>> Stashed changes
        </Routes>

        
      </div>
    </BrowserRouter>
  );
}

export default App;

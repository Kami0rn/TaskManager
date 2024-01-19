import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from '../src/etc/Nav';

import Register from './pages/register/Register';
import Router from './pages/router/Router'
import Login from './pages/login/Login';
import Payment from './pages/payment/Payment';
import PaymentHistory from './pages/paymentHistory/paymentHistory';
import EditPaymentHistory from './pages/paymentHistory/editPaymentHistory/editPaymentHistory';
import Comment from './pages/comment/comment';




function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Nav />
        
        <Routes> {/* Use Routes instead of Route */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/router' element={<Router />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/paymentHistory' element={<PaymentHistory />} />
          <Route path='/paymentHistory/edit/:id' element={<EditPaymentHistory />} />
          <Route path='/comment' element={<Comment />} />
          

          
        </Routes>

        
      </div>
    </BrowserRouter>
  );
}

export default App;

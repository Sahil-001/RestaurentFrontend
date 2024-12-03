import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import Home from './components/home/Home';
import RestaurentRegisterationForm from './components/restaurent_registeration/RestaurentRegisterationForm';
import RegisterSlot from './components/restaurent_registeration/RegisterSlot';
import RestaurentBooking from './components/restaurent_booking/RestaurentBooking';

import Search from './components/search/Search';
import Navbar from './components/navbar/Navbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurent/register" element={<RestaurentRegisterationForm />} />
        <Route path="/restaurent/slots/register" element={<RegisterSlot />} />
        <Route path="/restaurent/search" element={<Search />} />
        <Route path="/restaurent/book" element={<RestaurentBooking />} />
      </Routes>
    </Router>
  );
}

export default App;

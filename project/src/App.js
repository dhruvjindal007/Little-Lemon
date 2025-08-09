import React from 'react';
// remove BrowserRouter import here
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import HomePage from './HomePage';
import BookingPage from './BookingPage';
import About from './About';
import './styles.css';
import './App.css';
import MenuPage from './Menu';
import OrderOnline from './Order';
import Login from './Login';
import Signup from './Signup';
import ChatWidget from "./ChatWidget";

function App() {
  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/order" element={<OrderOnline />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ChatWidget />
      <Footer />
    </>
  );
}

export default App;

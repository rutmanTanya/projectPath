import React from 'react';
import { Routes, Route } from "react-router-dom";
import MainPage from './MainPage';
import About from './About';
import Contact from './Contact';
import Header from './Header';
import Footer from './Footer';
import SinglePost from './SinglePost';
import Archive from './Archive'; 
import ReportDetails from './ReportDetails'; 
import CreateReport from './CreateReport'; 
function MyRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/report/:id" element={<ReportDetails />} />
        <Route path="/create-report" element={<CreateReport />} />
      </Routes>
      <Footer />
    </>
  );
}

export default MyRoutes;


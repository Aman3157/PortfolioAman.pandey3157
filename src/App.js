import React from "react";
import { BrowserRouter , Routes, Route, Navigate } from "react-router-dom";

import './App.css';
import Header from "./component/header";
import Home from "./component/home";
import Contact from "./component/Contact";
import Footer from "./component/footer";
import AboutPage from "./component/about";
import VideoStudio from "./component/video";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
             <Route path="/about" element={<AboutPage />} />
            {/* <Route path="/video" element={<VideoStudio />} /> */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        {/* <Contact /> */}

        <Footer message={'aman'} />
      </div>
    </BrowserRouter>
  );
}

export default App;
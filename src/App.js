import React from "react";
import './App.css';
import Header from "./component/header";
import Home from "./component/home";
import Footer from "./component/footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./component/Contact";

function App() {
  return (
    <BrowserRouter>

      <div className="app-container">

        <Header/>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/contact" element={<Contact/>}/>
          </Routes>
        </div>

        <Footer/>

      </div>

    </BrowserRouter>
  );
}

export default App;
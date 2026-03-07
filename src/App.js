import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import './App.css';
import Header from "./component/Header";
import Home from "./component/Home";
import Contact from "./component/Contact";
import Footer from "./component/footer";

function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
import "./App.css";
import Header from "./Header/Header";
import LogoList from "./SideBar/LogoList";
import VehicleAnalysis from "./SideBar/VehicleAnalysis";
import GeographicalAnalysis from "./SideBar/GeographicalAnalysis";
import MarketTrend from "./SideBar/MarketTrend.jsx";
import Home from "./Home.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

const App = () => {
  return (
    <Router>
      <div className="App-Layout">
        {/* Header */}
        <Header />

        {/* Body: Sidebar + Main Content */}
        <div className="App-Body">
          <aside className="Sidebar">
            <LogoList />
          </aside>

          <main className="Main-Content">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/vehicle-analysis" element={<VehicleAnalysis />} />
              <Route path="/geographic-analysis" element={<GeographicalAnalysis />} />
              <Route path="/trends" element={<MarketTrend />} />
              <Route path="/" element={<Navigate to="/home" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;

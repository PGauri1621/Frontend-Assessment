// src/Pages/Home.jsx
import React from "react";
import Header from "./Header/Header";
import VehicleOverviewCards from "./HeroSection/VehicleOverviewCards"
import VehicleOverviewTitle from './HeroSection/VehicleOverviewTitle';
import BarChartComponent from './MainContentArea/BarChartComponent';
import PieChartComponent from './MainContentArea/PieChartComponent';
import UsageByLocationCards from './Footer/UsageByLocationCards';
import VehicleByTypeTitle from './Footer/VehicleByTypeTitle';
import "./Home.css"; // new CSS file for Home-specific styles

const Home = () => {
  return (
    <div className="Home-Page">
      {/* Hero Section */}
      <div className="Hero">
       <VehicleOverviewCards />
      </div>

      {/* Charts Row */}
    
       <section className="Charts-Row">
            <div className="Chart-Wrapper"><BarChartComponent /></div>
            <div className="Chart-Wrapper"><PieChartComponent /></div>
          </section>

          {/* Charts Row 2 */}
          <section className="Charts-Row">
            <div className="Chart-Wrapper"><UsageByLocationCards /></div>
            <div className="Chart-Wrapper">
             <VehicleByTypeTitle />
            </div>
          </section>
    </div>
  );
};

export default Home;

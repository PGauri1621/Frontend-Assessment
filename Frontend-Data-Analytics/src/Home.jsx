import React from "react";
import VehicleOverviewCards from "./HeroSection/VehicleOverviewCards";
import BarChartComponent from './MainContentArea/BarChartComponent';
import PieChartComponent from './MainContentArea/PieChartComponent';
import UsageByLocationCards from './Footer/UsageByLocationCards';
import VehicleByTypeTitle from './Footer/VehicleByTypeTitle';
import "./Home.css";

const Home = () => {
  return (
    <div className="Home-Page">
      {/* Intro Section */}
      <div className="Intro-Section">
        <h1 className="Intro-Title">
          ⚡ EV Data Insights Dashboard
        </h1>
        <p className="Intro-Subtitle">
          Welcome to your centralized platform for analyzing Electric Vehicle (EV) 
          and Plug-in Hybrid (PHEV) data. Gain valuable insights into adoption trends, 
          usage patterns, and distribution by type and location. This dashboard helps 
          you track growth, compare categories, and make informed data-driven decisions 
          about the evolving EV landscape.
        </p>
      </div>

      {/* Separator */}
      <div className="Section-Seperator" />

      {/* Hero Section */}
      <div className="Hero">
        <VehicleOverviewCards />
      </div>

      {/* Professional Separator */}
      <div className="Section-Seperator" />

      {/* Charts Row */}
      <div className="Charts-Row">
        <div className="Chart-Wrapper clean-chart"><BarChartComponent /></div>
        <div className="Chart-Wrapper clean-chart"><PieChartComponent /></div>
      </div>

      {/* Professional Separator */}
      <div className="Section-Seperator" />

      {/* Charts Row 2 */}
      <div className="Charts-Row">
        <div className="Chart-Wrapper clean-chart"><UsageByLocationCards /></div>
        <div className="Chart-Wrapper clean-chart"><VehicleByTypeTitle /></div>
      </div>
    </div>
  );
};

export default Home;

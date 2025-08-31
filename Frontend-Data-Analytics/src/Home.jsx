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
      {/* Hero Section */}
      <div className="Hero">
        <VehicleOverviewCards />
      </div>

      {/* Professional Separator */}
      <div className="Section-Seperator" />

      {/* Charts Row */}
      <section className="Charts-Row">
        <div className="Chart-Wrapper clean-chart"><BarChartComponent /></div>
        <div className="Chart-Wrapper clean-chart"><PieChartComponent /></div>
      </section>

      {/* Professional Separator */}
      <div className="Section-Seperator" />

      {/* Charts Row 2 */}
      <section className="Charts-Row">
        <div className="Chart-Wrapper clean-chart"><UsageByLocationCards /></div>
        <div className="Chart-Wrapper clean-chart"><VehicleByTypeTitle /></div>
      </section>
    </div>
  );
};

export default Home;

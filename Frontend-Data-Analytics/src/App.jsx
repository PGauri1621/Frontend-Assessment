import "./App.css";
import Header from "./Header/Header";
import LogoList from "./SideBar/LogoList";
import VehicleAnalysis from "./SideBar/VehicleAnalysis"; // new page
import GeographicalAnalysis from "./SideBar/GeographicalAnalysis";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App-Layout">
        {/* Header at the top */}
        <Header />

        {/* Page body */}
        <div className="App-Body">
          {/* Sidebar */}
          <aside className="Sidebar">
            <LogoList />
          </aside>

          {/* Main content */}
          <main className="Main-Content">
            <Routes>
              <Route path="/vehicle-analysis" element={<VehicleAnalysis />} />
              <Route path="/geographic-analysis" element={<GeographicalAnalysis />} />
              <Route path="/trends" element={<h2>Market Trends</h2>} />
              <Route path="/infrastructure" element={<h2>Infrastructure</h2>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;

import './App.css';
import Header from './Header/Header';
import VehicleOverviewTitle from './HeroSection/VehicleOverviewTitle';
import VehicleOverviewCards from './HeroSection/VehicleOverviewCards';
import BarChartComponent from './MainContentArea/BarChartComponent';
import PieChartComponent from './MainContentArea/PieChartComponent';
import UsageByLocationCards from './Footer/UsageByLocationCards';
import LogoList from './SideBar/LogoList';
import VehicleByTypeTitle from './Footer/VehicleByTypeTitle';
import 'leaflet/dist/leaflet.css';


const App = () => {
  return (
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
          {/* Hero Section */}
          <section className="Hero">
            <VehicleOverviewTitle />
            <VehicleOverviewCards />
          </section>

          {/* Charts Row 1 */}
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
        </main>
      </div>

      {/* Footer */}
      {/* <footer className="Footer">
        Footer content
      </footer> */}
    </div>
  );
};

export default App;

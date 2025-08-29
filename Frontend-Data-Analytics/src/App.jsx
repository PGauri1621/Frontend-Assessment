import './App.css'
import Header from './Header/Header'
//import LogoList from './SideBar/LogoList'
import VehicleOverviewTitle from './HeroSection/VehicleOverviewTitle'
import VehicleOverviewCards from './HeroSection/VehicleOverviewCards'
// You’ll later add: Sidebar, Hero, MainContent, Footer

const App = () => {
  return (
    <div className="App-Layout">
      {/* Header at the top */}
      <Header />

      {/* Page body */}
      <div className="App-Body">
        <aside className="Sidebar">
        
        </aside>

        <section className="Main-Content">
          <div className="Hero">
            <VehicleOverviewTitle />
            <VehicleOverviewCards />
          </div>
          {/* <div className="Content">
            Main Content Area
          </div> */}
        </section>
      </div>

      {/* Footer at the bottom */}
      {/* <footer className="Footer">
        Footer
      </footer> */}
    </div>
  )
}

export default App

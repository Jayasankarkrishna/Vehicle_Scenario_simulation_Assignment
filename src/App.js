import logo from './logo.svg';
import './App.css';
import Sidebar from './Component/sidebar/Sidebar'
import AddScenario from './pages/AddScenario';
import AddVehicle from './pages/AddVehicle';
import AllScenarios from './pages/AllScenarios';
import AllVehicles from './pages/AllVehicles';
import Home from './pages/Home1';
import 'bootstrap/dist/css/bootstrap.min.css';
// In your main JavaScript file (index.js or App.js)
import '@fortawesome/fontawesome-free/css/all.min.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";







const routes = [
  // { path: "/", name: "Home", component: Home, excludeFromSidebar: true },
  { path: "/", name: "Home", component: Home },
  { path: "/add-scenario", name: "AddScenario", component: AddScenario },
  { path: "/all-scenarios", name: "AllScenarios", component: AllScenarios },
  { path: "/add-vehicle", name: "AddVehicle", component: AddVehicle },
  // { path: "/all-vehicle", name: "AllVehicles", component: AllVehicles },


  
];






function App() {
  return (
<Router>
      <Routes>
        {routes.map(
          ({ path, name, component: Component, excludeFromSidebar }) => (
            <Route
              key={path}
              path={path}
              element={
                excludeFromSidebar ? (
                  <Component />
                ) : (
                  <div className="app-container">
                    <Sidebar routes={routes} />
                    <div className="content" style={{ backgroundColor: "#2c2f33", color: "white" }}>
                      <Component />
                    </div>
                  </div>
                )
              }
            />
          )
        )}
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import './App.css';
import { MapComponent } from './features/Map/MapComponent';
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="main-container">
          <MapComponent />
        </div>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Nasa from './Components/Routes/Nasa';
import Cards from './Components/Routes/Cards';

function App() {
  return (
    <div className="App">
      <Router basename="/playwright-ui">
        <Routes>
          <Route path="/" element={<h1>🛠 Under construction</h1>} />
          <Route path="nasa" element={<Nasa />} />
          <Route path="cards" element={<Cards />} />
        </Routes>
        <div className="list">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="nasa">NASA</Link></li>
            <li><Link to="cards">Cards</Link></li>
          </ul>
        </div>
      </Router>
    </div>
  );
}

export default App;

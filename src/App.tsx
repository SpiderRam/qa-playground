import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Nasa from './Components/Routes/Nasa'
import Cards from './Components/Routes/Cards'
import NavBar from './Components/NavBar'

function App() {
	return (
		<div className="App">
			<Router basename="/qa-playground">
				<NavBar />
				<Routes>
					<Route path="/" element={<h1>🛠 Under construction</h1>} />
					<Route path="nasa" element={<Nasa />} />
					<Route path="cards" element={<Cards />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App

import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Nasa from './Components/Routes/Nasa'
import Cards from './Components/Routes/Cards'
import NavBar from './Components/CommonComponents/NavBar'
import Footer from './Components/CommonComponents/Footer'
import '@fontsource/nunito'
import { ThemeProvider, Typography, createTheme } from '@mui/material'
import Main from './Components/Routes/Main'

const theme = createTheme({
	typography: {
		fontFamily: 'Nunito, sans-serif',
		fontWeightLight: 200,
		h1: {
			fontSize:'3rem',
		},
		h2: {
			fontSize:'2rem',
			color: '#2d2d2d'
		},
		h3: {
			fontSize:'1.5rem',
			color: '#595959',
		},
	},
	palette: {
		primary: {
			main: '#0E5D77',
			light: '#5f93a5',
			dark: '#afc9d2',
			contrastText: '#FFF',
		},
		secondary: {
			main: '#0e7767',
			light: '#5fa59a',
			dark: '#afd2cd',
			contrastText: '#FFF',
		},
	},
})


function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Router basename="/qa-playground">
					<NavBar />
					<Typography sx={{ paddingBottom: '3rem' }} component={'main'}>
						<Routes>
							<Route path="/" element={<Main />} />
							<Route path="nasa" element={<Nasa />} />
							<Route path="cards" element={<Cards />} />
						</Routes>
					</Typography>
					<Footer />
				</Router>
			</div>
		</ThemeProvider>
	)
}

export default App

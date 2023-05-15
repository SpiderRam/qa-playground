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
      fontSize: '3rem',
    },
    h2: {
      fontSize: '1.8rem',
      color: '#595959',
    },
    h3: {
      fontSize: '1.5rem',
      color: 'black',
    },
    h4: {
      fontSize: '1.3rem',
      fontWeight: 400,
      color: '#2d2d2d',
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
  components: {
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          color: '#fff',
          backgroundColor: '#5f93a5',
          border: '1px solid #0E5D77',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          padding: '6px 11px 3px 11px',
          color: '#073c34',
          '&.Mui-selected': {
            backgroundColor: 'eee',
            color: '#777777',
          },
          '&:hover': {
            backgroundColor: '#b4d5d0',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          textAlign: 'left',
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Router basename='/qa-playground'>
          <NavBar />
          <Typography sx={{ paddingBottom: '6rem', paddingTop: '2rem' }} component={'main'}>
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='nasa' element={<Nasa />} />
              <Route path='cards' element={<Cards />} />
            </Routes>
          </Typography>
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App

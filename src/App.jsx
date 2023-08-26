import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import './App.css'
import './Weather.css'
import Weather from './Components/Weather';


function App() {
  return (
    <>
      <CssBaseline />
   {/* <Navbar /> 
   <Main />
   <AboutMe /> */}
   <Weather />
    
    </>
  )
}

export default App

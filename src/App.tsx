import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './base/components/header/Header';
import FullScreenLoader from './base/components/loaders/FullScreenLoader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './base/pages/homepage/MainPage';
import { ThemeProvider, createTheme } from '@mui/material';
import EditProfile from './base/pages/editProfile/EditProfile';

const THEME = createTheme({
  typography: {
   "fontFamily": `"Poppins",sans-serif`,
   "fontSize": 14,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500
  }
});


function App() {
  const { isLoading } = useAuth0();
  if (isLoading) return <FullScreenLoader text='Please wait a moment...' />
  return (
    <ThemeProvider theme={THEME}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/edit" element={<EditProfile/>}/>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

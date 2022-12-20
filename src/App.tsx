import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './base/components/header/Header';
import FullScreenLoader from './base/components/loaders/FullScreenLoader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './base/pages/homepage/MainPage';
import { ThemeProvider, createTheme } from '@mui/material';
import EditProfile from './base/pages/editProfile/EditProfile';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

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
  const { user,isLoading } = useAuth0();
  const [picture,setPicture] = useState<string>();
  const fetchUserProfilePicture = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/metadata/${user?.email}`)
    .then((res) => {
      setPicture(res.data?.data?.picture);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    fetchUserProfilePicture();
  },[user])
  if (isLoading) return <FullScreenLoader text='Please wait a moment...' />
  return (
    <ThemeProvider theme={THEME}>
      <Router>
        <div className="App">
          <Header picture={picture}/>
          <Routes>
            <Route path="/" element={<MainPage picture={picture}/>} />
            <Route path="/edit" element={<EditProfile picture={picture}/>}/>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

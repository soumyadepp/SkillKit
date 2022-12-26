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
import ProjectPage from './base/pages/project/ProjectPage';
import { createContext } from 'react';

const THEME = createTheme({
  typography: {
   "fontFamily": `"Poppins",sans-serif`,
   "fontSize": 14,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500
  }
});


/*
  Fetch the metadata from the mongo and set the state.
  The prop drill to all the components.

  Make the context that will fetch the user metadata.
*/

export let MetaDataContext = createContext({});

function App() {
  const { user,isLoading } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [picture,setPicture] = useState<string>();
  const [metaData, setMetaData] = useState<any>();
  const fetchUserProfilePicture = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/metadata/${user?.email}`)
    .then((res) => {
      setPicture(res.data?.data?.picture);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  async function updateMetaData(){
  
    if(!!user?.email&&!!!localStorage.getItem('user_metadata'))
    {
      try{
        let a = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/metadata/${user?.email}`,{method : "GET"});
        let b = await a.json();
        console.warn("Hello world", b.data);
        // localStorage.setItem('user_metadata',JSON.stringify(b.data));
        setMetaData(b.data);
      }
      catch(e){
        console.log(e);
      }
    }
    else if(!!localStorage.getItem('user_metadata'))
    {
      if(JSON.stringify(metaData)!==JSON.stringify(JSON.parse(localStorage.getItem('user_metadata')||'')))
      {
        setMetaData(JSON.parse(localStorage.getItem('user_metadata')||''));
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    console.warn(user?.email);
    updateMetaData();
    fetchUserProfilePicture();
  },[user])
  if (isLoading || loading) return <FullScreenLoader text='Please wait a moment...' />
  return (
      <MetaDataContext.Provider value={metaData}>
        <ThemeProvider theme={THEME}>
          <Router>
            <div className="App">
              <Header picture={picture}/>
              <Routes>
                <Route path="/" element={<MainPage picture={picture} updateMetaData={updateMetaData}/>} />
                <Route path="/edit" element={<EditProfile picture={picture} updateMetaData={updateMetaData}/>}/>
                <Route path="/projects" element={<ProjectPage/>}/>
              </Routes>
            </div>
          </Router>
        </ThemeProvider>
      </MetaDataContext.Provider>
  );
}

export default App;

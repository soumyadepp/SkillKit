import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './base/components/header/Header';
import FullScreenLoader from './base/components/loaders/FullScreenLoader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './base/pages/homepage/Homepage';
function App() {
  const { isLoading } = useAuth0();
  if (isLoading) return <FullScreenLoader />

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

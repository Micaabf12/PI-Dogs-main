import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CreateDog from './components/CreateDog/CreateDog';
import DogDetails from './components/Details/Details';
import NotFound from './components/NotFound/NotFound';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>

        <Route element={<NavBar />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/dog" element={<CreateDog />}></Route>
          **<Route path="home/dogs/:id" element={<DogDetails />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;


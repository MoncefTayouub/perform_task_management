import logo from './logo.svg';
import './App.css';
import React , {useState , useEffect} from 'react'
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios'
import Cookies from 'universal-cookie' ;
import jwt from 'jwt-decode' 

// const backend_url = 'http://127.0.0.1:8000/'
const backend_url = 'https://withcer.pythonanywhere.com/'


function App() {
  return (
    <div className="App">
       <BrowserRouter>
           <Routes>
                 <Route path="/" element={<Home backend_url={backend_url}  />} />    
                   
            </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

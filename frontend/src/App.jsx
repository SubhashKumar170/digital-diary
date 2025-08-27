
import React from 'react'
import Navbar from './Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import History from "./History";
import Profile from './Profile';
import New from './New';
import Home from './Home';

export default function App() {
  return (
    <>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route index Component={Home}/>
            <Route path='/history' Component={History}/>
            <Route path='profile' Component={Profile} />
            <Route path = '/new' Component={New}/>
            <Route path = '*' element= {<h2> Error Page not found </h2>}/>
          </Routes>
        </BrowserRouter>
      
    </>
  )
}

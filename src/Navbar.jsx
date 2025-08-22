import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css';


export default function Navbar() {
  return (
    <>
      <div className="nav-bar">
        <nav className='link-container'>
          <NavLink to = '/' > Home </NavLink>
          <NavLink to='./history'>History</NavLink>
          <NavLink to='./new'>New</NavLink>
          <NavLink to='./profile'>Profile</NavLink>
        </nav>
      </div>
      
    </>
  )
}

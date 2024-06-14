import React from 'react';
import '../Component/css/Navbar.css';
// import { AiOutlineSearch } from 'react-icons/ai';
import { Outlet } from 'react-router-dom';

export const Navbar = () => {
  return (
    <>
            <div className='logo'>
              <div> <img src='meow.png' alt='Meow Logo' className='meowlogo' /></div>
         
        </div>
      <div className='main_nav'>

        <ul className='navbar_nav'>
          <li className='nav-item'>
            <a className='nav-link' href='/imageUpload'>Profile</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='/chatbox'>Chat</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='/chat'>Status</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='/chat'>Calls</a>
          </li>
        </ul>
        <div className='search_box'>
          {/* <div className='search_div_icon'><AiOutlineSearch className='search_icon' /></div> */}
          <input type='text' className='search' placeholder='Search' />
        </div>
      </div>
      <div className='toggle'></div>
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </>
  );
};

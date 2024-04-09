import React from 'react';
import '../css/style.css';
import { Link, useNavigate } from 'react-router-dom';
import LoginLogo from '../images/Logo.png'
import hamburger from '../images/ham.svg'
import profile from '../images/Logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/userSlice';

const Layout = ({ children }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

function logout(){
  alert("you have choosen to logout")
  dispatch(logoutUser());
  navigate("/")
}

  return (
    <div>
      
      <section className='section-dashboard d-flex'>
          <div className='left-side-dash'>
            <nav className='navigation-bar'>
              <div className='text-center p-4'>
                <img src={LoginLogo} className='nav-logo' alt='nav-logo'/>
              </div>
              <ul className='ul-nav'>
                <li className='li-nav'><Link to="/Dashboard" onClick={() => navigateTo('/Dashboard')} className='LinkNav'>Dashboard</Link></li>
              </ul>
            </nav> 
          </div>
          <div className='right-side-dash'>
            <header className='5dHeader'>
                <div className='parent-header'>
                    <img src={hamburger} className='hamClass' alt='button-nav' />
                    <img src={profile} className='profileClass' alt='button-profile' onClick={logout} style={{cursor:'pointer'}}/>
                </div>
            </header>
            <div className='main-dashboard'>
              {children}
            </div>
          </div>
      </section>
      
    </div>
  );
};

export default Layout;
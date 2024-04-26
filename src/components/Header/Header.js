import React from 'react'
import './styles.css'
import { Link , useLocation} from 'react-router-dom'

function Header() {

  const location = useLocation();
  const currentPath = location.pathname;



  return (
    <div className='navbar'>
        <div className='gradient'></div>
      <div className='links'>
        <Link to="/" className={currentPath === '/' ? "active" : ""} >SignUp</Link>
        <Link to="/podcasts" className={currentPath === '/podcast' ? "active" : ""} >Podcast</Link>
        <Link to="/create-a-podcaste" className={currentPath === '/create-a-podcaste' ? "active" : ""} >Start a Podcast</Link>
        <Link to='/profile' className={currentPath === '/profile' ? "active" : ""} >Profile</Link>
      </div>

    </div>
  )
}

export default Header

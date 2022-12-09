import React from 'react'
import { Outlet, Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className='d-flex'>
        <div className='w-25 vh-100 bg-success'>
            <span>LOGO</span>
            <p>Students</p>
            <nav>
            <ul>Links
              <li>
                <Link to="/">Student</Link>
              </li>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            </ul>
            </nav>
        </div>

        <Outlet />
    </div>
  )
}

export default Sidebar
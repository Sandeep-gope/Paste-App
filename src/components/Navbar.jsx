import React from 'react'
import {NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-5 justify-center'>
      <NavLink to="/">
        Home
      </NavLink>
      <NavLink to="/pastes">
        Pastes
      </NavLink>
      {/* <NavLink to="/pastes/:id">
        ViewPaste
      </NavLink> */}
    </div>
  )
}

export default Navbar
import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoPerson, IoHome, IoCaretForwardOutline } from 'react-icons/io5'
// import 'bulma/css/bulma.css'

const Sidebar = () => {
  return (
    <div>
      <aside className='menu pl-2 has-shadow'>
        <p className='menu-label'>General</p>
        <ul className='menu-list'>
          <li>
            <NavLink to={'/dashboard'}>
              <IoHome className='inline' /> Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to={'/get-hpt'}>
              <IoCaretForwardOutline className='inline' /> Hipotesa
            </NavLink>
          </li>
          <li>
            <NavLink to={'/get-evd'}>
              <IoCaretForwardOutline className='inline' /> Gejala
            </NavLink>
          </li>
          <li>
            <NavLink to={'/get-rls'}>
              <IoCaretForwardOutline className='inline' /> Rules
            </NavLink>
          </li>
        </ul>
        <p className='menu-label'>Admin</p>
        <ul className='menu-list'>
          <li className='inline'>
            <NavLink to={'/get-user'}>
              <IoPerson className='inline' /> User
            </NavLink>
          </li>
        </ul>
        {/* <p className='menu-label'>Settings</p>
        <ul className='menu-list'>
          <li>
            <button className='button is-white' to={'/logout'}>
              <IoLogOut /> Log Out
            </button>
          </li>
        </ul> */}
      </aside>
    </div>
  )
}

export default Sidebar

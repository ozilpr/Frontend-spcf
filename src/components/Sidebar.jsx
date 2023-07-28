import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  IoPerson,
  IoHome,
  IoCaretForwardOutline,
  IoLogOut,
} from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { LogOut, reset } from '../features/authSlice'

const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  const logout = () => {
    dispatch(LogOut())
    dispatch(reset())
    navigate('/')
  }

  return (
    <div className='md:h-screen md:sticky md:top-14'>
      <aside className='menu pl-2 has-shadow'>
        <p className='menu-label pt-2'>General</p>
        <ul className='menu-list'>
          {!user && (
            <div>
              <li>
                <button
                  onClick={logout}
                  className='text-white p-2 text-center w-full bg-red-500'
                >
                  Log in
                </button>
              </li>
            </div>
          )}
          {user && (
            <li>
              <NavLink to={'/dashboard'}>
                <IoHome className='inline' /> Dashboard
              </NavLink>
            </li>
          )}
          {user && user.role === 'admin' && (
            <div>
              <li>
                <NavLink to={'/diagnose'}>
                  <IoCaretForwardOutline className='inline' /> Diagnosis
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
            </div>
          )}
          {user && user.role === 'user' && (
            <div>
              <li>
                <NavLink to={'/diagnose'}>
                  <IoCaretForwardOutline className='inline' /> Diagnosis
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
            </div>
          )}
        </ul>

        {user && user.role === 'admin' && (
          <div>
            <p className='menu-label'>Admin</p>
            <ul className='menu-list'>
              <li className='inline'>
                <NavLink to={'/get-user'}>
                  <IoPerson className='inline' /> User
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        {user && user.role === 'admin' && (
          <div>
            <p className='menu-label'>Settings</p>
            <ul className='menu-list'>
              <button onClick={logout} className='button is-white'>
                <IoLogOut /> Log Out
              </button>
            </ul>
          </div>
        )}
        {user && user.role === 'user' && (
          <div>
            <p className='menu-label'>Settings</p>
            <ul className='menu-list'>
              <button onClick={logout} className='button is-white'>
                <IoLogOut /> Log Out
              </button>
            </ul>
          </div>
        )}
      </aside>
    </div>
  )
}

export default Sidebar

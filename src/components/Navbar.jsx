import React from 'react'
// import '../styles/navbar.css'
import { NavLink } from 'react-router-dom'
import logo from '../cat.png'
// import { FaBars } from 'react-icons/fa'
// import { ImCross } from 'react-icons/im'

const Navbar = () => {
  // const [Mobile, setMobile] = useState(false)
  return (
    <div>
      <nav
        className='navbar is-fixed-top has-shadow'
        role='navigation'
        aria-label='main navigation'
      >
        <div className='navbar-brand'>
          <NavLink to={'/dashboard'} className='mx-2'>
            <img src={logo} width='84' height='56' alt='logo' />
          </NavLink>

          <a
            href='!#'
            role='button'
            className='navbar-burger burger'
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarBasicExample'
          >
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </a>
        </div>

        <div id='navbarBasicExample' className='navbar-menu'>
          <div className='navbar-end'>
            <div className='navbar-item'>
              <div className='buttons'>
                <button className='button is-light'>Log Out</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>

    // <>
    //   <nav className='navbar bg-orange-400'>
    //     <Link to='/' className='p-1 m-1'>
    //       <li className='text-3xl sm:text-md text-black font-bold sm:text-white'>
    //         Duta Cat care
    //       </li>
    //     </Link>
    //     {/*
    //     if large screen ma xa bhane Mobile add huxa
    //     if mobile screen ma xa bhane nav-links-mobile add huxa
    //     */}
    //     <ul
    //       className={Mobile ? 'nav-links-mobile' : 'nav-links'}
    //       onClick={() => setMobile(false)}
    //     >
    //       <Link
    //         to='/diagnosa'
    //         className='text-md p-2 mx-4 hover:bg-gray-100 rounded-md'
    //       >
    //         <li className='font-bold'>Diagnosa</li>
    //       </Link>
    //       <Link
    //         to='/get-hpt'
    //         className='text-md p-2 mx-4 hover:bg-gray-100 rounded-md'
    //       >
    //         <li className='font-bold'>Penyakit</li>
    //       </Link>
    //       <Link
    //         to='/get-evd'
    //         className='text-md p-2 mx-4 hover:bg-gray-100 rounded-md'
    //       >
    //         <li className='font-bold'>Gejala</li>
    //       </Link>
    //       <Link
    //         to='/get-rls'
    //         className='text-md p-2 mx-4 hover:bg-gray-100 rounded-md'
    //       >
    //         <li className='font-bold'>Rules</li>
    //       </Link>
    //       <Link
    //         to='/logout'
    //         className='bg-gray-500 md:hover:bg-gray-100 rounded-md items-start text-center'
    //       >
    //         <li className='text-md py-2 px-4 font-bold md:text-white md:hover:text-black logout'>
    //           Logout
    //         </li>
    //       </Link>
    //     </ul>
    //     {/*
    //     whenever we click on button = setMobile(!Mobile) ==  is mobile oppsite to setMobile
    //     */}
    //     <button className='mobile-menu-icon' onClick={() => setMobile(!Mobile)}>
    //       {Mobile ? <ImCross /> : <FaBars />}
    //     </button>
    //   </nav>
    // </>
  )
}

export default Navbar

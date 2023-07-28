import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { LoginUser, reset } from '../features/authSlice'

const Login = () => {
  const [kode_pendaftaran, setKode] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (user || isSuccess) {
      navigate('/dashboard')
    }
    dispatch(reset())
  }, [user, isSuccess, dispatch, navigate])

  const Auth = async (e) => {
    e.preventDefault()
    dispatch(LoginUser({ kode_pendaftaran, password }))
  }

  const showPassword = () => {
    let x = document.getElementById('password')
    if (x.type === 'password') {
      x.type = 'text'
    } else {
      x.type = 'password'
    }
  }

  return (
    <div>
      <div className='bg-orange-300 h-screen'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <h1 className='font-bold text-3xl text-black m-7'>
            Sistem Pakar Diagnosis Penyakit Kucing Persia
          </h1>
          <div className='w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 '>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
                Silahkan Login ke Akun Anda
              </h1>
              <form
                className='space-y-4 md:space-y-6'
                autocomplete='off'
                onSubmit={Auth}
              >
                {isError && (
                  <p className='text-center text-red-500'>{message}</p>
                )}
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 '>
                    Kode Pendaftaran
                  </label>
                  <input
                    type='text'
                    name='kode'
                    id='kode'
                    value={kode_pendaftaran}
                    onChange={(e) => setKode(e.target.value)}
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                    placeholder='Masukkan Kode Pendaftaran Anda'
                    required
                  />
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900'>
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Masukkan Password Anda'
                    className='mb-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                    required
                  />
                  <input
                    type='checkbox'
                    className='inline'
                    onClick={() => showPassword()}
                  />
                  <p className='inline items-center my-1 px-1 text-sm font-thin text-gray-700'>
                    Show Password
                  </p>
                </div>
                <div className='text-center mt-5'>
                  <button
                    type='submit'
                    className='w-1/3 md:w-2/3 text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                  >
                    {isLoading ? 'Loading...' : 'Login'}
                  </button>
                  <p className='mt-3 text-sm font-bold'>
                    atau login sebagai guest
                  </p>
                  <Link to={'/diagnose'}>
                    <button className='w-2/3 md:w-2/3 text-white hover:text-black bg-orange-500 hover:bg-orange-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                      Login as Guest
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

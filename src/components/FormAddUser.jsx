import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const FormAddUser = () => {
  const [kode, setKode] = useState('')
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [role] = useState('user')
  const [letter, setLetter] = useState('')
  const [number, setNumber] = useState('')
  const nav = useNavigate()

  // error message
  const [msg, setMsg] = useState('')

  const url = 'http://localhost:5000/add-user'

  const res = `http://localhost:5000/get-userbyfirstletter?letter=${letter}`

  useEffect(() => {
    async function getUser() {
      const get = await axios.get(res)
      setLetter(user.charAt(0))
      setNumber(get.data)
    }
    getUser()
    setKode(letter + number)
  }, [letter, number, res, user])

  async function saveData(e) {
    e.preventDefault()
    try {
      if (user === '') {
        setMsg('Input nama tidak boleh kosong')
        return false
      } else if (phone === '') {
        setMsg('Input nomor telepon tidak boleh kosong')
        return false
      }

      await axios.post(url, {
        kode_pendaftaran: kode,
        nama_user: user,
        password: password,
        confPassword: confPassword,
        no_hp: phone,
        role: role,
      })

      nav('/get-user')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  const setUserHandler = async (e) => {
    let { value } = e.target

    const re = /^[A-Za-z]+$/
    if (value === '' || re.test(value)) {
      value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
      setUser(value)
    }
  }

  const showPassword = () => {
    let x = document.getElementById('password')
    if (x.type === 'password') {
      x.type = 'text'
    } else {
      x.type = 'password'
    }
  }
  const showConfPassword = () => {
    let y = document.getElementById('confPassword')
    if (y.type === 'password') {
      y.type = 'text'
    } else {
      y.type = 'password'
    }
  }

  return (
    <div className='flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0'>
      <div className='w-full sm:px-16 px-4 py-10 my-6 overflow-hidden bg-white rounded-lg lg:max-w-4xl'>
        <div className='mb-4'>
          <h1 className=' text-2xl font-bold decoration-gray-400'>
            Tambah User Baru
          </h1>
        </div>
        <div className='w-full px-6 py-4 bg-white rounded shadow-md ring-1 ring-gray-900/10'>
          <form name='userForm' onSubmit={saveData}>
            <p className='text-center text-xs text-red-500'>{msg}</p>
            <div>
              <label className='block text-sm font-bold text-gray-700 mb-1 mt-4'>
                Kode Pendaftaran
              </label>

              <input
                className='p-2 block w-full my-1 border-gray-400 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-left focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                type='text'
                name='kode_reg'
                value={kode}
                disabled
                onChange={(e) => setKode(e.target.value)}
                placeholder='Kode Pendaftaran'
              />
            </div>

            <div className='mt-4'>
              <label className='block text-sm font-bold text-gray-700 mb-1'>
                Nama Pengguna
              </label>

              <input
                className='p-2 block w-full my-1 bg-gray-200 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-left focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                type='text'
                name='userName'
                value={user}
                onChange={(e) => setUserHandler(e)}
                placeholder='Nama Pengguna'
              />
            </div>
            <div className='mt-4'>
              <label className='block text-sm font-bold text-gray-700 mb-1'>
                Password
              </label>
              <input
                id='password'
                className='p-2 block w-full my-1 bg-gray-200 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-left focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                type='password'
                name='userName'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
              />
              <input
                type='checkbox'
                className='inline'
                onClick={() => showPassword()}
              />
              <p className='inline items-center text-sm font-thin text-gray-700 mb-1 ml-1'>
                Show Password
              </p>
            </div>
            <div className='mt-4'>
              <label className='block text-sm font-bold text-gray-700 mb-1'>
                Konfirmasi Password
              </label>

              <input
                id='confPassword'
                className='p-2 block w-full my-1 bg-gray-200 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-left focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                type='password'
                name='confPassword'
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                placeholder='Konfirmasi Password'
              />
              <input
                type='checkbox'
                className='inline'
                onClick={() => showConfPassword()}
              />
              <p className='inline items-center text-sm font-thin text-gray-700 mb-1 ml-1'>
                Show Password
              </p>
            </div>
            <div className='mt-4'>
              <label className='block text-sm font-bold text-gray-700 mb-1'>
                Nomor telepon
              </label>

              <input
                className='p-2 block w-full my-1 bg-gray-200 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-left focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                type='number'
                name='phone'
                pattern='[0-9]*'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='contoh: 08xxxxxx'
              />
            </div>

            <div className='flex items-center justify-start mt-4 gap-x-2'>
              <button
                type='submit'
                className='px-6 py-2 mr-1 text-sm font-semibold rounded-md shadow-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300'
              >
                Simpan
              </button>
              <Link to={'/get-user'} className='mr-4 my-1'>
                <button className='px-6 py-2 ml-1 text-sm font-semibold text-white bg-gray-400 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300'>
                  Batal
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormAddUser

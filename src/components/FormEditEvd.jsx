import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

const FormEditEvd = () => {
  const [kode, setKode] = useState(false)
  const [evd, setEvd] = useState('')
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const nav = useNavigate()

  // error message
  const [msg, setMsg] = useState('')

  const url = `http://localhost:5000/edit-evd?id=${id}`
  const urlEvd = `http://localhost:5000/get-evdbyid?id=${id}`

  useEffect(() => {
    async function getEvdById() {
      const res = await axios.get(urlEvd)

      setKode(res.data.kode_gejala)
      setEvd(res.data.nama_gejala)
    }

    getEvdById()
  }, [urlEvd])

  const saveData = async (e) => {
    e.preventDefault()

    if (evd === '') {
      alert('Input tidak boleh kosong')
      return false
    }

    try {
      await axios.post(url, {
        kode_gejala: kode,
        nama_gejala: evd,
      })

      nav('/get-evd')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  return (
    <div className='flex flex-col items-center pt-4 bg-gray-100 sm:justify-center max-h-screen sm:pt-0 md:h-2/3'>
      <div className='w-full sm:px-16 px-4 py-10 my-1 overflow-hidden bg-white rounded-lg lg:max-w-4xl'>
        <div className='mb-4'>
          <h1 className='text-2xl font-bold decoration-gray-400'>
            Ubah Gejala
          </h1>
        </div>

        <div className='w-full px-6 py-4 bg-white rounded shadow-md ring-1 ring-gray-900/10'>
          <form name='evdForm' autocomplete='off' onSubmit={saveData}>
            <p className='text-center text-xs text-red-500'>{msg}</p>
            <div>
              <label className='block text-sm font-bold text-gray-700'>
                Kode Gejala
              </label>

              <input
                className='p-2 block w-full mt-1 border-gray-400 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-left focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                type='text'
                name='evdName'
                disabled
                value={kode}
                onChange={(e) => setKode(e.target.value)}
                placeholder='Kode Gejala'
              />
            </div>
            <div className='mt-4'>
              <label className='block text-sm font-bold text-gray-700'>
                Nama Gejala
              </label>

              <input
                className='p-2 block w-full mt-1 bg-gray-200 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-left focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                type='text'
                name='evdName'
                value={evd}
                onChange={(e) => setEvd(e.target.value)}
                placeholder='Nama Gejala'
              />
            </div>
            <div className='flex items-center justify-start mt-4 gap-x-2'>
              <button
                type='submit'
                className='px-6 py-2 mr-1 text-sm font-semibold rounded-md shadow-md text-sky-100 bg-sky-500 hover:bg-sky-700 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300'
              >
                Perbarui
              </button>
              <Link to={'/get-evd'} className='mr-4 my-1'>
                <button className='px-6 py-2 ml-1 text-sm font-semibold text-gray-100 bg-gray-400 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300'>
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

export default FormEditEvd

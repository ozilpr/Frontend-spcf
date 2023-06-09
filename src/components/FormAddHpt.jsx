import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const FormAddHpt = () => {
  const [kode, setKode] = useState(false)
  const [hpt, setHpt] = useState('')
  const [detHpt, setDetHpt] = useState('')
  const [smHpt, setSmHpt] = useState('')
  const nav = useNavigate()
  const url = 'http://localhost:5000/add-hpt'
  const res = 'http://localhost:5000/get-hpt'

  // error message
  const [msg, setMsg] = useState('')

  useEffect(() => {
    async function getHpt() {
      const get = await axios.get(res)
      let newKode = Number(get.data.length) + 1
      setKode('P' + newKode)
    }

    getHpt()
  }, [res])

  const saveData = async (e) => {
    e.preventDefault()
    try {
      if (hpt === '') {
        alert('Input tidak boleh kosong')
        return false
      }

      await axios.post(url, {
        kode_penyakit: kode,
        nama_penyakit: hpt,
        detail_penyakit: detHpt,
        sm_penyakit: smHpt,
      })

      nav('/get-hpt')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  return (
    <div className='flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0'>
      <div className='w-full sm:px-16 px-4 py-10 my-6 overflow-hidden bg-white rounded-lg lg:max-w-4xl'>
        <div className='mb-4'>
          <h1 className=' text-2xl font-bold decoration-gray-400'>
            Tambah penyakit baru
          </h1>
        </div>
        <div className='w-full px-6 py-4 bg-white rounded shadow-md ring-1 ring-gray-900/10'>
          <form name='hptForm' onSubmit={saveData}>
            <p className='text-center'>{msg}</p>
            <div>
              <label className='block text-sm font-bold text-gray-700'>
                Kode Penyakit
              </label>
              <input
                className='p-2 block w-full mt-1 border-gray-400 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-left focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                type='text'
                name='hptName'
                disabled
                value={kode}
                placeholder='Kode Penyakit'
              />
            </div>
            <div className='mt-4'>
              <label className='block text-sm font-bold text-gray-700'>
                Nama Penyakit
              </label>
              <input
                className='p-2 block w-full mt-1 bg-gray-200 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-left focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                type='text'
                name='hptName'
                value={hpt}
                onChange={(e) => setHpt(e.target.value)}
                placeholder='Nama Penyakit'
              />
            </div>
            <div className='mt-4'>
              <label className='block text-sm font-bold text-gray-700'>
                Detail Penyakit
              </label>
              <textarea
                name='description'
                className='p-2 block w-full mt-1 bg-gray-200 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-left focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                rows='4'
                placeholder='Detail penyakit...'
                value={detHpt}
                onChange={(e) => setDetHpt(e.target.value)}
              ></textarea>
            </div>
            <div className='mt-4'>
              <label className='block text-sm font-bold text-gray-700'>
                Solusi Penyakit
              </label>
              <textarea
                name='description'
                className='p-2 block w-full mt-1 bg-gray-200 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-left focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                rows='4'
                placeholder='Solusi penyakit...'
                value={smHpt}
                onChange={(e) => setSmHpt(e.target.value)}
              ></textarea>
            </div>

            <div className='flex items-center justify-start mt-4 gap-x-2'>
              <button
                type='submit'
                className='px-6 py-2 mr-1 text-sm font-semibold rounded-md shadow-md text-sky-100 bg-green-500 hover:bg-green-700 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300'
              >
                Simpan
              </button>
              <Link to={'/get-hpt'} className='button mr-4 is-success my-1'>
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

export default FormAddHpt
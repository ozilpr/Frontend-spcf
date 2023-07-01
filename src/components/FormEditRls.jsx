import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

const FormEditRls = () => {
  //data from db by id and changed by select option
  const [hptKode, setHptKode] = useState('')
  const [evdKode, setEvdKode] = useState('')
  const [hptNama, setHptNama] = useState('')
  const [hptNama2, setHptNama2] = useState('')
  const [evdNama, setEvdNama] = useState('')
  const [evdNama2, setEvdNama2] = useState('')
  const [hptId, setHptId] = useState('')
  const [evdId, setEvdId] = useState('')
  const [mb, setMb] = useState('')
  const [md, setMd] = useState('')

  //data from database
  const [evd, setEvd] = useState([])
  const [hpt, setHpt] = useState([])

  //calculate data
  const [values, setValues] = useState({ mb: '', md: '' })

  // error message
  const [msg, setMsg] = useState('')

  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const nav = useNavigate()

  const url = `http://localhost:5000/edit-rls?id=${id}`
  const urlRls = `http://localhost:5000/get-rlsbyid?id=${id}`

  //url db
  const urlEvd = `http://localhost:5000/get-evd`
  const urlHpt = `http://localhost:5000/get-hpt`

  useEffect(() => {
    async function getData() {
      const res = await axios.get(urlRls)
      await axios.get(urlHpt).then((json) => setHpt(json.data))
      await axios.get(urlEvd).then((json) => setEvd(json.data))

      //set data to display on output
      setHptId(res.data.penyakit_id)
      setEvdId(res.data.gejala_id)
      setHptKode(res.data.kode_penyakit)
      setHptNama(res.data.tbl_penyakit.nama_penyakit)
      setEvdKode(res.data.kode_gejala)
      setEvdNama(res.data.tbl_gejala.nama_gejala)
      setMb(res.data.mb)
      setMd(res.data.md)

      // set p for data sebelumnya
      setHptNama2(res.data.tbl_penyakit.nama_penyakit)
      setEvdNama2(res.data.tbl_gejala.nama_gejala)
    }

    getData()
  }, [urlEvd, urlHpt, urlRls])

  const saveData = async (e) => {
    e.preventDefault()

    try {
      await axios.post(url, {
        penyakit_id: hptId,
        gejala_id: evdId,
        mb: mb,
        md: md,
      })
      nav('/get-rls')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  const renderHpt = () => {
    return hpt.map((hpt) => {
      return (
        <option
          id='hpt'
          key={hpt.penyakit_id}
          value={hpt.kode_penyakit}
          data-value={hpt.nama_penyakit}
          data-id={hpt.penyakit_id}
        >
          {hpt.kode_penyakit + ' - ' + hpt.nama_penyakit}
        </option>
      )
    })
  }

  const renderEvd = () => {
    return evd.map((evd) => {
      return (
        <option
          id='evd'
          key={evd.gejala_id}
          value={evd.kode_gejala}
          data-value={evd.nama_gejala}
          data-id={evd.gejala_id}
        >
          {evd.kode_gejala + ' - ' + evd.nama_gejala}
        </option>
      )
    })
  }

  const HptHandler = async (e) => {
    const kode = e.target.value
    const dataset = e.target.options[e.target.selectedIndex].dataset
    setHptKode(kode)
    setHptNama(dataset.value)
    setHptId(dataset.id)
  }

  const EvdHandler = async (e) => {
    const kode = e.target.value
    const dataset = e.target.options[e.target.selectedIndex].dataset
    setEvdKode(kode)
    setEvdNama(dataset.value)
    setEvdId(dataset.id)
  }

  const inputHandler = async (e) => {
    const value = e.target.value
    const name = e.target.name
    const newValues = {
      ...values,
      [name]: value,
    }
    if (name === 'mb') {
      setMb(value)
    } else if (name === 'md') {
      setMd(value)
    }

    setValues(newValues)
  }

  return (
    <div className='flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0'>
      <div className='w-full sm:px-16 px-4 py-10 my-6 overflow-hidden bg-white rounded-lg lg:max-w-4xl'>
        <div className='mb-4'>
          <h1 className=' text-2xl font-bold decoration-gray-400'>Ubah Rule</h1>
        </div>

        <div className='w-full px-6 py-4 bg-white rounded shadow-md ring-1 ring-gray-900/10'>
          <form name='rlsForm' onSubmit={saveData}>
            <p className='text-center text-xs text-red-500'>{msg}</p>
            <div className='mt-4'>
              <label className='block m-0 text-md font-bold text-gray-700'>
                Penyakit
              </label>
              <div>
                <p className='text-xs'>penyakit sebelumnya: {hptNama2}</p>
                <select
                  className='w-2/3 p-2 text-sm block mt-1 border-gray-400 rounded-md border shadow-sm text-black focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  value={hptKode}
                  data-value={hptNama}
                  data-id={hptId}
                  onChange={(e) => HptHandler(e)}
                >
                  {renderHpt()}
                </select>
              </div>
            </div>
            <div className='mt-4'>
              <label className='block m-0 text-md font-bold text-gray-700'>
                Gejala
              </label>
              <div>
                <p className='text-xs'>gejala sebelumnya: {evdNama2}</p>
                <select
                  className='w-2/3 p-2 text-sm block mt-1 border-gray-400 rounded-md border shadow-sm text-black focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  value={evdKode}
                  data-value={evdNama}
                  data-id={evdId}
                  onChange={(e) => EvdHandler(e)}
                >
                  {renderEvd()}
                </select>
              </div>
            </div>
            <div className='mt-4'>
              <label className='block m-0 text-md font-bold text-gray-700'>
                MB "Measure of Belief" (contoh: 0.50)
              </label>
              <div>
                <input
                  type='number'
                  min='0'
                  step='0.01'
                  max='1'
                  name='mb'
                  className='w-1/5 p-2 text-sm block mt-1 border-gray-400 rounded-md border shadow-sm text-black focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  value={mb}
                  onChange={(e) => inputHandler(e)}
                  placeholder='Jumlah Measure of Belief'
                />
              </div>
            </div>

            <div className='mt-4'>
              <label className='block m-0 text-md font-bold text-gray-700'>
                MD "Measure of Disbelief" (contoh: 0.10)
              </label>
              <div>
                <input
                  type='number'
                  min='0'
                  step='0.01'
                  max='1'
                  name='md'
                  className='w-1/5 p-2 text-sm block mt-1 border-gray-400 rounded-md border shadow-sm text-black focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  value={md}
                  onChange={(e) => inputHandler(e)}
                  placeholder='Jumlah Measure of Disbelief'
                />
              </div>
            </div>

            <div className='mt-4'>
              <button
                type='submit'
                className='px-6 py-2 mr-1 text-sm font-semibold rounded-md shadow-md text-sky-100 bg-sky-500 hover:bg-sky-700 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300'
              >
                Perbarui
              </button>
              <Link to={'/get-rls'} className='mr-4 my-1'>
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

export default FormEditRls

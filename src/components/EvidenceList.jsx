import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const EvidenceList = () => {
  const [data, setData] = useState([])
  // error message
  const [msg, setMsg] = useState('')

  const url = 'http://localhost:5000/get-evd'

  useEffect(() => {
    getEvd()
  }, [])

  const getEvd = async () => {
    axios.get(url).then((json) => setData(json.data))
  }

  const deleteEvd = async (id) => {
    try {
      const urlDel = `http://localhost:5000/delete-evd?id=${id}`
      await axios.post(urlDel)

      getEvd()
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  const renderTable = () => {
    return data.map((evd, index) => {
      return (
        <tr key={evd.gejala_id}>
          <td className='px-2 py-1 border border-gray-200 text-center'>
            {index + 1}
          </td>
          <td className='px-2 py-1 border border-gray-200 text-center'>
            {evd.kode_gejala}
          </td>
          <td className='px-2 py-1 border border-gray-200'>
            {evd.nama_gejala}
          </td>
          <td className='text-sm font-medium text-center border border-gray-200'>
            <div className='text-center px-2 py-1'>
              <Link
                to={`/edit-evd?id=${evd.gejala_id}`}
                title='Edit'
                className='sm:text-sm w-full bg-sky-500 hover:bg-sky-400 text-white font-semibold py-1  mb-1 rounded-md  items-center'
              >
                <button
                  title='Edit'
                  className='sm:text-sm w-full bg-sky-500 hover:bg-sky-400 text-white font-semibold py-1  mb-1 rounded-md  items-center'
                >
                  Edit
                </button>
              </Link>
              <button
                title='Remove'
                onClick={() => deleteEvd(evd.gejala_id)}
                className='sm:text-sm w-full bg-red-500 hover:bg-red-400 text-white font-semibold py-1 mt-1 rounded-md  items-center'
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      )
    })
  }

  return (
    <div className='p-5 mb-5'>
      <h1 className='sm:text-3xl font-bold decoration-gray-400'>
        Tabel Gejala
      </h1>
      <div className=' mt-10 mb-4'>
        <Link
          to={'/add-evd'}
          className='px-6 py-2 text-sm font-semibold rounded-md shadow-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300'
        >
          Tambah baru
        </Link>

        <div className='flex flex-col my-3'>
          <div className='overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
            <div className='inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg'>
              <p className='text-center'>{msg}</p>
              <table id='evd' className='min-w-full'>
                <thead>
                  <tr>
                    <th className='px-2 py-3 text-xs font-medium leading-4 text-center md:w-auto text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                      No
                    </th>
                    <th className='px-2 py-3 text-xs font-medium leading-4 text-center md:w-auto text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                      Kode Gejala
                    </th>
                    <th className='px-2 py-3 text-xs font-medium leading-4 text-center md:w-auto text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                      Nama Gejala
                    </th>
                    <th className='px-2 py-3 text-sm text-center text-gray-500 md:w-auto border-b border-gray-200 bg-gray-50" colspan="3"'>
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>{renderTable()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EvidenceList

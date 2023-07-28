import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const UserList = () => {
  const url = 'http://localhost:5000/get-user'
  const [data, setData] = useState([])

  // error message
  const [msg, setMsg] = useState('')

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    await axios.get(url).then((json) => setData(json.data))
  }

  const deleteRls = async (id) => {
    const urlDel = `http://localhost:5000/delete-user?id=${id}`

    try {
      await axios.post(urlDel)
      getUser()
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  const renderTable = () => {
    return data.map((user) => {
      return (
        <tr key={user.id} className='text-center'>
          <td className='px-2 py-1 border border-gray-500 text-center align-middle'>
            {user.kode_pendaftaran}
          </td>
          <td className='px-2 py-1 border border-gray-500 align-middle'>
            {user.nama_user}
          </td>
          <td className='px-2 py-1 border border-gray-500 align-middle'>
            {user.no_hp}
          </td>
          <td className='px-2 py-1 border border-gray-500 text-center align-middle'>
            {user.role}
          </td>
          <td className='text-sm font-medium text-center border-b border-gray-500'>
            <div className='text-center px-2 py-1'>
              <Link to={`/edit-user?id=${user.id}`}>
                <button
                  title='Edit'
                  className='sm:text-sm w-full bg-sky-500 hover:bg-sky-400 text-white font-semibold py-1  mb-1 rounded-md  items-center'
                >
                  Edit
                </button>
              </Link>
              <button
                title='Remove'
                onClick={() => deleteRls(user.id)}
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
      <h1 className='sm:text-3xl font-bold decoration-gray-400'>Tabel User</h1>
      <div className=' mt-10 mb-4'>
        <Link
          to={'/add-user'}
          className='px-6 py-2 text-sm font-semibold rounded-md shadow-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300'
        >
          Tambah baru
        </Link>

        <div className='flex flex-col my-3'>
          <div className='overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
            <div className='inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg'>
              <p className='text-center text-xs text-red-500'>{msg}</p>
              <table id='hpt' className='min-w-full'>
                <thead>
                  <tr className='text-center'>
                    <th className='px-2 py-3 text-xs font-medium leading-4  md:w-auto text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                      Kode Pendaftaran
                    </th>
                    <th className='px-2 py-3 text-xs font-medium leading-4  md:w-auto text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                      Nama User
                    </th>
                    <th className='px-2 py-3 text-xs font-medium leading-4  md:w-auto text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                      No. Handphone
                    </th>
                    <th className='px-2 py-3 text-xs font-medium leading-4  md:w-auto text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                      Role
                    </th>
                    <th className='px-2 py-3 text-sm text-center text-white md:w-auto border-b border-gray-200 bg-black colspan="3"'>
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

export default UserList

import React, { useEffect } from 'react'
import Layout from './Layout'
import HipotesaList from '../components/HipotesaList'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/authSlice'

const Hipotesa = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isError, user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      navigate('/')
    }
    if (user && user.role === 'admin') {
      navigate('/get-hpt')
    } else if (user && user.role === 'user') {
      navigate('/get-hpt')
    } else {
      navigate('/dashboard')
    }
  }, [isError, user, navigate])

  return (
    <Layout>
      <HipotesaList />
    </Layout>
  )
}

export default Hipotesa

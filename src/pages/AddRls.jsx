import React, { useEffect } from 'react'
import Layout from './Layout'
import FormAddRls from '../components/FormAddRls'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/authSlice'

const AddRls = () => {
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
    if (user && user.role !== 'admin') {
      navigate('/dashboard')
    }
  }, [isError, user, navigate])

  return (
    <Layout>
      <FormAddRls />
    </Layout>
  )
}

export default AddRls

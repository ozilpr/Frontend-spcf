import React, { useEffect } from 'react'
import Layout from './Layout'
import RulesList from '../components/RulesList'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/authSlice'

const Rules = () => {
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
    } else if (user && user.role !== 'user') {
      navigate('/dashboard')
    }
  }, [isError, user, navigate])

  return (
    <Layout>
      <RulesList />
    </Layout>
  )
}

export default Rules

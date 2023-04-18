import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../../features/auth/authSlice'
import "./Register.module.css"
import { toast } from 'react-toastify'

export default function Register() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
      displayName
    }

    dispatch(register(userData))
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate("/")
    }
    dispatch(reset())
  }, [user, isError, isSuccess, isLoading, message, navigate, dispatch])

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <label>
        <span>Name</span>
        <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value.trim())} />
      </label>
      <label>
        <span>Email</span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value.trim())} />
      </label>
      <label>
        <span>Password</span>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value.trim())} />
      </label>
      <button>Register</button>
    </form>
  )
}

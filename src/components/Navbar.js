import React from 'react'
import "./Navbar.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from "../features/auth/authSlice"

export default function Navbar() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/")
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/" >Home</Link>
        </li>
        {
          !user ? (<>
            <li>
              <Link to="/login" >Login</Link>
            </li>
            <li>
              <Link to="/register" >Register</Link>
            </li>
          </>) : (<li>
            <button onClick={onLogout}>
              Logout
            </button>
          </li>)
        }
      </ul>
    </nav>
  )
}

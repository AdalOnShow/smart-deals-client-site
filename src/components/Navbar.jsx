import React, { use } from 'react'
import { Link, NavLink } from 'react-router'
import { AuthContext } from './../contexts/AuthContext';

const Navbar = () => {

  const { user, signOutFunc, setLoading } = use(AuthContext)

  const handleLogOut = () => {
    signOutFunc()
      .then(() => {
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const links = <>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/all-products">All Products</NavLink></li>
    {user &&
      <>
        <li><NavLink to="/my-products">My Products</NavLink></li>
        <li><NavLink to="/my-bids">My Bids</NavLink></li>
        <li><NavLink to="/create-product">Create Product</NavLink></li>
      </>
    }
  </>

  return (
    <div className="navbar bg-base-100 max-w-11/12 mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <Link to="/" className="text-4xl font-bold">Smart<span className='text-primary'>Deals</span></Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? <button onClick={handleLogOut} className="btn btn-outline">Logout</button> :
          <div className="space-x-4">
            <Link to="/login" className="btn btn-outline">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { signOutUser } from '../config/firebase/firebasemethods'

const Navbar = () => {

  // useNavigate
  // const navigate = useNavigate()

  // const logoutUser = async () => {
  //   const user = await signOutUser();
  //   setIsUser(false)
  //   console.log(user);
  //   navigate('login')
  // }
  return (
    <>
      {/* <div className='flex justify-around gap-5 m-5'>
        <h5><Link to=''>Home</Link></h5>
        <h5><Link to='dashboard'>Dashboard</Link></h5>
        <h5><Link to='login'>Login</Link></h5>
        <h5><Link to='register'>Register</Link></h5>
        <h5 className='cursor-pointer' onClick={logoutUser}>Logout</h5>
      </div> */}

<div className="navbar  bg-blue-700
">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl text-white">Bloging App</a>
  </div>
  <div className="flex-none gap-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.freepik.com/premium-photo/black-background-with-white-image-text-that-says-no_1198107-166100.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727395200&semt=ais_hybrid" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow ">
        <li className='text-center'><a><Link to='Login'>Login</Link></a></li>
      </ul>
    </div>
  </div>
</div>
    </>
  )
}

export default Navbar
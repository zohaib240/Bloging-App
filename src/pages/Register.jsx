import React, { useRef, useState } from 'react'
import { signUpUser, uploadImage } from '../Config/firebase/firebaseconfigmethodes'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { CircularProgress, fabClasses } from '@mui/material'



const Register = () => {
const [loading, setloading] = useState(false)
  const fullName = useRef()
  const email = useRef()
  const password = useRef()
  const profileImage = useRef()
  
  const navigate = useNavigate()

  const loginUserFromFirebase = async (event) => {
    setloading(true)
    event.preventDefault()
    console.log(email.current.value)
    console.log(password.current.value)
    console.log(fullName.current.value)
    console.log(profileImage.current.files[0])
    
    const userProfileImageUrl = await uploadImage(profileImage.current.files[0], email.current.value)
    
    try {
      const userData = await signUpUser({
        email: email.current.value,
        password: password.current.value,
        fullName: fullName.current.value,
        profileImage: userProfileImageUrl
      })
       Swal.fire({
        title: 'Success!',
        text: 'Your are Register Successfully',
        icon: 'success',
        confirmButtonColor: '#234e94',
        confirmButtonText: 'Login'
      })
      console.log(userData);
      navigate ('/login')
      setloading(false)
      
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: error,
        text: 'Use Another Email',
        icon: 'error',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#de2323',
      })
      setloading(false)
    }

  }
  return (
    <>
  <h1 className="text-center mt-8 text-4xl font-bold">Register</h1>
  <div className="flex justify-center items-center mt-9">
    <form
      className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
      onSubmit={loginUserFromFirebase}
    >
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter your full name"
          ref={fullName}
          className="input input-bordered w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Enter your email"
          ref={email}
          className="input input-bordered w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Enter your password"
          ref={password}
          className="input input-bordered w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="file"
          ref={profileImage}
          className="file-input file-input-bordered w-full"
        />
      </div>
      <div className="flex justify-center">
        <button type="submit" className="btn  bg-blue-700 text-white w-25">
        {loading ? <CircularProgress color='white' className='mt-1' size="20px" /> : "Register"}
        </button>
      </div>
      <div className='mt-2'>
          <a className=' text-center text-blue-700'> <h5><Link to='/login'>Already a user? Login here.</Link></h5>
          </a>
          </div>
    </form>
  </div>
</>

  )
}

export default Register
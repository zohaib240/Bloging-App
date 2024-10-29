import React, { useRef, useState } from 'react'
import { useForm } from "react-hook-form"
import { loginUser } from '../Config/firebase/firebaseconfigmethodes'
import Swal from 'sweetalert2'
import { CircularProgress } from '@mui/material'



import { Link, useNavigate } from 'react-router-dom'


const Login = () => {
  const [loading, setloading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()

  const loginUserFromFirebase = async (data) => {
    setloading(true)  // Loading ko true set karna hai jab login process shuru ho.
    console.log(data)
    try {
      const userLogin = await loginUser({
        email: data.email,
        password: data.password
      })
      Swal.fire({
        title: 'Success!',
        text: 'Your are Login Successfully',
        icon: 'success',
        confirmButtonText: 'Login',
        confirmButtonColor: '#234e94'
    })
      console.log(userLogin)
      navigate('/')
      setloading(false)

    } catch (error) {
      console.error(error)
      Swal.fire({
        title: error,
        text: 'Please check email & password!',
        icon: 'error',
        confirmButtonColor: '#de2323',
        confirmButtonText: 'Try Again',
    })
    setloading(false)
    }
  }
  return (
   <>
  <div className="flex justify-center items-center mt-9">
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-center text-4xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit(loginUserFromFirebase)}>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.email && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.password && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="flex justify-center">
          <button type="submit" className="btn  bg-blue-700 text-white w-25">
          {loading ? <CircularProgress color='white' className='mt-1' size="20px" /> : "Login"}
          </button>
        </div>
        <div className='mt-2'>
          <a className=' text-center text-blue-700'> <h5><Link to='/register'>Not a user? Register here.</Link></h5>
          </a>
          </div>
      </form>
    </div>
  </div>
</>

  )
}

export default Login
import React, { useRef } from 'react'
import { useForm } from "react-hook-form"
import { loginUser } from '../Config/firebase/firebaseconfigmethodes'

import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()

  const loginUserFromFirebase = async (data) => {
    console.log(data)
    try {
      const userLogin = await loginUser({
        email: data.email,
        password: data.password
      })
      console.log(userLogin)
      navigate('/dashboard')

    } catch (error) {
      console.error(error)
    }
  }
  return (
    // <>
    // <div>
    //   <h1>Login</h1>
    //   <form onSubmit={handleSubmit(loginUserFromFirebase)}>
    //     <input type="email" placeholder='enter your email' {...register("email", { required: true })} /><br />
    //     {errors.email && <span className='text-danger'>This field is required</span>}
    //      <br />
    //     <input type="password" placeholder='enter your password' {...register("password", { required: true })} /><br />
    //     {errors.password && <span className='text-danger'>This field is required</span>}
    //      <br />
    //     <button type='submit'>login</button>
    //   </form>
    // </div>
    // </>

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
            Login
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
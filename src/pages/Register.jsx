import React, { useRef } from 'react'
import { signUpUser, uploadImage } from '../Config/firebase/firebaseconfigmethodes'
import { Link, useNavigate } from 'react-router-dom'


  const Register = () => {
  const fullName = useRef()
  const email = useRef()
  const password = useRef()
  const profileImage = useRef()
  
  const navigate = useNavigate()

  const loginUserFromFirebase = async (event) => {
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
      console.log(userData);
      navigate ('/login')
  
    } catch (error) {
      console.error(error);

    }

  }
  return (
    // <>
    //   <h1 className='text-center mt-8'>Register</h1>
    // <div className='flex justify-center ml-[8rem]  mt-9 border'>

    //   <form onSubmit={loginUserFromFirebase}>
    //     <input type="text" placeholder='enter your full name' ref={fullName} /> <br /> <br />
    //     <input type="email" placeholder='enter your email' ref={email} /><br /> <br />
    //     <input type="password" placeholder='enter your password' ref={password} /><br /> <br />
    //     <input type="file" placeholder='enter your profile picture' ref={profileImage} /><br /> <br />
    //     <button type='submit'>register</button>
    //   </form>
      
    // </div>
    // </>
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
          Register
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
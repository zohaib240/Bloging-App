import React, { useEffect, useState } from 'react'
import { useForm  } from 'react-hook-form'
import { auth , sendData  } from '../Config/firebase/firebaseconfigmethodes'
import { Link } from 'react-router-dom'




const Dashboard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [blogData, setBlogData] = useState([]);


  



const sendDatafirestore= async (data) => {
  console.log(data)
  try {
    const response = await sendData({
      title: data.title,
      description: data.description,
      uid: auth.currentUser.uid
    }, 'blogs')
    blogData.push({
      title: data.title,
      description: data.description,
      uid: auth.currentUser.uid
    })
    setBlogData([...blogData])
    console.log(response);


  } catch (error) {
    console.error(error)
  }
}


  
  
  return (
<>
  <div className="bg-blue-50 h-[100vh]">
    <div className="bg-white text-black navbar justify-between">
      <h1 className="font-bold text-xl m-3">Dashboard</h1>
      <h5 className="font-bold text-xl m-3"><Link to='/'>All Blogs</Link></h5>
    </div>

    <div className="bg-white mr-[30%] ml-5 rounded p-3 mt-7">
      <form onSubmit={handleSubmit(sendDatafirestore)} >
        <div className="m-4">
          <textarea
          type="text"
          {...register("title", { required: true })}
            placeholder="Enter Your Blog Title."
            className="textarea textarea-xs textarea-bordered w-full"
          ></textarea>
        </div>
        <div className="m-4">
          <textarea
          type="text"
          {...register("description", { required: true })}
            placeholder="Enter Your Blog Description"
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>
        <div className="flex justify-start ml-6">
          <button type="submit" className="btn bg-blue-700 text-white w-25">
            Publish
          </button>
        </div>
      </form>
  </div>
  <div className='mt-3 bg-light-blue p-7'>
  <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">
    User Blogs
  </h1>
  
  <div className="flex flex-wrap justify-center mx-auto mt-8">
    {blogData.length > 0 ? (
      blogData.map((item, index) => {
        return (
          <div
            key={index}
            className="bg-blue-100 hover:bg-blue-200 transition-all shadow-lg rounded-lg m-5 p-6 border border-blue-300 w-[40%]"  // Width set to 40%
          >
            <h1 className="text-2xl font-semibold break-words text-blue-900 mb-3">
              Title: {item.title}
            </h1>
            <p className="text-gray-700 text-base break-words">
              Description: {item.description}
            </p>
          </div>
        );
      })
    ) : (
      <h1 className="text-center text-xl text-blue-600">
        No blogs found
      </h1>
    )}
  </div>
</div>


</div>
   
</>

  )
}


export default Dashboard
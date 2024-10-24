import React, { useEffect, useState } from 'react'
import { useForm  } from 'react-hook-form'
import { auth , db, getData, sendData  } from '../Config/firebase/firebaseconfigmethodes'
import { Link, useLocation } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'




const Dashboard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const [blogData, setBlogData] = useState([]);

  // useEffect(() => {

  //     onAuthStateChanged(auth , async(user)=>{
  //       if(user){
  //         console.log(user.uid)
  //         const blogsData = await getData("blogs" , user.uid)
  //         console.log(blogsData)
  //         setBlogData([...blogsData])
  //       }
  //     })
  // }, [])
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          blogData.push(doc.data())
        });
        setBlogData([...blogData])
      }
    })
  }, [])
  console.log(blogData)

const sendDatafirestore= async (data) => {
  console.log(data)
  try {
    const response = await sendData({
      title: data.title,
      description: data.description,
      uid: auth.currentUser.uid,
      time:data.currentDate,
      pfp: blogData[0].profileImage
      
    }, 'blogs')
    blogData.push({
      title: data.title,
      description: data.description,
      uid: auth.currentUser.uid,
      time:data.currentDate,

      pfp: blogData[0].profileImage
    })
    setBlogData([...blogData])
    console.log(response);


  } catch (error) {
    console.error(error)
  }

  reset()
}

  return (
<>
  <div className="bg-blue-50 h-[full]">
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

{/* blog Render ====>> */}

<div className='mt-3 bg-light-blue p-7'>
  <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">
    User Blogs
  </h1>

  <div className="flex flex-wrap  mt-8 w-[85%]"> 
    {blogData.length > 0 ? (
      blogData.map((item, index) => {
        return (
          <div
            key={index}
            className="bg-white hover:bg-blue-200 transition-all shadow-lg rounded-lg mt-3 p-6 border border-blue-300 w-full sm:w-[85%]"  // Responsive width
          >
            <h2 className="text-xl font-semibold break-words text-blue-900 mb-3">  
              Title: {item.title}
            </h2>
            <h3 className=" text-gray-700 break-words">  
              <span className='text-xl'>Description:</span> {item.description}
            </h3>
          </div>
        );
      })
    ) : (
      <p>No blogs available.</p>
    )}
  </div>
</div>



</div>
   
</>

  )
}


export default Dashboard
import React, { useEffect, useState } from 'react'
import { useForm  } from 'react-hook-form'
import { auth , db, sendData  } from '../Config/firebase/firebaseconfigmethodes'
import { Link } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { serverTimestamp } from "firebase/firestore";
import Swal from 'sweetalert2'




const Dashboard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const [users, setusers] = useState([]);
  const [blogs, setblogs] = useState([])
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
         users.push(doc.data())
        });
        setusers(users)
        console.log(users)

    //  get data from firebase
     
       const b = query(collection(db, "blogs"), where("uid", "==", user.uid));
        const datablog = await getDocs(b);
        datablog.forEach((doc) => {
         blogs.push(doc.data())
        });
        setblogs([...blogs])
        console.log(blogs) 
      }   
    })


  }, [])
  console.log(blogs)


const sendDatafirestore= async (data) => {
  console.log(data)
  try {
    const response = await sendData({
      title: data.title,
      description: data.description,
      uid: auth.currentUser.uid,
      pfp: users[0].profileImage,
      createdAt: serverTimestamp()  
    }, 'blogs')
    const newblog ={
      title: data.title,
      description: data.description,
      uid: auth.currentUser.uid,
      pfp: users[0].profileImage,
      createdAt: new Date()  
    }

    Swal.fire({
      title: 'Success!',
      text: 'Your Blog Post Successfully',
      icon: 'Success',
      confirmButtonColor: '#234e94',
      confirmButtonText: 'Post'
    })
    setblogs((prevBlogs) => [...prevBlogs, newblog]); // Update state
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
      <Link to='/'>
  <button className="bg-blue-600 text-white font-bold text-lg py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out m-3">
    All Blogs
  </button>
</Link>

    </div>

    <div className="bg-white mr-[10%] ml-5 rounded p-3 mt-7">
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
    {blogs.length > 0 ? (
      blogs.map((item, index) => {
        console.log(blogs);
        
        return (
          <div
            key={index}
            className="bg-white hover:bg-blue-200 transition-all shadow-lg rounded-lg mt-3 p-6 border border-blue-300 w-full sm:w-[90%]"  // Responsive width
          >
            <h2 className="text-xl font-semibold break-words text-blue-900 mb-3">  
              Title: {item.title  }
            </h2>
            <h3 className=" text-gray-700 break-words">  
              <span className='text-xl'>Description:</span> {item.description  }
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
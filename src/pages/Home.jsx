import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth, db, getAllData, getData } from '../Config/firebase/firebaseconfigmethodes';
import { collection, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { data } from 'autoprefixer';



const Home = () => {

  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const alldata = async () => {
      const blogs = [];  // Temporary array to hold data
      const querySnapshot = await getDocs(collection(db, "blogs"), orderBy("createdAt", "desc"));
      querySnapshot.forEach((doc) => {
        blogs.push(doc.data())
      });
      console.log(blogs);
      console.log(querySnapshot.docs);
      setBlogData(blogs)
    }
    alldata()

  }, [])
  const formatDate = (timestamp) => {
    if (timestamp?.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        time:'numeric'
      });
    }
    return "";
  };
 
  return (
    <>
      <div className="bg-blue-50 h-[100vh]">
        <div className='bg-white text-black navbar'>
          <h1 className="font-bold text-xl">Good Morning! Readers</h1>
        </div>

        <h1 className='font-bold text-xl m-3'>All Blogs</h1>
        <div className='bg-white h-[100vh] ml-6 mr-11'>
          {blogData.length > 0 ? (
            blogData.map((item, index) => (
              <div key={index} className='flex ml-5 mt-5 items-center'>
                {/* Display blog image */}
                <div className='w-[80px] h-[80px] mt-5 rounded-full overflow-hidden'>
              <img src={item.pfp} alt="Blog" className="w-full h-full object-cover" />
</div>

                {/* Display blog title and description */}
                <div className='ml-3 mt-5'>
                  <h1 className='font-bold'>{item.title}</h1>
                  <p className="text-black text-sm">Time: {formatDate(item.createdAt)} </p>
                  <div>
                    <h3 className='text-neutral-content'>{item.description}</h3>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No blogs available.</p>  // If no blogs are available, show this message
          )}
        </div>
      </div>

    </>

  )
}

export default Home
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth, db, getAllData, getData } from '../Config/firebase/firebaseconfigmethodes';
import { collection, doc, getDocs, orderBy, query, where } from "firebase/firestore";



const Home = () => {

  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const alldata = async () => {
      // Query collection with orderBy
      const blogsQuery = query(collection(db, "blogs"), orderBy("createdAt", "asc"));
      const querySnapshot = await getDocs(blogsQuery);
  
      querySnapshot.forEach((doc) => {
        blogData.push(doc.data());
      });
      
      console.log(blogData);
      setBlogData([...blogData]);
    };
    alldata();
  }, []);
  
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
              <div key={index} className='flex ml-5 mt-2 '>
                {/* Display blog image */}

                {/* Display blog title and description */}
                <div className='ml-3  mt-7'>
                  <div className='flex items-center '>
                <div className='w-[80px] h-[80px] mt-5 rounded-full overflow-hidden  flex-shrink-0'>
              <img src={item.pfp} alt="Blog" className="w-full h-full object-cover" />
              
              </div>
                <div className='m-3'><h1 className='font-bold'>{item.title}</h1>
                 <p className="text-black text-sm"> {item.fullName} <span>Time: {formatDate(item.createdAt)}</span> </p></div>  
                  </div>
                  <div>
                    <h3 className='text-gray-600'>{item.description}</h3>
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
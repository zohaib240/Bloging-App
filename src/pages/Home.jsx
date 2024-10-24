import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth, db, getAllData, getData } from '../Config/firebase/firebaseconfigmethodes';
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { data } from 'autoprefixer';



const Home = () => {

  const [blogData, setBlogData] = useState([]);
  const [Data, setData] = useState([]);

  useEffect(() => {

    const alldata = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      querySnapshot.forEach((doc) => {
        blogData.push(doc.data())
      });
      console.log(blogData);
      setBlogData([...blogData])
    }
    alldata()

  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const q = query(collection(db, "users"), where("id", "==", user.uid));
  //       const querySnapshot = await getDocs(q);
  //       querySnapshot.forEach((doc) => {
  //         Data.push(doc.data())
  //         console.log(doc.id, " => ", doc.data());
  //       });

  //       // setData([...Data])
  //       console.log(Data)


  //     }
  //   })
  }, [])





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
                <div className='w-[80px] mt-5 rounded'>
                  <img src={item.pfp} alt="Blog" />

                </div>

                {/* Display blog title and description */}
                <div className='ml-3 mt-5'>
                  <h1 className='font-bold'>{item.title}</h1>
                  <p className="text-black text-sm">Time: {item.currentDate} </p>
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
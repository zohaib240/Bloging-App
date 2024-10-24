import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { auth, db } from '../Config/firebase/firebaseconfigmethodes';
import { collection, getDocs, query, where } from 'firebase/firestore';
// import { signOutUser } from '../config/firebase/firebasemethods'




const Navbar = () => {
  const currentPage = useLocation()
  console.log(currentPage.pathname);
  const [Data, setData] = useState([]);
  // logout user
  const userLogout = () => {
    signOutUser()
    alert('user logout ho giya ha');
    navigate('/login')
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          Data.push(doc.data())
        });

        setData([...Data])
        
        
      }
    })
  }, [])
  console.log(Data)

  return (
    <>
      <div className="navbar  bg-blue-700">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-white">Bloging App</a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={Data.length>0 && Data[0].profileImage} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow ">
              {currentPage.pathname === '/Dashboard' ? <>
                <li className='text-center'><Link to='Login'>Login</Link></li>
              <li className='text-center'><Link to='/'>Home</Link></li>
              <li className='text-center'><button onClick={userLogout}><Link to='Login'>Logout</Link></button></li>
              </> : currentPage.pathname === '/' ? <>
              <li className='text-center'><Link to='Login'>Login</Link></li>
              <li className='text-center'><Link to='Dashboard'>Dashboard</Link></li>
              <li className='text-center'><button onClick={userLogout}><Link to='Login'>Logout</Link></button></li></> : null}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
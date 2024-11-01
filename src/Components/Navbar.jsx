import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth, db, signOutUser } from '../Config/firebase/firebaseconfigmethodes';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Swal from 'sweetalert2';

const Navbar = () => {
  let navigate = useNavigate();
  const currentPage = useLocation();
  const [Data, setData] = useState([]);

  // logout user
  function userLogout() {
    console.log('logout');
    Swal.fire({
      title: 'Success!',
      text: 'You are logged out successfully',
      icon: 'success',
      confirmButtonText: 'Logout',
      confirmButtonColor: '#234e94'
    });
    signOutUser();
    setData([]);
    console.log('User logged out.');
    navigate('/login');
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });
        setData(userData);
      }
    });
    return () => unsubscribe(); // Clean up subscription
  }, []);

  return (
    <>
      <div className="navbar bg-blue-700">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-white">Blogging App</a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="no img"
                  src={Data.length > 0 && Data[0].profileImage ? Data[0].profileImage : 'https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg'}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {auth.currentUser ? (
                <>
                  {currentPage.pathname === '/Dashboard' ? (
                    <>
                      <li className='text-center'><Link to='/'>Home</Link></li>
                      <li className='text-center'><button onClick={userLogout}>Logout</button></li>
                    </>
                  ) : currentPage.pathname === '/' ? (
                    <>
                      <li className='text-center'><Link to='Profile'>Profile</Link></li>
                      <li className='text-center'><Link to='Dashboard'>Dashboard</Link></li>
                      <li className='text-center'><button onClick={userLogout}>Logout</button></li>
                    </>
                  ) : currentPage.pathname === '/Profile' ? (
                    <>
                      <li className='text-center'><Link to='/'>Home</Link></li>
                      <li className='text-center'><Link to='Dashboard'>Dashboard</Link></li>
                      <li className='text-center'><button onClick={userLogout}>Logout</button></li>
                    </>
                  ) : null}
                </>
              ) : (
                // If user is not logged in
                <li className='text-center'><Link to='Login'>Login</Link></li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

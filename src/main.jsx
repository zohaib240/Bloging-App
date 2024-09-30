import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'
import './index.css'
import Layout from './layout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx';

  
    const router = createBrowserRouter([
        {
          path: '',
          element: <Layout />,
          children: [
            {
              path: '',
              element: <Home />
            },
            {
              path: 'login',
              element: <Login />
            },
            {
              path: 'register',
              element: <Register />
            },
          {
              path: 'dashboard',
              element: <Dashboard />
            }
            
    ]
     }
    ])
      

      createRoot(document.getElementById('root')).render(
        <RouterProvider router ={router}>
          <App />
        </RouterProvider>
      )
    
    
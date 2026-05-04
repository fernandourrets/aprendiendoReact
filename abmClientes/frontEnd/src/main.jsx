import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="bg-blue-300 min-h-screen ">
    {/* <App /> */}
    <RouterProvider router={router}/>
  
    </div>
   
  </StrictMode>,
)

import React from 'react'
import Admin_Sidebar from '../Admin_Sidebar'
import Navbar from '../Navbar'
import Home_categories from '../../Admin_Dashboard/Home_pages/Home_categories'



const Home = () => {
  return (
    <>
    <Admin_Sidebar/>
    <Navbar/>
    <div className="lg:pl-72">
      <div className="px-4 bg-slate-100 sm:px-6 lg:px-8 py-6">
           <Home_categories/>
      </div>
    </div>
   
    </>
  )
}

export default Home

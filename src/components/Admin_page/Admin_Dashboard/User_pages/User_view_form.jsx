import React from 'react'
import Admin_Sidebar from '../Admin_Sidebar'
import Navbar from '../Navbar'
import User_view from './User_view'

const User_view_form = () => {
  return (
    <>
    <Admin_Sidebar/>
    <Navbar/>
    <div className="lg:pl-72">
      <div className="px-4 bg-slate-100 sm:px-6 lg:px-8 py-6">
           <User_view/>
      </div>
    </div>
    </>
  )
}

export default User_view_form

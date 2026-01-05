import React from 'react'
import Admin_Sidebar from '../Admin_Sidebar'
import Navbar from '../Navbar'
import Add_Categories from './Add_Categories'

const Add_Cate_Form = () => {
  return (
    <>
    <Admin_Sidebar/>
    <Navbar/>
    <div className="lg:pl-72">
      <div className="px-4 bg-slate-100 sm:px-6 lg:px-8 py-6">
           <Add_Categories/>
      </div>
    </div>
    </>
  )
}

export default Add_Cate_Form

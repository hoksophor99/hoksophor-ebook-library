import React from 'react'
import Edit_Ebook from './Edit_Ebook'
import Navbar from '../Navbar'
import Admin_Sidebar from '../Admin_Sidebar'

const Edit_Ebook_Form = () => {
  return (
    <>
    <Admin_Sidebar/>
    <Navbar/>
    <div className="lg:pl-72">
      <div className="px-4 bg-slate-100 sm:px-6 lg:px-8 py-6">
           <Edit_Ebook/>
      </div>
    </div>
    </>

  )
}

export default Edit_Ebook_Form

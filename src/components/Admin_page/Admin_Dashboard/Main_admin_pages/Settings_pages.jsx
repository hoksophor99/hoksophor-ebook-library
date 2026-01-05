import React from 'react'
import Admin_Sidebar from '../Admin_Sidebar'
import Navbar from '../Navbar'
import Setting_categories from '../Setting_pages/Setting_categories'

const Settings_pages = () => {
  return (
    <>
    <Admin_Sidebar/>
    <Navbar/>
    <div className="lg:pl-72">
      <div className="px-4 bg-slate-100 sm:px-6 lg:px-8 py-6">
           <Setting_categories/>
      </div>
    </div>
    </>
  )
}

export default Settings_pages

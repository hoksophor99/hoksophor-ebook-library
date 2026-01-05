import React from 'react'
import Topbar from '../Topbar'
import Sidebar from '../Sidebar'
import My_library_content from '../My_library_page/My_library_content'


const Ebooks_user_page = () => {
  return (
    <>
    <Topbar/>
    <div  class="flex">
          <Sidebar/>
      <div className="flex-1 min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
          <My_library_content/>
      </div>
    </div>
    
    </>
  )
}

export default Ebooks_user_page

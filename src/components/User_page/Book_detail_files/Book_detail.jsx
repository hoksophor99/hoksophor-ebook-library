import React from 'react'
import Topbar from '../Topbar'
import Sidebar from '../Sidebar'
import Book_content from './Book_content'




const Book_detail = () => {
  return (
    <>
    <Topbar/>
    <div  class="flex">
          <Sidebar/>
      <div className="flex-1 min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
          <Book_content/>
      </div>
    </div>
    
    </>
  )
}

export default Book_detail

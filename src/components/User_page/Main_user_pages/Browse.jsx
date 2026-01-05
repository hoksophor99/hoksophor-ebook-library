import React from 'react'
import Topbar from '../Topbar'
import Sidebar from '../Sidebar'
import Browse_Content from '../Browse_page/Browse_Content'


const Browse = () => {
  return (
    <>
    <Topbar/>
    <div  class="flex">
          <Sidebar/>
      <div className="flex-1 min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
          <Browse_Content/>
      </div>
    </div>
    
    </>
  )
}

export default Browse

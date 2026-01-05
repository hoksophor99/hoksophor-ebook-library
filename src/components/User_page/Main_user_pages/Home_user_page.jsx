import React from 'react'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
import Home_Content from '../Home_page/Home_Content'



const Home_user_page = () => {
  return (
 <>
    <Topbar/>
    <div  className="flex">
          <Sidebar/>
      <div className="flex-1 min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
          <Home_Content/>
      </div>
    </div>
 
    
 </>
  )
}

export default Home_user_page

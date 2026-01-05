import React from 'react'
import Topbar from '../Topbar'
import Sidebar from '../Sidebar'
import Profile_content from './Profile_content'




const Profile = () => {
  return (
    <>
    <Topbar/>
    <div  class="flex">
          <Sidebar/>
      <div className="flex-1 min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
          <Profile_content/>
      </div>
    </div>
    </>
  )
}

export default Profile

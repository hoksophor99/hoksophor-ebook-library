import React from 'react'
import Add_Card_Content from './Add_Card_Content'
import Topbar from '../Topbar'
import Sidebar from '../Sidebar'


const Add_Card = () => {
  return (
    <>
    <Topbar/>
    <div  class="flex">
          <Sidebar/>
      <div className="flex-1 min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
          <Add_Card_Content/>
      </div>
    </div>
    
    </>
  )
}

export default Add_Card

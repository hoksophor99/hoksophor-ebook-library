import React from 'react'
import Topbar from '../Topbar'
import Sidebar from '../Sidebar'
import Book_Wishlist_content from '../Book_wishlist_page/Book_Wishlist_content'


const Books_Wishlisted = () => {
  return (
   <>
    <Topbar/>
    <div  className="flex">
          <Sidebar/>
      <div className="flex-1 min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
          <Book_Wishlist_content/>
      </div>
    </div>
  
   </>
  )
}

export default Books_Wishlisted

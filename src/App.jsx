import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route,Navigate, Outlet } from "react-router-dom";
import {getAuth} from './data/auth'
import viteLogo from '/vite.svg'
import './App.css'
import Admin_login from '../src/components/Admin_page/Login/Admin_login'
import Home from '../src/components/Admin_page/Admin_Dashboard/Main_admin_pages/Home'
import Admin_Sidebar from '../src/components/Admin_page/Admin_Dashboard/Admin_Sidebar';
import Ebooks from '../src/components/Admin_page/Admin_Dashboard/Main_admin_pages/Ebooks_pages'
import Ebooks_pages from '../src/components/Admin_page/Admin_Dashboard/Main_admin_pages/Ebooks_pages';
import Categories_pages from '../src/components/Admin_page/Admin_Dashboard/Main_admin_pages/Categories_pages'
import Users_pages from '../src/components/Admin_page/Admin_Dashboard/Main_admin_pages/Users_pages'
import Orders_pages from '../src/components/Admin_page/Admin_Dashboard/Main_admin_pages/Orders_pages'
import Settings_pages from '../src/components/Admin_page/Admin_Dashboard/Main_admin_pages/Settings_pages'
import Add_Ebook_Form from './components/Admin_page/Admin_Dashboard/Ebooks_pages/Add_Ebook_Form';
import Add_Cate_Form from '../src/components/Admin_page/Admin_Dashboard/Categories_pages/Add_Cate_Form'
import User_view_form from './components/Admin_page/Admin_Dashboard/User_pages/User_view_form';
import Logout from './components/Admin_page/Admin_Dashboard/Main_admin_pages/Logout';


// user pages
import Home_user_page from './components/User_page/Main_user_pages/Home_user_page';
import Browse from './components/User_page/Main_user_pages/Browse'
import Ebooks_user_page from './components/User_page/Main_user_pages/Ebooks_user_page'
import Book_detail from './components/User_page/Book_detail_files/Book_detail';
import Books_Wishlisted from './components/User_page/Main_user_pages/Books_Wishlisted'
import Add_Card from './components/User_page/Add_To_Card/Add_Card';
import Profile from './components/User_page/Profile_page/Profile'
import EbookLibraryHero from './components/Hero/EbookLibraryHero';
import Register from './components/Admin_page/Login/Register';
import Reader from './components/User_page/Reader_page/Reader';
import Edit_Ebook_Form from './components/Admin_page/Admin_Dashboard/Ebooks_pages/Edit_Ebook_Form';


const ProtectedLayout = ({ role }) => {
  const auth = getAuth();

  if (!auth || auth.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<EbookLibraryHero/>} />

        {/* auth */}
          <Route path="/login" element={<Admin_login />} />
          <Route path="/register" element={<Register/>} />
          {/* <Route path="/logout" element={<Logout />} /> */}

    

        {/* admin pages */}
          <Route element={<ProtectedLayout role="admin"/>}>
            <Route path="/home" element={<Home/>} />
            <Route path="/ebooks" element={<Ebooks_pages/>} />
            <Route path="/add_ebook" element={<Add_Ebook_Form/>} />
            <Route path="/edit_ebook/:id" element={<Edit_Ebook_Form/>} />
            <Route path="/categories" element={<Categories_pages/>} />
            <Route path="/edit_categories/:index" element={<Add_Cate_Form/>} />
            <Route path="/users_pages" element={<Users_pages/>} />
            <Route path="/user_view" element={<User_view_form/>} />
            <Route path="/orders" element={<Orders_pages/>} />
            <Route path="/settings" element={<Settings_pages/>} />
          </Route>

          <Route element={<ProtectedLayout role="user" />}>
              {/* User Pages */}
            <Route path="/home_user_page" element={<Home_user_page />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/ebooks_user_page" element={<Ebooks_user_page />} />
            <Route path='/home_user_page/book_detail' element={<Book_detail/>} />
            <Route path='/browse/book_detail' element={<Book_detail/>} />
            <Route path='/home_user_page/books_wishlisted' element={<Books_Wishlisted/>} />
            <Route path='/add_card' element={<Add_Card/>} />
            <Route path='/my_profile' element={<Profile/>} />
            <Route path="/reader" element={<Reader/>} />

          </Route>
          
      </Routes>
    </BrowserRouter>

    
   
  )
}

export default App

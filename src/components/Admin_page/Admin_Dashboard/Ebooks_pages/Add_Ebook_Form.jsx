import React from 'react'
import Admin_Sidebar from '../Admin_Sidebar';
import Navbar from '../Navbar';
import Add_Ebook_categories from './Add_Ebook_categories';


const Add_Ebook_Form = () => {

  return (
    <>
    <Admin_Sidebar/>
    <Navbar/>
    <div className="lg:pl-72">
      <div className="px-4 bg-slate-100 sm:px-6 lg:px-8 py-6">
           <Add_Ebook_categories/>
      </div>
    </div>
    </>
  );
};

export default Add_Ebook_Form;

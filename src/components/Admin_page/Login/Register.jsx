import { useEffect, useState } from 'react'
import Login_img from '../../../assets/image/Login_img.png'
import {FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
   useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <div className="min-h-screen bg-linear-to-br  from-blue-50 to-indigo-100 flex items-center justify-center p-6">
          <div
            className={`max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 items-stretch bg-[#ffffff] rounded-3xl transition-all duration-700 ease-out
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {/* Left Illustration */}
            <div className="flex justify-center md:justify-start p-8">
              <div className="relative">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-700">
                    <FaArrowLeft />
                    <span>Back</span>
                  </button>
                <img
                  src={Login_img}
                  alt="eBook illustration"
                  className="w-full h-full max-w-xl"
                />
                {/* <div className="absolute -top-4 -right-4 w-20 h-20 bg-indigo-300 rounded-full blur-2xl opacity-60" /> */}
              </div>
            
            </div>
    
            {/* Right Login Card */}
            <div className="flex justify-center p-20 md:justify-end">
              <div className="w-full max-w-sm bg-white">
                <div className="mb-6 text-center">
                  <div className="text-3xl mb-2">📘</div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    eBook Admin
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Sign Up Your Account
                  </p>
                </div>
    
                <form className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Input your name"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <input
                      type="email"
                      placeholder="admin@gmail.com"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
    
                  <div>
                    <label className="text-sm text-gray-600">Password</label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
    
                  <div className="flex justify-end">
                    <button
                    onClick={()=>navigate("/login")}
                      type="button"
                      className="text-sm text-indigo-500 hover:underline"
                    >
                      Already have an account?
                    </button>
                  </div>
    
                  <a
                    href='/home_user_page'
                    className="w-full block text-center bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2.5 rounded-lg transition-colors duration-300"
                  >
                    Sign Up
                  </a>
                </form>
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default Register

import { useEffect, useState } from 'react'
import Login_img from '../../../assets/image/Login_img.png'
import {FaArrowLeft,FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import {login} from '../../../data/auth'


const admin_login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


    useEffect(() => {
      setMounted(true);
    }, []);
    const handleSubmit = (e) => {
      e.preventDefault();

      const role = login(email, password);

      if (!role) {
        setError("Invalid email or password!");
        return;
      }

      navigate(role === "admin" ? "/home" : "/home_user_page");
    };


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
                onClick={() => navigate("/")}
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
                Sign in to your dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <input
                    type="email"
                    placeholder="admin@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2
                              focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Password</label>

                  <div className="relative mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10
                                focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center
                                text-gray-400 hover:text-gray-600"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                  </div>
                </div>

                {error && (
                <div className="rounded-lg bg-red-50 border border-red-200
                                text-red-600 text-sm px-4 py-2 text-center">
                  {error}
                </div>
              )}


                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-indigo-500 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-500 hover:bg-indigo-600
                            text-white font-medium py-2.5 rounded-lg
                            transition-colors duration-300"
                >
                  Login
                </button>
                <div>
                  User: user@gmail.com , password:user123
                </div>
                <div>
                   Admin: admin@gmail.com , password:admin123
                </div>
            </form>

          </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default admin_login

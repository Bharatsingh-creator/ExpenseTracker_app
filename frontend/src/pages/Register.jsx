import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState} from "react";
import { useNavigate } from 'react-router-dom'
import logo from '../assets/icons8-figma.gif'
import gif from '../assets/Investment data.gif'
import apple from '../assets/icons8-apple-logo-50.png'
import google from '../assets/icons8-google-logo-48.png'


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()


  const handleSignup = async () => {

  if (!name || !email || !password) {
    setError("All fields are required");
    return;
  }

  try {
    setLoading(true);   
    setError("");
    setMessage("");

    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      { name, email, password }
    );

    setMessage(res.data.message);
    navigate('/dashboard') 
  } catch (err) {
    setError(err.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);  
  }
};
  return (
    <div className="flex w-full ">
      {/* lefthalf */}
      <div className="mt-4 ml-2 flex gap-2">
        <img
          src={logo}
          alt="logo"
          className="w-10 h-10"
        />
        <span className="text-2xl font-bold mt-1">FinSet</span>
      </div>
      <div className="w-1/2 flex flex-col mt-20 gap-4">
        <div className="flex flex-col items-center w-full mb-4">
          <h1 className="font-bold text-4xl">Welcome to FinSet!</h1>
          <h4 className="text-[#A1A1A9] text-sm">
            Sign up and start managing your finances now
          </h4>
        </div>

        <div className="flex flex-col items-center gap-2">
          {/* Username Field */}
          <div className="flex flex-col gap-2 w-80">
            <label className="font-semibold text-sm self-start ml-2">
              Username
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="border border-gray-300 outline-0 rounded-full px-5 py-3 w-full text-sm font-sans"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2 w-80">
            <label className="font-semibold text-sm self-start ml-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email address"
              className="border border-gray-300 outline-0 rounded-full px-5 py-3 w-full text-sm font-sans"
            />
          </div>

          {/* Password Field + Submit Button */}
          <div className="flex flex-col gap-2 w-80">
            <label className="font-semibold text-sm self-start ml-2">
              Create Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border border-gray-300 outline-0 rounded-full px-5 py-3 w-full text-sm font-sans"
            />
            <button
              onClick={handleSignup}
               disabled={loading}
              className="rounded-4xl mt-4 text-xl font-extrabold p-2 text-white bg-[#8470FF] cursor-pointer  "
            >
              {loading ? "Creating..." : "Sign up"}
            </button>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>

          {/* --- THE DIVIDER --- */}
          <div className="flex items-center w-80 my-4">
            <div className="flex-1 h-[1px] bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">or continue with</span>
            <div className="flex-1 h-[1px] bg-gray-300"></div>
          </div>
          {/* ------------------- */}
        </div>
        <div className="flex flex-row justify-center gap-2">
          <img
            src={apple}
            alt="applelogo"
            className="rounded-full border border-[#A1A1A9] cursor-pointer w-10 h-10 p-2"
          />
          <img
            src={google}
            alt="applelogo"
            className="rounded-full border border-[#A1A1A9] cursor-pointer w-10 h-10 p-2"
          />
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{""}
          <Link
            to="/login"
            className="text-[#8470FF] font-bold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* righthalf */}
      <div className="w-1/2 mt-20">
        <img
          src={gif}
          alt="bg"
          className="w-150 h-150 "
        />
      </div>
    </div>
  );
};

export default Register;

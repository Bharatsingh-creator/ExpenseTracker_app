import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import logo from '../assets/icons8-figma.gif'
import gif from '../assets/Investment data.gif'
import apple from '../assets/icons8-apple-logo-50.png'
import google from '../assets/icons8-google-logo-48.png'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("userInfo", JSON.stringify(res.data.user||res.data));
      localStorage.setItem("token", res.data.token);

      setMessage(res.data.message);
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
          <h1 className="font-bold text-4xl">Sign in</h1>
          <h4 className="text-[#A1A1A9] text-sm">
            Welcome there! Sign in to continue with FinSet
          </h4>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col gap-2 w-80">
            <label className="font-semibold text-sm self-start ml-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) =>setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="border border-gray-300 outline-0 rounded-full px-5 py-3 w-full text-sm font-sans"
            />
          </div>

          <div className="flex flex-col gap-2 w-80">
            <label className="font-semibold text-sm self-start ml-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border border-gray-300 outline-0 rounded-full px-5 py-3 w-full text-sm font-sans"
            />
            <button
              className="rounded-4xl mt-4 text-xl font-extrabold p-2 text-white bg-[#8470FF] cursor-pointer  "
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {message && <p style={{ color: "#e5fae6" }}>{message}</p>}
            {error && <p style={{ color: "#e83838" }}>{error}</p>}
          </div>

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
          Don't have an account?{""}
          <Link to="/" className="text-[#8470FF] font-bold hover:underline">
            Sign up
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

export default Login;

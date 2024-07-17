import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import logo from "../../../assets/gl-h"

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/token/", // Endpoint to authenticate and obtain tokens
        user, // Data object containing username and password
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Enable sending cookies for authentication
        }
      );

      if (response.status === 200) {
        console.log(response.data, " response.data");
        // Clear local storage (optional)
        localStorage.clear();

        // Store access token, refresh token, and username in local storage
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("user_id", response.data.id);

        // Redirect to home page after successful login
        navigate("/admin/productlist");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError("Username or password do not match");
        } else {
          setError("An error occurred during login. Please try again later");
        }
      } else {
        setError("An error occurred. Please check your network connection.");
      }
    }
  };

  return (
    <div>
      <div>
        {error && (
          <div className="bg-red-200 bg-opacity-70 rounded-md md:p-2 p-1">
            <p className="md:text-[15px] text-xs">{error}</p>
          </div>
        )}

        <div className=" md:flex md:items-center justify-center md:bg-gray-200  h-screen">
          <div className="md:w-[570px]  bg-white px-10   rounded-[30px] ">
            <div className="mb-4 flex justify-start">
              <h1 className="text-4xl font-bold font-poppins"> Admin Login</h1>
            </div>
            <div className="mb-2 flex justify-start">
              <p className="font-poppins">Enter your username and password</p>
            </div>
            <div className="">
              <div className="bg-white   flex flex-col">
                <div className="mb-4 ">
                  <label
                    className=" text-grey-darker px-1 text-sm  mb-2 flex justify-start"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className={`appearance-none  bg-[#C0DBEA] rounded w-full py-2 px-3 text-grey-darker ${
                      username ? "bg-[#C0DBEA]" : ""
                    }`}
                    id="username"
                    type="text"
                    placeholder="Enter Email"
                    onChange={(e) => {
                      setusername(e.target.value);
                      setError(null);
                    }}
                  />
                </div>
                <div className="py-2 mb-[40px]">
                  <div className="flex justify-between">
                    <span className="px-1 text-sm mb-2">Password</span>
                    <span
                      className="px-1 text-sm text-[#A10039] hover:cursor-pointer"
                      onClick={() => navigate("/forgotPassword")}
                    >
                      Forgot Password ?
                    </span>
                  </div>
                  <div className="relative text-grey-darker ">
                    <input
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      className={`appearance-none  bg-[#C0DBEA] rounded w-full py-2 px-3 text-grey-darker ${
                        password ? "bg-[#C0DBEA]" : ""
                      }`}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                      {showPassword ? (
                        <FaEyeSlash
                          className="h-6 text-[#A10039] cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <FaEye
                          className="h-6 text-[#A10039] cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="bg-blue-400  rounded-2xl h-[40px] flex justify-center text-white md:mb-4 mb-3"
                  onClick={handleSubmit}
                >
                  <button className=" flex justify-center items-center">
                    <div className="pr-[10px]">Login</div>
                    <div>
                      <FaLongArrowAltRight />
                    </div>
                  </button>
                </div>
                <div className="flex justify-between text-sm">
                  <span
                    className="text-[#A10039] hover:cursor-pointer"
                    onClick={() => navigate("/register")} // Add onClick handler for navigation
                  >
                    Register
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

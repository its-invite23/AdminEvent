import React, { useState } from "react";
import loginbanner from "../../asstes/loginbanner.jpg";
import logo from "../../asstes/logo.png";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import toast from "react-hot-toast";
import Listing from "../../Api/Listing";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "admin",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const main = new Listing();
    const response = main.login({
      email: formData.email,
      password: formData.password,
      role: formData.role,
    });
    response
      .then((res) => {
        if (res && res?.data && res?.data?.status) {
          toast.success(res.data.message);
          localStorage && localStorage.setItem("token", res?.data?.token);
          navigate("/access-admin");
          setLoading(false);
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
        setFormData({
          email: "",
          password: "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
        setLoading(false);
      });
  };

  return (
    <div className="bg-black lg:h-screen min-h-full h-full md:h-screen">
      <div
        className="flex items-center gap-[20px] md:gap-[20px] lg:gap-[50px] xl:gap-[80px] flex-wrap sm:flex-nowrap  
      flex-col-reverse md:flex-row justify-center  max-w-[1300px] m-auto p-6 h-full"
      >
        <div className="w-full h-full md:w-[50%] lg:w-[45%] xl:w-[49%] max-w-[100%] lg-max-w-[700px] h-full">
          <img
            className="rounded-md w-full  h-full object-cover"
            src={loginbanner}
            alt="Login Banner "
          />
        </div>
        <div className="flex-col justify-center content-center1  md:pt-[100px] items-center w-full md:w-[50%] lg:w-[45%] xl:w-[49%] max-w-[100%] lg:max-w-[500px] h-full">
          <div className="">
            <img src={logo} alt="logo" className="max-w-[130px]" />
          </div>
          <h2 className="font-[600] font-manrope text-white text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[48px] mt-11 mb-4">
            Login to your account
          </h2>
          <div className="mb-5">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email.."
              className="bg-zinc-900 w-full px-4 py-4 rounded-lg text-base placeholder:text-[#A9A4A8] text-[#A9A4A8]"
              required
            />
          </div>
          <div className="mb-5 relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password.."
              className="bg-zinc-900 w-full px-4 py-4 pe-14 rounded-lg text-base text-[#A9A4A8] placeholder:text-[#A9A4A8]"
              required
            />

            <button
              type="button" // Prevent form submission
              className="absolute top-4 right-5"
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            >
              {showPassword ? (
                <IoEyeOff size={24} className='text-white' />
              ) : (
                <IoEye size={24} className='text-white' />
              )}
            </button>
          </div>
          {/* 
            <div className="mb-8 text-white text-base text-center">
              <Link to="/forget-password">Forgot password?</Link>
            </div> */}
          <div className="mb-5 text-center">
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-[#ff0062] hover:bg-[#4400c3]  px-5 py-4 min-w-52 text-white text-[17px] text-center rounded-md"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

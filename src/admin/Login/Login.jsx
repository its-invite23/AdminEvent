import React, { useState } from "react";
import loginbanner from "../../asstes/loginbanner.jpg";
import logo from "../../asstes/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import toast from "react-hot-toast";
import Listing from "../../Api/Listing";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

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
        console.log("error",error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
        // console.log("error", error);
        setLoading(false);
      });
  };

  return (
    <div className="bg-black lg:h-screen min-h-full h-full md:h-screen">
      <div
        className="flex items-center gap-[20px] md:gap-[20px] lg:gap-[50px] xl:gap-[80px] flex-wrap sm:flex-nowrap  
      flex-col-reverse md:flex-row justify-center  max-w-[1300px] m-auto p-6 h-full"
      >
        <div className="w-full md:w-[50%] lg:w-[45%] xl:w-[49%] max-w-[100%] lg-max-w-[700px] h-full">
          <img
            className="rounded-md w-full h-full object-cover"
            src={loginbanner}
            alt="Login Banner "
          />
        </div>
        <div className="flex-col justify-center content-center1  md:pt-[80px] items-center w-full md:w-[50%] lg:w-[45%] xl:w-[49%] max-w-[100%] lg:max-w-[500px] h-full">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <h2 className="font-[600] font-manrope text-white text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[48px] mt-11 mb-4">
            Login to your account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email.."
                className="bg-zinc-900 w-full px-4 py-4 rounded-lg text-base  text-white"
                required
              />
            </div>
            <div className="mb-5 relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password.."
                className="bg-zinc-900 w-full px-4 py-4 pe-14 rounded-lg text-base text-white"
                required
              />
              <button className='absolute top-4 right-5 '>
              
              <IoEye size={24} className='text-white' />
            </button>
            </div>

            <div className="mb-8 text-white text-base text-center">
              <Link to="/forget-password">Forgot password?</Link>
            </div>
            <div className="mb-5 text-center">
              <button
                type="submit"
                className="bg-[#FF5482] hover:bg-[#F7517E] bg-rose-500 px-5 py-4 min-w-52 text-white text-base text-center rounded-md"
              >
                {loading ? "Loading..." :"Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Listing from '../../Api/Listing';
import Header from "../compontents/Header"
import SideBar from '../compontents/SideBar';
import Chart from '../Dashboard/Chart';
import { FaUsers } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";



export default function AdminLayout({ children }) {
  const [Loading, setLoading] = useState(false)
  const [content, setContent] = useState([]);
  const fetchData = () => {
    const main = new Listing();
    const response = main.profile();
    response
      .then((res) => {
        if (res.data) {
          setContent(res.data.data);
        } else {
        }
      }).catch((error) => {
        localStorage && localStorage.removeItem("token");
        toast.error("Please log in first.");
      });
  }

  useEffect(() => {
    fetchData()
  }, []);


  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchData(signal);
    return () => controller.abort();
  }, []);
  return (
    <div className='flex bg-black min-h-screen h-full gap-[20px] p-[25px] pl-[330px]'>

      <SideBar/>
      <div className='w-full max-w-[100%]'>
      <Header />
      {children}
    </div>


    </div>

  );
}


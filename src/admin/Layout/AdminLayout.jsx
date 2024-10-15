import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Listing from '../../Api/Listing';
import Header from "../compontents/Header"
import Footer from "../compontents/Footer"


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
    <>
      <Header />
      {children}

      <Footer />


    </>

  );
}


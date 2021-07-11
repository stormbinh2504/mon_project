import React, { Suspense, useEffect, useState } from "react";
import { Form, FormControl,Table } from 'react-bootstrap';
import Header from "../../components/layout/header/HeaderTP";
import Sidebar from "../../components/layout/Sidebar";
import QLVBDVTapi from "../../config/api/apiN2/QLVBDVTapi";
import PaginationQLCVTP from "../pagination/PaginationN2/PaginationQLCVTP.js";
import Sidebartruongphong from "../../components/layout/Sidebartruongphong";



const QuanLyCongViecTruongPhong = () => {
  const [vanbandenId, setvanbandenId] = useState([]);
  const [rerent,setrerent] = useState(false);

  const [maNhanVien, setmaNhanVien] = useState("");

  const deleteemp = (index) => {
    vanbandenId.splice(index, 1)
    setrerent(true);
  }

  const updatedata = (index) => {
    setrerent(true);
  }
  
  useEffect(() => {
    const fetchEmployeeList = async () => {
      try {
        const response = await QLVBDVTapi.getAll();
        setvanbandenId(response);
      } catch (error) {
        console.log("Failed to fetch employee list: ", error);
      }
    };
    fetchEmployeeList();
    setrerent(false);
  }, [rerent]);

  const chinhsua = {
    width:"100%",
    display: "flex",
    justifyContent: "center",
  }

  return (
    <React.Fragment>
      <Header />
      <div id="content">
        <Sidebartruongphong/>
        <PaginationQLCVTP></PaginationQLCVTP>
      </div>
    </React.Fragment>
  );
};

export default QuanLyCongViecTruongPhong;

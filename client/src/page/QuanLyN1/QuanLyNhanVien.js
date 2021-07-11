import React, { Suspense, useEffect, useState } from "react";
import { Form, FormControl,Table } from 'react-bootstrap';
import Header from "../../components/layout/header/Header";
import Sidebar from "../../components/layout/Sidebar";
import QLNVapi from "../../config/api/QLNVapi";
import PaginationQLNV from "../pagination/PaginationN1/PaginationQLNV.js";



const QuanLyNhanVien = () => {
  const [nhanvienId, setNhanVienId] = useState([]);
  const [rerent,setrerent] = useState(false);

  const [maNhanVien, setmaNhanVien] = useState("");

  const deleteemp = (index) => {
    nhanvienId.splice(index, 1)
    setrerent(true);
  }

  const updatedata = (index) => {
    setrerent(true);
  }
  
  useEffect(() => {
    const fetchEmployeeList = async () => {
      try {
        const response = await QLNVapi.getAll();
        setNhanVienId(response);
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
        <Sidebar />
      <PaginationQLNV></PaginationQLNV>
      </div>
    </React.Fragment>
  );
};

export default QuanLyNhanVien;

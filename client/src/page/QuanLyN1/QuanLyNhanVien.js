import React, { Suspense, useEffect, useState } from "react";
import { Form, FormControl,Table } from 'react-bootstrap';
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";
import QLNVapi from "../../config/api/QLNVapi";
import ModalEditEmployee from "../modals/ModalN1/ModalEditEmployee";
import ModalAddEmployee from "../modals/ModalN1/ModalAddEmployee";
import axios from "axios";
import { Link } from 'react-router-dom';
import ModalShowEmployee from "../modals/ModalN1/ModalShowEmployee";
// import IconSearch from '../assets/icons/search-icon.svg';
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

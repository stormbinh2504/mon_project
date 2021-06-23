import React, { Suspense, useEffect, useState } from "react";
import { Form, FormControl,Table } from 'react-bootstrap';
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";
import QLVBDVTapi from "../../config/api/apiN2/QLVBDVTapi";
import ModalEditEmployee from "../modals/ModalN1/ModalEditEmployee";
import ModalAddEmployee from "../modals/ModalN1/ModalAddEmployee";
import axios from "axios";
import { Link } from 'react-router-dom';
import ModalShowEmployee from "../modals/ModalN1/ModalShowEmployee";
// import IconSearch from '../assets/icons/search-icon.svg';
import PaginationQLVBDTP from "../pagination/PaginationN2/PaginationQLVBDTP.js";

import Sidebarnhanvien from "../../components/layout/Sidebarnhanvien";
import PaginationQLCVNV from "../pagination/PaginationN2/PaginationQLCVNV";



const QuanLyCongViecNhanVien = () => {
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
        <Sidebarnhanvien />
        <PaginationQLCVNV></PaginationQLCVNV>
      </div>
    </React.Fragment>
  );
};

export default QuanLyCongViecNhanVien;
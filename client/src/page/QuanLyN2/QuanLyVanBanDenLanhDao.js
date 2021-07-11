import React, { Suspense, useEffect, useState } from "react";
import Header from "../../components/layout/header/HeaderLD";
import QLVBDVTapi from "../../config/api/apiN2/QLVBDVTapi";
import PaginationQLVBDLD from "../pagination/PaginationN2/PaginationQLVBDLD.js";

import Sidebarlanhdao from "../../components/layout/Sidebarlanhdao";



const QuanLyVanBanDenLanhDao = () => {
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
        <Sidebarlanhdao />
        <PaginationQLVBDLD></PaginationQLVBDLD>
      </div>
    </React.Fragment>
  );
};

export default QuanLyVanBanDenLanhDao;

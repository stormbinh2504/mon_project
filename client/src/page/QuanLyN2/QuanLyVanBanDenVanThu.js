import React, { Suspense, useEffect, useState } from "react";
import Header from "../../components/layout/header/HeaderVT";
import QLVBDVTapi from "../../config/api/apiN2/QLVBDVTapi";
import PaginationQLVBDVT from "../pagination/PaginationN2/PaginationQLVBDVT.js";
import Sidebarvanthu from "../../components/layout/Sidebarvanthu";



const QuanLyVanBanDenVanThu = () => {
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
        <Sidebarvanthu />
      <PaginationQLVBDVT></PaginationQLVBDVT>
      </div>
    </React.Fragment>
  );
};

export default QuanLyVanBanDenVanThu;

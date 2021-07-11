import React, { Suspense, useEffect, useState } from "react";
import Header from "../../components/layout/header/Header";
import Sidebar from "../../components/layout/Sidebar";
import QLNDapi from "../../config/api/QLNVapi";
import PaginationQLND from "../pagination/PaginationN1/PaginationQLND";



const QuanLyNguoiDung = () => {
  const [nguoidungId, setnguoidungId] = useState([]);
  const [rerent,setrerent] = useState(false);

  const [maNhanVien, setmaNhanVien] = useState("");

  const deleteemp = (index) => {
    nguoidungId.splice(index, 1)
    setrerent(true);
  }

  const updatedata = (index) => {
    setrerent(true);
  }
  
  useEffect(() => {
    const fetchEmployeeList = async () => {
      try {
        const response = await QLNDapi.getAll();
        setnguoidungId(response);
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
      <PaginationQLND></PaginationQLND>
      </div>
    </React.Fragment>
  );
};

export default QuanLyNguoiDung;

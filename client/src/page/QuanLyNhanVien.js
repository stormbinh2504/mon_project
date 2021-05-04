import React, { Suspense, useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import QLNVapi from "../config/api/QLNVapi";
import ModalEditEmployee from "../page/modals/ModalEditEmployee";
import ModalAddEmployee from "./modals/ModalAddEmployee";
import axios from "axios";

const QuanLyNhanVien = () => {
  const [nhanvienId, setNhanVienId] = useState([]);
  const [rerent,setrerent] = useState(false);

  const [maNhanVien, setmaNhanVien] = useState("");

  const deleteemp = (index) => {
    nhanvienId.splice(index, 1)
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
  }, [rerent]);

  return (
    <React.Fragment>
      <Header />
      <div id="content">
        <Sidebar />
        <div className="content-func col-right">
          <div className="header-content">
            <div className="find">
              <input type="text" />
            </div>
            <div className="add-employee">
              <ModalAddEmployee></ModalAddEmployee>
            </div>
          </div>
          <div className="data-table">
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>STT</th>
                  <th></th>
                  <th>Mã nhân viên</th>
                  <th>Tên nhân viên</th>
                  <th>Bộ phận</th>
                  <th>Chức vụ</th>
                  <th>Chỉnh sửa</th>
                </tr>
              </thead>
              <tbody>
                {nhanvienId.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <input className="check-box-nv" type="checkbox" />
                    </td>
                    <td>{item.maNhanVien}</td>
                    <td>{item.tenNhanVien}</td>
                    <td>{item.BoPhanId.tenBoPhan}</td>
                    <td>{item.ChucVuId.tenChucVu}</td>
                    <td>
                      <div className="chinh-sua-nv" style={{ display: "flex" }}>
                        <ModalEditEmployee 
                        index={index} 
                        id={item._id} 
                        deleteemp={deleteemp} 

                        maNhanVien = {item.maNhanVien}
                        tenNhanVien = {item.tenNhanVien}
                        tenBoPhan = {item.BoPhanId.tenBoPhan}
                        tenChucVu = {item.ChucVuId.tenChucVu}
                        >
                        </ModalEditEmployee>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div></div>
      {/* <button onClick={() => fetchProductList1()}>abc</button> */}
    </React.Fragment>
  );
};

export default QuanLyNhanVien;

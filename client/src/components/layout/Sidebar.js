import React from "react";
import { Link } from "react-router-dom";
// import Arrowdown from "../../../assets/icons/arrow-down.svg";
import Arrowdown from "../../assets/icons/arrow-down.svg";
import Buffer from "../../assets/icons/buffer-brands.svg";

function Drop_Danh_Muc() {
  var x = document.getElementById("drop-dannh-muc");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

const Sidebar = () => {
  return (
    <div
      className="menu-func col-left"
      style={{ width: "250px", height: "750px" }}
    >
      <div className="warp-dm">
        <h6 className="title font-bold" style={{ paddingTop: "20px" }}>
          <Link to="/quantri" className="color-white">
            TRANG CHỦ
          </Link>
        </h6>
        <h6 className="title font-bold drop-dc" onClick={Drop_Danh_Muc}>
          <img className="icon-arrow" src={Arrowdown} alt="" />
          DANH MỤC CHỨC NĂNG
        </h6>
        <ul className="sub-menu" id="drop-dannh-muc">
          <li class="lst-item">
            <Link className="color-white item-dm " to="/quantri/quanlybophan">
              <img className="icon-buffer" src={Buffer} alt="" />
              Quản lý bộ phận
            </Link>
          </li>
          <li class="lst-item">
            <Link className="color-white item-dm " to="/quantri/quanlychucdanh">
              <img className="icon-buffer" src={Buffer} alt="" />
              Quản lý chức danh
            </Link>
          </li>
          <li class="lst-item">
            <Link
              className="color-white item-dm "
              to="/quantri/quanlynhomquyen"
            >
              <img className="icon-buffer" src={Buffer} alt="" />
              Quản lý nhóm quyền
            </Link>
          </li>
          <li class="lst-item">
            <Link className="color-white item-dm" to="/quantri/quanlynhanvien">
              <img className="icon-buffer" src={Buffer} alt="" />
              Quản lý nhân viên
            </Link>
          </li>
          <li class="lst-item">
            <Link className="color-white item-dm" to="/quantri/quanlynguoidung">
              <img className="icon-buffer" src={Buffer} alt="" />
              Quản lý người dùng
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

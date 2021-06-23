import React, { useEffect, useState } from "react";
import "../../pagination/pagination.css";
import { Form, FormControl,Table, Pagination } from 'react-bootstrap';
import IconSearch from '../../../assets/icons/search-icon.svg';
import QLNDapi from "../../../config/api/QLNDapi";
import ModalAddEmployee from "../../modals/ModalN1/ModalAddEmployee";
import ModalEditUser from "../../modals/ModalN1/ModalEditUser";
import ModalShowEmployee from "../../modals/ModalN1/ModalShowEmployee";
import ModalAddUser from "../../modals/ModalN1/ModalAddUser";

function PaginationQLND(props) {
  const [nguoidungId, setnguoidungId] = useState([]);
  const [rerent, setrerent] = useState(false);

  const [search, setSearch] = useState("");
  const [filterTenND, setfilterTenND] = useState([]);

  console.log("nguoidungId",nguoidungId);

  const deleteemp = (index) => {
    nguoidungId.splice(index, 1)
    setrerent(true);
  }
  const updatedata = () =>{
    setrerent(true);
  }

  useEffect(() => {
    const fetchNVList = async () => {
        try {          
            const response = await QLNDapi.getAll();
            setnguoidungId(response);
        } catch (error) {
            console.log('Failed to fetch product list: ', error);
        }
    }
    fetchNVList();
    setrerent(false);
  }, [rerent])

  useEffect(() => {
    setfilterTenND(
      nguoidungId.filter((country) =>
        country.userName.toLowerCase().includes(search.toLowerCase())
      )
    );
    // console.log("setfilterTenBP", setfilterTenBP);
  }, [search, nguoidungId]);

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(nguoidungId.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = nguoidungId.slice(indexOfFirstItem, indexOfLastItem); // 
  const currentItems2 = filterTenND.slice(indexOfFirstItem, indexOfLastItem); //

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 5);
  };

const renderData = (currentItems) => {
  return (
    <>
      {currentItems.map((item,index) => (
        <tr>
          <td>{index + 1}</td>
          <td>{item.nhanVienId.maNhanVien}</td>
          <td>{item.nhanVienId.tenNhanVien}</td>
          <td>{item.nhomQuyenId.tenNhomQuyen}</td>
          <td>{item.userName}</td>
          <td>{item.password}</td>
          {/* <td>
            <div className="chinh-sua-nv chinhsua">
              <ModalShowEmployee
              index={index} 
              id={item._id} 
              deleteemp={deleteemp} 
              updatedata = {updatedata}
              
              maNhanVien = {item.maNhanVien}
              tenNhanVien = {item.tenNhanVien}
              tenBoPhan = {item.BoPhanId.tenBoPhan}
              // tenBoPhanid = {item.BoPhanId._id}
              tenChucVu = {item.ChucVuId.tenChucVu}
              // tenChucVuid = {item.ChucVuId._id}
              loaiNhanVien = {item.loaiNhanVien}
              gioiTinh = {item.gioiTinh}
              soDienThoai = {item.soDienThoai}
              email = {item.email}
              >
              </ModalShowEmployee>
            </div>
          </td> */}
          <td>
            <div className="chinh-sua-nv chinhsua" >
              <ModalEditUser 
              index={index} 
              id={item._id} 
              deleteemp={deleteemp} 
              updatedata = {updatedata}
              
              maNhanVien = {item.nhanVienId.maNhanVien}
              tenNhomQuyen = {item.nhomQuyenId.tenNhomQuyen}
              tenNhanVien = {item.tenNhanVien}
              userName = {item.userName}
              password = {item.password}
              >
              </ModalEditUser>
            </div>
          </td>
        </tr>
      ))}  
    </>
  );
};

  return (
    <>
        <div className="content-func col-right">
          <div className="header-content ">
            <div className="find">
              <input type="text" placeholder="Tìm tên nhân viên" onChange={(e) => setSearch(e.target.value)}/>
              <div className="img-search">
                  <img src={IconSearch} alt="" />
                </div>
            </div>
            <div className="add-employee">
              <ModalAddUser
              updatedata = {updatedata}
              ></ModalAddUser>
            </div>
          </div>
          <div className="data-table">
            <Table style={{ width: "100%" }} striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã nhân viên</th>
                  <th>Tên nhân viên</th>
                  <th>Tên nhóm quyền</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Chỉnh sửa</th>
                </tr>
              </thead>
          <tbody>
            {
              search == "" ? renderData(currentItems) : renderData(currentItems2)
            }
            </tbody>
        </Table>
      </div>
    <div className="pageNumbers">
      <ul className="pageNumbers-lst">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage == pages[0] ? true : false}
          >Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
          >Next
          </button>
        </li>
      </ul>
    </div>
    </div>
    </>
  );
}

export default PaginationQLND;
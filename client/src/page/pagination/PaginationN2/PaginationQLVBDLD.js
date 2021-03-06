import React, { useEffect, useState } from "react";
import "../../pagination/pagination.css";
import { Form, FormControl,Table, Pagination } from 'react-bootstrap';
import IconSearch from '../../../assets/icons/search-icon.svg';
import QLVBDVTapi from "../../../config/api/apiN2/QLVBDVTapi";

import ModalShowVBDLD from "../../modals/ModalN2/ModalShowVBDLD";

function PaginationQLVBDLD(props) {
  const [vanbandenId, setvanbandenId] = useState([]);
  const [rerent, setrerent] = useState(false);

  const [search, setSearch] = useState("Đang xử lí");
  const [filterTenVanBanDen, setfilterTenVanBanDen] = useState([]);

  const [filterTrangThai, setfilterTrangThai] = useState([]);

  const deleteemp = (index) => {
    vanbandenId.splice(index, 1)
    setrerent(true);
  }
  const updatedata = () =>{
    setrerent(true);
  }

  useEffect(() => {
    const fetchNVList = async () => {
        try {          
            const response = await QLVBDVTapi.getAll();
            setvanbandenId(response);
        } catch (error) {
            console.log('Failed to fetch product list: ', error);
        }
    }
    fetchNVList();
    setrerent(false);
  }, [rerent])

  useEffect(() => {
    setfilterTenVanBanDen(
      vanbandenId.filter((country) =>
        country.trangThai.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, vanbandenId]);

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(vanbandenId.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vanbandenId.slice(indexOfFirstItem, indexOfLastItem); // 
  const currentItems2 = filterTenVanBanDen.slice(indexOfFirstItem, indexOfLastItem); //
  // const currentItems3 = filterTenVanBanDen.slice(indexOfFirstItem, indexOfLastItem); //

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
          <td>{item.tenVanBan}</td>
          <td>{item.soKyHieu}</td>
          <td>{item.ngayDen.split("T")[0]}</td>
          <td>{item.coQuanBanNganhId.tenCoQuan}</td>
          <td>{item.trangThaiLanhDao}</td>
          {/* <td>
          <Link>
          {
            item.taiLieu
          }
          </Link>
          </td> */}
          <td>
            <div className="chinh-sua-nv chinhsua">
              <ModalShowVBDLD
              index={index} 
              id={item._id} 
              deleteemp={deleteemp} 
              updatedata = {updatedata}
              
              tenVanBan = {item.tenVanBan}
              soKyHieu = {item.soKyHieu}
              ngayDen = {item.ngayDen}
              trangThai = {item.trangThai}
              trangThaiLanhDao = {item.trangThaiLanhDao}
              tenCoQuan={item.coQuanBanNganhId.tenCoQuan}
              tenNhanVien = {item.nhanVienId.tenNhanVien}
              loaiVanBan = {item.loaiVanBanId.loaiVanBan}
              tenBoPhan = {item.boPhanId.tenBoPhan}
              taiLieu = {item.taiLieu}
              baoCaoLanhDao = {item.baoCaoLanhDao}

              idtenCoQuan={item.coQuanBanNganhId}
              idtenNhanVien = {item.nhanVienId}
              idloaiVanBan = {item.loaiVanBanId}
              idtenBoPhan = {item.boPhanId}
              >
              </ModalShowVBDLD>
            </div>
          </td>
          {/* <td>
            <div className="chinh-sua-nv chinhsua" >
              <ModalEditVBDLD 
              index={index} 
              id={item._id} 
              deleteemp={deleteemp} 
              updatedata = {updatedata}
              >
              </ModalEditVBDLD>
            </div>
          </td> */}
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
              <input type="text" placeholder="Tìm trạng thái" onChange={(e) => setSearch(e.target.value)}/>
              <div className="img-search">
                  <img src={IconSearch} alt="" />
                </div>
            </div>
            {/* <div className="add-employee">
              <ModalAddVBDVT
              updatedata = {updatedata}
              ></ModalAddVBDVT>
            </div> */}
          </div>
          <div className="data-table">
            <Table style={{ width: "100%" }} striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên văn bản</th>
                  <th>Số ký hiệu</th>
                  <th>Ngày nhận</th>
                  <th>Cơ quan phát hành</th>
                  <th>Trạng thái</th>
                  {/* <th>Đính kèm</th> */}
                  <th>Xem</th>
                  {/* <th>Chỉnh sửa</th> */}
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

export default PaginationQLVBDLD;
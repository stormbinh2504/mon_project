import React, { useEffect, useState } from "react";
import "../../pagination/pagination.css";
import { Form, FormControl,Table, Pagination } from 'react-bootstrap';
import IconSearch from '../../../assets/icons/search-icon.svg';
import QLCVTPapi from "../../../config/api/apiN2/QLCVTPapi";
import ModalAddBaoCaoNV from "../../modals/ModalN2/ModalAddBaoCaoNV";

function PaginationQLCVNV(props) {
  const [congviectruongphongId, setcongviectruongphongId] = useState([]);
  const [rerent, setrerent] = useState(false);

  const [search, setSearch] = useState("");
  const [filterTenVanBanDen, setfilterTenVanBanDen] = useState([]);

  const [filterTrangThai, setfilterTrangThai] = useState([]);


  const updatedata = () =>{
    setrerent(true);
  }

  console.log("congviectruongphongId", congviectruongphongId)
  useEffect(() => {
    const fetchCVLD = async () => {
        try {          
            const response = await QLCVTPapi.getAll();
            setcongviectruongphongId(response);
        } catch (error) {
            console.log('Failed to fetch product list: ', error);
        }
    }
    fetchCVLD();
    setrerent(false);
  }, [rerent])




  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(congviectruongphongId.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = congviectruongphongId.slice(indexOfFirstItem, indexOfLastItem); // 
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
          <td>{index+1}</td>
          <td>{item.noiDungCongViec}</td>
          <td>{item.thoiHan}</td>
          <td>{item.nhanVienId.tenNhanVien}</td>
          <td>{item.yKienTruongPhong}</td>
          <td>{item.trangThaiNhanVien}</td>
          {/* <td>{item.baoCaoNhanVien}</td> */}
          <td>
            <div className="chinh-sua-nv chinhsua">
              <ModalAddBaoCaoNV
              index={index} 
              id={item._id} 
              updatedata = {updatedata}
          
              noiDungCongViec = {item.noiDungCongViec}
              yKienTruongPhong = {item.yKienTruongPhong}
              thoiHan = {item.thoiHan}
              trangThaiTruongPhong = {item.trangThaiTruongPhong}
              trangThaiLanhDao = {item.trangThaiLanhDao}
              baoCaoTruongPhong={item.baoCaoTruongPhong}

              tenNhanVien = {item.nhanVienId.tenNhanVien}
              tenBoPhan = {item.boPhanId.tenBoPhan}

              nhanVienId = {item.nhanVienId}
              boPhanId = {item.boPhanId}
              congViecLanhDaoId = {item.congViecLanhDaoId}
              >
              </ModalAddBaoCaoNV>
            </div>
          </td>
          {/* <td>
            <div className="chinh-sua-nv chinhsua">
              <ModalShowVBDNV
              index={index} 
              id={item._id} 
              updatedata = {updatedata}
          
              noiDungCongViec = {item.noiDungCongViec}
              yKienTruongPhong = {item.yKienTruongPhong}
              thoiHan = {item.thoiHan}
              trangThaiTruongPhong = {item.trangThaiTruongPhong}
              trangThaiLanhDao = {item.trangThaiLanhDao}
              baoCaoTruongPhong={item.baoCaoTruongPhong}

              tenNhanVien = {item.nhanVienId.tenNhanVien}
              tenBoPhan = {item.boPhanId.tenBoPhan}

              nhanVienId = {item.nhanVienId}
              boPhanId = {item.boPhanId}
              congViecLanhDaoId = {item.congViecLanhDaoId}
              >
              </ModalShowVBDNV>
            </div>
          </td> */}
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
                  <th>Nội dung yêu cầu</th>
                  <th>Thời hạn xử lí</th>
                  <th>Cán bộ xử lí</th>
                  <th>Ý kiến trưởng phòng</th>
                  <th>Trạng thái</th>
                  {/* <th>Báo cáo</th>    */}
                  <th>Tạo báo cáo</th>
                  {/* <th>Xem</th> */}
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

export default PaginationQLCVNV;
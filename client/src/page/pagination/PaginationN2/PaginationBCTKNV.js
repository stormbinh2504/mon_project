import React, { useEffect, useState } from "react";
import { ExportReactCSV } from '../../Export/ExportReactCSV'
import "../../pagination/pagination.css";
import DatePicker from "react-datepicker";
import { Form, FormControl,Table, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IconSearch from '../../../assets/icons/search-icon.svg';
import QLVBDVTapi from "../../../config/api/apiN2/QLVBDVTapi";
import QLCVLDapi from "../../../config/api/apiN2/QLCVLDapi";
import ModalAddVBDVT from "../../modals/ModalN2/ModalAddVBDVT";
import ModalEditVBDVT from "../../modals/ModalN2/ModalEditVBDVT";

import ModalShowVBDVT from "../../modals/ModalN2/ModalShowVBDVT";
import QLLVBapi from "../../../config/api/apiN2/QLLVBapi";
import QLCQBHapi from "../../../config/api/apiN2/QLCQBHapi";
import QLCVTPapi from "../../../config/api/apiN2/QLCVTPapi";
import QLNVapi from "../../../config/api/QLNVapi";
import QLBPapi from "../../../config/api/QLBPapi";

function PaginationBCTKNV(props) {
  const [congvietruongphongId, setcongvietruongphongId] = useState([]);
  const [rerent, setrerent] = useState(false);

  const [search, setSearch] = useState("");
  const [searchTrangthai, setSearchTrangthai] = useState("");
  const [searchLoaiVanBan, setSearchLoaiVanBan] = useState("");
  const [searchCoquan, setSearchCoquan] = useState("");
  const [searchNhanvien, setsearchNhanvien] = useState("");
  const [searchBophan, setsearchBophan] = useState("");

  const [filterTenVanBanDen, setfilterTenVanBanDen] = useState([]);
  const [filterTrangthai, setfilterTrangthai] = useState([]);
  const [filterLoaivanban, setfilterLoaivanban] = useState([]);
  const [filterCoquan, setfilterCoquan] = useState([]);
  const [filterNhanvien, setfilterNhanvien] = useState([]);
  const [filterBophan, setfilterBophan] = useState([]);


  const [lvb, setlvb] = useState([]);//api lấy giá trị
  const [mcq, setmcq] = useState([]); 
  const [tnv, settnv] = useState([]); 
  const [tbp, settbp] = useState([]); 

  const [ngaybd, setngaybd] = useState(new Date())
  const [ngaykt, setngaykt] = useState(new Date())


// Lấy dữ liệu
  useEffect(() => {
    const fetchMVC = async (props) => {
      const response = await QLNVapi.getAll();
      settnv(response);
    };
    fetchMVC();
  }, []);

  useEffect(() => {
    const fetchMVC = async (props) => {
      const response = await QLBPapi.getAll();
      settbp(response);
    };
    fetchMVC();
  }, []);

  useEffect(() => {
    const fetchNVList = async () => {
        try {          
            const response = await QLCVTPapi.getAll();
            setcongvietruongphongId(response);
        } catch (error) {
            console.log('Failed to fetch product list: ', error);
        }
    }
    fetchNVList();
    setrerent(false);
  }, [rerent])

// Bộ lọc

  useEffect(() => {
    setfilterTrangthai(
      congvietruongphongId.filter((country) =>
        country.trangThaiNhanVien.toLowerCase().includes(searchTrangthai.toLowerCase())
      )
    );
  }, [searchTrangthai, congvietruongphongId]);

  useEffect(() => {
    setfilterNhanvien(
      congvietruongphongId.filter((country) =>
        country.nhanVienId.tenNhanVien.toLowerCase().includes(searchNhanvien.toLowerCase())
      )
    );

  }, [searchNhanvien, congvietruongphongId]);

  useEffect(() => {
    setfilterBophan(
      congvietruongphongId.filter((country) =>
        country.boPhanId.tenBoPhan.toLowerCase().includes(searchBophan.toLowerCase())
      )
    );
  }, [searchBophan, congvietruongphongId]);


  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(congvietruongphongId.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = congvietruongphongId.slice(indexOfFirstItem, indexOfLastItem); // 
  const currentItems2 = filterTenVanBanDen.slice(indexOfFirstItem, indexOfLastItem); //
  const currentTrangthai = filterTrangthai.slice(indexOfFirstItem, indexOfLastItem); //
  const currentNhanvien = filterNhanvien.slice(indexOfFirstItem, indexOfLastItem); //
  const currentBophan = filterBophan.slice(indexOfFirstItem, indexOfLastItem); //

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
          <td>{item.noiDungCongViec}</td>
          {/* <td>{item.vanBanDenId.soKyHieu}</td> */}
          <td>{item.thoiHan}</td>
          {/* <td>{item.vanBanDenId.coQuanBanNganhId.tenCoQuan}</td> */}
          <td>{item.boPhanId.tenBoPhan}</td>
          <td>{item.nhanVienId.tenNhanVien}</td>
          {/* <td>{item.vanBanDenId.loaiVanBanId.loaiVanBan}</td> */}
          <td>{item.trangThaiNhanVien}</td>
          {/* <td>
          <Link>
          {
            item.vanBanDenId.taiLieu
          }
          </Link>
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
            {/* <div className="find">
              <input type="text" placeholder="Tìm trạng thái" onChange={(e) => setSearch(e.target.value)}/>
              <div className="img-search">
                  <img src={IconSearch} alt="" />
                </div>
            </div> */}

                          <div className="input-add">
                <label htmlFor="chucvu" className="input-label font-bold">Ngày bắt đầu</label>
                <DatePicker 
              selected={ngaybd}
              onChange={date => setngaybd(date)} 
              dateFormat = "d/MM/yyyy"
            />
              </div>

            <div className="input-add">
                <label htmlFor="chucvu" className="input-label font-bold">Ngày Kết thúc</label>
                <DatePicker 
              selected={ngaykt}
              onChange={date => setngaykt(date)} 
              dateFormat = "d/MM/yyyy"
            />
              </div>

              <div className="input-add">
                <label htmlFor="bophan" className="input-label font-bold">Trạng thái</label>
                <select
                  className = "input-select"
                  id="trangthaivt"
                  name="trangthaivt"
                  value={searchTrangthai}
                  onChange={(e) => {
                    setSearchTrangthai(e.target.value);
                  }}
                >
                <option value=''>Chọn trạng thái</option>
                <option value='Đã xử lí'>Đã xử lí</option>
                <option value='Chưa xử lí'>Chưa xử lí</option>
                </select>
              </div>

              <div className="input-add">
                <label htmlFor="bophan" className="input-label font-bold ">Bộ phận:</label>
                <select
                  className = "input-select"
                  id="bophan"
                  name="bophan"
                  value={searchBophan}
                  onChange={(e) => {
                    setsearchBophan(e.target.value);
                  }}
                >
                <option value=''>Chọn bộ phận</option>
                  {tbp.map((item, index) => (
                    <option value={item.tenBoPhan}>{item.tenBoPhan}</option>
                  ))}
                </select>
              </div>

              <div className="input-add">
                <label htmlFor="bophan" className="input-label font-bold ">Nhân viên:</label>
                <select
                  className = "input-select"
                  id="bophan"
                  name="bophan"
                  value={searchNhanvien}
                  onChange={(e) => {
                    setsearchNhanvien(e.target.value);
                  }}
                >
                <option value=''>Chọn nhân viên</option>
                  {tnv.map((item, index) => (
                    <option value={item.tenNhanVien}>{item.tenNhanVien}</option>
                  ))}
                </select>
              </div>
            <div className="export-csv">
              <ExportReactCSV csvData={congvietruongphongId} fileName="congviectruongphong.xls" />
            </div>


          </div>
          <div className="data-table">
            <Table style={{ width: "100%" }} striped bordered hover>
              <thead>
                <tr>
                  <th className="width-120px">STT</th>
                  <th className="width-180px">Nội dung văn bản</th>
                  {/* <th className="width-120px">Số ký hiệu</th> */}
                  <th className="width-250px">Thời hạn xử lí</th>
                  {/* <th className="width-180px">Cơ quan phát hành</th> */}
                  <th className="width-180px">Bộ phận</th>
                  <th className="width-180px">Nhân viên xử lí</th>
                  {/* <th>Loại văn bản</th> */}
                  <th>Trạng thái</th>
                  {/* <th>Đính kèm</th> */}
                </tr>
              </thead>
          <tbody>
          {(() => {
            if (searchTrangthai == "" && searchBophan == "" && searchNhanvien == "") {
              return (
                renderData(currentItems)
              )
            }
            else{
              if (searchTrangthai != "") {
                return (
                  renderData(currentTrangthai)
                  )
              }
              else if (searchBophan != "") {
                return (
                  renderData(currentBophan)
                  )
              }
              else if (searchNhanvien != "") {
                return (
                  renderData(currentNhanvien)
                  )
              }
            }
          })()}
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

export default PaginationBCTKNV;
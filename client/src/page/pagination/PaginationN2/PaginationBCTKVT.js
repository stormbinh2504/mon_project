import React, { useEffect, useState } from "react";
import { ExportReactCSV } from '../../Export/ExportReactCSV'
import DatePicker from "react-datepicker";
import "../../pagination/pagination.css";
import { Form, FormControl,Table, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IconSearch from '../../../assets/icons/search-icon.svg';
import QLVBDVTapi from "../../../config/api/apiN2/QLVBDVTapi";
import ModalAddVBDVT from "../../modals/ModalN2/ModalAddVBDVT";
import ModalEditVBDVT from "../../modals/ModalN2/ModalEditVBDVT";

import ModalShowVBDVT from "../../modals/ModalN2/ModalShowVBDVT";
import QLLVBapi from "../../../config/api/apiN2/QLLVBapi";
import QLCQBHapi from "../../../config/api/apiN2/QLCQBHapi";


function PaginationBCTKVT(props) {
  const [vanbandenId, setvanbandenId] = useState([]);
  const [rerent, setrerent] = useState(false);

  const [search, setSearch] = useState("");
  const [searchTrangthai, setSearchTrangthai] = useState("");
  const [searchLoaiVanBan, setSearchLoaiVanBan] = useState("");
  const [searchCoquan, setSearchCoquan] = useState("");
  const [searchNgayden, setSearchNgayden] = useState("");

  const [filterTenVanBanDen, setfilterTenVanBanDen] = useState([]);
  const [filterTrangthai, setfilterTrangthai] = useState([]);
  const [filterLoaivanban, setfilterLoaivanban] = useState([]);
  const [filterCoquan, setfilterCoquan] = useState([]);
  const [filterNgayden, setfilterNgayden] = useState([]);


  const [lvb, setlvb] = useState([]);//api lấy giá trị
  const [mcq, setmcq] = useState([]);
  
  const [ngaybd, setngaybd] = useState(new Date())
  const [ngaykt, setngaykt] = useState(new Date())


// Lấy dữ liệu
  useEffect(() => {
    const fetchMVC = async (props) => {
      const response = await QLLVBapi.getAll();
      setlvb(response);
    };
    fetchMVC();
  }, []);

  useEffect(() => {
    const fetchMVC = async (props) => {
        const response = await QLCQBHapi.getAll();
        setmcq(response);
    };
    fetchMVC();
  }, []);

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

// Bộ lọc

  useEffect(() => {
    setfilterNgayden(
      vanbandenId.filter((country) =>
        handleSosanh(ngaybd,ngaykt,country.ngayDen)
        // country.trangThai.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, vanbandenId]);

  useEffect(() => {
    setfilterTrangthai(
      vanbandenId.filter((country) =>
        country.trangThai.toLowerCase().includes(searchTrangthai.toLowerCase())
      )
    );
  }, [searchTrangthai, vanbandenId]);

  useEffect(() => {
    setfilterLoaivanban(
      vanbandenId.filter((country) =>
        country.loaiVanBanId.loaiVanBan.toLowerCase().includes(searchLoaiVanBan.toLowerCase())
      )
    );
  }, [searchLoaiVanBan, vanbandenId]);

  useEffect(() => {
    setfilterCoquan(
      vanbandenId.filter((country) =>
        country.coQuanBanNganhId.tenCoQuan.toLowerCase().includes(searchCoquan.toLowerCase())
      )
    );
  }, [searchCoquan, vanbandenId]);

  const handleSosanh = (first, second, ngayden) => {
    if ((new Date(first) < new Date(ngayden)) && (new Date(ngayden) < new Date(second))) {
        console.log("ngayden", new Date(ngayden))
        console.log("ngayden2", ngayden)
        return new Date(ngayden);
    }
    else{
      console.log("sai ngayden", `${ngayden}+ ${first}`)
    }
  };
  

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);

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
  const currentTrangthai = filterTrangthai.slice(indexOfFirstItem, indexOfLastItem); //
  const currentLoaivanvan = filterLoaivanban.slice(indexOfFirstItem, indexOfLastItem); //
  const currentCoquan = filterCoquan.slice(indexOfFirstItem, indexOfLastItem); //
  const currentNgayden = filterNgayden.slice(indexOfFirstItem, indexOfLastItem); //

  console.log("currentNgayden", filterNgayden);

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
          <td>{item.ngayDen}</td>
          <td>{item.coQuanBanNganhId.tenCoQuan}</td>
          <td>{item.nhanVienId.tenNhanVien}</td>
          <td>{item.loaiVanBanId.loaiVanBan}</td>
          <td>{item.trangThai}</td>
          <td>
          <Link>
          {
            item.taiLieu
          }
          </Link>
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
            {/* <div className="find">
              <input type="text" placeholder="Tìm trạng thái" onChange={(e) => setSearch(e.target.value)}/>
              <div className="img-search">
                  <img src={IconSearch} alt="" />
                </div>
            </div> */}
            {/* <button onClick={handleSosanh(ngaybd,ngaykt)}>Đây này </button> */}

            <div className="input-add">
                <label htmlFor="chucvu" className="input-label font-bold">Ngày bắt đầu:</label>
                <DatePicker 
              selected={ngaybd}
              onChange={date => setngaybd(date)} 
              dateFormat = "d/MM/yyyy"
            />
              </div>

            <div className="input-add">
                <label htmlFor="chucvu" className="input-label font-bold">Ngày Kết thúc:</label>
                <DatePicker 
              selected={ngaykt}
              onChange={date => setngaykt(date)} 
              dateFormat = "d/MM/yyyy"
            />
              </div>
              <div className="input-add">
                <label htmlFor="bophan" className="input-label font-bold">Trạng thái:</label>
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
                <label htmlFor="bophan" className="input-label font-bold ">Loại văn bản:</label>
                <select
                  className = "input-select"
                  id="bophan"
                  name="bophan"
                  value={searchLoaiVanBan}
                  onChange={(e) => {
                    setSearchLoaiVanBan(e.target.value);
                  }}
                >
                <option value=''>Chọn loại văn bản</option>
                  {lvb.map((item, index) => (
                    <option value={item.loaiVanBan}>{item.loaiVanBan}</option>
                  ))}
                </select>
              </div>

              <div className="input-add">
                <label htmlFor="chucvu" className="input-label font-bold width-180px">Cơ quan ban hành: </label>
                <select
                  className = "input-select"
                  id="chucvu"
                  value={searchCoquan}
                  onChange={(e) => {
                    setSearchCoquan(e.target.value);
                  }}
                >
                  <option value=''>Chọn tên cơ quan ban hành:</option>
                  {mcq.map((item, index) => (
                    <option value={item.tenCoQuan}>{item.tenCoQuan}</option>
                  ))}
                </select>    
              </div>
              <div className="export-csv">
              <ExportReactCSV csvData={vanbandenId} fileName="vanbanden.xls" />
              </div>
          </div>
          <div className="data-table">
            <Table style={{ width: "100%" }} striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th className="width-120px">Tên văn bản</th>
                  <th className="width-120px">Số ký hiệu</th>
                  <th className="width-120px">Ngày lưu</th>
                  <th className="width-180px">Cơ quan phát hành</th>
                  <th className="width-180px">Lãnh đạo phê duyệt</th>
                  <th>Loại văn bản </th>
                  <th>Trạng thái </th>
                  <th>Đính kèm</th>
                </tr>
              </thead>
          <tbody>
          {(() => {
            // renderData(currentNgayden)
            if (searchTrangthai == "" && searchLoaiVanBan == "" && searchCoquan=="") {
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
              else if (searchLoaiVanBan != "") {
                return (
                  renderData(currentLoaivanvan)
                  )
              }
              else if (searchCoquan != "") {
                return (
                  renderData(currentCoquan)
                  )
              }
            }
          })()}
          {/* <div className="export-csv">
              <ExportReactCSV csvData={currentLoaivanvan} fileName="vanbanden.xls" />
          </div> */}
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

export default PaginationBCTKVT;
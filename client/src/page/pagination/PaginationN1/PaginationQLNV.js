import React, { useEffect, useState } from "react";
import "../../pagination/pagination.css";
import { Form, FormControl,Table, Pagination } from 'react-bootstrap';
import IconSearch from '../../../assets/icons/search-icon.svg';
import QLNVapi from "../../../config/api/QLNVapi";
import ModalAddEmployee from "../../modals/ModalN1/ModalAddEmployee";
import ModalEditEmployee from "../../modals/ModalN1/ModalEditEmployee";
import ModalShowEmployee from "../../modals/ModalN1/ModalShowEmployee";

function PaginationQLNV(props) {
  const [nhanvienId, setNhanVienId] = useState([]);
  const [rerent, setrerent] = useState(false);

  const [search, setSearch] = useState("");
  const [filterTenNV, setfilterTenNV] = useState([]);

  const deleteemp = (index) => {
    nhanvienId.splice(index, 1)
    setrerent(true);
  }
  const updatedata = () =>{
    setrerent(true);
  }

  useEffect(() => {
    const fetchNVList = async () => {
        try {          
            const response = await QLNVapi.getAll();
            setNhanVienId(response);
        } catch (error) {
            console.log('Failed to fetch product list: ', error);
        }
    }
    fetchNVList();
    setrerent(false);
  }, [rerent])

  useEffect(() => {
    setfilterTenNV(
      nhanvienId.filter((country) =>
        country.tenNhanVien.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, nhanvienId]);

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(7);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(nhanvienId.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = nhanvienId.slice(indexOfFirstItem, indexOfLastItem); // 
  const currentItems2 = filterTenNV.slice(indexOfFirstItem, indexOfLastItem); //

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
          <td>{item.maNhanVien}</td>
          <td>{item.tenNhanVien}</td>
          <td>{item.boPhanId.tenBoPhan}</td>
          <td>{item.chucDanhId.tenChucDanh}</td>
          <td>
            <div className="chinh-sua-nv chinhsua">
              <ModalShowEmployee
              index={index} 
              id={item._id} 
              deleteemp={deleteemp} 
              updatedata = {updatedata}
              
              maNhanVien = {item.maNhanVien}
              tenNhanVien = {item.tenNhanVien}
              tenBoPhan = {item.boPhanId.tenBoPhan}
              // tenBoPhanid = {item.BoPhanId._id}
              tenChucVu = {item.chucDanhId.tenChucDanh}
              // tenChucVuid = {item.ChucVuId._id}
              loaiNhanVien = {item.loaiNhanVien}
              gioiTinh = {item.gioiTinh}
              soDienThoai = {item.soDienThoai}
              email = {item.gmail}
              >
              </ModalShowEmployee>
            </div>
          </td>
          <td>
            <div className="chinh-sua-nv chinhsua" >
              <ModalEditEmployee 
              index={index} 
              id={item._id} 
              deleteemp={deleteemp} 
              updatedata = {updatedata}
              
              maNhanVien = {item.maNhanVien}
              tenNhanVien = {item.tenNhanVien}
              tenBoPhan = {item.boPhanId.tenBoPhan}
              tenChucVu = {item.chucDanhId.tenChucDanh}
              loaiNhanVien = {item.loaiNhanVien}
              gioiTinh = {item.gioiTinh}
              soDienThoai = {item.soDienThoai}
              email = {item.gmail}
              >
              </ModalEditEmployee>
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
              <input type="text" placeholder="T??m t??n nh??n vi??n" onChange={(e) => setSearch(e.target.value)}/>
              <div className="img-search">
                  <img src={IconSearch} alt="" />
                </div>
            </div>
            <div className="add-employee">
              <ModalAddEmployee
              updatedata = {updatedata}
              ></ModalAddEmployee>
            </div>
          </div>
          <div className="data-table">
            <Table style={{ width: "100%" }} striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>M?? nh??n vi??n</th>
                  <th>T??n nh??n vi??n</th>
                  <th className="width-245px">B??? ph???n</th>
                  <th>Ch???c v???</th>
                  <th>Th??ng tin chi ti???t</th>
                  <th>Ch???nh s???a</th>
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

export default PaginationQLNV;
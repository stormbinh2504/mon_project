import React, { useEffect, useState } from "react";
import "../../pagination/pagination.css";
import ModalEditDepartment from "../../modals/ModalN1/ModalEditDepartment";
import QLBPapi from "../../../config/api/QLBPapi";
import Narbar from "../../../components/layout/Navbar"
import { Form, FormControl,Table, Pagination } from 'react-bootstrap';
import ModalAddDepartment from "../../modals/ModalN1/ModalAddDepartment";
import IconSearch from '../../../assets/icons/search-icon.svg';

function PaginationQLBP(props) {
  const [bophanId, setBoPhantId] = useState([]);
  const [rerent, setrerent] = useState(false);

  const [search, setSearch] = useState("");
  const [filterTenBP, setfilterTenBP] = useState([]);

  const deletedep = (index) => {
    bophanId.splice(index, 1)
    setrerent(true);
  }
  const updatedata = () =>{
    setrerent(true);
  }

  useEffect(() => {
    const fetchBPList = async () => {
        try {          
            const response = await QLBPapi.getAll();
            setBoPhantId(response);
        } catch (error) {
            console.log('Failed to fetch product list: ', error);
        }
    }
    fetchBPList();
    setrerent(false);
  }, [rerent])

  useEffect(() => {
    setfilterTenBP(
      bophanId.filter((country) =>
        country.tenBoPhan.toLowerCase().includes(search.toLowerCase())
      )
    );
    // console.log("setfilterTenBP", setfilterTenBP);
  }, [search, bophanId]);

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(bophanId.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bophanId.slice(indexOfFirstItem, indexOfLastItem); // 
  const currentItems2 = filterTenBP.slice(indexOfFirstItem, indexOfLastItem); //

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
          <td>{item.maBoPhan}</td>
          <td>{item.tenBoPhan}</td>
          {/* <td>Ban giám hiệu</td>         */}
          <td>{item.moTa}</td>
          <td>
            <div
              className="chinh-sua-nv"
            >
              <ModalEditDepartment 
              id ={item._id}
              deletedep = {deletedep}
              index = {index}
              updatedata ={updatedata}

              maBoPhan={item.maBoPhan}
              tenBoPhan={item.tenBoPhan}
              moTa={item.moTa} 
              ></ModalEditDepartment> 
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
        <div className="header-content">
          <div className="find">
            <input type="text" placeholder="Tìm tên bộ phận" onChange={(e) => setSearch(e.target.value)} />
            <div className="img-search">
              <img src={IconSearch} alt="" />
            </div>
          </div>
          <div className="add-employee">
            < ModalAddDepartment 
            updatedata ={updatedata}
            > </ModalAddDepartment>
          </div>
        </div>
              <div className="data-table">
        <Table style={{ width: "100%" }} striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th className="width-120px">Mã bộ phận</th>
              <th>Tên bộ phận</th>
              {/* <th>BP trực thuộc</th> */}
              <th className="width-600px">Mô tả</th>
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
        {/* <button onClick={handleLoadMore} className="loadmore color-black">
          Load More
        </button> */}
      </div>
    </div>
    </>
  );
}

export default PaginationQLBP;
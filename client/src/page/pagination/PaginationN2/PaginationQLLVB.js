import React, { useEffect, useState } from "react";
import "../../pagination/pagination.css";
import ModalEditLVB from "../../modals/ModalN2/ModalEditLVB";
import QLLVBapi from "../../../config/api/apiN2/QLLVBapi";
import { Form, FormControl,Table, Pagination } from 'react-bootstrap';
import ModalAddLVB from "../../modals/ModalN2/ModalAddLVB";
import IconSearch from '../../../assets/icons/search-icon.svg';

function PaginationQLLVB(props) {
  const [loaivanbanId, setloaivanbanId] = useState([]);
  const [rerent, setrerent] = useState(false);

  const [search, setSearch] = useState("");
  const [filterTenLVB, setfilterTenLVB] = useState([]);

  const deletedep = (index) => {
    loaivanbanId.splice(index, 1)
    setrerent(true);
  }
  const updatedata = () =>{
    setrerent(true);
  }

  useEffect(() => {
    const fetchBPList = async () => {
        try {          
            const response = await QLLVBapi.getAll();
            setloaivanbanId(response);
        } catch (error) {
            console.log('Failed to fetch product list: ', error);
        }
    }
    fetchBPList();
    setrerent(false);
  }, [rerent])

  useEffect(() => {
    setfilterTenLVB(
      loaivanbanId.filter((country) =>
        country.loaiVanBan.toLowerCase().includes(search.toLowerCase())
      )
    );
    // console.log("setfilterTenLVB", setfilterTenLVB);
  }, [search, loaivanbanId]);

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(loaivanbanId.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = loaivanbanId.slice(indexOfFirstItem, indexOfLastItem); // 
  const currentItems2 = filterTenLVB.slice(indexOfFirstItem, indexOfLastItem); //

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
          <td>{item.maLoaiVanBan}</td>
          <td>{item.loaiVanBan}</td>
          <td>
            <div
              className="chinh-sua-nv"
            >
              <ModalEditLVB 
              id ={item._id}
              deletedep = {deletedep}
              index = {index}
              updatedata ={updatedata}

              maLoaiVanBan={item.maLoaiVanBan}
              loaiVanBan={item.loaiVanBan}
              ></ModalEditLVB> 
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
            <input type="text" placeholder="Tìm loại văn bản" onChange={(e) => setSearch(e.target.value)} />
            <div className="img-search">
              <img src={IconSearch} alt="" />
            </div>
          </div>
          <div className="add-employee">
            < ModalAddLVB
            updatedata ={updatedata}
            > </ModalAddLVB>
          </div>
        </div>
              <div className="data-table">
        <Table style={{ width: "100%" }} striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th className="width-180px">Mã Loại Văn Bản</th>
              <th>Loại Văn Bản</th>
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

export default PaginationQLLVB;
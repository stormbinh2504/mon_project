import React, { useEffect, useState } from "react";
import "../../pagination/pagination.css";
import ModalEditRole from "../../modals/ModalN1/ModalEditRole";
import QLNQapi from "../../../config/api/QLNQapi";
import { Form, FormControl,Table, Pagination } from 'react-bootstrap';
import ModalAddRole from "../../modals/ModalN1/ModalAddRole";
import IconSearch from '../../../assets/icons/search-icon.svg';

function PaginationQLNQ(props) {
  const [nhomquyenId, setNhomQuyenId] = useState([]);
  const [rerent, setrerent] = useState(false);

  const [search, setSearch] = useState("");
  const [filterTenNQ, setfilterTenNQ] = useState([]);

  const [count, setCount] = useState(1);

  const deletedep = (index) => {
    nhomquyenId.splice(index, 1)
    setrerent(true);
  }
  const updatedata = () =>{
    setrerent(true);
  }

  useEffect(() => {
    const fetchBPList = async () => {
        try {          
            const response = await QLNQapi.getAll();
            setNhomQuyenId(response);
        } catch (error) {
            console.log('Failed to fetch product list: ', error);
        }
    }
    fetchBPList();
    setrerent(false);
  }, [rerent])

  useEffect(() => {
    setfilterTenNQ(
      nhomquyenId.filter((country) =>
        country.tenNhomQuyen.toLowerCase().includes(search.toLowerCase())
      )
    );
    // console.log("setfilterTenNQ", setfilterTenNQ);
  }, [search, nhomquyenId]);

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(7);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(nhomquyenId.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = nhomquyenId.slice(indexOfFirstItem, indexOfLastItem); // 
  const currentItems2 = filterTenNQ.slice(indexOfFirstItem, indexOfLastItem); //

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
      {currentItems.map((item, index) => (
        <tr>
          <td>{index + 1}</td>
          <td>{item.maNhomQuyen}</td>
          <td>{item.tenNhomQuyen}</td>
          {/* <td>{item.cacChucNang}</td> */}
          <td>
            <div className="chinh-sua-nv">
              <ModalEditRole
                id={item._id}
                deletedep={deletedep}
                index={index}
                updatedata={updatedata}
                maNhomQuyen={item.maNhomQuyen}
                tenNhomQuyen={item.tenNhomQuyen}
                cacChucNang={item.cacChucNang}
              ></ModalEditRole>
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
            <input type="text" placeholder="Tìm tên nhóm quyền" onChange={(e) => setSearch(e.target.value)} />
            <div className="img-search">
              <img src={IconSearch} alt="" />
            </div>
          </div>
          <div className="add-employee">
            <ModalAddRole 
            updatedata ={updatedata}
            > </ModalAddRole>
          </div>
        </div>
              <div className="data-table">
        <Table style={{ width: "100%" }} striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th className="width-180px">Mã nhóm quyền</th>
              <th>Tên nhóm quyền</th>
              {/* <th className="width-600px">Các chức năng</th> */}

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

export default PaginationQLNQ;
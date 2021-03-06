import React, { useEffect, useState } from "react";
import "../../pagination/pagination.css";
import { Form, FormControl,Table, Pagination } from 'react-bootstrap';
import IconSearch from '../../../assets/icons/search-icon.svg';
import QLCVLDapi from "../../../config/api/apiN2/QLCVLDapi";
import ModalShowVBDTP from "../../modals/ModalN2/ModalShowVBDTP";

function PaginationQLVBDTP(props) {
  const [congvieclanhdaoId, setcongvieclanhdaoId] = useState([]);
  const [rerent, setrerent] = useState(false);

  const [search, setSearch] = useState("");
  const [filterTenVanBanDen, setfilterTenVanBanDen] = useState([]);

  const [filterTrangThai, setfilterTrangThai] = useState([]);


  const updatedata = () =>{
    setrerent(true);
  }

  console.log("congvieclanhdaoId", congvieclanhdaoId)
  useEffect(() => {
    const fetchCVLD = async () => {
        try {          
            const response = await QLCVLDapi.getAll();
            setcongvieclanhdaoId(response);
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
  for (let i = 1; i <= Math.ceil(congvieclanhdaoId.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = congvieclanhdaoId.slice(indexOfFirstItem, indexOfLastItem); // 
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
      {currentItems.map((item, index) => (
        <tr>
          <td>{index + 1}</td>
          <td>{item.vanBanDenId.tenVanBan}</td>
          <td>{item.vanBanDenId.soKyHieu}</td>
          <td>{item.vanBanDenId.ngayDen.split("T")[0]}</td>
          {/* <td>{item.coQuanBanNganhId.tenCoQuan}</td> */}
          {/* <td>{item.noiDungYeuCau}</td> */}
          {/* <td>
            <Link>
            {
              item.vanBanDenId.taiLieu
            }
            </Link>
          </td> */}
          {/* <td>{item.nhanVienId.tenNhanVien}</td> */}
          {/* <td>{item.yKienLanhDao}</td> */}
          {/* <td>{item.thoiHanXuLi}</td> */}
          <td>{item.trangThaiTruongPhong}</td>
          <td>
            <div className="chinh-sua-nv chinhsua">
              <ModalShowVBDTP
                index={index}
                id={item._id}
                updatedata={updatedata}
                noiDungYeuCau={item.noiDungYeuCau}
                yKienLanhDao={item.yKienLanhDao}
                thoiHanXuLi={item.thoiHanXuLi.split("T")[0]}
                trangThaiTruongPhong={item.trangThaiTruongPhong}
                trangThaiLanhDao={item.trangThaiLanhDao}
                baoCaoTruongPhong={item.baoCaoTruongPhong}
                tenVanBan={item.vanBanDenId.tenVanBan}
                taiLieu={item.vanBanDenId.taiLieu}
                tenNhanVien={item.nhanVienId.tenNhanVien}
                tenBoPhan={item.boPhanId.tenBoPhan}
                vanBanDenId={item.vanBanDenId}
                nhanVienId={item.nhanVienId}
                boPhanId={item.boPhanId}
              ></ModalShowVBDTP>
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
              <input type="text" placeholder="T??m tr???ng th??i" onChange={(e) => setSearch(e.target.value)}/>
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
                  <th>T??n v??n b???n</th>
                  <th>S??? k?? hi???u</th>
                  <th>Ng??y nh???n</th>
                  {/* <th>C?? quan ban h??nh</th> */}
                  {/* <th>N???i dung y??u c???u l??nh ?????o</th> */}
                  {/* <th>T??i li???u</th> */}
                  {/* <th>C??n b??? x??? l??</th> */}
                  {/* <th>yKienLanhDao</th> */}
                  {/* <th>Th???i h???n x??? l??</th> */}
                  <th>Tr???ng th??i</th>
                  <th>Xem</th>
                  {/* <th>Ch???nh s???a</th> */}
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

export default PaginationQLVBDTP;
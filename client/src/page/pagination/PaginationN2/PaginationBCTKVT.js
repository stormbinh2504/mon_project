import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { ExportReactCSV } from "../../Export/ExportReactCSV";
import DatePicker from "react-datepicker";
import "../../pagination/pagination.css";
import { Form, FormControl, Table, Pagination } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import QLVBDVTapi from "../../../config/api/apiN2/QLVBDVTapi";
import Moment from "moment";

import ModalShowVBDVT from "../../modals/ModalN2/ModalShowVBDVT";
import QLLVBapi from "../../../config/api/apiN2/QLLVBapi";
import QLCQBHapi from "../../../config/api/apiN2/QLCQBHapi";

function PaginationBCTKVT(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [vanbandenId, setvanbandenId] = useState([]);

  function handleVBD(vbd,index){
    return {
      "Tên Văn Bản": vbd.tenVanBan,
      "Số Ký Hiệu": vbd.soKyHieu,
      "Trạng Thái": vbd.trangThai,
      "Tài liệu": vbd.taiLieu,
      "Tên cơ quan ban hành": vbd.coQuanBanNganhId.tenCoQuan,
      "Loại văn bản": vbd.loaiVanBanId.loaiVanBan,
      "Ngày lưu": vbd.ngayDen,
    };
  }
  const newvanbandenId = vanbandenId.map(handleVBD)

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

  const [lvb, setlvb] = useState([]); //api lấy giá trị
  const [mcq, setmcq] = useState([]);

  // const [ngaybd, setngaybd] = useState(new Date());
  const [ngaybd, setngaybd] = useState(new Date("07/01/2021"));
  const [ngaykt, setngaykt] = useState(new Date());

  const startDay = Moment(ngaybd).format().split("T")[0];
  const endDay = Moment(ngaykt).format().split("T")[0];

  //Chart
  // var demCXL = 0;
  // var demDXL = 0;
  const [filterCXL, setfilterCXL] = useState([]);
  const [filterDXL, setfilterDXL] = useState([]);
  // const [dxl, setdxl] = useState("Đang xử lí");
  // const [cxl, setcxl] = useState("Chưa xử lí");

  useEffect(() => {
    setfilterDXL(
      vanbandenId.filter((country) =>
        country.trangThai.toLowerCase().includes("Đang xử lí".toLowerCase())
      )
    );
  }, [vanbandenId]);

  useEffect(() => {
    setfilterCXL(
      vanbandenId.filter((country) =>
        country.trangThai.toLowerCase().includes("Chưa xử lí".toLowerCase())
      )
    );
  }, [vanbandenId]);

  var demCXL = filterCXL.map((item, index) => index + 1);
  var demDXL = filterDXL.map((item, index) => index + 1);
  var demCXLlength = demCXL.length;
  var demDXLlength = demDXL.length;

  const handleChartBar = (demCXL, demDXL) => {
    return (
      <div>
        {
          <Bar
            data={{
              labels: ["Chưa xử lí", "Đang xử lí"],
              datasets: [
                {
                  label: "Population (%)",
                  backgroundColor: ["#3e95cd", "#8e5ea2"],
                  data: [3, 4],
                },
              ],
            }}
            options={{
              legend: { display: false },
              title: {
                display: true,
                text: "Thống kê trạng thái văn bản",
              },
            }}
          />
        }
      </div>
    );
  };

  // function displayCharBarvt() {
  //   var x = document.getElementById("charbar-vt");
  //   if (x.style.display === "none") {
  //     x.style.display = "block";
  //   } else {
  //     x.style.display = "none";
  //   }
  // }

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
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchNVList();
    setrerent(false);

    // vanbandenId.reduce((country) => {
    // return country.trangThai == "Đang Xử lí" ? demDXL+1 : demDXL})
  }, [rerent]);

  // Bộ lọc

  useEffect(() => {
    setfilterNgayden(
      vanbandenId.filter(
        // (country) => CheckDay(startDay, endDay, country.ngayDen.split('T')[0])
        (country) =>
          CheckDay(
            startDay,
            endDay,
            Moment(country.ngayDen).format().split("T")[0]
          )
      )
    );
  }, [vanbandenId, startDay, endDay]);

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
        country.loaiVanBanId.loaiVanBan
          .toLowerCase()
          .includes(searchLoaiVanBan.toLowerCase())
      )
    );
  }, [searchLoaiVanBan, vanbandenId]);

  useEffect(() => {
    setfilterCoquan(
      vanbandenId.filter((country) =>
        country.coQuanBanNganhId.tenCoQuan
          .toLowerCase()
          .includes(searchCoquan.toLowerCase())
      )
    );
  }, [searchCoquan, vanbandenId]);

  const CheckDay = (ngaybd, ngaykt, ngayd) => {
    var ngayDau = new Date(ngaybd);
    var ngayCuoi = new Date(ngaykt);
    var ngayDen = new Date(ngayd);

    const checkngayCuoi = (ngayCuoi - ngayDen) / (1000 * 3600 * 24);
    const checkngayDau = (ngayDau - ngayDen) / (1000 * 3600 * 24);
    if (checkngayCuoi >= 0 && checkngayDau <= 0) {
      // console.log("Có ngày đến", ngayd);
      return ngayd;
    } else {
      console.log("Khôngcó");
    }
  };
  // CheckDay(startDay, endDay, midDay);

  // function hienThiThoiGian() {
  //   var ngayDau = new Date("2020-7-6");
  //   var ngayCuoi = new Date("2020-7-13");
  //   ketQua = thoiGianGiuaHaiNgay(ngayDau, ngayCuoi);
  //   alert("Khoảng Cách Giữa Hai Ngày là " + ketQua + " ngày");
  // }

  // function hienThiThoiGian() {
  //   var ngayDau = new Date(startDay);
  //   var ngayCuoi = new Date(endDay);
  //   const ketQua = thoiGianGiuaHaiNgay(ngayDau, ngayCuoi);
  //   alert(`Khoảng Cách Giữa Hai Ngày là " + ${ketQua} +ngày`);
  // }

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(7);

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
  const currentItems2 = filterTenVanBanDen.slice(
    indexOfFirstItem,
    indexOfLastItem
  ); //
  const currentTrangthai = filterTrangthai.slice(
    indexOfFirstItem,
    indexOfLastItem
  ); //
  const currentLoaivanvan = filterLoaivanban.slice(
    indexOfFirstItem,
    indexOfLastItem
  ); //
  const currentCoquan = filterCoquan.slice(indexOfFirstItem, indexOfLastItem); //
  const currentNgayden = filterNgayden.slice(indexOfFirstItem, indexOfLastItem); //

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

  const renderData = (currentItems) => {
    return (
      <>
        {currentItems.map((item, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{item.tenVanBan}</td>
            <td>{item.soKyHieu}</td>
            <td>{item.ngayDen.split("T")[0]}</td>
            <td>{item.coQuanBanNganhId.tenCoQuan}</td>
            <td>{item.nhanVienId.tenNhanVien}</td>
            <td>{item.loaiVanBanId.loaiVanBan}</td>
            <td>{item.trangThai}</td>
            <td>
              <Link>{item.taiLieu}</Link>
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
          <div className="input-add">
            <label htmlFor="chucvu" className="input-label font-bold">
              Ngày bắt đầu:
            </label>
            <DatePicker
              selected={ngaybd}
              onChange={(date) => setngaybd(date)}
              dateFormat="d/MM/yyyy"
            />
          </div>

          <div className="input-add">
            <label htmlFor="chucvu" className="input-label font-bold">
              Ngày Kết thúc:
            </label>
            <DatePicker
              selected={ngaykt}
              onChange={(date) => setngaykt(date)}
              dateFormat="d/MM/yyyy"
            />
          </div>
          <div className="input-add">
            <label htmlFor="bophan" className="input-label font-bold">
              Trạng thái:
            </label>
            <select
              className="input-select"
              id="trangthaivt"
              name="trangthaivt"
              value={searchTrangthai}
              onChange={(e) => {
                setSearchTrangthai(e.target.value);
              }}
            >
              <option value="">Chọn trạng thái</option>
              <option value="Đang xử lí">Đang xử lí</option>
              <option value="Chưa xử lí">Chưa xử lí</option>
            </select>
          </div>

          <div className="input-add">
            <label htmlFor="bophan" className="input-label font-bold ">
              Loại văn bản:
            </label>
            <select
              className="input-select"
              id="bophan"
              name="bophan"
              value={searchLoaiVanBan}
              onChange={(e) => {
                setSearchLoaiVanBan(e.target.value);
              }}
            >
              <option value="">Chọn loại văn bản</option>
              {lvb.map((item, index) => (
                <option value={item.loaiVanBan}>{item.loaiVanBan}</option>
              ))}
            </select>
          </div>

          <div className="input-add">
            <label
              htmlFor="chucvu"
              className="input-label font-bold width-180px"
            >
              Cơ quan ban hành:{" "}
            </label>
            <select
              className="input-select"
              id="chucvu"
              value={searchCoquan}
              onChange={(e) => {
                setSearchCoquan(e.target.value);
              }}
            >
              <option value="">Chọn tên cơ quan ban hành:</option>
              {mcq.map((item, index) => (
                <option value={item.tenCoQuan}>{item.tenCoQuan}</option>
              ))}
            </select>
          </div>
          <div className="">
            <div className="export-csv">
              <ExportReactCSV
                csvData={newvanbandenId}
                fileName="vanbanden.xls"
              />
            </div>
            <div className="export-csv" style={{ width: "100%" }}>
              <Button
                style={{ width: "100%" }}
                variant="success"
                // onClick={displayCharBarvt}
                onClick={handleShow}
              >
                Chart
              </Button>
            </div>
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
                <th className="width-180px">Cơ quan ban hành</th>
                <th className="width-120px">Lãnh đạo</th>
                <th className="width-120px">Loại văn bản </th>
                <th className="width-120px">Trạng thái </th>
                <th>Đính kèm</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                if (
                  searchTrangthai == "" &&
                  searchLoaiVanBan == "" &&
                  searchCoquan == "" &&
                  ngaybd == "" &&
                  ngaykt == ""
                ) {
                  return renderData(currentItems);
                } else {
                  if (searchTrangthai != "") {
                    return renderData(currentTrangthai);
                  } else if (searchLoaiVanBan != "") {
                    return renderData(currentLoaivanvan);
                  } else if (searchCoquan != "") {
                    return renderData(currentCoquan);
                  } else if (ngaybd != "" && ngaykt != "") {
                    return renderData(currentNgayden);
                  }
                }
              })()}
              {/* <div className="export-csv">
              <ExportReactCSV csvData={currentLoaivanvan} fileName="vanbanden.xls" />
          </div> */}
            </tbody>
          </Table>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thống kê văn bản</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Bar
              data={{
                labels: ["Văn bản đến", "Chưa xử lí", "Đang xử lí"],
                datasets: [
                  {
                    label: "Văn bản đến",
                    backgroundColor: ["#27a090", "#8e5ea2", "#e8c3b9"],
                    data: [
                      demCXLlength + demDXLlength,
                      demCXLlength,
                      demDXLlength,
                    ],
                  },
                ],
              }}
              options={{
                legend: { display: false },
                title: {
                  display: true,
                  text: "Predicted world population (millions) in 2050",
                },
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>

        {/* <div className="width-600px char-bar" id="charbar-vt">
          <Bar
            data={{
              labels: ["Văn bản đến", "Chưa xử lí", "Đang xử lí"],
              datasets: [
                {
                  label: "Văn bản đến",
                  backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
                  data: [
                    demCXLlength + demDXLlength,
                    demCXLlength,
                    demDXLlength,
                  ],
                },
              ],
            }}
            options={{
              legend: { display: false },
              title: {
                display: true,
                text: "Predicted world population (millions) in 2050",
              },
            }}
          />
        </div> */}
        <div className="pageNumbers">
          <ul className="pageNumbers-lst">
            <li>
              <button
                onClick={handlePrevbtn}
                disabled={currentPage == pages[0] ? true : false}
              >
                Prev
              </button>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            <li>
              <button
                onClick={handleNextbtn}
                disabled={currentPage == pages[pages.length - 1] ? true : false}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default PaginationBCTKVT;

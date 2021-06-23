import React, { Suspense, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import AvatarUser from '../../../assets/icons/user-circle-regular.svg';

import QLNVapi from "../../../config/api/QLNVapi";
import QLBPapi from "../../../config/api/QLBPapi";
import QLVBDVTapi from "../../../config/api/apiN2/QLVBDVTapi";
import QLLVBapi from "../../../config/api/apiN2/QLLVBapi";
import QLCQBHapi from "../../../config/api/apiN2/QLCQBHapi";
import QLCVLDapi from "../../../config/api/apiN2/QLCVLDapi";

export default function ModalShowVBDLD(props) {
  const [show, setShow] = useState(false);
  const [showxuli, setShowxuli] = useState(false);

  const [mnv, setmnv] = useState(props.maNhanVien);

  const [rerent, setrerent] = useState(false);
  
  const [mbp, setmbp] = useState([]);
  const [mcv, setmcv] = useState([]);

   const handleClose = () => {
     setShow(false);
     setShowxuli(true);
   }
   const handleShow = () => setShow(true);

   const handleCloseXuLi = () => setShowxuli(false);
   const handleShowXuli = () => setShowxuli(true);

  const [idvanban, setidvanban] = useState(props.id);
  const [tvb, settvb] = useState(props.tenVanBan);
  const [skh, setskh] = useState(props.soKyHieu);
  const [ngayDen, setngayDen] = useState(props.ngayDen);
  const [trangThai, settrangThai] = useState(props.trangThai);
  const [trangThaiLanhDao, settrangThaiLanhDao] = useState("Chưa xử lí");
  const [taiLieu, settaiLieu] = useState(props.taiLieu);

  const [tbp, settbp] = useState(props.tenBoPhan); //mbp
  const [tcq, settcq] = useState(props.tenCoQuan);
  const [tnv, settnv] = useState(props.tenNhanVien);
  const [lvb, setlvb] = useState(props.loaiVanBan);

  const [idtbp, setidtbp] = useState(props.idtenBoPhan); //mbp
  const [idtcq, setidtcq] = useState(props.idtenCoQuan);
  const [idtnv, setidtnv] = useState(props.idtenNhanVien);
  const [idlvb, setidlvb] = useState(props.idloaiVanBan);

    useEffect(() => {
    const fetchMNV = async () => {
        const response = await QLBPapi.getAll();
        setidBoPhan(response);
    };
    fetchMNV();
  }, []);


  const [idNhanVien, setidNhanVien] = useState([]);
  const [idBoPhan, setidBoPhan] = useState([]);
  const [datatbp, setdatatbp] = useState(''); //tenbp
  const [datattbp, setdatattbp] = useState(''); //tên trưởng viên bộ phận

  const [filterNVTBP, setfilterNVTBP] = useState([]);
  const [nhanvienId, setnhanvienId] = useState([]);

  useEffect(() => {
    const fetchMNV = async () => {
        const response = await QLNVapi.getAll();
        setnhanvienId(response);
    };
    fetchMNV();
  }, []);


    useEffect(() => {
    setfilterNVTBP(
      nhanvienId.filter((country) =>
        country.boPhanId._id == datatbp && country.chucDanhId.tenChucDanh.toLowerCase().includes("Trưởng bộ phận".toLowerCase())
      )
    );
  }, [nhanvienId, datatbp]);

  const [thoiHan, setthoiHan] = useState(new Date())
  const [ndyc, setndyc] = useState("");
  const [idcvb, setidcvb] = useState("");

  const handleXacNhan = async () => {
    const res = await QLCVLDapi.post({
      "thoiHanXuLi": thoiHan,
      "noiDungYeuCau": ndyc,
      "trangThaiTruongPhong": "Chưa xử lí",
      "trangThaiLanhDao": "Chưa xử lí",
      "yKienLanhDao": "",
      "baoCaoTruongPhong": "",
      "nhanVienId": datattbp,
      "boPhanId": datatbp,
      "vanBanDenId": idvanban  
    });
    props.updatedata();
    nextVBD();
    handleCloseXuLi();
  };

  const nextVBD = async () => {
    const res = await QLVBDVTapi.put(props.id, {
      "tenVanBan": tvb,
      "soKyHieu": skh,
      "trangThai": "Đã xử lí",
      "trangThaiLanhDao": "Đã xử lí",
      "taiLieu": taiLieu,
      "baoCaoLanhDao": "",
      "boPhanId": idtbp,
      "coQuanBanNganhId": idtcq,
      "nhanVienId": idtnv,
      "loaiVanBanId": idlvb,
    });
    handleClose(false);
    props.updatedata();
  };
  
  return (
    <>
      <Link to="/lanhdao/quanlyvanbandenlanhdao" onClick={handleShow}>
        Chi tiết
      </Link>
      <Modal show={show} onHide={()=>{setShow(false)}}>
        <Modal.Header closeButton >
          <Modal.Title>Thông tin văn bản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className = "content-add">
                <div className = "modal1">
                    <div className="input-add">
                        <label for="msv" className="input-label font-bold width-180px">Tên văn bản:</label>
                        <label for="msv" className="input-select">{tvb}</label>
                    </div>
                    <div className="input-add">
                        <label for="msv" className="input-label font-bold width-180px">Số ký hiệu:</label>
                        <label for="msv" className="input-select">{skh}</label>
                    </div>
                    <div className="input-add">
                        <label for="tennv" className="input-label font-bold width-180px" >Loại văn bản:</label>
                        <label for="msv" className="input-select">{lvb}</label>
                    </div>
              <div className="input-add">
                <label htmlFor="bophan" className="input-label font-bold width-180px">Cơ quan ban hành:</label>
                <label for="mbp" className="input-select width-245px">{tcq}</label>
              </div>
              {/* <div className="input-add">
                <label htmlFor="bophan" className="input-label font-bold width-180px">Lãnh đạo phê duyệt:</label>
                <label for="mbp" className="input-select width-245px">{tnv}</label>
              </div> */}
              <div className="input-add">
                <label htmlFor="bophan" className="input-label font-bold width-180px">File VB Đến:</label>
                <Link className="input-select width-245px">{taiLieu}</Link>
              </div>
            </div>
            </div>  
        </Modal.Body>
        <Modal.Footer> 
          <Link to="/lanhdao/quanlyvanbandenlanhdao" onClick={handleClose}>
            <Button id="chuyentiep" variant="primary">
               Xử lí
             </Button>
          </Link>
          <Button variant="secondary" onClick={()=>{setShow(false)}}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
{/* Xử lí lãnh đạo */}
      <Modal show={showxuli} onHide={handleCloseXuLi}>
        <Modal.Header closeButton>
          <Modal.Title>Xử lí văn bản đến của lãnh đạo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                    <div className="content-add">
            <div className="modal1">
              <div className="input-add">
                <label htmlFor="chucvu" className="input-label font-bold width-180px">Chọn bộ phận:</label>
                <select
                  className = "input-select"
                  id="chucvu"
                  value={datatbp}
                  onChange={(e) => {
                    setdatatbp(e.target.value);
                  }}
                >
                  <option value=''>Chọn bộ phận</option>
                  {idBoPhan.map((item, index) => (
                    // <option value={item._id}>{item.tenBoPhan}</option>
                    <option value={item._id}>{item.tenBoPhan}</option>
                  ))}
                </select>    
              </div>

              <div className="input-add">
                <label htmlFor="chucvu" className="input-label font-bold width-180px">Cán bộ phê duyệt:</label>
                <select
                  className = "input-select"
                  id="chucvu"
                  value={datattbp}
                  onChange={(e) => {
                    setdatattbp(e.target.value);
                  }}
                >
                  <option value=''>Trưởng bộ phận </option>
                  {filterNVTBP.map((item, index) => (
                    <option value={item._id}>{item.tenNhanVien}</option>
                  ))}
                </select>    
              </div>

              <div className="input-add">
                <label htmlFor="chucvu" className="input-label font-bold width-180px">Ngày hạn:</label>
                <DatePicker 
              selected={thoiHan}
              onChange={date => setthoiHan(date)} 
              dateFormat = "d/MM/yyyy"
            />
              </div>

              <div className="input-add">
                <label htmlFor="chucvu" className="input-label font-bold width-180px">Nội dung yêu cầu:</label>
                <input
                  type="text"
                  value={ndyc}
                  onChange={(e) => {
                    setndyc(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleXacNhan} >
            Xác nhận
          </Button>
          <Button variant="secondary" onClick={handleCloseXuLi}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

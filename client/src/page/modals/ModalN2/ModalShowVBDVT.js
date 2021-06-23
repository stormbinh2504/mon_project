import React, { Suspense, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

import AvatarUser from '../../../assets/icons/user-circle-regular.svg';

import QLNVapi from "../../../config/api/QLNVapi";
import QLBPapi from "../../../config/api/QLBPapi";
import QLVBDVTapi from "../../../config/api/apiN2/QLVBDVTapi";
import QLLVBapi from "../../../config/api/apiN2/QLLVBapi";
import QLCQBHapi from "../../../config/api/apiN2/QLCQBHapi";

export default function ModalShowVBDVT(props) {
  const [show, setShow] = useState(false);
  const [mnv, setmnv] = useState(props.maNhanVien);

  const [rerent, setrerent] = useState(false);
  
  const [mbp, setmbp] = useState([]);
  const [mcv, setmcv] = useState([]);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);


  const [tvb, settvb] = useState(props.tenVanBan);
  const [skh, setskh] = useState(props.soKyHieu);
  const [ngayDen, setngayDen] = useState(props.ngayDen);
  const [taiLieu, settaiLieu] = useState(props.taiLieu);
  const [trangThai, settrangThai] = useState(props.trangThai);
  const [trangThaiLanhDao, settrangThaiLanhDao] = useState("Chưa xử lí");

  const [tbp, settbp] = useState(props.tenBoPhan); //mbp
  const [tcq, settcq] = useState(props.tenCoQuan);
  const [tnv, settnv] = useState(props.tenNhanVien);
  const [lvb, setlvb] = useState(props.loaiVanBan);

  const [idtbp, setidtbp] = useState(props.idtenBoPhan); //mbp
  const [idtcq, setidtcq] = useState(props.idtenCoQuan);
  const [idtnv, setidtnv] = useState(props.idtenNhanVien);
  const [idlvb, setidlvb] = useState(props.idloaiVanBan);

    const nextVBD = async () => {
    const res = await QLVBDVTapi.put(props.id,{
      "tenVanBan": tvb,
      "soKyHieu": skh,
      "trangThai": "Đã xử lí",
      "trangThaiLanhDao": trangThaiLanhDao,
      "taiLieu": taiLieu,
      "baoCaoLanhDao": " ",
      "boPhanId": idtbp,
      "coQuanBanNganhId": idtcq,
      "nhanVienId": idtnv,
      "loaiVanBanId": idlvb,
    });
    handleClose(false);
    props.updatedata();
  };


  function TrangThai() {
    return (
      <Button variant="secondary" onClick={handleClose}>
          Đóng
      </Button>
    )
  }

  function TrangThai2() {
    return (
      <>
      <Button variant="secondary" onClick={handleClose}>
        Đóng
      </Button>
      <Button id="chuyentiep" variant="primary" onClick={nextVBD}>
        Chuyển tiếp
      </Button>
      </>
    )
  }
  
  return (
    <>
      <Link to="/vanthu/quanlyvanbanden" onClick={handleShow}>
        Chi tiết
      </Link>
      <Modal show={show} onHide={handleClose}>
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
                <label for="mbp" className="input-select">{tcq}</label>
              </div>
              <div className="input-add">
                <label htmlFor="chucvu" className="input-label font-bold width-180px">Lãnh đạo phê duyệt:</label>
                <label for="mcv" className="input-select">{tnv}</label>
              </div>

              <div className="input-add">
                <label htmlFor="loainhanvien" className="input-label font-bold width-180px">Ngày đến:</label>
                <label for="mcv" className="input-select">{ngayDen}</label>   
              </div>
              <div className="input-add">
                  <label htmlFor="gioitinh" className="input-label font-bold width-180px">Trạng thái:</label>
                  <label for="mcv" className="input-select">{trangThai}</label>
              </div>
              <div className="input-add">
                  <label htmlFor="gioitinh" className="input-label font-bold width-180px">File VB Đến:</label>
                  <label for="mcv" className="input-select">
                  <Link>
                    {taiLieu}
                  </Link>
                  </label>
              </div>
            </div>
                {/* <div className="img-user">
                        <img src={AvatarUser} alt="" />
                </div> */}
            </div>  
        </Modal.Body>
        <Modal.Footer> 
          {
            trangThai =="Đã xử lí" ? TrangThai() : TrangThai2()
          }
        </Modal.Footer>
      </Modal>
    </>
  );
}

import React, { Suspense, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import QLCVLDapi from "../../../config/api/apiN2/QLCVLDapi";

export default function ModalShowDuyetBCLD(props) {
  const [show, setShow] = useState(false);
   const handleClose = () => {
     setShow(false);
   }
   const handleShow = () => setShow(true);

  const [noiDungYeuCau, setnoiDungYeuCau] = useState(props.noiDungYeuCau); //mbp
  const [yKienLanhDao, setyKienLanhDao] = useState(props.yKienLanhDao);
  const [thoiHanXuLi, setthoiHanXuLi] = useState(props.thoiHanXuLi);
  const [trangThaiTruongPhong, settrangThaiTruongPhong] = useState(props.trangThaiTruongPhong);
  const [trangThaiLanhDao, settrangThaiLanhDao] = useState(props.trangThaiLanhDao);
  const [baoCaoTruongPhong, setbaoCaoTruongPhong] = useState(props.baoCaoTruongPhong);

  const [vanBanDenId, setvanBanDenId] = useState(props.vanBanDenId);
  const [nhanVienId, setnhanVienId] = useState(props.nhanVienId);
  const [boPhanId, setboPhanId] = useState(props.boPhanId);


  const handleDuyet = async () => {
    const res = await QLCVLDapi.put(props.id,{
      "thoiHanXuLi": thoiHanXuLi,
      "noiDungYeuCau": noiDungYeuCau,
      "trangThaiTruongPhong": trangThaiTruongPhong,
      "trangThaiLanhDao": "Hoàn thành",
      "yKienLanhDao": ykld,
      "baoCaoTruongPhong": baoCaoTruongPhong,
      "nhanVienId": nhanVienId,
      "boPhanId": boPhanId,
      "vanBanDenId": vanBanDenId
    });
    handleClose(false);
    props.updatedata();
  };

  const handleKhongDuyet = async () => {
    const res = await QLCVLDapi.put(props.id,{
      "thoiHanXuLi": thoiHanXuLi,
      "noiDungYeuCau": noiDungYeuCau,
      "trangThaiTruongPhong": trangThaiTruongPhong,
      "trangThaiLanhDao": "Chưa xử lí",
      "yKienLanhDao": ykld,
      "baoCaoTruongPhong": "",
      "nhanVienId": nhanVienId,
      "boPhanId": boPhanId,
      "vanBanDenId": vanBanDenId
    });
    handleClose(false);
    props.updatedata();
  };

   const [ykld, setykld] = useState("");

  return (
    <>
      <Link to="/lanhdao/quanlycongvieclanhdao" onClick={handleShow}>
        Xem báo cáo
      </Link>
      <Modal show={show} onHide={()=>{setShow(false)}}>
        <Modal.Header closeButton >
          <Modal.Title>Thông tin báo cáo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className = "content-add">
                <div className = "modal1">
                    <div className="input-add">
                        <label for="msv" className="input-label font-bold width-180px">Thông tin báo cáo:</label>
                        <label for="msv" className="input-select">{baoCaoTruongPhong}</label>
                    </div>
                  <div className="input-add">
                        <label for="msv" className="input-label font-bold width-180px">Ý kiến lãnh đạo:</label>
                        <input type="text" value={ykld} onChange={(e)=>{setykld(e.target.value)}}/>
                    </div>
                </div>
            </div>  
        </Modal.Body>
        <Modal.Footer> 
            <Button id="chuyentiep" variant="success" onClick={handleDuyet}>
               Duyệt
             </Button>
            <Button id="chuyentiep" variant="primary" onClick={handleKhongDuyet}>
               Không Duyệt
             </Button>
          <Button variant="secondary" onClick={()=>{setShow(false)}}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

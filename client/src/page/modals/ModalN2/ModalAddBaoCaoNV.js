import React, { Suspense, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import "react-datepicker/dist/react-datepicker.css";
import QLCVTPapi from "../../../config/api/apiN2/QLCVTPapi";

export default function ModalAddBaoCaoNV(props) {
  const [show, setShow] = useState(false);
  const [showxuli, setShowxuli] = useState(false);

  const [rerent, setrerent] = useState(false);

   const handleClose = () => {
     setShow(false);
     setShowxuli(true);
   }
   const handleShow = () => setShow(true);

   const handleCloseXuLi = () => setShowxuli(false);
   const handleShowXuli = () => setShowxuli(true);

  const [thoiHan, setthoiHan] = useState(props.thoiHan); //mbp
  const [noiDungCongViec, setnoiDungCongViec] = useState(props.noiDungCongViec);
  const [trangThaiNhanVien, settrangThaiNhanVien] = useState(props.trangThaiNhanVien);
  const [baoCaoNhanVien, setbaoCaoNhanVien] = useState(props.baoCaoNhanVien);
  const [yKienTruongPhong, setyKienTruongPhong] = useState(props.yKienTruongPhong);

  const [congViecLanhDaoId, setcongViecLanhDaoId] = useState(props.congViecLanhDaoId);
  const [nhanVienId, setnhanVienId] = useState(props.nhanVienId);
  const [boPhanId, setboPhanId] = useState(props.boPhanId);


  const [bcnhanvien, setbcnhanvien] = useState("");

// Công việc
  const handleBaoCaoNhanVien = async () => {
    const res = await QLCVTPapi.put(props.id,{
      "thoiHan": thoiHan,
      "noiDungCongViec": noiDungCongViec,
      "trangThaiNhanVien": trangThaiNhanVien,
      "baoCaoNhanVien": taiLieu.name,
      "yKienTruongPhong": yKienTruongPhong,
      "nhanVienId": nhanVienId,
      "boPhanId": boPhanId,
      "congViecLanhDaoId": congViecLanhDaoId
    });
    handleClose(false);
    props.updatedata();
    handleCloseXuLi();
  };

  const [taiLieu, settaiLieu] = useState();

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Tạo báo cáo
      </Button>
      <Modal show={show} onHide={()=>{setShow(false)}}>
        <Modal.Header closeButton >
          <Modal.Title>Thông tin văn bản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <div className = "content-add">
                <div className = "modal1">
                    <div className="input-add">
                        <label for="msv" className="input-label font-bold width-180px">Nội dung báo cáo:</label>
                        {/* <input type="text" value ={bcnhanvien} onChange={(e)=>{setbcnhanvien(e.target.value)}}/> */}

                        <input type="file" onChange={(e) => {settaiLieu(e.target.files[0])}} />  

                    </div>
              </div>
            </div>    
        </Modal.Body>
        <Modal.Footer> 
            <Button id="chuyentiep" variant="primary" onClick={handleBaoCaoNhanVien}>
               Tạo báo cáo
             </Button>
          <Button variant="secondary" onClick={()=>{setShow(false)}}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

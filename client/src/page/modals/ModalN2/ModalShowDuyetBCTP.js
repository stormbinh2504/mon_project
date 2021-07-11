import React, { Suspense, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import QLCVLDapi from "../../../config/api/apiN2/QLCVLDapi";
import QLCVTPapi from "../../../config/api/apiN2/QLCVTPapi";

export default function ModalShowDuyetBCTP(props) {
  const [show, setShow] = useState(false);
   const handleClose = () => {
     setShow(false);
   }
   const handleShow = () => setShow(true);

  const [noiDungCongViec, setnoiDungCongViec] = useState(props.noiDungCongViec); //mbp
  const [thoiHan, setthoiHan] = useState(props.thoiHan);
  const [trangThaiNhanVien, settrangThaiNhanVien] = useState(props.trangThaiNhanVien);
  const [baoCaoNhanVien, setbaoCaoNhanVien] = useState(props.baoCaoNhanVien);
  const [yKienTruongPhong, setyKienTruongPhong] = useState(props.yKienTruongPhong);

  const [nhanVienId, setnhanVienId] = useState(props.nhanVienId);
  const [boPhanId, setboPhanId] = useState(props.boPhanId);
  const [congViecLanhDaoId, setcongViecLanhDaoId] = useState(props.congViecLanhDaoId);
//

   const [idcongvieclanhdao, setidcongvieclanhdao] = useState([]);
   const [idcongviectruongphong, setidcongviectruongphong] = useState([]);

   const [rerent, setrerent] = useState(false);


    useEffect(() => {
    const fetchNVList = async () => {
        try {          
            const response = await QLCVLDapi.getAll();
            setidcongvieclanhdao(response);
        } catch (error) {
            console.log('Failed to fetch product list: ', error);
        }
    }
    fetchNVList();
    setrerent(false);
  },[rerent])

    useEffect(() => {
    const fetchNVList = async () => {
        try {          
            const response = await QLCVTPapi.getAll();
            setidcongviectruongphong(response);
        } catch (error) {
            console.log('Failed to fetch product list: ', error);
        }
    }
    fetchNVList();
    setrerent(false);
  },[rerent]) 

  const thongtincongviectruongphong = idcongviectruongphong.filter((idcongviectruongphong, index) => {
    return idcongviectruongphong._id === props.id
  })
  
  const thongtincongvieclanhdao = idcongvieclanhdao.filter((idcongvieclanhdao, index) => {
    return idcongvieclanhdao._id === congViecLanhDaoId._id
  })

  console.log("thongtincongvieclanhdao", thongtincongvieclanhdao)
  console.log("thongtincongviectruongphong", thongtincongviectruongphong)

    const [thoiHanXuLi, setthoiHanXuLi] = useState(thongtincongvieclanhdao.thoiHanXuLi);
    const [noiDungYeuCau, setnoiDungYeuCau] = useState(thongtincongvieclanhdao.noiDungYeuCau);
    const [trangThaiTruongPhongLD, settrangThaiTruongPhongLD] = useState(thongtincongvieclanhdao.trangThaiTruongPhong);
    const [trangThaiLanhDao, settrangThaiLanhDao] = useState(thongtincongvieclanhdao.trangThaiLanhDao);
    const [yKienLanhDao, setyKienLanhDao] = useState(thongtincongvieclanhdao.yKienLanhDao);
    const [baoCaoTruongPhongLD, setbaoCaoTruongPhongLD] = useState(thongtincongvieclanhdao.baoCaoTruongPhong);
    const [nhanVienIdLD, setnhanVienIdLD] = useState(thongtincongvieclanhdao.nhanVienId);
    const [boPhanIdLD, setboPhanIdLD] = useState(thongtincongvieclanhdao.boPhanId);
    const [vanBanDenId, setvanBanDenId] = useState(thongtincongvieclanhdao.vanBanDenId);

  const handleBCLD = async () => {
    const res = await QLCVLDapi.put(congViecLanhDaoId._id, {
      "thoiHanXuLi": thoiHanXuLi,
      "noiDungYeuCau": noiDungYeuCau,
      "trangThaiTruongPhong": trangThaiTruongPhongLD,
      "trangThaiLanhDao": trangThaiLanhDao,
      "yKienLanhDao": yKienLanhDao,
      "baoCaoTruongPhong": baoCaoNhanVien,
      "nhanVienId": nhanVienIdLD,
      "boPhanId": boPhanIdLD,
      "vanBanDenId": vanBanDenId  
    });
    handleClose(false);
    props.updatedata();
  };

  // const [thoiHan, thoiHan] = useState(thongtincongviectruongphong.thoiHan);
  // const [noiDungCongViec, noiDungCongViec] = useState(thongtincongviectruongphong.noiDungCongViec);
  // const [trangThaiNhanVien, trangThaiNhanVien] = useState(thongtincongviectruongphong.trangThaiNhanVien);
  // const [baoCaoNhanVien, baoCaoNhanVien] = useState(thongtincongviectruongphong.baoCaoNhanVien);
  // const [yKienTruongPhong, yKienTruongPhong] = useState(thongtincongviectruongphong.yKienTruongPhong);
  // const [nhanVienId, nhanVienId] = useState(thongtincongviectruongphong.nhanVienId);
  // const [boPhanId, boPhanId] = useState(thongtincongviectruongphong.boPhanId);
  // const [congViecLanhDaoId, congViecLanhDaoId] = useState(thongtincongviectruongphong.congViecLanhDaoId);

  const handleDuyet = async () => {
    const res = await QLCVTPapi.put(props.id,{
      "thoiHan": thoiHan,
      "noiDungCongViec": noiDungCongViec,
      "trangThaiNhanVien": "Đã xử lí",
      "baoCaoNhanVien": baoCaoNhanVien,
      "yKienTruongPhong": yktp,
      "nhanVienId": nhanVienId,
      "boPhanId": boPhanId,
      "congViecLanhDaoId": congViecLanhDaoId,
    });
    handleClose(false);
    props.updatedata();
    handleBCLD();
  };

  const handleKhongDuyet = async () => {
    const res = await QLCVTPapi.put(props.id,{
      "thoiHan": thoiHan,
      "noiDungCongViec": noiDungCongViec,
      "trangThaiNhanVien": "Chưa xử lí",
      "baoCaoNhanVien": "",
      "yKienTruongPhong": yktp,
      "nhanVienId": nhanVienId,
      "boPhanId": boPhanId,
      "congViecLanhDaoId": congViecLanhDaoId,
    });
    handleClose(false);
    props.updatedata();
  };

  const [yktp, setyktp] = useState("");

  return (
    <>
      <Link to="/truongphong/quanlycongviectruongphong" onClick={handleShow}>
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
                        <label for="msv" className="input-select">{baoCaoNhanVien}</label>
                    </div>
                    <div className="input-add">
                        <label for="msv" className="input-label font-bold width-180px">Ý kiến trưởng phòng:</label>
                        <input type="text" value={yktp} onChange={(e)=>{setyktp(e.target.value)}}/>
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

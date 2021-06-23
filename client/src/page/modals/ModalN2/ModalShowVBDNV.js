import React, { Suspense, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import AvatarUser from '../../../assets/icons/user-circle-regular.svg';

import QLNVapi from "../../../config/api/QLNVapi";
import QLBPapi from "../../../config/api/QLBPapi";
import QLVBDCTapi from "../../../config/api/apiN2/QLVBDVTapi";
import QLLVBapi from "../../../config/api/apiN2/QLLVBapi";
import QLCVTPapi from "../../../config/api/apiN2/QLCVTPapi";
import QLCVLDapi from "../../../config/api/apiN2/QLCVLDapi";

export default function ModalShowVBDNV(props) {
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

  const [noiDungYeuCau, setnoiDungYeuCau] = useState(props.noiDungYeuCau); //mbp
  const [yKienLanhDao, setyKienLanhDao] = useState(props.yKienLanhDao);
  const [thoiHanXuLi, setthoiHanXuLi] = useState(props.thoiHanXuLi);
  const [trangThaiTruongPhong, settrangThaiTruongPhong] = useState(props.trangThaiTruongPhong);
  const [trangThaiLanhDao, settrangThaiLanhDao] = useState(props.trangThaiLanhDao);
  const [baoCaoTruongPhong, setbaoCaoTruongPhong] = useState(props.baoCaoTruongPhong);

  const [vanBanDenId, setvanBanDenId] = useState(props.vanBanDenId);
  const [nhanVienId, setnhanVienId] = useState(props.nhanVienId);
  const [boPhanId, setboPhanId] = useState(props.boPhanId);

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
        country.boPhanId.tenBoPhan.toLowerCase().includes(datatbp.toLowerCase())
      )
    );
  }, [nhanvienId, datatbp]);

  const nextVBD = async () => {
    const res = await QLCVLDapi.put(props.id,{
      "thoiHanXuLi": thoiHanXuLi,
      "noiDungYeuCau": noiDungYeuCau,
      "trangThaiTruongPhong": "Đã xử lí",
      "trangThaiLanhDao": trangThaiLanhDao,
      "yKienLanhDao": yKienLanhDao,
      "baoCaoTruongPhong": baoCaoTruongPhong,
      "nhanVienId": nhanVienId,
      "boPhanId": boPhanId,
      "vanBanDenId": vanBanDenId
    });
    handleClose(false);
    props.updatedata();
  };

  const [thoiHan, setthoiHan] = useState(new Date())
  const [ndcv, setndcv] = useState("");
  const [idcvb, setidcvb] = useState("");

// Công việc
  const handleXacNhan = async () => {
    const res = await QLCVTPapi.post({
      "thoiHan": thoiHan,
      "noiDungCongViec": ndcv,
      "trangThaiNhanVien": "Chưa xử lí",
      "baoCaoNhanVien": "",
      "yKienTruongPhong": "",
      "nhanVienId": datattbp,
      "boPhanId": "60b98cb293b8f9145c32c017",
      "congViecLanhDaoId": props.id
    });
    handleClose(false);
    props.updatedata();
    nextVBD();
    handleCloseXuLi();
  };


  return (
    <>
      <Link to="/nhanvien/quanlyvanbandennhanvien" onClick={handleShow}>
        Xem thông tin
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
                        <label for="msv" className="input-select">{vanBanDenId.tenVanBan}</label>
                    </div>
                    <div className="input-add">
                        <label for="msv" className="input-label font-bold width-180px">Số ký hiệu:</label>
                        <label for="msv" className="input-select">{vanBanDenId.soKyHieu}</label>
                    </div>
                    {/* <div className="input-add">
                        <label for="msv" className="input-label font-bold width-180px">Cán bộ xử lí:</label>
                        <label for="msv" className="input-select">{nhanVienId.tenNhanVien}</label>
                    </div>
                    <div className="input-add">
                        <label for="tennv" className="input-label font-bold width-180px" >Nội dung yêu cầu:</label>
                        <label for="msv" className="input-select">{noiDungYeuCau}</label>
                    </div> */}
                    <div className="input-add">
                        <label for="tennv" className="input-label font-bold width-180px" >Trạng thái:</label>
                        <label for="msv" className="input-select">{trangThaiTruongPhong}</label>
                    </div>
                    <div className="input-add">
                        <label for="tennv" className="input-label font-bold width-180px" >Nội dung yêu cầu:</label>
                        <label for="msv" className="input-select">{noiDungYeuCau}</label>
                    </div>
                    <div className="input-add">
                        <label for="tennv" className="input-label font-bold width-180px" >Tài liệu:</label>
                        <label for="msv" className="input-select">
                        <Link>
                        {
                          vanBanDenId.taiLieu
                        }
                        </Link> 
                        </label>
                    </div>
              </div>
            </div>    
        </Modal.Body>
        <Modal.Footer> 
          {/* <Link to="/truongphong/quanlyvanbandentruongphong" onClick={handleClose}>
            <Button id="chuyentiep" variant="primary">
               Xử lí
             </Button>
          </Link> */}
          <Button variant="secondary" onClick={()=>{setShow(false)}}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>


  {/* Xử lí trưởng phòng*/}
      <Modal show={showxuli} onHide={handleCloseXuLi}>
        <Modal.Header closeButton>
          <Modal.Title>Xử lí văn bản đến</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-add">
            <div className="modal1">
              <div className="input-add">
                <label htmlFor="chucvu" className="input-label font-bold width-180px">Chọn bộ phận: </label>
                <select
                  className = "input-select"
                  id="chucvu"
                  value={datatbp}
                  onChange={(e) => {
                    setdatatbp(e.target.value);
                  }}
                >
                  <option value='default'>Chọn bộ phận</option>
                  {idBoPhan.map((item, index) => (
                    <option value={item._id.tenBoPhan}>{item.tenBoPhan}</option>
                  ))}
                </select>    
              </div>

              <div className="input-add">
                <label htmlFor="chucvu" className="input-label font-bold width-180px">Nhân viên xử lí:</label>
                <select
                  className = "input-select"
                  id="chucvu"
                  value={datattbp}
                  onChange={(e) => {
                    setdatattbp(e.target.value);
                  }}
                >
                  <option value='default'>Trưởng bộ phận </option>
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
                <label htmlFor="chucvu" className="input-label font-bold width-180px">Nội dung công việc:</label>
                <input
                  type="text"
                  value={ndcv}
                  onChange={(e) => {
                    setndcv(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleXacNhan}>
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

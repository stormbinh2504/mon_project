import React, { Suspense, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

import AvatarUser from '../../../assets/icons/user-circle-regular.svg';
import QLNVapi from '../../../config/api/QLNVapi';
import QLBPapi from '../../../config/api/QLBPapi';
import QLCVapi from '../../../config/api/QLCVapi';

export default function ModalShowEmployee(props) {
  const [show, setShow] = useState(false);
  const [mnv, setmnv] = useState(props.maNhanVien);
  const [tnv, settnv] = useState(props.tenNhanVien);
  const [mbp, setmbp] = useState([]);
  const [mcv, setmcv] = useState([]);

  const [lnv, setlnv] = useState(props.loaiNhanVien);
  const [gioitinh, setgioitinh] = useState(props.gioiTinh);
  const [sdt, setsdt] = useState(props.soDienThoai);
  const [email, setemail] = useState(props.email);

  const [data, setdata] = useState(props.tenBoPhan); //mbp
  const [data2, setdata2] = useState(props.tenChucVu); //mcv
  


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    useEffect(() => {
    const fetchMBP = async () => {
        const response = await QLBPapi.getAll();
        setmbp(response);
    };
    fetchMBP();
    props.updatedata();
  }, []);

  useEffect(() => {
    const fetchMVC = async (props) => {
        const response = await QLCVapi.getAll();
        setmcv(response);
    };
    fetchMVC();
    props.updatedata();
  }, []);


  return (
    <>
      <Link to="/quantri/quanlynhanvien" onClick={handleShow}>
        Chi tiết
      </Link>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton >
          <Modal.Title>Thông tin nhân viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className = "content-add">
                <div className = "modal1">
                    <div className="input-add">
                        <label for="msv" className="input-label font-bold">Mã nhân viên:</label>
                        <label for="msv" className="input-select">{mnv}</label>
                    </div>
                    <div className="input-add">
                        <label for="tennv" className="input-label font-bold" >Tên nhân viên:</label>
                        <label for="msv" className="input-select">{tnv}</label>
                    </div>
              <div className="input-add">
                <label htmlFor="bophan" className="input-label font-bold">Bộ phận:</label>
                <label for="mbp" className="input-select">{data}</label>
              </div>
              <div className="input-add">
                <label htmlFor="chucvu" className="input-label font-bold">Chức vụ:</label>
                <label for="mcv" className="input-select">{data2}</label>
              </div>

              <div className="input-add">
                <label htmlFor="loainhanvien" className="input-label font-bold">Loại nhân viên:</label>
                <label for="mcv" className="input-select">{lnv}</label>   
              </div>
              <div className="input-add">
                  <label htmlFor="gioitinh" className="input-label font-bold">Giới tính:</label>
                  <label for="mcv" className="input-select">{gioitinh}</label>
              </div>
              <div className="input-add" >
                <label htmlFor="sdt" className="input-label font-bold">Số điện thoại:</label>
                <label for="mcv" className="input-select">{sdt}</label>
              <div className="input-add" >
                <label htmlFor="email" className="input-label font-bold">Email:</label>
                <label for="mcv" className="input-select">{email}</label>
              </div>
              </div>
            </div>
                <div className="img-user">
                        <img src={AvatarUser} alt="" />
                </div>
            </div>  
        </Modal.Body>
        <Modal.Footer> 
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import AvatarUser from '../../assets/icons/user-circle-regular.svg';
import QLNVapi from '../../config/api/QLNVapi';

export default function ModalEditEmployee(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteEmp = async () =>{
    //call api
    const res = await QLNVapi.delete(props.id);
    // xóa id ở trong mảng
    props.deleteemp(props.index);
    setShow(false);
  }

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Sửa
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa nhân viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className = "content-add">
                <div className = "modal1">
                    <div className="input-add">
                        <label for="msv">Mã nhân viên</label>
                        <input type="text" value={props.maNhanVien}></input>
                    </div>
                    <div className="input-add">
                        <label for="tennv" >Tên nhân viên</label>
                        <input type="text" value={props.tenNhanVien} />
                    </div>
                    <div className="input-add">
                        <label for="bophan">Bộ phần</label>
                        <select id="bophan">
                            <option value={props.tenBoPhan}>{props.tenBoPhan}</option>
                        </select>
                    </div>
                    <div className="input-add">
                        <label for="chucvu">Chức Vụ</label>
                        <select id="chucvu">
                            <option value="nhanvien">Nhân viên</option>
                            <option value="giangvien">Giảng Viên</option>
                        </select>
                    </div>
                </div>
                <div className="img-user">
                        <img src={AvatarUser} alt="" />
                </div>
            </div>  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteEmp}>
            Xóa
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AvatarUser from '../../assets/icons/user-circle-regular.svg';
import QLNVapi from '../../config/api/QLNVapi';

export default function ModalAddEmployee() {
  const [show, setShow] = useState(false);
  const [mnv, setmnv] = useState('');
  const [tnv, settnv] = useState('');
  const [mbp, setmbp] = useState("");
  const [mcv, setmcv] = useState("");

    const addEMP = async () => {
      //call api
      const res = await QLNVapi.post({
        "maNhanVien": mnv,
        "tenNhanVien": tnv,
        "BoPhanId": mbp,
        "ChucVuId": mcv,
      });

      handleClose(false);
      // props.updatedata();
    }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Thêm nhân viên
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm nhân viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className = "content-add">
                <div className = "modal1">
                    <div className="input-add">
                        <label htmlFor="msv">Mã nhân viên</label>
                        <input type="text" value ={mnv} onChange={(e)=>{setmnv(e.target.value)}} />
                    </div>
                    <div className="input-add">
                        <label htmlFor="tennv">Tên nhân viên</label>
                        <input type="text" value ={tnv} onChange={(e)=>{settnv(e.target.value)}}/>
                    </div>

                    <div className="input-add">
                        <label htmlFor="bophan">Bộ phần</label>
                        <select id="bophan">
                            <option value={mbp}>Khoa Toán Tin</option>
                            <option value={mbp}>Khoa Kinh tế</option>
                        </select>
                    </div>
                    <div className="input-add">
                        <label htmlFor="chucvu">Chức Vụ</label>
                        <select id="chucvu">
                            <option value={mcv}>Nhân viên</option>
                            <option value={mcv}>Giảng Viên</option>
                        </select>
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
          <Button variant="primary" onClick={addEMP}>
            Thêm nhân viên
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

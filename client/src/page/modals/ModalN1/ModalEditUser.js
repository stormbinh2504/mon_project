import React, { Suspense, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import AvatarUser from '../../../assets/icons/user-circle-regular.svg';
import QLNVapi from '../../../config/api/QLNVapi';
import QLNQapi from '../../../config/api/QLNQapi';
import QLNDapi from '../../../config/api/QLNDapi';

export default function ModalEditUser(props) {
  const [show, setShow] = useState(false);

  const [mnv, setmnv] = useState([]);
  const [tnv, settnv] = useState([]);
  const [tnq, settnq] = useState([]);

  const [username, setusername] = useState(props.userName);
  const [password, setpassword] = useState(props.password);

  const [data, setdata] = useState(props.maNhanVien); //mnv
  const [data2, setdata2] = useState(props.tenNhanVien); //mnv
  const [data3, setdata3] = useState(props.tenNhomQuyen); //tnq
  
  // const [defaultmpb, setdefaultmpb] = useState('');
  // const[defaultmcd, setdefaultmcd] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    useEffect(() => {
    const fetchMNV = async () => {
        const response = await QLNVapi.getAll();
        setmnv(response);
    };
    fetchMNV();
  }, []);

    useEffect(() => {
    const fetchMNV = async () => {
        const response = await QLNVapi.getAll();
        settnv(response);
    };
    fetchMNV();
  }, []);

  useEffect(() => {
    const fetchMNQ = async (props) => {
        const response = await QLNQapi.getAll();
        settnq(response);
    };
    fetchMNQ();
  }, []);

  const deleteEmp = async () =>{
    //call api
    const res = await QLNDapi.delete(props.id);
    // xóa id ở trong mảng
    props.deleteemp(props.index);
    setShow(false);
    // handleCloseModalDelete();
  };

  const updateEmp = async () => {
    const res = await QLNDapi.put(props.id, {
       "userName": username,
       "password": password,
       "nhanVienId": data,
       "nhomQuyenId": data3,
    });

    props.deleteemp(props.index);
    setShow(false);
    props.updatedata();
  }

  const handleShowModalDelete = () => {
    document.getElementById("modal-delete-emp-id").style.display = "block";
  }

  const handleCloseModalDelete = () => {
    document.getElementById("modal-delete-emp-id").style.display = "none";
  }

  return (
    <>
      {/* <div className="modal-delete-emp" id="modal-delete-emp-id">
      <div className="content-modal-delete-emp">
          <div className="content-modal-delete-emp-top">
              Warning
          </div>
          <div className="content-modal-delete-emp-main">
              Bạn có muốn xóa nhân viên
          </div>
          <div class="content-modal-delete-emp-bot">
              <button onClick={deleteEmp} className="width-50-tram ">Có</button>
              <button onClick={handleCloseModalDelete} className="width-50-tram">Không</button>         
          </div>
      </div>
    </div> */}
      <Button variant="warning" onClick={handleShow}>
        Sửa
      </Button>
      <Button variant="danger" onClick={deleteEmp}>
            Xóa
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton >
          <Modal.Title>Sửa nhân viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className = "content-add">
                <div className = "modal1">
{/* Mã nhân viên */}
                <div className="input-add">
                <label htmlFor="bophan" className="input-label font-bold">Mã nhân viên</label>
                <select
                  className = "input-select"
                  id="manhanvien"
                  name="manhanvien"
                  value={data}
                  onChange={(e) => {
                    setdata(e.target.value);
                  }}
                >
                {/* <option value={data}>{data}</option> */}
                  {mnv.map((item, index) => (
                    <option  value={item._id}>{item.maNhanVien}</option>
                  ))}
                </select>
              </div>
{/* Tên nhân viên */}
                <div className="input-add">
                <label htmlFor="chucvu" className="input-label font-bold">Tên nhân viên</label>
                <select
                className = "input-select"
                  id="tennhanvien"
                  name = "tennhanvien"
                  value={data2}
                  onChange={(e) => {
                    setdata2(e.target.value);
                  }}
                >
                  {/* <option value={data2}>{data2}</option> */}
                  {tnv.map((item, index) => (
                    <option  value={item._id}>{item.tenNhanVien}</option>
                  ))}
                </select>
                </div>
{/* Tên nhóm quyền */}
                <div className="input-add">
                <label htmlFor="chucvu" className="input-label font-bold">Tên nhóm quyền</label>
                <select
                className = "input-select"
                  id="tennhomquyen"
                  name = "tennhomquyen"
                  value={data3}
                  onChange={(e) => {
                    setdata3(e.target.value);
                  }}
                >
                  {/* <option value={data3}>{data3}</option> */}
                  {tnq.map((item, index) => (
                    <option  value={item._id}>{item.tenNhomQuyen}</option>
                  ))}
                </select>

                </div>
                  <div className="input-add">
                      <label for="msv" className="input-label font-bold">username:</label>
                      <input type="text" value={username} onChange={(e) =>{setusername(e.target.value)}}></input>
                  </div>
                  <div className="input-add">
                      <label for="tennv" className="input-label font-bold" >password:</label>
                      <input type="text" value={password} onChange={(e) => {setpassword(e.target.value)}}/>
                  </div>
              </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={updateEmp}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

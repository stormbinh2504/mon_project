import React, { Suspense, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AvatarUser from "../../../assets/icons/user-circle-regular.svg";
import QLNVapi from '../../../config/api/QLNVapi';
import QLNQapi from '../../../config/api/QLNQapi';
import QLNDapi from '../../../config/api/QLNDapi';

export default function ModalAddUser(props) {
  const [show, setShow] = useState(false);

  const [mnv, setmnv] = useState([]);
  const [tnv, settnv] = useState([]);
  const [tnq, settnq] = useState([]);

  console.log(mnv);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  // const [data, setdata] = useState(props.maNhanVien); //mnv
  const [data2, setdata2] = useState(props.tenNhanVien); //mnv
  const [data3, setdata3] = useState(props.tenNhomQuyen); //tnq

  useEffect(() => {
    const fetchMBP = async () => {
        const response = await QLNVapi.getAll();
        setmnv(response);
    };
    fetchMBP();
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

  const addEMP = async () => {
    const res = await QLNDapi.post({
      "userName": username,
      "password": password,
      "nhanVienId": data2,
      "nhomQuyenId": data3,
    });
    handleClose(false);
    props.updatedata();
    setmnv("");
    // settnv("")
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Thêm người dùng
      </Button>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm người dùng</Modal.Title>
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
                  value={data2}
                  onChange={(e) => {
                    setdata2(e.target.value);
                  }}
                >
                {/* <option value={data}>{data}</option> */}
                <option value='default'>Chọn mã nhân viên</option>
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
                  <option value='default'>Chọn tên nhân viên</option>
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
                  <option value='default'>Chọn nhóm quyền</option>
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
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={addEMP}>
            Thêm người dùng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

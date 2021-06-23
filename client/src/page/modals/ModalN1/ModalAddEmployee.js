import React, { Suspense, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AvatarUser from "../../../assets/icons/user-circle-regular.svg";
import QLBPapi from "../../../config/api/QLBPapi";
import QLCDapi from "../../../config/api/QLCDapi";
import QLNVapi from "../../../config/api/QLNVapi";

export default function ModalAddEmployee(props) {
  const [show, setShow] = useState(false);
  const [mnv, setmnv] = useState("");
  const [tnv, settnv] = useState("");
  const [mbp, setmbp] = useState([]);
  const [mcd, setmcd] = useState([]);

  const [lnv, setlnv] = useState("");
  const [gioitinh, setgioitinh] = useState("");
  const [sdt, setsdt] = useState("");
  const [email, setemail] = useState("");
//lay du lieu 
  const [data,setdata] = useState(''); //mbp
  const [data2,setdata2] =useState(''); //mcd

  useEffect(() => {
    const fetchMBP = async () => {
        const response = await QLBPapi.getAll();
        setmbp(response);
    };
    fetchMBP();
  }, []);

  useEffect(() => {
    const fetchMVC = async (props) => {
        const response = await QLCDapi.getAll();
        setmcd(response);
    };
    fetchMVC();
  }, []);

  const addEMP = async () => {
    const res = await QLNVapi.post({
      "maNhanVien": mnv,
      "tenNhanVien": tnv,
      "boPhanId": data,
      "chucDanhId": data2,
      "loaiNhanVien": lnv,
      "gioiTinh": gioitinh,
      "soDienThoai": sdt,
      "gmail": email,
    });
    handleClose(false);
    props.updatedata();
    setmnv("");
    settnv("");
    setlnv("");
    setdata("");
    setdata2("");
    setgioitinh("");
    setsdt("");
    setemail("");
  };

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
          <div className="content-add">
            <div className="modal1">
              <div className="input-add">
                <label htmlFor="msv" className="input-label font-bold">Mã nhân viên:</label>
                <input
                  type="text"
                  value={mnv}
                  onChange={(e) => {
                    setmnv(e.target.value);
                  }}
                />
              </div>
              <div className="input-add" >
                <label htmlFor="tennv" className="input-label font-bold">Tên nhân viên:</label>
                <input
                  type="text"
                  value={tnv}
                  onChange={(e) => {
                    settnv(e.target.value);
                  }}
                />
              </div>

              <div className="input-add">
                <label htmlFor="bophan" className="input-label font-bold">Bộ phận:</label>
                <select
                  className = "input-select"
                  id="bophan"
                  name="bophan"
                  value={data}
                  onChange={(e) => {
                    setdata(e.target.value);
                  }}
                >
                <option value='default'>Chọn bộ phận</option>
                  {mbp.map((item, index) => (
                    <option value={item._id}>{item.tenBoPhan}</option>
                  ))}
                </select>
              </div>

              <div className="input-add">
                <label htmlFor="chucvu" className="input-label font-bold">Chức danh:</label>
                <select
                  className = "input-select"
                  id="chucvu"
                  value={data2}
                  onChange={(e) => {
                    setdata2(e.target.value);
                  }}
                >
                  <option value='default'>Chọn chức danh</option>
                  {mcd.map((item, index) => (
                    <option value={item._id}>{item.tenChucDanh}</option>
                  ))}
                </select>    
              </div>

            </div>

            < div className = "modal1" >
              <div className="input-add">
                <label htmlFor="loainhanvien" className="input-label font-bold">Loại nhân viên:</label>
                <select
                  className = "input-select"
                  id="loainhanvien"
                  value={lnv}
                  onChange={(e) => {
                    setlnv(e.target.value);
                  }}
                >
                  <option value='default'>Chọn loại nhân viên</option>
                  <option value='Nhân viên'>Nhân viên</option>
                  <option value='Cán bộ'>Cán bộ</option>             
                </select>    
              </div>

              <div className="input-add">
                  <label htmlFor="gioitinh" className="input-label font-bold">Giới tính:</label>
                  <input type="checkbox" value="Nam" onChange={(e) => {
                    setgioitinh(e.target.value);
                  }}></input>
                  <label htmlFor="gioitinh" className="input-ckeckbox">Nam</label>
                  <input type="checkbox" value="Nữ" onChange={(e) => {
                    setgioitinh(e.target.value);
                  }}></input>
                  <label htmlFor="gioitinh" className="input-ckeckbox">Nữ</label>
              </div>

              <div className="input-add" >
                <label htmlFor="sdt" className="input-label font-bold">Số điện thoại:</label>
                <input
                  type="text"
                  value={sdt}
                  onChange={(e) => {
                    setsdt(e.target.value);
                  }}
                />
              </div>

              <div className="input-add" >
                <label htmlFor="email" className="input-label font-bold">Email:</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
              </div>


            </div>




            {/* <div className="img-user">
              <img src={AvatarUser} alt="" />
            </div> */}
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

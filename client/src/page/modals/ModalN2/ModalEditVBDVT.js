import React, { Suspense, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import QLBPapi from "../../../config/api/QLBPapi";
import QLCDapi from "../../../config/api/QLCDapi";
import QLNVapi from "../../../config/api/QLNVapi";
import QLVBDCTapi from "../../../config/api/apiN2/QLVBDVTapi";

export default function ModalEditEmployee(props) {
  const [show, setShow] = useState(false);
  const [mnv, setmnv] = useState(props.maNhanVien);
  const [tnv, settnv] = useState(props.tenNhanVien);
  const [mbp, setmbp] = useState([]);
  const [mcd, setmcd] = useState([]);

  const [lnv, setlnv] = useState(props.loaiNhanVien);
  const [gioitinh, setgioitinh] = useState(props.gioiTinh);
  const [sdt, setsdt] = useState(props.soDienThoai);
  const [email, setemail] = useState(props.email);

  const [data, setdata] = useState(props.tenBoPhan); //mbp
  const [data2, setdata2] = useState(props.tenChucDanh); //mcd
  
  // const [defaultmpb, setdefaultmpb] = useState('');
  // const[defaultmcd, setdefaultmcd] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

  const deleteEmp = async () =>{
    //call api
    const res = await QLVBDCTapi.delete(props.id);
    // xóa id ở trong mảng
    props.deleteemp(props.index);
    setShow(false);
    // handleCloseModalDelete();
  };

  const updateEmp = async () => {
    const res = await QLNVapi.put(props.id, {
       "maNhanVien": mnv,
       "tenNhanVien": tnv,
       "boPhanId": data,
       "chucDanhId": data2,
        "loaiNhanVien": lnv,
        "gioiTinh": gioitinh,
        "soDienThoai": sdt,
        "gmail": email,
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
                    <div className="input-add">
                        <label for="msv" className="input-label font-bold">Mã nhân viên:</label>
                        <input type="text" value={mnv} onChange={(e) =>{setmnv(e.target.value)}}></input>
                    </div>
                    <div className="input-add">
                        <label for="tennv" className="input-label font-bold" >Tên nhân viên:</label>
                        <input type="text" value={tnv} onChange={(e) => {settnv(e.target.value)}}/>
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
                {/* <option value={data}>{data}</option> */}
                  {mbp.map((item, index) => (
                    <option  value={item._id}>{item.tenBoPhan}</option>
                  ))}
                </select>
              </div>

              <div className="input-add">
                <label htmlFor="chucvu" className="input-label font-bold">Chức danh:</label>
                <select
                className = "input-select"
                  id="chucdanh"
                  name = "chucdanh"
                  value={data2}
                  onChange={(e) => {
                    setdata2(e.target.value);
                  }}
                >
                  {/* <option value={data2}>{data2}</option> */}
                  {mcd.map((item, index) => (
                    <option  value={item._id}>{item.tenChucDanh}</option>
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
          
          <Button variant="primary" onClick={updateEmp}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

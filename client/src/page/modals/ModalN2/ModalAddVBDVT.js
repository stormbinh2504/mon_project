import React, { Suspense, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AvatarUser from "../../../assets/icons/user-circle-regular.svg";
import QLBPapi from "../../../config/api/QLBPapi";

import QLNVapi from "../../../config/api/QLNVapi";
import QLVBDVTapi from "../../../config/api/apiN2/QLVBDVTapi";
import QLCQBHapi from "../../../config/api/apiN2/QLCQBHapi";
import QLLVBapi from "../../../config/api/apiN2/QLLVBapi";
import { set } from "date-fns/esm";


export default function ModalAddVBDVT(props) {
  const [show, setShow] = useState(false);

  const [tvb, settvb] = useState("");
  const [skh, setskh] = useState("");
  const [trangthai, setrangthai] = useState("Chưa xử lí");
  const [taiLieu, settaiLieu] = useState();
  const [trangThaiLanhDao, settrangThaiLanhDao] = useState("Chưa xử lí");
  

  const [mbp, setmbp] = useState([]);
  const [mcq, setmcq] = useState([]);
  const [mnv, setmnv] = useState([]);
  const [lvb, setlvb] = useState([]);

//lay du lieu 
  const [datatbp,setdatatbp] = useState('60b98c0f93b8f9145c32c014'); //mbp
  const [datatcq,setdatatcq] =useState(''); //mcq
  const [datatnv,setdatatnv] =useState(''); //mnv
  const [datalvb,setdatalvb] =useState(''); //lvb

//Tìm lãnh đạo

const [searchNVLD, setSearchNVLD] = useState("Lãnh Đạo");
const [filterNVLD, setfilterNVLD] = useState([]);
const [nhanvienId, setnhanvienId] = useState([]);
    useEffect(() => {
    const fetchCDList = async () => {
        try {          
            const response = await QLNVapi.getAll();
            setnhanvienId(response);
        } catch (error) {
            console.log('Failed to fetch product list: ', error);
        }
    }
    fetchCDList();
    },[])

    useEffect(() => {
      setfilterNVLD(
        nhanvienId.filter((country) =>
          country.chucDanhId.tenChucDanh.toLowerCase().includes(searchNVLD.toLowerCase())
        )
      );
    }, [nhanvienId, searchNVLD]);

//

  useEffect(() => {
    const fetchMBP = async () => {
        const response = await QLBPapi.getAll();
        setmbp(response);
    };
    fetchMBP();
  }, []);

  useEffect(() => {
    const fetchMVC = async (props) => {
        const response = await QLCQBHapi.getAll();
        setmcq(response);
    };
    fetchMVC();
  }, []);

  useEffect(() => {
    const fetchMVC = async (props) => {
        const response = await QLNVapi.getAll();
        setmnv(response);
    };
    fetchMVC();
  }, []);

  useEffect(() => {
    const fetchMVC = async (props) => {
        const response = await QLLVBapi.getAll();
        setlvb(response);
    };
    fetchMVC();
  }, []);


  const addVBD = async () => {
    const res = await QLVBDVTapi.post({
      "tenVanBan": tvb,
      "soKyHieu": skh,
      "trangThai": trangthai,
      "trangThaiLanhDao": trangThaiLanhDao,
      "taiLieu": taiLieu.name,
      "baoCaoLanhDao": " ",
      "boPhanId": datatbp,
      "coQuanBanNganhId": datatcq,
      "nhanVienId": datatnv,
      "loaiVanBanId": datalvb,
    });
    handleClose(false);
    props.updatedata();
  };

  const nextVBD = async () => {
    const res = await QLVBDVTapi.post({
      "tenVanBan": tvb,
      "soKyHieu": skh,
      "trangThai": "Đã xử lí",
      "trangThaiLanhDao": trangThaiLanhDao,
      "taiLieu": taiLieu.name,
      "baoCaoLanhDao": " ",
      "boPhanId": datatbp,
      "coQuanBanNganhId": datatcq,
      "nhanVienId": datatnv,
      "loaiVanBanId": datalvb,
    });
    handleClose(false);
    props.updatedata();
    settvb("");
    setskh("");
    setdatatcq("")
    setdatalvb("")
    setdatatnv("")
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Thêm văn bản 
      </Button>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm văn bản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-add">
            <div className="modal1">
              <div className="input-add">
                <label htmlFor="msv" className="input-label font-bold width-180px">Tên văn bản: </label>
                <input
                  type="text"
                  value={tvb}
                  onChange={(e) => {
                    settvb(e.target.value);
                  }}
                />
              </div>

              <div className="input-add" >
                <label htmlFor="tennv" className="input-label font-bold width-180px">Số ký hiệu: </label>
                <input
                  type="text"
                  value={skh}
                  onChange={(e) => {
                    setskh(e.target.value);
                  }}
                />
              </div>

              <div className="input-add">
                <label htmlFor="bophan" className="input-label font-bold width-180px">Loại văn bản:</label>
                <select
                  className = "input-select"
                  id="bophan"
                  name="bophan"
                  value={datalvb}
                  onChange={(e) => {
                    setdatalvb(e.target.value);
                  }}
                >
                <option value=''>Chọn loại văn bản</option>
                  {lvb.map((item, index) => (
                    <option value={item._id}>{item.loaiVanBan}</option>
                  ))}
                </select>
              </div>

              <div className="input-add">
                <label htmlFor="chucvu" className="input-label font-bold width-180px">Cơ quan ban hành: </label>
                <select
                  className = "input-select"
                  id="chucvu"
                  value={datatcq}
                  onChange={(e) => {
                    setdatatcq(e.target.value);
                  }}
                >
                  <option value=''>Chọn tên cơ quan ban hành</option>
                  {mcq.map((item, index) => (
                    <option value={item._id}>{item.tenCoQuan}</option>
                  ))}
                </select>    
              </div>

              <div className="input-add">
                <label htmlFor="chucvu" className="input-label font-bold width-180px">Lãnh đạo phê duyệt</label>
                <select
                  className = "input-select"
                  id="chucvu"
                  value={datatnv}
                  onChange={(e) => {
                    setdatatnv(e.target.value);
                  }}
                >
                  <option value=''>Lãnh đạo phê duyệt </option>
                  {filterNVLD.map((item, index) => (
                    <option value={item._id}>{item.tenNhanVien}</option>
                  ))}
                </select>    
              </div>

              <div className="input-add">
                <input type="file" onChange={(e) => {settaiLieu(e.target.files[0])}} />  
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={addVBD}>
            Thêm văn bản
          </Button>
          <Button variant="success" onClick={nextVBD}>
            Chuyển tiếp văn bản
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

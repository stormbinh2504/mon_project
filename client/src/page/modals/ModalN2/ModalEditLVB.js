import React, { Suspense, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QLLVBapi from '../../../config/api/apiN2/QLLVBapi';
import { Form, FormControl } from 'react-bootstrap';

export default function ModalEditLVB(props) {
  const [show, setShow] = useState(false);

  const [mlvb, setmlvb] = useState(props.maLoaiVanBan);
  const [lvb, setlvb] = useState(props.loaiVanBan);

  const [mabp, setmabp] = useState([]);

    useEffect(() => {
    const fetchmlvb = async () => {
      const response = await QLLVBapi.getAll();
      setmabp(response);
    };
    fetchmlvb();
  }, []);

  const deleteDep = async () => {
    const res = await QLLVBapi.delete(props.id);
    props.deletedep(props.id);
    setShow(false);
    // handleCloseModalDelete();
    console.log(props.id);
  }
  
  const updateDep = async ()=>{
      const res = await QLLVBapi.put(props.id, {
        "maLoaiVanBan": mlvb,
        "loaiVanBan": lvb,
      });

      props.deletedep(props.index);
      setShow(false);
      props.updatedata();
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
              Bạn có muốn xóa nhân viên {mlvb} + {lvb}
          </div>
          <div class="content-modal-delete-emp-bot">
              <button onClick={deleteDep} className="width-50-tram ">Có</button>
              <button onClick={handleCloseModalDelete} className="width-50-tram">Không</button>         
          </div>
      </div>
    </div> */}
      <Button variant="warning" onClick={handleShow}>
        Sửa
      </Button>
      <Button variant="danger" onClick={deleteDep}>
            Xóa
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa bộ phận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className = "content-add">
                <div className = "modal1">
                    <div className="input-add">
                        <label htmlFor="msv" className="input-label font-bold">Mã bộ phận:</label>
                        <input type="text" value ={mlvb} onChange={(e)=>{setmlvb(e.target.value)}}/>
                    </div>
                    <div className="input-add">
                        <label htmlFor="tennv" className="input-label font-bold">Tên bộ phận:</label>
                        <input type="text" value ={lvb} onChange={(e)=>{setlvb(e.target.value)}}/>
                    </div>
                </div>
            </div>  
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={updateDep}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

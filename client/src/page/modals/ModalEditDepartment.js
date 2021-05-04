import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QLBPapi from '../../config/api/QLBPapi';

export default function ModalEditDepartment(props) {
  const [show, setShow] = useState(false);
  const [mbp, setmbp] = useState(props.maBoPhan);
  const [tbp, settbp] = useState(props.tenBoPhan);

  const deleteDep = async () => {
    const res = await QLBPapi.delete(props.id);

    props.deletedep(props.index);
    setShow(false);
  }
  const updateDep = async ()=>{
      const res = await QLBPapi.put(props.id,{
        "maBoPhan": mbp,
        "tenBoPhan": tbp,
      });

      props.deletedep(props.index);
      setShow(false);
  }


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                        <label htmlFor="msv">Mã bộ phận</label>
                        <input type="text" value ={mbp} onChange={(e)=>{setmbp(e.target.value)}}/>
                    </div>
                    <div className="input-add">
                        <label htmlFor="tennv">Tên bộ phận</label>
                        <input type="text" value ={tbp} onChange={(e)=>{settbp(e.target.value)}}/>
                    </div>
                </div>
            </div>  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteDep}>
            Xóa
          </Button>
          <Button variant="primary" onClick={updateDep}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

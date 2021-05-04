import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QLBPapi from '../../config/api/QLBPapi';

export default function ModalAddDepartment(props) {
  const [show, setShow] = useState(false);
  const [mbp,setmbp]=useState('');
  const [tbp,settbp]=useState('')
  const addDep = async () => {
    //call api
    const res = await QLBPapi.post(
      {
        "maBoPhan": mbp,
        "tenBoPhan": tbp
      }
    );
      setmbp('');
      settbp('');
    handleClose(false);
    props.updatedata();
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Thêm bộ phận
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm bộ phận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className = "content-add">
                <div className = "modal1">
                    <div className="input-add">
                        <label htmlFor="msv">Mã bộ phân</label>
                        <input type="text" value ={mbp} onChange={(e)=>{setmbp(e.target.value)}}/>
                    </div>
                    <div className="input-add">
                        <label htmlFor="tennv">Tên bộ phận</label>
                        <input type="text" value={tbp} onChange={(e)=>{settbp(e.target.value)}}/>
                    </div>
            </div>  
            </div>  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={addDep}>
            Thêm bộ phận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

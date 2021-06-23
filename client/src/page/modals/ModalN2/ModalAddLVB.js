import React, { Suspense, useEffect, useState } from "react";
import { Form, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QLLVBapi from '../../../config/api/apiN2/QLLVBapi';

export default function ModalAddLVB(props) {
  const [show, setShow] = useState(false);
  const [mlvb,setmlvb]= useState('');
  const [lvb,setlvb]= useState('');

  const [mabp, setmabp] = useState([]);
  const [data, setdata] = useState(''); //mlvb

     useEffect(() => {
       const fetchmlvb = async () => {
         const response = await QLLVBapi.getAll();
         setmabp(response);
       };
       fetchmlvb();
     }, []);

  const addDep = async () => {
    //call api
    const res = await QLLVBapi.post(
      {
        "maLoaiVanBan": mlvb,
        "loaiVanBan": lvb,
      }
    );
      setmlvb('');
      setlvb('');
    handleClose(false);
    props.updatedata();
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Thêm loại văn bản
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm loại văn bản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className = "content-add">
                <div className = "modal1">
                    <div className="input-add">
                        <label htmlFor="msv" className="input-label font-bold">Mã loại văn bản:</label>
                        <input type="text" value ={mlvb} onChange={(e)=>{setmlvb(e.target.value)}}/>
                    </div>
                    <div className="input-add">
                        <label htmlFor="tennv" className="input-label font-bold">Loại văn bản:</label>
                        <input type="text" value={lvb} onChange={(e)=>{setlvb(e.target.value)}}/>
                    </div>
               </div>  
            </div>  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={addDep}>
            Thêm loại văn bản
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

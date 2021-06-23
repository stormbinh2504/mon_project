import React, { Suspense, useEffect, useState } from "react";
import { Form, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QLCQBHapi from '../../../config/api/apiN2/QLCQBHapi';

export default function ModalAddCQBH(props) {
  const [show, setShow] = useState(false);
  const [mcq,setmcq]=useState('');
  const [tcq,settcq]=useState('');

  const [mabp, setmabp] = useState([]);
  const [data, setdata] = useState(''); //mcq

     useEffect(() => {
       const fetchmcq = async () => {
         const response = await QLCQBHapi.getAll();
         setmabp(response);
       };
       fetchmcq();
     }, []);

  const addDep = async () => {
    //call api
    const res = await QLCQBHapi.post(
      {
        "maCoQuan": mcq,
        "tenCoQuan": tcq,
      }
    );
      setmcq('');
      settcq('');
    handleClose(false);
    props.updatedata();
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Thêm cơ quan
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm cơ quan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className = "content-add">
                <div className = "modal1">
                    <div className="input-add">
                        <label htmlFor="msv" className="input-label font-bold">Mã cơ quan:</label>
                        <input type="text" value ={mcq} onChange={(e)=>{setmcq(e.target.value)}}/>
                    </div>
                    <div className="input-add">
                        <label htmlFor="tennv" className="input-label font-bold">Tên cơ quan:</label>
                        <input type="text" value={tcq} onChange={(e)=>{settcq(e.target.value)}}/>
                    </div>
               </div>  
            </div>  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={addDep}>
            Thêm cơ quan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

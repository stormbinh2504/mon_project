import React, { Suspense, useEffect, useState } from "react";
import { Form, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QLNQapi from "../../../config/api/QLNQapi";

export default function ModalAddRole(props) {
  const [show, setShow] = useState(false);
  const [mnq,setmnq]=useState('');
  const [tnq,settnq]=useState('');
  const [mota,setmota]=useState('');

  const [mabp, setmabp] = useState([]);
  const [data, setdata] = useState(''); //mnq

     useEffect(() => {
       const fetchmnq = async () => {
         const response = await QLNQapi.getAll();
         setmabp(response);
       };
       fetchmnq();
     }, []);

  const addDep = async () => {
    //call api
    const res = await QLNQapi.post(
      {
        "maNhomQuyen": mnq,
        "tenNhomQuyen": tnq,
        "cacChucNang":mota,
      }
    );
      setmnq('');
      settnq('');
      setmota('');
    handleClose(false);
    props.updatedata();
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Thêm nhóm quyền
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm nhóm quyền</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className = "content-add">
                <div className = "modal1">
                    <div className="input-add">
                        <label htmlFor="msv" className="input-label font-bold">Mã nhóm quyền:</label>
                        <input type="text" value ={mnq} onChange={(e)=>{setmnq(e.target.value)}}/>
                    </div>
                    <div className="input-add">
                        <label htmlFor="tennv" className="input-label font-bold">Tên nhóm quyền:</label>
                        <input type="text" value={tnq} onChange={(e)=>{settnq(e.target.value)}}/>
                    </div>

                  <div className = "input-add">
                      <label htmlFor="bophan" className="input-label font-bold">Các chức năng: </label>
                      <Form.Control as="textarea" rows={3} style={{width:"125%"}}
                      value={mota} onChange={(e) => {setmota(e.target.value)}}
                      />
                  </div>
                  
               </div>  
            </div>  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={addDep}>
            Thêm nhóm quyền
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

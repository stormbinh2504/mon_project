import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {
  Form
} from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';
import QLBPapi from '../../config/api/QLBPapi';

export default function ModalAddDepartmentTest(props) {
  const [show, setShow] = useState(false);

  const [mabophan, setmabophan] = useState("")
  const [tenbophan, settenbophan] = useState("")
  
  const addDep = async () => {
    //call api
    const res = await QLBPapi.post(
      {
        "maBoPhan": "BP-04",
        "tenBoPhan": "Khoa Ngoại Ngữ"
      }
    );

    handleClose(false);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function submitQLPB(event) {
      // console.log("mabophan",mabophan);
      alert(mabophan);
      event.preventDefault();
  }

 function QLBPChange(event)
  {
    setmabophan(
      event.target.value, 
    )
  }

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
            <Form onSubmit={submitQLPB}>
              <Form.Group controlId="formGroupMabophan">
                <Form.Label>Mã bộ phân</Form.Label>
                <Form.Control required
                 type="text" placeholder="Mã bộ phận" name ="mabophan"  onChange={QLBPChange}
                  value = {mabophan}
                 />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Tên bộ phận</Form.Label>
                <Form.Control type="text" placeholder="Tên bộ phận" name ="tenbophan"/>
              </Form.Group>
          </Form> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" type="submit" > 
            Thêm bộ phận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

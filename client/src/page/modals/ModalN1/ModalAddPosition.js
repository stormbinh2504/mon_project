import React, { Suspense, useEffect, useState } from "react";
import { Form, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QLCDapi from '../../../config/api/QLCDapi';

export default function ModalAddPosition(props) {
  const [show, setShow] = useState(false);
  const [mcd, setmcd] = useState("");
  const [tcd, settcd] = useState("");
  const [mota, setmota] = useState("");

  const [mabp, setmabp] = useState([]);
  const [data, setdata] = useState(""); //mcd

  useEffect(() => {
    const fetchmcd = async () => {
      const response = await QLCDapi.getAll();
      setmabp(response);
    };
    fetchmcd();
  }, []);

  const addDep = async () => {
    //call api
    const res = await QLCDapi.post({
      maChucDanh: mcd,
      tenChucDanh: tcd,
      moTa: mota,
    });
    setmcd("");
    settcd("");
    setmota("");
    handleClose(false);
    props.updatedata();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Thêm chức danh
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm chức danh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-add">
            <div className="modal1">
              <div className="input-add">
                <label htmlFor="msv" className="input-label font-bold">
                  Mã chức danh:
                </label>
                <input
                  type="text"
                  value={mcd}
                  onChange={(e) => {
                    setmcd(e.target.value);
                  }}
                />
              </div>
              <div className="input-add">
                <label htmlFor="tennv" className="input-label font-bold">
                  Tên chức danh:
                </label>
                <input
                  type="text"
                  value={tcd}
                  onChange={(e) => {
                    settcd(e.target.value);
                  }}
                />
              </div>

              <div className="input-add">
                <label htmlFor="chucdanh" className="input-label font-bold">
                  Mô tả:
                </label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  style={{ width: "125%" }}
                  value={mota}
                  onChange={(e) => {
                    setmota(e.target.value);
                  }}
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
            Thêm chức danh
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

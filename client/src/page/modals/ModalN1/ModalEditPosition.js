import React, { Suspense, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QLCDapi from '../../../config/api/QLCDapi';
import { Form, FormControl } from 'react-bootstrap';

export default function ModalEditPosition(props) {
  const [show, setShow] = useState(false);
  const [mcd, setmcd] = useState(props.maChucDanh);
  const [tcd, settcd] = useState(props.tenChucDanh);
  const [mota, setmota] = useState(props.moTa);

  const [mabp, setmabp] = useState([]);
  const [data, setdata] = useState(props.tenChucDanh); //mcd

  useEffect(() => {
    const fetchmcd = async () => {
      const response = await QLCDapi.getAll();
      setmabp(response);
    };
    fetchmcd();
  }, []);

  const deleteDep = async () => {
    const res = await QLCDapi.delete(props.id);
    props.deletedep(props.id);
    setShow(false);
    console.log(props.id);
  };

  const updateDep = async () => {
    const res = await QLCDapi.put(props.id, {
      maChucDanh: mcd,
      tenChucDanh: tcd,
      moTa: mota,
    });

    props.deletedep(props.index);
    setShow(false);
    props.updatedata();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowModalDelete = () => {
    document.getElementById("modal-delete-emp-id").style.display = "block";
  };

  const handleCloseModalDelete = () => {
    document.getElementById("modal-delete-emp-id").style.display = "none";
  };

  return (
    <>
      {/* <div className="modal-delete-emp" id="modal-delete-emp-id">
      <div className="content-modal-delete-emp">
          <div className="content-modal-delete-emp-top">
              Warning
          </div>
          <div className="content-modal-delete-emp-main">
              Bạn có muốn xóa nhân viên {mcd} + {tcd}
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
          <Button variant="primary" onClick={updateDep}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

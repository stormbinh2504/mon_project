import React, { Suspense, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QLNQapi from "../../../config/api/QLNQapi";
import { Form, FormControl } from 'react-bootstrap';

export default function ModalEditRole(props) {
  const [show, setShow] = useState(false);
  const [mnq, setmnq] = useState(props.maNhomQuyen);
  const [tnq, settnq] = useState(props.tenNhomQuyen);
  const [mota, setmota] = useState(props.cacChucNang);

  const [mabp, setmabp] = useState([]);
  // const [data, setdata] = useState(props.tenBoPhan); //mnq

  useEffect(() => {
    const fetchmnq = async () => {
      const response = await QLNQapi.getAll();
      setmabp(response);
    };
    fetchmnq();
  }, []);

  const deleteDep = async () => {
    const res = await QLNQapi.delete(props.id);
    props.deletedep(props.id);
    setShow(false);
    // handleCloseModalDelete();
    console.log(props.id);
  };

  const updateDep = async () => {
    const res = await QLNQapi.put(props.id, {
      maNhomQuyen: mnq,
      tenNhomQuyen: tnq,
      cacChucNang: mota,
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
              Bạn có muốn xóa nhân viên {mnq} + {tnq}
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
          <Modal.Title>Sửa nhóm quyền</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-add">
            <div className="modal1">
              <div className="input-add">
                <label htmlFor="msv" className="input-label font-bold">
                  Mã nhóm quyền:
                </label>
                <input
                  type="text"
                  value={mnq}
                  onChange={(e) => {
                    setmnq(e.target.value);
                  }}
                />
              </div>
              <div className="input-add">
                <label htmlFor="tennv" className="input-label font-bold">
                  Tên nhóm quyền:
                </label>
                <input
                  type="text"
                  value={tnq}
                  onChange={(e) => {
                    settnq(e.target.value);
                  }}
                />
              </div>

              {/* <div className="input-add">
                <label htmlFor="bophan" className="input-label font-bold">
                  Các chức năng
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
              </div> */}
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

import React, { Suspense, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QLBPapi from '../../../config/api/QLBPapi';
import { Form, FormControl } from 'react-bootstrap';

export default function ModalEditDepartment(props) {
  const [show, setShow] = useState(false);
  const [mbp, setmbp] = useState(props.maBoPhan);
  const [tbp, settbp] = useState(props.tenBoPhan);
  const [mota, setmota] = useState(props.moTa);

  const [mabp, setmabp] = useState([]);
  const [data, setdata] = useState(props.tenBoPhan); //mbp

    useEffect(() => {
    const fetchMBP = async () => {
      const response = await QLBPapi.getAll();
      setmabp(response);
    };
    fetchMBP();
  }, []);

  const deleteDep = async () => {
    const res = await QLBPapi.delete(props.id);
    props.deletedep(props.id);
    setShow(false);
    // handleCloseModalDelete();
    console.log(props.id);
  }
  
  const updateDep = async ()=>{
      const res = await QLBPapi.put(props.id,{
        "maBoPhan": mbp,
        "tenBoPhan": tbp,
        "moTa":mota,
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
              Bạn có muốn xóa nhân viên {mbp} + {tbp}
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
                        <input type="text" value ={mbp} onChange={(e)=>{setmbp(e.target.value)}}/>
                    </div>
                    <div className="input-add">
                        <label htmlFor="tennv" className="input-label font-bold">Tên bộ phận:</label>
                        <input type="text" value ={tbp} onChange={(e)=>{settbp(e.target.value)}}/>
                    </div>
                    <div className="input-add">
                      <label htmlFor="bophan" className="input-label font-bold">BP trực thuộc:</label>
                      <select
                        className = "input-select"
                        id="bophan"
                        name="bophan"
                        value={data}
                        onChange={(e) => {
                          setdata(e.target.value);
                        }}
                      >
                        {mabp.map((item, index) => (
                          <option value={item._id}>{item.tenBoPhan}</option>
                        ))}
                      </select>
                  </div>

                    < div className = "input-add" >
                      <label htmlFor="bophan" className="input-label font-bold">Mô tả:</label>
                      <Form.Control as="textarea" rows={3} style={{width:"125%"}}
                      value={mota} onChange={(e) => {setmota(e.target.value)}}
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

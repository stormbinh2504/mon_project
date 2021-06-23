import React, { Suspense, useEffect, useState } from "react";
import { Form, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QLBPapi from '../../../config/api/QLBPapi';

export default function ModalAddDepartment(props) {
  const [show, setShow] = useState(false);
  const [mbp,setmbp]=useState('');
  const [tbp,settbp]=useState('');
  const [mota,setmota]=useState('');

  const [mabp, setmabp] = useState([]);
  const [data, setdata] = useState(''); //mbp

     useEffect(() => {
       const fetchMBP = async () => {
         const response = await QLBPapi.getAll();
         setmabp(response);
       };
       fetchMBP();
     }, []);

  const addDep = async () => {
    //call api
    const res = await QLBPapi.post(
      {
        "maBoPhan": mbp,
        "tenBoPhan": tbp,
        "moTa":mota,
      }
    );
      setmbp('');
      settbp('');
      setmota('');
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
                        <label htmlFor="msv" className="input-label font-bold">Mã bộ phận:</label>
                        <input type="text" value ={mbp} onChange={(e)=>{setmbp(e.target.value)}}/>
                    </div>
                    <div className="input-add">
                        <label htmlFor="tennv" className="input-label font-bold">Tên bộ phận:</label>
                        <input type="text" value={tbp} onChange={(e)=>{settbp(e.target.value)}}/>
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
                      <option value='default'>Chọn bộ phận</option>
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

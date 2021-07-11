// import React, { Suspense, useEffect, useState } from "react";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { Link } from 'react-router-dom';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import AvatarUser from '../../../assets/icons/user-circle-regular.svg';

// import QLNVapi from "../../../config/api/QLNVapi";
// import QLBPapi from "../../../config/api/QLBPapi";
// import QLVBDCTapi from "../../../config/api/apiN2/QLVBDVTapi";
// import QLLVBapi from "../../../config/api/apiN2/QLLVBapi";
// import QLCVTPapi from "../../../config/api/apiN2/QLCVTPapi";
// import QLCVLDapi from "../../../config/api/apiN2/QLCVLDapi";

// export default function ModalShowVBDNV(props) {
//   const [show, setShow] = useState(false);
//   const [showxuli, setShowxuli] = useState(false);

//   const [rerent, setrerent] = useState(false);

//    const handleClose = () => {
//      setShow(false);
//      setShowxuli(true);
//    }
//    const handleShow = () => setShow(true);

//    const handleCloseXuLi = () => setShowxuli(false);
//    const handleShowXuli = () => setShowxuli(true);

//   const [thoiHan, setthoiHan] = useState(props.thoiHan); //mbp
//   const [noiDungCongViec, setnoiDungCongViec] = useState(props.noiDungCongViec);
//   const [trangThaiNhanVien, settrangThaiNhanVien] = useState(props.trangThaiNhanVien);
//   const [baoCaoNhanVien, setbaoCaoNhanVien] = useState(props.baoCaoNhanVien);
//   const [yKienTruongPhong, setyKienTruongPhong] = useState(props.yKienTruongPhong);

//   const [congViecLanhDaoId, setcongViecLanhDaoId] = useState(props.congViecLanhDaoId);
//   const [nhanVienId, setnhanVienId] = useState(props.nhanVienId);
//   const [boPhanId, setboPhanId] = useState(props.boPhanId);

//   // useEffect(() => {
//   //   const fetchMNV = async () => {
//   //     const response = await QLBPapi.getAll();
//   //     setidBoPhan(response);
//   //   };
//   //   fetchMNV();
//   // }, []);


//   // const nextVBD = async () => {
//   //   const res = await QLCVTPapi.put(props.id,{
//   //     "thoiHanXuLi": thoiHanXuLi,
//   //     "noiDungYeuCau": noiDungYeuCau,
//   //     "trangThaiTruongPhong": "Đã xử lí",
//   //     "trangThaiLanhDao": trangThaiLanhDao,
//   //     "yKienLanhDao": yKienLanhDao,
//   //     "baoCaoTruongPhong": baoCaoTruongPhong,
//   //     "nhanVienId": nhanVienId,
//   //     "boPhanId": boPhanId,
//   //     "vanBanDenId": vanBanDenId
//   //   });
//   //   handleClose(false);
//   //   props.updatedata();
//   // };

//   // const [thoiHan, setthoiHan] = useState(new Date())
//   // const [ndcv, setndcv] = useState("");
//   // const [idcvb, setidcvb] = useState("");

// // Công việc
//   const handleXacNhan = async () => {
//     const res = await QLCVTPapi.put(props.id,{
//       "thoiHan": thoiHan,
//       "noiDungCongViec": noiDungCongViec,
//       "trangThaiNhanVien": trangThaiNhanVien,
//       "baoCaoNhanVien": baoCaoNhanVien,
//       "yKienTruongPhong": yKienTruongPhong,
//       "nhanVienId": nhanVienId,
//       "boPhanId": boPhanId,
//       "congViecLanhDaoId": congViecLanhDaoId
//     });
//     handleClose(false);
//     props.updatedata();
//     handleCloseXuLi();
//   };


//   return (
//     <>
//       <Link to="/truongphong/quanlyvanbandentruongphong" onClick={handleShow}>
//         Xem thông tin
//       </Link>
//       <Modal show={show} onHide={()=>{setShow(false)}}>
//         <Modal.Header closeButton >
//           <Modal.Title>Thông tin văn bản</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//                 <div className = "content-add">
//                 <div className = "modal1">
//                     <div className="input-add">
//                         <label for="msv" className="input-label font-bold width-180px">Nội dung yêu cầu:</label>
//                         <label for="msv" className="input-select"></label>
//                     </div>
//                     {/* <div className="input-add">
//                         <label for="msv" className="input-label font-bold width-180px">Số ký hiệu:</label>
//                         <label for="msv" className="input-select">{vanBanDenId.soKyHieu}</label>
//                     </div>
//                     <div className="input-add">
//                         <label for="msv" className="input-label font-bold width-180px">Cán bộ xử lí:</label>
//                         <label for="msv" className="input-select">{nhanVienId.tenNhanVien}</label>
//                     </div>
//                     <div className="input-add">
//                         <label for="tennv" className="input-label font-bold width-180px" >Nội dung yêu cầu:</label>
//                         <label for="msv" className="input-select">{noiDungYeuCau}</label>
//                     </div>
//                     <div className="input-add">
//                         <label for="tennv" className="input-label font-bold width-180px" >Tài liệu:</label>
//                         <label for="msv" className="input-select">{vanBanDenId.taiLieu}</label>
//                     </div> */}
//               </div>
//             </div>    
//         </Modal.Body>
//         <Modal.Footer> 
//           <Link to="/truongphong/quanlyvanbandentruongphong" onClick={handleClose}>
//             <Button id="chuyentiep" variant="primary">
//                Xử lí
//              </Button>
//           </Link>
//           <Button variant="secondary" onClick={()=>{setShow(false)}}>
//             Đóng
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

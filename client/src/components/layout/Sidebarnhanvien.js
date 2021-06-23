import React from 'react';
import { Link } from 'react-router-dom';

function Drop_Danh_Muc() {
    var x = document.getElementById("drop-dannh-muc");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function Drop_Cong_Viec() {
    var x = document.getElementById("drop-congviec");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function Drop_Van_Ban_Den() {
    var x = document.getElementById("drop-vanbanden");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


const Sidebarnhanvien = () => {
    return (
        <div className='menu-func col-left' style={{ width: '250px', height: '750px' }}>
            <div className="warp-dm">
            <h6 className='title font-bold'  style={{ paddingTop: '20px' }}>
                <Link to='/nhanvien' className='color-white'>
                    TRANG CHỦ
                </Link>
            </h6>
            <h6 className='title font-bold'>
                DANH MỤC CHỨC NĂNG
            </h6>
{/* Văn bản đến */}
            <h6 className='title font-bold drop-dc' onClick={Drop_Van_Ban_Den}>
                Văn bản đến
            </h6>
            <ul className='sub-menu' id="drop-vanbanden" >   
                <li>
                    <Link className='color-white item-dm pd-left-20' to='nhanvien/quanlyvanbandennhanvien'>
                        Quản lý văn bản đến 
                    </Link>
                </li>
                <li>
                    <Link className='color-white item-dm pd-left-20' to='nhanvien/quanlycongviecnhanvien'>
                        Quản lý CV văn bản đến 
                    </Link>
                </li>
                <li>
                    <Link className='color-white item-dm pd-left-20' to='nhanvien/baocaothongkenhanvien'>
                        Báo cáo văn bản đến
                    </Link>
                </li>
            </ul>
        </div>
            </div>

    );
};

export default Sidebarnhanvien;
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

function Drop_Co_Quan_Phat_Hanh() {
    var x = document.getElementById("drop-coquanphathanh");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function Drop_Loai_Van_Ban() {
    var x = document.getElementById("drop-loaivanban");
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

function Drop_BC_TK() {
    var x = document.getElementById("drop-bcthongke");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

const Sidebarvanthu = () => {
    return (
        <div className='menu-func col-left' style={{ width: '250px', height: '750px' }}>
            <div className="warp-dm">
            <h6 className='title font-bold'  style={{ paddingTop: '20px' }}>
                <Link to='/vanthu' className='color-white'>
                    TRANG CHỦ
                </Link>
            </h6>
            <h6 className='title font-bold'>
                DANH MỤC CHỨC NĂNG
            </h6>
 {/* Cơ quan phát hành */}
            <h6 className='title font-bold drop-dc' onClick={Drop_Co_Quan_Phat_Hanh}>
                Cơ quan phát hành
            </h6>
            <ul className='sub-menu' id="drop-coquanphathanh" >   
                <li>
                    <Link className='color-white item-dm pd-left-20' to='vanthu/quanlycoquanphathanh'>
                        Quản lý cơ quan phát hành
                    </Link>
                </li>
            </ul>
{/* Loại văn bản */}
            <h6 className='title font-bold drop-dc' onClick={Drop_Loai_Van_Ban}>
                Loại văn bản
            </h6>
            <ul className='sub-menu' id="drop-loaivanban" >   
                <li>
                    <Link className='color-white item-dm pd-left-20' to='vanthu/quanlyloaivanban'>
                        Quản lý loại văn bản
                    </Link>
                </li>
            </ul>
{/* Văn bản đến */}
            <h6 className='title font-bold drop-dc' onClick={Drop_Van_Ban_Den}>
                Văn bản đến
            </h6>
            <ul className='sub-menu' id="drop-vanbanden" >   
                <li>
                    <Link className='color-white item-dm pd-left-20' to='vanthu/quanlyvanbanden'>
                        Quản lý văn bản đến
                    </Link>
                </li>
            </ul>
            <h6 className='title font-bold drop-dc' onClick={Drop_BC_TK}>
                Báo cáo thống kê
            </h6>
            <ul className='sub-menu' id="drop-bcthongke" >   
                <li>
                    <Link className='color-white item-dm pd-left-20' to='vanthu/baocaothongke'>
                        Báo cáo văn bản đến
                    </Link>
                </li>
            </ul>
        </div>
            </div>

    );
};

export default Sidebarvanthu;

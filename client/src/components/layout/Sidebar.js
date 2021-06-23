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

const Sidebar = () => {
    return (
        <div className='menu-func col-left' style={{ width: '250px', height: '750px' }}>
            <div className="warp-dm">
            <h6 className='title font-bold'  style={{ paddingTop: '20px' }}>
                <Link to='/quantri' className='color-white'>
                    TRANG CHỦ
                </Link>
            </h6>
            <h6 className='title font-bold drop-dc' onClick={Drop_Danh_Muc}>
                DANH MỤC CHỨC NĂNG
            </h6>
            <ul className='sub-menu' id="drop-dannh-muc" >   
                <li>
                    <Link className='color-white item-dm ' to='/quantri/quanlybophan'>
                        Quản lý bộ phận
                    </Link>
                </li>
                <li>
                    <Link className='color-white item-dm ' to='/quantri/quanlychucdanh'>
                        Quản lý chức danh
                    </Link>
                </li>
                <li>
                    <Link className='color-white item-dm ' to='/quantri/quanlynhomquyen'>
                        Quản lý nhóm quyền
                    </Link>
                </li>
                <li>
                    <Link className='color-white item-dm' to='/quantri/quanlynhanvien'>
                        Quản lý nhân viên
                    </Link>
                </li>
                <li>
                    <Link className='color-white item-dm' to='/quantri/quanlynguoidung'>
                        Quản lý người dùng
                    </Link>
                </li>
            </ul>
        </div>
            </div>

    );
};

export default Sidebar;

import React from 'react';
import { Link } from 'react-router-dom';
const Sidebar = () => {
    return (
        <div className='menu-func col-sm-2 col-left' style={{ width: '250px', height: '650px' }}>
            <h5 className='title' style={{ paddingTop: '20px' }}>
                Danh mục chức năng
            </h5>
            <ul className='sub-menu'>   
                <li>
                    <Link className='color-white' to='/quanlybophan'>
                        Quản lý bộ phân
                    </Link>
                </li>
                <li>
                    <Link className='color-white' to='/quanlynhanvien'>
                        Quản lý nhân viên
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

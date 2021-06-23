import React from 'react';

function Navbar() {
    return (
        <div className="navbar-trangthai">
            <div className="trangthai-xuli ">
                <button className="width-120px">Tất cả</button>
            </div>
            <div className="trangthai-xuli">
                <button className="width-120px">Chưa xử li</button>
            </div>
            <div className="trangthai-xuli">
                <button className="width-120px">Đã xử lí</button>
            </div>
        </div>
    );
}

export default Navbar;
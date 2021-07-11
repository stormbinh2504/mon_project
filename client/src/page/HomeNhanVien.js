import React from 'react';
import Header from "../components/layout/header/HeaderNV";
import Sidebartruongphong from '../components/layout/Sidebartruongphong';
import NDTrangChu from './TrangChu/NDTrangChu';
import Sidebarnhanvien from '../components/layout/Sidebarnhanvien';

const HomeTruongPhong = () => {
    return (
        <React.Fragment>
            <Header />
            <div id='content'>
                <Sidebarnhanvien />
                <NDTrangChu></NDTrangChu>
            </div>
        </React.Fragment>
    );
};

export default HomeTruongPhong;

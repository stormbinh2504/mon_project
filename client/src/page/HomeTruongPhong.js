import React from 'react';
import Header from '../components/layout/Header';
import Sidebartruongphong from '../components/layout/Sidebartruongphong';
import NDTrangChu from './TrangChu/NDTrangChu';

const HomeTruongPhong = () => {
    return (
        <React.Fragment>
            <Header />
            <div id='content'>
                <Sidebartruongphong />
                <NDTrangChu></NDTrangChu>
            </div>
        </React.Fragment>
    );
};

export default HomeTruongPhong;

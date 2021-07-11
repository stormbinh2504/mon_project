import React from 'react';
import Header from "../components/layout/header/HeaderVT";
import Sidebarvanthu from '../components/layout/Sidebarvanthu';
import NDTrangChu from './TrangChu/NDTrangChu';
import Sidebartest from '../components/layout/Sidebartest';

const HomeVanThu = () => {
    return (
        <React.Fragment>
            <Header />
            <div id='content'>
                <Sidebarvanthu />
                <NDTrangChu></NDTrangChu>
            </div>
        </React.Fragment>
    );
};

export default HomeVanThu;

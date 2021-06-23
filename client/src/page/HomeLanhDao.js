import React from 'react';
import Header from '../components/layout/Header';
import Sidebarlanhdao from '../components/layout/Sidebarlanhdao';
import NDTrangChu from './TrangChu/NDTrangChu';

const HomeLanhDao = () => {
    return (
        <React.Fragment>
            <Header />
            <div id='content'>
                <Sidebarlanhdao />
                <NDTrangChu></NDTrangChu>
            </div>
        </React.Fragment>
    );
};

export default HomeLanhDao;

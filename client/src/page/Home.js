import React from 'react';
import Header from '../components/layout/header/Header';
import Sidebar from '../components/layout/Sidebar';
import NDTrangChu from './TrangChu/NDTrangChu';

const Home = () => {
    return (
        <React.Fragment>
            <Header />
            <div id='content'>
                <Sidebar />
                <NDTrangChu></NDTrangChu>
            </div>
        </React.Fragment>
    );
};

export default Home;

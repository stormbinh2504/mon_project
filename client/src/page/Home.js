import React from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';

const Home = () => {
    return (
        <React.Fragment>
            <Header />
            <div id='content'>
                <Sidebar />
            </div>
        </React.Fragment>
    );
};

export default Home;

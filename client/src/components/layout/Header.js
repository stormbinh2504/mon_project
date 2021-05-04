import React from 'react';
import { Link } from 'react-router-dom';
import AppPicture from '../../assets';

const Header = () => {
    return (
        <header id='header'>
            <div className='container-fluid'>
                <div className='row header-page'>
                    <Link to='/'>
                        <img
                            src={AppPicture.LogoTLU}
                            alt='LogoTLU'
                            className='logo-tlu'
                        />
                    </Link>
                    <div className='status-login color-white'>
                        <p>Chào Bình Huun /</p>
                        <span >
                            < Link to = '/'
                            className = "">
                                logout
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

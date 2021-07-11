import React from 'react';
import { Link } from 'react-router-dom';
import AppPicture from '../../../assets';
import Logout from "../../../assets/icons/log-out.svg";

import {
    useHistory
} from "react-router-dom";

const HeaderNV = () => {
  let history = useHistory();

  const logout = () => {
    localStorage.removeItem("accessToken");
    history.replace("/");
  };

  return (
    <header id="header">
      <div className="container-fluid">
        <div className="row header-page">
          <Link to="/">
            <img src={AppPicture.LogoTLU} alt="LogoTLU" className="logo-tlu" />
          </Link>
          <div className="status-login color-white">
            <p>Hello &nbsp;</p>
            <p>Nguyễn Ngọc Minh</p>
            <span>
              /
              <img
                onClick={logout}
                className="icon-logout"
                src={Logout}
                alt=""
              />
              {/* <button onClick={logout}>logout</button> */}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderNV;

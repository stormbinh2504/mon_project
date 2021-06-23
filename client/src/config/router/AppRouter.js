import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RouterConfig from '../constant/RouterConfig';

import {
    Redirect
} from "react-router-dom";

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                 <Route
                    exact
                    path={RouterConfig.Login.path}
                    component={RouterConfig.Login.components}
                />
                <Route
                    exact
                    path={RouterConfig.HomeRouter.path}
                    component={RouterConfig.HomeRouter.components}
                    // render = {() => {
                    //     return 
                    //          localStorage.setItem("accessToken") ? <Home></Home> : <Redirect to="/"></Redirect>
                    // }}
                ></Route>
                
                <Route
                    exact
                    path={RouterConfig.QuanLyNhanVien.path}
                    component={RouterConfig.QuanLyNhanVien.components}
                />
                <Route
                    exact
                    path={RouterConfig.QuanLyBoPhan.path}
                    component={RouterConfig.QuanLyBoPhan.components}
                />
                <Route
                    exact
                    path={RouterConfig.QuanLyChucDanh.path}
                    component={RouterConfig.QuanLyChucDanh.components}
                />
                <Route
                    exact
                    path={RouterConfig.QuanLyNhomQuyen.path}
                    component={RouterConfig.QuanLyNhomQuyen.components}
                />
                <Route
                    exact
                    path={RouterConfig.QuanLyNguoiDung.path}
                    component={RouterConfig.QuanLyNguoiDung.components}
                />
{/* CN2 Home*/}
                <Route
                    exact
                    path={RouterConfig.HomeVanThuRouter.path}
                    component={RouterConfig.HomeVanThuRouter.components} 
                ></Route>
                <Route
                    exact
                    path={RouterConfig.HomeLanhDaoRouter.path}
                    component={RouterConfig.HomeLanhDaoRouter.components} 
                ></Route>
                <Route
                    exact
                    path={RouterConfig.HomeTruongPhongRouter.path}
                    component={RouterConfig.HomeTruongPhongRouter.components} 
                ></Route>
                <Route
                    exact
                    path={RouterConfig.HomeNhanVienRouter.path}
                    component={RouterConfig.HomeNhanVienRouter.components} 
                ></Route>
{/* Văn thư */}
                <Route
                    exact
                    path={RouterConfig.QuanLyCoQuanPhatHanh.path}
                    component={RouterConfig.QuanLyCoQuanPhatHanh.components} 
                ></Route>
                <Route
                    exact
                    path={RouterConfig.QuanLyLoaiVanBan.path}
                    component={RouterConfig.QuanLyLoaiVanBan.components} 
                ></Route>
                <Route
                    exact
                    path={RouterConfig.QuanLyVanBanDenVanThu.path}
                    component={RouterConfig.QuanLyVanBanDenVanThu.components} 
                ></Route>
                <Route
                    exact
                    path={RouterConfig.BaoCaoThongKeVanThu.path}
                    component={RouterConfig.BaoCaoThongKeVanThu.components} 
                ></Route>
{/* Lãnh đạo */}
                <Route
                    exact
                    path={RouterConfig.QuanLyVanBanDenLanhDao.path}
                    component={RouterConfig.QuanLyVanBanDenLanhDao.components} 
                ></Route>
                <Route
                    exact
                    path={RouterConfig.QuanLyCongViecLanhDao.path}
                    component={RouterConfig.QuanLyCongViecLanhDao.components} 
                ></Route>
                <Route
                    exact
                    path={RouterConfig.BaoCaoThongKeLanhDao.path}
                    component={RouterConfig.BaoCaoThongKeLanhDao.components} 
                ></Route>
{/* Trường phòng */}
                <Route
                    exact
                    path={RouterConfig.QuanLyVanBanDenTruongPhong.path}
                    component={RouterConfig.QuanLyVanBanDenTruongPhong.components} 
                ></Route>
                <Route
                    exact
                    path={RouterConfig.QuanLyCongViecTruongPhong.path}
                    component={RouterConfig.QuanLyCongViecTruongPhong.components} 
                ></Route>
                <Route
                    exact
                    path={RouterConfig.BaoCaoThongKeTruongPhong.path}
                    component={RouterConfig.BaoCaoThongKeTruongPhong.components} 
                ></Route>
{/* Nhân viên */}
                <Route
                    exact
                    path={RouterConfig.QuanLyVanBanDenNhanVien.path}
                    component={RouterConfig.QuanLyVanBanDenNhanVien.components} 
                ></Route>
                <Route
                    exact
                    path={RouterConfig.QuanLyCongViecNhanVien.path}
                    component={RouterConfig.QuanLyCongViecNhanVien.components} 
                ></Route>
                <Route
                    exact
                    path={RouterConfig.BaoCaoThongKeNhanVien.path}
                    component={RouterConfig.BaoCaoThongKeNhanVien.components} 
                ></Route>

            </Switch>
        </Router>
    );
};

export default AppRouter;

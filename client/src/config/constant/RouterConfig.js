import Home from '../../page/Home';
import HomeVanThu from '../../page/HomeVanThu';
import HomeLanhDao from '../../page/HomeLanhDao';
import QuanLyNhanVien from '../../page/QuanLyN1/QuanLyNhanVien';
import QuanLyBoPhan from '../../page/QuanLyN1/QuanLyBoPhan';
import QuanLyChucDanh from '../../page/QuanLyN1/QuanLyChucDanh';
import QuanLyNhomQuyen from '../../page/QuanLyN1/QuanLyNhomQuyen';
import QuanLyNguoiDung from '../../page/QuanLyN1/QuanLyNguoiDung';

import QuanLyCoQuanPhatHanh from '../../page/QuanLyN2/QuanLyCoQuanBanHanh';
import QuanLyLoaiVanBan from '../../page/QuanLyN2/QuanLyLoaiVanBan';
import QuanLyVanBanDenVanThu from '../../page/QuanLyN2/QuanLyVanBanDenVanThu';
import BaoCaoThongKeVanThu from '../../page/QuanLyN2/BaoCaoThongKeVanThu';
import QuanLyVanBanDenLanhDao from '../../page/QuanLyN2/QuanLyVanBanDenLanhDao';
import QuanLyCongViecLanhDao from '../../page/QuanLyN2/QuanLyCongViecLanhDao';
import BaoCaoThongKeLanhDao from '../../page/QuanLyN2/BaoCaoThongKeLanhDao';

import QuanLyVanBanDenTruongPhong from '../../page/QuanLyN2/QuanLyVanBanDenTruongPhong';
import QuanLyCongViecTruongPhong from '../../page/QuanLyN2/QuanLyCongViecTruongPhong';
import BaoCaoThongKeTruongPhong from '../../page/QuanLyN2/BaoCaoThongKeTruongPhong';
import BaoCaoThongKeNhanVien from '../../page/QuanLyN2/BaoCaoThongKeNhanVien';

import QuanLyCongViecNhanVien from '../../page/QuanLyN2/QuanLyCongViecNhanVien';
import QuanLyVanBanDenNhanVien from '../../page/QuanLyN2/QuanLyVanBanDenNhanVien';

import Login from '../../page/Login/Login';
import HomeTruongPhong from '../../page/HomeTruongPhong';
import HomeNhanVien from '../../page/HomeNhanVien';


const RouterConfig = {
    HomeRouter: {
        path: '/quantri',
        components: Home,
    },
    HomeVanThuRouter: {
        path: '/vanthu',
        components: HomeVanThu,
    },
    HomeLanhDaoRouter: {
        path: '/lanhdao',
        components: HomeLanhDao,
    },
    HomeTruongPhongRouter: {
        path: '/truongphong',
        components: HomeTruongPhong,
    },
    HomeNhanVienRouter: {
        path: '/nhanvien',
        components: HomeNhanVien,
    },
    Login: {
        path: '/',
        components: Login,
    },
    QuanLyBoPhan: {
        path: '/quantri/quanlybophan',
        components: QuanLyBoPhan,
    },
    QuanLyChucDanh: {
        path: '/quantri/quanlychucdanh',
        components: QuanLyChucDanh,
    },
    QuanLyNhomQuyen: {
        path: '/quantri/quanlynhomquyen',
        components: QuanLyNhomQuyen,
    },
    QuanLyNguoiDung: {
        path: '/quantri/quanlynguoidung',
        components: QuanLyNguoiDung,
    },
    QuanLyNhanVien: {
        path: '/quantri/quanlynhanvien',
        components: QuanLyNhanVien,
    },
// CN2
    QuanLyCoQuanPhatHanh: {
        path: '/vanthu/quanlycoquanphathanh',
        components: QuanLyCoQuanPhatHanh,
    },
    QuanLyVanBanDenVanThu: {
        path: '/vanthu/quanlyvanbanden',
        components: QuanLyVanBanDenVanThu,
    },
    QuanLyLoaiVanBan: {
        path: '/vanthu/quanlyloaivanban',
        components: QuanLyLoaiVanBan,
    },
    BaoCaoThongKeVanThu: {
        path: '/vanthu/baocaothongke',
        components: BaoCaoThongKeVanThu,
    },
// Lãnh đạo
    QuanLyVanBanDenLanhDao: {
        path: '/lanhdao/quanlyvanbandenlanhdao',
        components: QuanLyVanBanDenLanhDao,
    },
    QuanLyCongViecLanhDao: {
        path: '/lanhdao/quanlycongvieclanhdao',
        components: QuanLyCongViecLanhDao,
    },
    BaoCaoThongKeLanhDao: {
        path: '/lanhdao/baocaothongkelanhdao',
        components: BaoCaoThongKeLanhDao,
    },
//Trường phòng
    QuanLyVanBanDenTruongPhong: {
        path: '/truongphong/quanlyvanbandentruongphong',
        components: QuanLyVanBanDenTruongPhong,
    },
    QuanLyCongViecTruongPhong: {
        path: '/truongphong/quanlycongviectruongphong',
        components: QuanLyCongViecTruongPhong,
    },
    BaoCaoThongKeTruongPhong: {
        path: '/truongphong/baocaothongketruongphong',
        components: BaoCaoThongKeTruongPhong,
    },
//Nhân viên
    QuanLyVanBanDenNhanVien: {
        path: '/nhanvien/quanlyvanbandennhanvien',
        components: QuanLyVanBanDenNhanVien,
    },
    QuanLyCongViecNhanVien: {
        path: '/nhanvien/quanlycongviecnhanvien',
        components: QuanLyCongViecNhanVien,
    },
    BaoCaoThongKeNhanVien: {
        path: '/nhanvien/baocaothongkenhanvien',
        components: BaoCaoThongKeNhanVien,
    },

};

export default RouterConfig;

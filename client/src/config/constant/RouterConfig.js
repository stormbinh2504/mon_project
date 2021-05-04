import Home from '../../page/Home';
import QuanLyNhanVien from '../../page/QuanLyNhanVien';
import QuanLyBoPhan from '../../page/QuanLyBoPhan';

const RouterConfig = {
    HomeRouter: {
        path: '/',
        components: Home,
    },
    QuanLyBoPhan: {
        path: '/quanlybophan',
        components: QuanLyBoPhan,
    },
    QuanLyNhanVien: {
        path: '/quanlynhanvien',
        components: QuanLyNhanVien,
    },
};

export default RouterConfig;

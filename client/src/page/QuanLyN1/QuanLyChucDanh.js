import React, {
    Suspense,
    useEffect,
    useState
} from 'react';

// import IconSearch from '../assets/icons/search-icon.svg';
import { Form, FormControl,Table, Pagination } from 'react-bootstrap';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import ModalAddDepartment from '../modals/ModalN1/ModalAddDepartment';
import ModalEditDepartment from '../modals/ModalN1/ModalEditDepartment';
import QLCDapi from '../../config/api/QLCDapi';
import PaginationQLBP from '../pagination/PaginationN1/PaginationQLBP';
import PaginationQLCD from '../pagination/PaginationN1/PaginationQLCD';

export default function QuanLyChucDanh() {
    const [chucdanhId, setChucDanhtId] = useState([]);
    
    const [rerent, setrerent] = useState(false);

      const deletedep = (index) => {
        chucdanhId.splice(index, 1);
        setrerent(true);
      }

    var updatedata = () =>{
      setrerent(true);
    }

    useEffect(() => {
      const fetchProductList = async () => {
          try {          
              const response = await QLCDapi.getAll();
              console.log(response);
              setChucDanhtId(response);
          } catch (error) {
              console.log('Failed to fetch product list: ', error);
          }
      }
      fetchProductList();
      setrerent(false);
    }, [rerent])

    
    return (
      <React.Fragment>
        <Header />
        <div id="content">
          <Sidebar />
            <PaginationQLCD></PaginationQLCD>
        </div>
       
      </React.Fragment>
    );
}

import React, {
    Suspense,
    useEffect,
    useState
} from 'react';

import { Form, FormControl,Table, Pagination } from 'react-bootstrap';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import ModalAddDepartment from '../modals/ModalN1/ModalAddDepartment';
import ModalEditDepartment from '../modals/ModalN1/ModalEditDepartment';
import QLBPapi from '../../config/api/QLBPapi';
import QLCQBHapi from '../../config/api/apiN2/QLCQBHapi'
import PaginationQLBP from '../pagination/PaginationN1/PaginationQLBP';
import PaginationQLCQBH from '../pagination/PaginationN2/PaginationQLCQBH';
import Sidebarvanthu from '../../components/layout/Sidebarvanthu';

export default function QuanLyCoQuanBanHanh() {
    const [coquanId, setcoquanId] = useState([]);
    
    const [rerent, setrerent] = useState(false);

      const deletedep = (index) => {
        coquanId.splice(index, 1)
        setrerent(true);
      }

    var updatedata = () =>{
      setrerent(true);
    }

    useEffect(() => {
      const fetchProductList = async () => {
          try {          
              const response = await QLCQBHapi.getAll();
              setcoquanId(response);
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
          <Sidebarvanthu />
            <PaginationQLCQBH></PaginationQLCQBH>
        </div>
      </React.Fragment>
    );
}

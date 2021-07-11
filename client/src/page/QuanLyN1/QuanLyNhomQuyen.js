import React, {
    Suspense,
    useEffect,
    useState
} from 'react';

import Header from "../../components/layout/header/Header";
import Sidebar from '../../components/layout/Sidebar';
import QLNQapi from '../../config/api/QLNQapi';
import PaginationQLNQ from '../pagination/PaginationN1/PaginationQLNQ';

export default function QuanLyNhomQuyen() {

    const [nhomquyenId, setNhomQuyentId] = useState([]);
    const [rerent, setrerent] = useState(false);

    const deletedep = (index) => {
      nhomquyenId.splice(index, 1)
      setrerent(true);
    }

    var updatedata = () =>{
      setrerent(true);
    }

    useEffect(() => {
      const fetchProductList = async () => {
          try {          
              const response = await QLNQapi.getAll();
              setNhomQuyentId(response);
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
          <PaginationQLNQ></PaginationQLNQ>
        </div>
       
      </React.Fragment>
    );
}

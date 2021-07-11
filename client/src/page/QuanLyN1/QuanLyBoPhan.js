import React, {
    Suspense,
    useEffect,
    useState
} from 'react';

import Header from '../../components/layout/header/Header';
import Sidebar from '../../components/layout/Sidebar';
import QLBPapi from '../../config/api/QLBPapi';
import PaginationQLBP from '../pagination/PaginationN1/PaginationQLBP';

export default function QuanLyBoPhan() {
    const [bophanId, setBoPhantId] = useState([]);
    
    const [rerent, setrerent] = useState(false);

    //   const deletedep = (index) => {
    //     bophanId.splice(index, 1)
    //     setrerent(true);
    //   }

    // var updatedata = () =>{
    //   setrerent(true);
    // }

    useEffect(() => {
      const fetchProductList = async () => {
          try {          
              const response = await QLBPapi.getAll();
              setBoPhantId(response);
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
            <PaginationQLBP></PaginationQLBP>
        </div>
       
      </React.Fragment>
    );
}

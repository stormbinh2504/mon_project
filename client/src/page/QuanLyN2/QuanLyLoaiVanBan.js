import React, {
    Suspense,
    useEffect,
    useState
} from 'react';
import Header from "../../components/layout/header/HeaderVT";
import QLLVBapi from '../../config/api/apiN2/QLLVBapi';
import PaginationQLLVB from '../pagination/PaginationN2/PaginationQLLVB';
import Sidebarvanthu from '../../components/layout/Sidebarvanthu';

export default function QuanLyLoaiVanBan() {
    const [loaivanbanId, setloaivanbanId] = useState([]);
    
    const [rerent, setrerent] = useState(false);

      const deletedep = (index) => {
        loaivanbanId.splice(index, 1)
        setrerent(true);
      }

    var updatedata = () =>{
      setrerent(true);
    }

    useEffect(() => {
      const fetchProductList = async () => {
          try {          
              const response = await QLLVBapi.getAll();
              setloaivanbanId(response);
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
            <PaginationQLLVB></PaginationQLLVB>
        </div>
       
      </React.Fragment>
    );
}

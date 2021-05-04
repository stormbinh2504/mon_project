import React, {
    Suspense,
    useEffect,
    useState
} from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import ModalAddDepartment from './modals/ModalAddDepartment';
import ModalEditDepartment from './modals/ModalEditDepartment';
import QLBPapi from '../config/api/QLBPapi';
import ModalAddDepartmentTest from './modals/ModalAddDepartmentTest';

export default function QuanLyBoPhan() {
    const [bophanId, setBoPhantId] = useState([]);
    
    const [rerent, setrerent] = useState(false);

      const deletedep = (index) => {
        bophanId.splice(index, 1)
        setrerent(true);
      }
      const updatedata = () =>{
        setrerent(true);
      }
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
          <div className="content-func col-right">
            <div className="header-content">
              <div className="find">
                <input type="text" />
              </div>
              <div className="add-employee">
                < ModalAddDepartment updatedata ={updatedata}> </ModalAddDepartment>
              </div>
            </div>
            <div className="data-table">
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th></th>
                    <th>Mã bộ phận</th>
                    <th>Tên bộ phận</th>
                    <th>Chỉnh sửa</th>
                  </tr>
                </thead>
                <tbody>
                  {bophanId.map((item,index) => (
                    <tr>
                      <td>{index+1}</td>
                      <td>
                        <input className="check-box-nv" type="checkbox" />
                      </td>
                      <td>{item.maBoPhan}</td>
                      <td>{item.tenBoPhan}</td>
                      <td>
                        <div
                          className="chinh-sua-nv"
                          style={{ display: "flex" }}
                        >
                          <ModalEditDepartment 
                          id ={item._id}
                          deletedep = {deletedep}
                          index = {index}

                          maBoPhan={item.maBoPhan}
                          tenBoPhan={item.tenBoPhan}
                          ></ModalEditDepartment>
                          
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                </tbody>
                {/* <ModalAddDepartmentTest></ModalAddDepartmentTest> */}
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
}

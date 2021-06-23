import React, { Suspense, useEffect, useState } from "react";
import {
    useHistory
} from "react-router-dom";
import "./login.css"

import QLNDapi from '../../config/api/QLNDapi';

function Login() {
    const history = useHistory();
    const [nguoidungId, setnguoidungId] = useState([]);
    const [render,setrender] = useState(false)

    const [searchNVPHC, setSearchNVPHC] = useState("Nhân viên phòng HC");
    const [searchLD, setSearchLD] = useState("Lãnh đạo");
    const [searchTP, setSearchTP] = useState("Trưởng bộ phận");
    const [searchNV, setSearchNV] = useState("Nhân viên");

    const [filterNVPHC, setfilterNVPHC] = useState([]);
    const [filterLD, setfilterLD] = useState([]);
    const [filterTP, setfilterTP] = useState([]);
    const [filterNV, setfilterNV] = useState([]);

    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userqt, setUsertq] = useState("");
    const [passqt, setPassqt] = useState("");

    var uservt = filterNVPHC.map((filterNVPHC) => {
        return filterNVPHC.userName;
    })
    var userld = filterLD.map((filterLD) => {
        return filterLD.userName;
    })
    var usertp = filterTP.map((filterTP) => {
        return filterTP.userName;
    })
    var usernv = filterNV.map((filterNV) => {
        return filterNV.userName;
    })

    useEffect(() => {
    const fetchCDList = async () => {
        try {          
            const response = await QLNDapi.getAll();
            setnguoidungId(response);
        } catch (error) {
            console.log('Failed to fetch product list: ', error);
        }
    }
    fetchCDList();
    },[])

    useEffect(() => {
    setfilterNVPHC(
      nguoidungId.filter((country) =>
        country.nhomQuyenId.tenNhomQuyen.toLowerCase().includes(searchNVPHC.toLowerCase())
      )
    );
    }, [nguoidungId, searchNVPHC]);
    
    useEffect(() => {
    setfilterLD(
      nguoidungId.filter((country) =>
        country.nhomQuyenId.tenNhomQuyen.toLowerCase().includes(searchLD.toLowerCase())
      )
    );
    }, [nguoidungId, searchLD]);

    useEffect(() => {
    setfilterTP(
      nguoidungId.filter((country) =>
        country.nhomQuyenId.tenNhomQuyen.toLowerCase().includes(searchTP.toLowerCase())
      )
    );
    }, [nguoidungId, searchLD]);

    useEffect(() => {
    setfilterNV(
      nguoidungId.filter((country) =>
        country.nhomQuyenId.tenNhomQuyen.toLowerCase().includes(searchNV.toLowerCase())
      )
    );
    }, [nguoidungId, searchNV]);

   function checkUser(a, b ){
    for(var i=0;i<a.length;i++){
         if(a[i]==b) return true;
    }
    return false;
    }


    const login = () =>{
        if (username === userqt && password == passqt)
        {
            localStorage.setItem("accessToken",true)
            history.replace("/quantri")
        }
        else if (checkUser(uservt, username) == true && password == 1)
        {
            localStorage.setItem("accessToken",true)
            history.replace("/vanthu")
        }
        else if (checkUser(userld, username) == true && password == 1)
        {
            localStorage.setItem("accessToken",true)
            history.replace("/lanhdao")
        }
        else if (checkUser(usertp, username) == true && password == 1)
        {
            localStorage.setItem("accessToken",true)
            history.replace("/truongphong")
        }
        else if (checkUser(usernv, username) == true && password == 1)
        {
            localStorage.setItem("accessToken",true)
            history.replace("/nhanvien")
        }
    }

    return (
        <div className="body-login">
        <div className="login">
		<h1>Login</h1>
		<form>
			<div className="input-field">
				<input type="text" required onChange={(e)=>{setUsername(e.target.value)}}/>
				<label>Username</label>
			</div>
			<div class="input-field">
				<input class="pswrd" type="password" required  onChange={(e)=>{setPassword(e.target.value)}}/>
				<label>Password</label>
			</div>
			<div class="button">
				<div class="inner">
				</div>
				<button onClick={login}>LOGIN</button>
			</div>
		</form>
        </div>
        </div>
    );
}

export default Login;
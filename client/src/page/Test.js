const thoiGianGiuaHaiNgay = (ngayDau, ngayCuoi) =>
  (ngayCuoi - ngayDau) / (1000 * 3600 * 24);

// function hienThiThoiGian() {
//   var ngayDau = new Date("2020-7-6");
//   var ngayCuoi = new Date("2020-7-13");
//   ketQua = thoiGianGiuaHaiNgay(ngayDau, ngayCuoi);
//   alert("Khoảng Cách Giữa Hai Ngày là " + ketQua + " ngày");
// }

function hienThiThoiGian() {
  var ngayDau = new Date(startDay);
  var ngayCuoi = new Date(endDay);
  const ketQua = thoiGianGiuaHaiNgay(ngayDau, ngayCuoi);
  alert(`Khoảng Cách Giữa Hai Ngày là " + ${ketQua} +ngày`);
}

            // {/* {() => {
            //   if(item.trangThai == "Chưa xử lí")
            //   {
            //     demCXL+=1;
            //   }else{
            //     demDXL += 1;
            //   }
            // }} */}
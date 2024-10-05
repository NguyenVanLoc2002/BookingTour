import { useEffect, useRef, useState } from "react";
import Header from "../../layouts/Header";
import Menu from "../../layouts/Menu";
import Footer from "../../layouts/Footer";

function Account() {
  // gioi tinh 1: nu, 2 nam
  const user = {
    name: 'Bao Truc',
    url: 'https://res.cloudinary.com/doqbelkif/image/upload/v1727453521/e015a22e-fa11-4f2c-86bf-322445d957ea.png',
    gioiTinh: 1,
    ngaySinh: "06/05/2002",
    email: "baotruc123@gmail.com",
    phone: "0338030541",
    city:"Hồ Chí Minh"
  }

  const [isDisabled, setIsDisabled] = useState('true');
  const handleChinhSua = () => {
    setIsDisabled(false);
  };
  const handleHuy = () => {
    setIsDisabled(true);
  };
  // giới tính
  const [gioiTinh, setGioiTinh] = useState(user.gioiTinh);

  const handleGenderChange = (e) => {
    setGioiTinh(e.target.value);
  };

  // ngày sinh
  const [day, setDay] = useState('');   // Ngày
  const [month, setMonth] = useState(''); // Tháng
  const [year, setYear] = useState('');   // Năm

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 124 }, (_, i) => 1900 + i).reverse();
  const daysInMonth = month ? getDaysInMonth(month, year || new Date().getFullYear()) : 31;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);


  return (
    <>
      <div className="w-full h-full flex flex-col bg-slate-200">
        <Header />
        <Menu />
        <div class="flex mt-4 container mx-auto">

          <div class="w-1/4 bg-white p-4 shadow rounded-lg">
            <div class="flex items-center space-x-4">
              <img class="h-24 w-24 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold border border-blue-300" src={user.url} />
              <div>
                <div class="font-bold text-lg">
                  Bảo Trúc
                </div>
                <div class="text-gray-500">
                  Google
                </div>
              </div>
            </div>
            <div class="mt-4 bg-yellow-100 p-2 rounded text-yellow-800">
              Chào mừng bạn là thành viên của LuckyPanda Travel
            </div>
            <div class="mt-4 space-y-2">
              <a class="flex items-center space-x-2 text-blue-600" href="#">
                Thẻ của tôi
              </a>
              <a class="flex items-center space-x-2 text-blue-600" href="#">
                <span>
                  Thông tin hành khách
                </span>
              </a>
              <a class="flex items-center space-x-2 text-blue-600" href="#">
                <span>
                  Hoàn tiền
                </span>
              </a>
            </div>
          </div>
          <div class="w-3/4 bg-white p-4 shadow ml-4 rounded-lg">
            <h2 class="text-2xl font-bold">
              Tài khoản và bảo mật
            </h2>
            <div class="mt-4">
              <div class="flex space-x-4 border-b">
                <a class="pb-2 border-b-2 border-blue-600 text-blue-600" href="#">
                  Thông tin tài khoản
                </a>
                <a class="pb-2 text-gray-600" href="#">
                  Mật khẩu &amp; Bảo mật
                </a>

              </div>

              <div class="mt-4 pr-8 pl-4">
               <div class="flex justify-between"> 
                <h3 class="text-xl font-bold">
                  Dữ liệu cá nhân
                </h3>
                <button class="text-xl font-bold " onClick={handleChinhSua}>
                  THAY ĐỔI
                </button>
                </div>
                <div class="mt-4 space-y-4">
                  <div>
                    <label class="block text-gray-600">
                      Tên đầy đủ
                    </label>
                    <input class={isDisabled?"block appearance-none w-full bg-slate-200 border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500":"block appearance-none w-full bg-white border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"} type="text" value={user.name} disabled={isDisabled}/>
                  </div>
                  <div class="flex space-x-4 mb-4">
                    <div class="flex-1">
                      <label class="block text-gray-700 text-sm font-medium mb-2">Giới tính</label>
                      <div class="relative">
                        <select 
                        disabled={isDisabled}
                          name="gioiTinh"
                          value={gioiTinh} // Lấy giá trị giới tính từ state
                          onChange={handleGenderChange}
                           class={isDisabled?"block appearance-none w-full bg-slate-300 border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500":"block appearance-none w-full bg-white border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"}>
                          <option value={1}>Nữ</option>
                          <option value={2}>Nam</option>
                          <option value={3}>Chưa có dữ liệu</option>
                        </select>
                      </div>
                    </div>
                    <div class="flex-1">
                      <label class="block text-gray-700 text-sm font-medium mb-2">Ngày sinh</label>
                      <div class="relative">
                        <select
                        disabled={isDisabled}
                          value={day}
                          onChange={(e) => setDay(e.target.value)}
                          class={isDisabled?"block appearance-none w-full bg-slate-300 border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500":"block appearance-none w-full bg-white border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"}
                        >
                          {days.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div class="flex-1">
                      <label class="block text-gray-700 text-sm font-medium mb-2">Chọn tháng</label>
                      <div class="relative">
                        <select
                        disabled={isDisabled}
                          value={month}
                          onChange={(e) => setMonth(e.target.value)}
                          class={isDisabled?"block appearance-none w-full bg-slate-300 border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500":"block appearance-none w-full bg-white border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"}     >
                          {months.map((m) => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div class="flex-1">
                      <label class="block text-gray-700 text-sm font-medium mb-2">Chọn năm</label>
                      <div class="relative">
                        <select
                        disabled={isDisabled}
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          class={isDisabled?"block appearance-none w-full bg-slate-300 border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500":"block appearance-none w-full bg-white border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"}>
                          {years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-medium mb-2">Thành phố bạn đang ở</label>
                    <input disabled={isDisabled} class={isDisabled?"block appearance-none w-full bg-slate-200 border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500":"block appearance-none w-full bg-white border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"} type="text" value={user?.city? user.city :""} />
                  </div>
                  <div class="flex justify-end space-x-4">
                    <button class="bg-gray-200 text-gray-500 py-2 px-4 rounded" onClick={handleHuy} >Hủy</button>
                    <button class="bg-gray-200 text-gray-500 py-2 px-4 rounded" >Lưu</button>
                  </div>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                  <div class="mb-4">
                    <h2 class="text-gray-800 text-lg font-semibold">Email</h2>
                    <p class="text-gray-600 text-sm">Chỉ có thể sử dụng tối đa 3 email</p>
                  </div>
                  <div class="flex justify-between items-center border-t border-gray-200 pt-4">
                    <div>
                      <p class="text-gray-800 font-medium">{user?.email}</p>
                      <p class="text-green-600 text-sm">Nơi nhận thông báo</p>
                    </div>
                    <button class="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded flex items-center">
                      <i class="fas fa-plus mr-2"></i> Thêm email
                    </button>
                  </div>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                  <div class="mb-4">
                    <h2 class="text-gray-800 text-lg font-semibold">Số điện thoại</h2>
                    <p class="text-gray-600 text-sm">Chỉ có thể sử dụng tối đa 1 số điện thoại</p>
                  </div>
                  <div class="flex justify-between items-center border-t border-gray-200 pt-4">
                    <div>
                      <p class="text-gray-800 font-medium">{user?.phone}</p>
                      <p class="text-green-600 text-sm">Nơi nhận thông báo</p>
                    </div>
                    <button class="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded flex items-center">
                      <i class="fas fa-plus mr-2"></i> Thêm số điện thoại
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default Account;

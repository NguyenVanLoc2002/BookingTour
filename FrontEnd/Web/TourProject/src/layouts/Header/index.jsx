import { useEffect, useRef, useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaPhone, FaYoutube } from "react-icons/fa6";
import { FaFacebook, FaMapMarkerAlt, FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { Modal, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
function Header() {
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  const openModalLogin = () => setIsOpenLogin(true);
  const closeModalLogin = () => setIsOpenLogin(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);

  const openModalRegister = () => setIsOpenRegister(true);
  const closeModalRegister = () => setIsOpenRegister(false);
  const [showPassword, setShowPassword] = useState(false);

  // Hàm để toggle giữa hiển thị và ẩn mật khẩu
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(new Date().getFullYear()); // Mặc định là năm hiện tại

  // Danh sách năm từ 1900 đến năm hiện tại
  const years = [];
  for (let i = 1900; i <= new Date().getFullYear(); i++) {
    years.push(i);
  }

  // Hàm để tính số ngày trong tháng đã chọn
  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate(); // Ngày cuối cùng của tháng
  };

  // Cập nhật số ngày khi chọn tháng hoặc năm
  const handleMonthChange = (e) => {
    setMonth(parseInt(e.target.value));
    setDay(1); // Reset ngày về 1 khi tháng thay đổi
  };

  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value));
    setDay(1); // Reset ngày về 1 khi năm thay đổi
  };
  const handleSubmit = () => {
    console.log(day + "-" + month + "-" + year);
  };
  const [gender, setGender] = useState(1); // 1: Nữ, 2: Nam, 3: Khác

  const handleGenderChange = (e) => {
    setGender(parseInt(e.target.value));
  };


  const handleNavigateAccount = () => {
    navigate('/Account');
  };
  return (
    <div className="hidden md:flex w-full bg-black text-white text-sm">
      <div className="flex flex-1 items-center p-3">
        <div className="flex flex-wrap justify-center items-center space-x-4 md:space-x-7 mb-2 md:mb-0">
          <div className="flex items-center">
            <CiMail size={20} color="#3fd0d4" />
            <p className="ml-2 text-xs md:text-sm">contact@demo.com</p>
          </div>
          <div className="flex items-center">
            <FaPhone size={16} color="#3fd0d4" />
            <p className="ml-2 text-xs md:text-sm">01234567</p>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt size={18} color="#3fd0d4" />
            <p className="ml-2 text-xs md:text-sm">
              Số 123 Đường Phan Chu Trinh, Quận 10, TP.HCM
            </p>
          </div>
        </div>
        <div className="flex space-x-4 mt-2 md:mt-0 ml-auto">
          <FaYoutube size={20} className="hover:text-[#3fd0d4]" />
          <FaFacebook size={18} className="hover:text-[#3fd0d4]" />
        </div>
      </div>
      <li className="relative dropdown dropdown-hover">
        <button className="flex items-center bg-customColor p-3" >
          <RxAvatar size={28} />
        </button>
        <ul
          tabIndex="0"
          className="dropdown-content menu bg-slate-200 rounded-box z-[1]  shadow text-gray-600 ml-[-65px]"
        >
          <li>
            <button onClick={openModalRegister}>Đăng ký</button>
          </li>
          <li>
            <button onClick={openModalLogin}>Đăng nhập</button>
          </li>
          <li>
            <button onClick={handleNavigateAccount}>Thông tin cá nhân</button>
          </li>

        </ul>
      </li>
      <Modal
        visible={isOpenRegister}
        onOk={closeModalRegister}
        onCancel={closeModalRegister}
        footer={null}
        zIndex={1000} // Đảm bảo modal có z-index cao hơn các phần tử khác
        class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full "
      >
        <h1 class="text-2xl font-bold text-center mb-2">ĐĂNG KÝ</h1>
        <p class="text-center mb-8 font-semibold pl-8 pr-8">Chúng tôi sẽ gửi một email xác nhận về tài khoản email mà bạn cung cấp, hãy xác nhận để hoàn tất quá trình đăng ký</p>
        {/* <form > */}
        <div class="bg-gray-100 p-4 rounded-lg shadow-lg max-w-md w-full mb-6">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email <span class="text-red-500">*</span></label>
            <input type="email" id="email" class="mt-1 block w-full px-3 py-2 border border-textColorCustom rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" placeholder="Nhập email của bạn" />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Họ và tên <span class="text-red-500">*</span></label>
            <input type="email" id="email" class="mt-1 block w-full px-3 py-2 border border-textColorCustom rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" placeholder="Nhập họ tên của bạn" />
          </div>
          
          <div class="flex justify-between items-center mb-4">
          
            <div class="w-24">
              <label class="block mb-2 text-sm font-medium text-gray-700">Năm sinh</label>
              <select
                value={year}
                onChange={handleYearChange}
                class="block w-full border border-textColorCustom rounded p-2"
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div class="w-24">
              <label class="block mb-2 text-sm font-medium text-gray-700">Tháng sinh</label>
              <select
                value={month}
                onChange={handleMonthChange}
                class="block w-16 border border-textColorCustom rounded p-2 "
              >
                {[...Array(12).keys()].map((m) => (
                  <option key={m + 1} value={m + 1}>{m + 1}</option>
                ))}
              </select>
            </div>
            <div class="w-16">
              <label class="block mb-2 text-sm font-medium text-gray-700">Ngày sinh</label>
              <select
                value={day}
                onChange={(e) => setDay(parseInt(e.target.value))}
                class="block w-16 border border-textColorCustom rounded p-2"
              >
                {[...Array(getDaysInMonth(month, year)).keys()].map((d) => (
                  <option key={d + 1} value={d + 1}>{d + 1}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Giới tính</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value={1}
                  checked={gender === 1}
                  onChange={handleGenderChange}
                  className="mr-2"
                />
                Nữ
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value={2}
                  checked={gender === 2}
                  onChange={handleGenderChange}
                  className="mr-2"
                />
                Nam
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value={3}
                  checked={gender === 3}
                  onChange={handleGenderChange}
                  className="mr-2"
                />
                Khác
              </label>
            </div>
          </div>
          <div class="flex justify-center">
            <button type="submit" class="w-2/3 bg-customColor text-white py-2 rounded-md text-lg font-medium hover:bg-teal-600" onClick={handleSubmit}>ĐĂNG KÝ</button>

          </div>
        </div>


        {/* </form> */}
        <p class="text-center mt-4">Bạn đã có tài khoản? <a href="#" class="text-teal-500 font-medium">Đăng nhập ngay</a></p>
        <p class=" mt-8 text-center text-sm font-semibold">Bằng cách đăng ký, bạn đồng ý với Điều khoản & Điều kiện của chúng tôi và bạn đã đọc chính sách về quyền riêng tư của chúng tôi.</p>



      </Modal>

      <Modal
        visible={isOpenLogin}
        onOk={closeModalLogin}
        onCancel={closeModalLogin}
        footer={null}
        zIndex={1000} // Đảm bảo modal có z-index cao hơn các phần tử khác
        class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full "
      >
        <h1 class="text-2xl font-bold text-center mb-2">ĐĂNG NHẬP</h1>
        <p class="text-center mb-8 font-semibold pl-8 pr-8">Tận hưởng những chuyến đi tuyệt vời và hấp dẫn cùng với LuckyPanda Travel</p>
        <form >
          <div class="bg-gray-100 p-4 rounded-lg shadow-lg max-w-md w-full mb-6">
            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700">Email <span class="text-red-500">*</span></label>
              <input type="email" id="email" class="mt-1 block w-full px-3 py-2 border border-textColorCustom rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" placeholder="Nhập email của bạn" />
            </div>
            <div class="mb-4">
              <label for="password" class="block text-sm font-medium text-gray-700">Mật khẩu <span class="text-red-500">*</span></label>
              <div class="relative">
                <input type={showPassword ? "text" : "password"} id="password" class="mt-1 block w-full px-3 py-2 border border-textColorCustom rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" placeholder="Mật khẩu" />
                <span class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5" onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <FaRegEyeSlash size={18} color="#3fd0d4" />  // Icon mắt đóng nếu mật khẩu đang hiển thị
                  ) : (
                    <FaRegEye size={18} color="#3fd0d4" />  // Icon mắt mở nếu mật khẩu đang ẩn
                  )}
                </span>
              </div>
            </div>
            <div class="flex justify-end items-center ">
              <a href="#" class="text-sm text-gray-500">Bạn quên mật khẩu?</a>
            </div>
          </div>
          <div class="flex justify-center">
            <button type="submit" class="w-2/3 bg-customColor text-white py-2 rounded-md text-lg font-medium hover:bg-teal-600">ĐĂNG NHẬP</button>

          </div>
        </form>

        <p class="text-center mt-4">Bạn chưa có tài khoản? <a href="#" class="text-teal-500 font-medium">Đăng ký ngay</a></p>

      </Modal>

    </div>

  );
}

export default Header;

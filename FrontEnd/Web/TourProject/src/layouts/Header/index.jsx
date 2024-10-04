import { useEffect, useRef, useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaPhone, FaYoutube } from "react-icons/fa6";
import { FaFacebook, FaMapMarkerAlt, FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { Modal, Button } from 'antd';
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
        <form >
          <div class="bg-gray-100 p-4 rounded-lg shadow-lg max-w-md w-full mb-6">
            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700">Email <span class="text-red-500">*</span></label>
              <input type="email" id="email" class="mt-1 block w-full px-3 py-2 border border-textColorCustom rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" placeholder="Nhập email của bạn" />
            </div>
            <div class="flex justify-center">
              <button type="submit" class="w-2/3 bg-customColor text-white py-2 rounded-md text-lg font-medium hover:bg-teal-600">ĐĂNG KÝ</button>

            </div>
          </div>

        </form>
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

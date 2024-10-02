import { CiMail } from "react-icons/ci";
import { FaPhone, FaYoutube } from "react-icons/fa6";
import { FaFacebook, FaMapMarkerAlt } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";

function Header() {
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
      <div className="flex items-center bg-customColor p-3">
        <RxAvatar size={28} />
      </div>
    </div>
  );
}

export default Header;

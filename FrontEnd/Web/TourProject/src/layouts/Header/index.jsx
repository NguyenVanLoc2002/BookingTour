import { CiMail } from "react-icons/ci";
import { FaPhone, FaYoutube } from "react-icons/fa6";
import { FaFacebook, FaMapMarkerAlt } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";

function Header() {
  return (
    <>
      <div className="w-full bg-black flex text-white text-sm">
        <div className="w-[95%] ">
          <div className="flex p-3">
            <div className="flex justify-center items-center mr-7">
              <CiMail size={20} color="#3fd0d4" />
              <p className="ml-2">contact@demo.com</p>
            </div>
            <div className="flex justify-center items-center mr-7">
              <FaPhone size={18} color="#3fd0d4" />
              <p className="ml-2">01234567</p>
            </div>
            <div className="flex justify-center items-center ">
              <FaMapMarkerAlt size={18} color="#3fd0d4" />
              <p className="ml-2">
                Số 123 Đường Phan Chu Trinh, Quận 10, TP.HCM
              </p>
            </div>
            <div className="flex space-x-4 ml-auto">
              <FaYoutube size={20} className="hover:text-[#3fd0d4]"/>
              <FaFacebook size={18} className="hover:text-[#3fd0d4]"/>
            </div>
          </div>
        </div>
        <div className="flex w-[5%] justify-center items-center bg-customColor">
          <RxAvatar size={28} />
        </div>
      </div>
    </>
  );
}

export default Header;

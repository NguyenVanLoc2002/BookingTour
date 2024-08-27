import React, { useState } from "react";
import logoText from "../../assets/logo_Text.jpg";
import { TiArrowSortedDown } from "react-icons/ti";
import { HiOutlineSearchCircle } from "react-icons/hi";
import { FaBars, FaTimes } from "react-icons/fa";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-screen max-w-full h-auto flex flex-col md:flex-row text-black bg-orange text-sm justify-between items-center">
      <div className="w-full md:w-[15%] pl-14 flex justify-between items-center">
        <img src={logoText} alt="Logo" className="w-[80px] h-auto" />
        <button className="block md:hidden p-2" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <div
        className={`w-full md:w-[70%] flex flex-col md:flex-row items-center md:justify-center ${
          isOpen ? "block" : "hidden"
        } md:block`}
      >
        <ul className="w-full flex flex-col md:flex-row space-y-4 md:space-x-20 md:space-y-0 text-lg font-bold justify-center items-center">
          <li className="underline-hover hover:text-textColorCustom">
            TRANG CHỦ
          </li>
          <li className="relative dropdown dropdown-hover">
            <a
              tabIndex="0"
              className="flex items-center hover:text-textColorCustom underline-hover"
            >
              TOUR <TiArrowSortedDown className="ml-2" size={20} />
            </a>
            <ul
              tabIndex="0"
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 shadow"
            >
              <li>
                <a>MIỀN BẮC</a>
              </li>
              <li>
                <a>MIỀN TRUNG</a>
              </li>
              <li>
                <a>MIỀN NAM</a>
              </li>
            </ul>
          </li>
          <li className="underline-hover hover:text-textColorCustom">
            GIỚI THIỆU
          </li>
          <li className="underline-hover hover:text-textColorCustom">
            TIN TỨC
          </li>
          <li className="underline-hover hover:text-textColorCustom">
            LIÊN HỆ
          </li>
        </ul>
      </div>

      <div className="flex items-center shadow-md bg-gray-100 shadow p-2 h-12 rounded-full ml-auto mr-2">
        <div className="flex-grow overflow-hidden ">
          <input
            type="text"
            placeholder="Tìm kiếm tour..."
            className="focus:outline-none bg-gray-100 border-none placeholder-gray-300 font-semibold"
           
          />
        </div>
        <HiOutlineSearchCircle
          size={30}
          className="hover:text-textColorCustom"
        />
      </div>
    </div>
  );
}

export default Menu;
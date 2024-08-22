import logoText from "../../assets/logo_Text.jpg";
import { TiArrowSortedDown } from "react-icons/ti";
import { HiOutlineSearchCircle } from "react-icons/hi";

function Menu() {
  return (
    <>
      <div className="w-screen max-w-full h-auto flex text-black bg-orange text-sm justify-center items-center">
        <div className="w-[15%] pl-14">
          <img
            src={logoText}
            alt="Logo"
            className="w-[80px] h-auto"
          />
        </div>

        <ul className="w-[70%]  space-x-20 flex text-lg font-bold justify-center items-center">
          <li className="underline-hover hover:text-textColorCustom">
            TRANG CHỦ
          </li>
          <li className="dropdown dropdown-hover">
            <a
              tabIndex="0"
              className="m-1 flex justify-center items-center hover:text-textColorCustom underline-hover"
            >
              TOUR <TiArrowSortedDown className="ml-2" size={20} />
            </a>
            <ul
              tabIndex="0"
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52  shadow"
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

        <div className="flex ml-auto mr-5 ">
          <HiOutlineSearchCircle size={30} className="hover:text-textColorCustom"/>
        </div>
      </div>
    </>
  );
}

export default Menu;

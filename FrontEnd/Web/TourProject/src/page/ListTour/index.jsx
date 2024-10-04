import { useEffect, useRef, useState } from "react";
import Header from "../../layouts/Header";
import Menu from "../../layouts/Menu";
import bn1 from "/src/assets/banner/h1-slider-img-1-.jpg";
import bn2 from "/src/assets/banner/h1-slider-img-2-.jpg";
import haLongImage from "/src/assets/famous-landmark/ha-long_MB.jpg";
import HoiAnImage from "/src/assets/famous-landmark/HoiAn_MT.jpg";
import PhuQuocImage from "/src/assets/famous-landmark/PhuQuoc_MN.jpg";
import BaDenImage from "/src/assets/famous-landmark/Nui-ba-den-Tay-Ninh.jpg";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

import { FaBus } from "react-icons/fa6";
import { GiCommercialAirplane, GiShipBow } from "react-icons/gi";
import { BsCalendar4Week, BsCalendarHeart } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import Footer from "../../layouts/Footer";
import mountain from "../../assets/iconTour/mountain.png";
import arrows from "../../assets/iconTour/arrows.png";
import buddhist from "../../assets/iconTour/buddhist.png";
import early from "../../assets/iconTour/early.png";
import history from "../../assets/iconTour/history.png";
import news from "../../assets/iconTour/new.png";
import resort from "../../assets/iconTour/resort.png";
import river from "../../assets/iconTour/river.png";
import target from "../../assets/iconTour/target.png";
import jungle from "../../assets/iconTour/jungle.png";


function ListTour() {
  //Animation text
  useEffect(() => {
    const tourText = document.querySelector(".tour-text");
    const holidayText = document.querySelector(".holiday-text");

    console.log("tourText:", tourText); // Kiểm tra nếu tourText được chọn đúng
    console.log("holidayText:", holidayText); // Kiểm tra nếu holidayText được chọn đúng

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tourText.classList.remove("hidden-animation");
            holidayText.classList.remove("hidden-animation");

            tourText.classList.add("animate-left");
            holidayText.classList.add("animate-right");

            // Ngừng quan sát sau khi animation đã diễn ra
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 } // Tỉ lệ hiển thị thẻ div trong viewport
    );

    if (tourText && holidayText) {
      observer.observe(tourText);
      observer.observe(holidayText);
    }

    // Cleanup observer khi component unmount
    return () => {
      if (tourText && holidayText) {
        observer.unobserve(tourText);
        observer.unobserve(holidayText);
      }
    };
  }, []);
  //Animation image title
  const elementRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const directionClass =
            entry.target.dataset.direction === "left"
              ? "animate-roll-left"
              : "animate-roll-right";
          entry.target.classList.add(directionClass);
          entry.target.addEventListener("animationend", () => {
            entry.target.classList.remove(directionClass);
            entry.target.classList.add("animate-pulse");
          });
        }
      });
    });

    elementRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      elementRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);


  return (
    <>
      <div className="w-full h-full flex flex-col">
        <Header />
        <Menu name="Tour"/>
        <div class="w-full p-8 px-4 py-4 flex items-center justify-between">
          <div class="text-xl pl-[40px] font-bold">
            MIỀN TÂY
          </div>
          <div class="text-gray-600 pr-[40px]">
            Khám phá Miền Tây sông nước – Vùng đất yên bình với những trải nghiệm văn hóa, ẩm thực và thiên nhiên độc đáo.
          </div>
        </div>
        <div class="relative w-full pl-[50px] pr-[50px] mx-auto">
          <img alt="Aerial view of a coastal area with cable cars and boats" class="w-full  h-[600px] object-cover " src="https://res.cloudinary.com/doqbelkif/image/upload/v1726605769/9ae475e5-ab3e-4762-acd8-82a7a6e05086.png" />
        </div>

        <div class="bg-white container mx-auto px-8  w-3/4 py-6 flex justify-around text-center text-sm text-gray-700">
          <div class={"flex flex-col items-center justify-around"}>
            <img src={mountain} alt="Logo" className="w-[32px] h-auto" />
            <div>
              Tour mạo hiểm
            </div>
          </div>
          <div class={"flex flex-col items-center justify-center"}>
            <img src={river} alt="Logo" className="w-[32px] h-auto" />

            <div>
              Tour tham quan
            </div>
          </div>
          <div class={"flex flex-col items-center justify-center"}>
            <img src={buddhist} alt="Logo" className="w-[32px] h-auto" />
            <div>
              Tour văn hóa
            </div>
          </div>
          <div class={"flex flex-col items-center justify-center"}>
            <img src={jungle} alt="Logo" className="w-[32px] h-auto" />
            <div>
              Tour sinh thái
            </div>
          </div>
          <div class={"flex flex-col items-center justify-center"}>
            <img src={resort} alt="Logo" className="w-[32px] h-auto" />
            <div>
              Tour nghỉ dưỡng
            </div>
          </div>
          <div class={"flex flex-col items-center justify-center"}>
            <img src={target} alt="Logo" className="w-[32px] h-auto" />
            <div>
              Tour team building
            </div>
          </div>

        </div>
        <hr class="border-3 border-gray-500 w-full mb-4" />

        <div class="bg-white container mx-auto px-8  w-3/4 py-6 flex justify-around text-center text-sm text-gray-700">
          <div class={"flex flex-col items-center justify-center"}>
            <img src={news} alt="Logo" className="w-[32px] h-auto" />
            <div>
              Mới nhất
            </div>
          </div>
          <div class={"flex flex-col items-center justify-center"}>
            <img src={arrows} alt="Logo" className="w-[32px] h-auto" />
            <div>
              Giá cao nhất
            </div>
          </div>
          <div class={"flex flex-col items-center justify-center"}>
            <img src={arrows} alt="Logo" className="w-[32px] h-auto" />
            <div>
              Giá thấp nhất
            </div>
          </div>
          <div class={"flex flex-col items-center justify-center"}>
            <img src={early} alt="Logo" className="w-[32px] h-auto" />
            <div>
              Khởi hành sớm nhất
            </div>
          </div>
          <div class={"flex flex-col items-center justify-center"}>
            <img src={history} alt="Logo" className="w-[32px] h-auto" />
            <div>
              Khởi hành muộn nhất
            </div>
          </div>

        </div>
        {/* Tittle */}
        <div className="flex flex-col justify-center items-center space-y-5 mt-5">
          <p className="tour-text text-4xl hidden-animation text-textColorCustom font-dancing-script">
            Tour hấp dẫn
          </p>
          <p className="holiday-text text-6xl hidden-animation text-black font-bold font-sriracha">
            Trọn vẹn kì nghỉ
          </p>
        </div>

        {/* Tour ĐẶC BIỆT */}
        <div className="flex flex-col justify-center items-center space-y-5 mt-5">
          {/* MB */}
         
          <div className="flex items-center space-x-6 mt-3 mb-3">
            <div
              ref={(el) => (elementRefs.current[0] = el)}
              data-direction="left"
              className="group overflow-hidden relative w-72 h-72 rounded-full "
            >
              <img
                src={haLongImage}
                alt="Hạ Long"
                className="w-full h-full object-cover rounded-full transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
              <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 text-4xl font-dancing-script text-white font-bold">
                Có thể bạn sẽ thích
              </p>
            </div>

            <button>
              <div className="flex flex-col justify-between font-sriracha w-72 h-80 shadow-2xl shadow-gray-500/50 rounded-lg group overflow-hidden">
                <img
                  src="https://thdtravel.com.vn/wp-content/uploads/2021/10/Hinh-anh-vinh-ha-long-8.jpg"
                  alt="Tour Hạ Long"
                  className="h-44 rounded-t-lg object-cover transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
                />
                <p className="text-black font-bold m-1 mt-2 text-xl">
                  Vịnh Hạ Long - Quảng Ninh
                </p>
                <div className="flex ml-1 justify-between">
                  <p className="text-xl text-red-500 ">6,500,000đ</p>
                  <div className="flex space-x-2 items-center mr-2">
                    <FaBus />
                    <GiShipBow />
                    <GiCommercialAirplane />
                  </div>
                </div>
                <p className="text-gray-400 text-sm ml-1 line-through">
                  8,437,000đ
                </p>
                <div className="flex ml-1 space-x-2 items-center text-sm">
                  <BsCalendar4Week />
                  <p>Khởi hành: Thứ 5</p>
                </div>
                <div className="flex ml-1 items-center justify-between text-sm mb-2">
                  <div className="flex space-x-2 items-center">
                    <BsCalendarHeart />
                    <p>Thời gian: 3 ngày 2 đêm</p>
                  </div>
                  <TiWeatherPartlySunny size={20} className="mr-2" />
                </div>
              </div>
            </button>

            
            <div className="flex flex-col justify-between font-sriracha w-72 h-80 shadow-2xl shadow-gray-500/50 rounded-lg group overflow-hidden">
              <img
                src="https://vanhoavaphattrien.vn/uploads/images/2021/06/04/mua-nuoc-do-duc-long-1622819122.jpg"
                alt="Tour Hà Giang"
                className="h-44 rounded-t-lg object-cover transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
              <p className="text-black font-bold m-1 mt-2 text-xl">Hà Giang</p>
              <div className="flex ml-1 justify-between">
                <p className="text-xl text-red-500 ">6,500,000đ</p>
                <div className="flex space-x-2 items-center mr-2">
                  <FaBus />
                  <GiShipBow />
                  <GiCommercialAirplane />
                </div>
              </div>
              <p className="text-gray-400 text-sm ml-1 line-through">
                8,437,000đ
              </p>
              <div className="flex ml-1 space-x-2 items-center text-sm">
                <BsCalendar4Week />
                <p>Khởi hành: Thứ 5</p>
              </div>
              <div className="flex ml-1 items-center justify-between text-sm mb-2">
                <div className="flex space-x-2 items-center">
                  <BsCalendarHeart />
                  <p>Thời gian: 3 ngày 2 đêm</p>
                </div>
                <TiWeatherPartlySunny size={20} className="mr-2" />
              </div>
            </div>
            
            <div className="flex flex-col justify-between font-sriracha w-72 h-80 shadow-2xl shadow-gray-500/50 rounded-lg group overflow-hidden">
              <img
                src="https://vanhoavaphattrien.vn/uploads/images/2021/06/04/mua-nuoc-do-duc-long-1622819122.jpg"
                alt="Tour Hà Giang"
                className="h-44 rounded-t-lg object-cover transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
              <p className="text-black font-bold m-1 mt-2 text-xl">Hà Giang</p>
              <div className="flex ml-1 justify-between">
                <p className="text-xl text-red-500 ">6,500,000đ</p>
                <div className="flex space-x-2 items-center mr-2">
                  <FaBus />
                  <GiShipBow />
                  <GiCommercialAirplane />
                </div>
              </div>
              <p className="text-gray-400 text-sm ml-1 line-through">
                8,437,000đ
              </p>
              <div className="flex ml-1 space-x-2 items-center text-sm">
                <BsCalendar4Week />
                <p>Khởi hành: Thứ 5</p>
              </div>
              <div className="flex ml-1 items-center justify-between text-sm mb-2">
                <div className="flex space-x-2 items-center">
                  <BsCalendarHeart />
                  <p>Thời gian: 3 ngày 2 đêm</p>
                </div>
                <TiWeatherPartlySunny size={20} className="mr-2" />
              </div>
            </div>
            <div className="flex flex-col justify-between font-sriracha w-72 h-80 shadow-2xl shadow-gray-500/50 rounded-lg group overflow-hidden">
              <img
                src="https://dulichvietnam.com.vn/vnt_upload/news/10_2019/dia-diem-mua-dong-4.jpg"
                alt="Tour Sapa"
                className="h-44 rounded-t-lg object-cover transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
              <p className="text-black font-bold m-1 mt-2 text-xl">Sapa</p>
              <div className="flex ml-1 justify-between">
                <p className="text-xl text-red-500 ">6,500,000đ</p>
                <div className="flex space-x-2 items-center mr-2">
                  <FaBus />
                  <GiShipBow />
                  <GiCommercialAirplane />
                </div>
              </div>
              <p className="text-gray-400 text-sm ml-1 line-through">
                8,437,000đ
              </p>
              <div className="flex ml-1 space-x-2 items-center text-sm">
                <BsCalendar4Week />
                <p>Khởi hành: Thứ 5</p>
              </div>
              <div className="flex ml-1 items-center justify-between text-sm mb-2">
                <div className="flex space-x-2 items-center">
                  <BsCalendarHeart />
                  <p>Thời gian: 3 ngày 2 đêm</p>
                </div>
                <TiWeatherPartlySunny size={20} className="mr-2" />
              </div>
            </div>
          </div>
          

          {/* MT */}
          <div className="flex items-center space-x-6 mt-3 mb-3">
            <div className="flex flex-col justify-between font-sriracha w-72 h-80 shadow-2xl shadow-gray-500/50 rounded-lg group overflow-hidden">
              <img
                src="https://divui.com/blog/wp-content/uploads/2018/10/111111.jpg"
                alt="Bà Nà Hill"
                className="h-44 rounded-t-lg object-cover transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
              <p className="text-black font-bold m-1 mt-2 text-xl">
                Bà Nà Hill - Đà Nẵng
              </p>
              <div className="flex ml-1 justify-between">
                <p className="text-xl text-red-500 ">6,500,000đ</p>
                <div className="flex space-x-2 items-center mr-2">
                  <FaBus />
                  <GiShipBow />
                  <GiCommercialAirplane />
                </div>
              </div>
              <p className="text-gray-400 text-sm ml-1 line-through">
                8,437,000đ
              </p>
              <div className="flex ml-1 space-x-2 items-center text-sm">
                <BsCalendar4Week />
                <p>Khởi hành: Thứ 5</p>
              </div>
              <div className="flex ml-1 items-center justify-between text-sm mb-2">
                <div className="flex space-x-2 items-center">
                  <BsCalendarHeart />
                  <p>Thời gian: 3 ngày 2 đêm</p>
                </div>
                <TiWeatherPartlySunny size={20} className="mr-2" />
              </div>
            </div>
            <div className="flex flex-col justify-between font-sriracha w-72 h-80 shadow-2xl shadow-gray-500/50 rounded-lg group overflow-hidden">
              <img
                src="https://vanhoavaphattrien.vn/uploads/images/2021/06/04/mua-nuoc-do-duc-long-1622819122.jpg"
                alt="Tour Hà Giang"
                className="h-44 rounded-t-lg object-cover transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
              <p className="text-black font-bold m-1 mt-2 text-xl">Hà Giang</p>
              <div className="flex ml-1 justify-between">
                <p className="text-xl text-red-500 ">6,500,000đ</p>
                <div className="flex space-x-2 items-center mr-2">
                  <FaBus />
                  <GiShipBow />
                  <GiCommercialAirplane />
                </div>
              </div>
              <p className="text-gray-400 text-sm ml-1 line-through">
                8,437,000đ
              </p>
              <div className="flex ml-1 space-x-2 items-center text-sm">
                <BsCalendar4Week />
                <p>Khởi hành: Thứ 5</p>
              </div>
              <div className="flex ml-1 items-center justify-between text-sm mb-2">
                <div className="flex space-x-2 items-center">
                  <BsCalendarHeart />
                  <p>Thời gian: 3 ngày 2 đêm</p>
                </div>
                <TiWeatherPartlySunny size={20} className="mr-2" />
              </div>
            </div>
            <div className="flex flex-col justify-between font-sriracha w-72 h-80 shadow-2xl shadow-gray-500/50 rounded-lg group overflow-hidden">
              <img
                src="https://divui.com/blog/wp-content/uploads/2018/10/111111.jpg"
                alt="Bà Nà Hill"
                className="h-44 rounded-t-lg object-cover transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
              <p className="text-black font-bold m-1 mt-2 text-xl">
                Bà Nà Hill - Đà Nẵng
              </p>
              <div className="flex ml-1 justify-between">
                <p className="text-xl text-red-500 ">6,500,000đ</p>
                <div className="flex space-x-2 items-center mr-2">
                  <FaBus />
                  <GiShipBow />
                  <GiCommercialAirplane />
                </div>
              </div>
              <p className="text-gray-400 text-sm ml-1 line-through">
                8,437,000đ
              </p>
              <div className="flex ml-1 space-x-2 items-center text-sm">
                <BsCalendar4Week />
                <p>Khởi hành: Thứ 5</p>
              </div>
              <div className="flex ml-1 items-center justify-between text-sm mb-2">
                <div className="flex space-x-2 items-center">
                  <BsCalendarHeart />
                  <p>Thời gian: 3 ngày 2 đêm</p>
                </div>
                <TiWeatherPartlySunny size={20} className="mr-2" />
              </div>
            </div>

            <div className="flex flex-col justify-between font-sriracha w-72 h-80 shadow-2xl shadow-gray-500/50 rounded-lg group overflow-hidden">
              <img
                src="https://divui.com/blog/wp-content/uploads/2018/10/111111.jpg"
                alt="Bà Nà Hill"
                className="h-44 rounded-t-lg object-cover transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
              <p className="text-black font-bold m-1 mt-2 text-xl">
                Bà Nà Hill - Đà Nẵng
              </p>
              <div className="flex ml-1 justify-between">
                <p className="text-xl text-red-500 ">6,500,000đ</p>
                <div className="flex space-x-2 items-center mr-2">
                  <FaBus />
                  <GiShipBow />
                  <GiCommercialAirplane />
                </div>
              </div>
              <p className="text-gray-400 text-sm ml-1 line-through">
                8,437,000đ
              </p>
              <div className="flex ml-1 space-x-2 items-center text-sm">
                <BsCalendar4Week />
                <p>Khởi hành: Thứ 5</p>
              </div>
              <div className="flex ml-1 items-center justify-between text-sm mb-2">
                <div className="flex space-x-2 items-center">
                  <BsCalendarHeart />
                  <p>Thời gian: 3 ngày 2 đêm</p>
                </div>
                <TiWeatherPartlySunny size={20} className="mr-2" />
              </div>
            </div>

            <div
              ref={(el) => (elementRefs.current[1] = el)}
              data-direction="right"
              className="group overflow-hidden relative w-72 h-72 rounded-full "
            >
              <img
                src={HoiAnImage}
                alt="Hạ Long"
                className="w-full h-full object-cover rounded-full transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
              <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 text-4xl font-dancing-script text-white font-bold whitespace-nowrap">
                Khuyến mãi đặc biệt
              </p>
            </div>
          </div>
          {/* Tất cả */}
          <div className="flex items-center space-x-6 mt-3 mb-3">
            <div
              ref={(el) => (elementRefs.current[0] = el)}
              data-direction="left"
              className="group overflow-hidden relative w-72 h-72 rounded-full "
            >
              <img
                src={haLongImage}
                alt="Hạ Long"
                className="w-full h-full object-cover rounded-full transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
              <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 text-4xl font-dancing-script text-white font-bold">
              Tất cả
              </p>
            </div>

            <button>
              <div className="flex flex-col justify-between font-sriracha w-72 h-80 shadow-2xl shadow-gray-500/50 rounded-lg group overflow-hidden">
                <img
                  src="https://thdtravel.com.vn/wp-content/uploads/2021/10/Hinh-anh-vinh-ha-long-8.jpg"
                  alt="Tour Hạ Long"
                  className="h-44 rounded-t-lg object-cover transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
                />
                <p className="text-black font-bold m-1 mt-2 text-xl">
                  Vịnh Hạ Long - Quảng Ninh
                </p>
                <div className="flex ml-1 justify-between">
                  <p className="text-xl text-red-500 ">6,500,000đ</p>
                  <div className="flex space-x-2 items-center mr-2">
                    <FaBus />
                    <GiShipBow />
                    <GiCommercialAirplane />
                  </div>
                </div>
                <p className="text-gray-400 text-sm ml-1 line-through">
                  8,437,000đ
                </p>
                <div className="flex ml-1 space-x-2 items-center text-sm">
                  <BsCalendar4Week />
                  <p>Khởi hành: Thứ 5</p>
                </div>
                <div className="flex ml-1 items-center justify-between text-sm mb-2">
                  <div className="flex space-x-2 items-center">
                    <BsCalendarHeart />
                    <p>Thời gian: 3 ngày 2 đêm</p>
                  </div>
                  <TiWeatherPartlySunny size={20} className="mr-2" />
                </div>
              </div>
            </button>
            <div className="flex flex-col justify-between font-sriracha w-72 h-80 shadow-2xl shadow-gray-500/50 rounded-lg group overflow-hidden">
              <img
                src="https://vanhoavaphattrien.vn/uploads/images/2021/06/04/mua-nuoc-do-duc-long-1622819122.jpg"
                alt="Tour Hà Giang"
                className="h-44 rounded-t-lg object-cover transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
              <p className="text-black font-bold m-1 mt-2 text-xl">Hà Giang</p>
              <div className="flex ml-1 justify-between">
                <p className="text-xl text-red-500 ">6,500,000đ</p>
                <div className="flex space-x-2 items-center mr-2">
                  <FaBus />
                  <GiShipBow />
                  <GiCommercialAirplane />
                </div>
              </div>
              <p className="text-gray-400 text-sm ml-1 line-through">
                8,437,000đ
              </p>
              <div className="flex ml-1 space-x-2 items-center text-sm">
                <BsCalendar4Week />
                <p>Khởi hành: Thứ 5</p>
              </div>
              <div className="flex ml-1 items-center justify-between text-sm mb-2">
                <div className="flex space-x-2 items-center">
                  <BsCalendarHeart />
                  <p>Thời gian: 3 ngày 2 đêm</p>
                </div>
                <TiWeatherPartlySunny size={20} className="mr-2" />
              </div>
            </div>
            <div className="flex flex-col justify-between font-sriracha w-72 h-80 shadow-2xl shadow-gray-500/50 rounded-lg group overflow-hidden">
              <img
                src="https://vanhoavaphattrien.vn/uploads/images/2021/06/04/mua-nuoc-do-duc-long-1622819122.jpg"
                alt="Tour Hà Giang"
                className="h-44 rounded-t-lg object-cover transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
              <p className="text-black font-bold m-1 mt-2 text-xl">Hà Giang</p>
              <div className="flex ml-1 justify-between">
                <p className="text-xl text-red-500 ">6,500,000đ</p>
                <div className="flex space-x-2 items-center mr-2">
                  <FaBus />
                  <GiShipBow />
                  <GiCommercialAirplane />
                </div>
              </div>
              <p className="text-gray-400 text-sm ml-1 line-through">
                8,437,000đ
              </p>
              <div className="flex ml-1 space-x-2 items-center text-sm">
                <BsCalendar4Week />
                <p>Khởi hành: Thứ 5</p>
              </div>
              <div className="flex ml-1 items-center justify-between text-sm mb-2">
                <div className="flex space-x-2 items-center">
                  <BsCalendarHeart />
                  <p>Thời gian: 3 ngày 2 đêm</p>
                </div>
                <TiWeatherPartlySunny size={20} className="mr-2" />
              </div>
            </div>

            <div className="flex flex-col justify-between font-sriracha w-72 h-80 shadow-2xl shadow-gray-500/50 rounded-lg group overflow-hidden">
              <img
                src="https://dulichvietnam.com.vn/vnt_upload/news/10_2019/dia-diem-mua-dong-4.jpg"
                alt="Tour Sapa"
                className="h-44 rounded-t-lg object-cover transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
              <p className="text-black font-bold m-1 mt-2 text-xl">Sapa</p>
              <div className="flex ml-1 justify-between">
                <p className="text-xl text-red-500 ">6,500,000đ</p>
                <div className="flex space-x-2 items-center mr-2">
                  <FaBus />
                  <GiShipBow />
                  <GiCommercialAirplane />
                </div>
              </div>
              <p className="text-gray-400 text-sm ml-1 line-through">
                8,437,000đ
              </p>
              <div className="flex ml-1 space-x-2 items-center text-sm">
                <BsCalendar4Week />
                <p>Khởi hành: Thứ 5</p>
              </div>
              <div className="flex ml-1 items-center justify-between text-sm mb-2">
                <div className="flex space-x-2 items-center">
                  <BsCalendarHeart />
                  <p>Thời gian: 3 ngày 2 đêm</p>
                </div>
                <TiWeatherPartlySunny size={20} className="mr-2" />
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

export default ListTour;

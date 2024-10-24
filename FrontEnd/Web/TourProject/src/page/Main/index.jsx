import { useEffect, useRef, useState } from "react";
import axios from "axios";
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
import { FaBus, FaCar, FaTrain } from "react-icons/fa6";
import { GiCommercialAirplane, GiShipBow } from "react-icons/gi";
import { BsCalendar4Week, BsCalendarHeart } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import Footer from "../../layouts/Footer";
import { useNavigate } from "react-router-dom";

function MainLayout() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSlide1Active, setIsSlide1Active] = useState(true);
  const [northernTours, setNorthernTours] = useState([]);
  const [centralTours, setCentralTours] = useState([]);
  const [southernTours, setSouthernTours] = useState([]);

  const images = [bn1, bn2];

  function goToNextSlide() {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    setIsSlide1Active((prev) => !prev);
  }

  function goToPreviousSlide() {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setIsSlide1Active((prev) => !prev);
  }

  //Animation slide Header
  useEffect(() => {
    const slide1 = document.getElementById("slide1");
    const slide2 = document.getElementById("slide2");

    // Đặt ảnh đầu tiên
    slide1.style.backgroundImage = `url(${images[currentImageIndex]})`;
    slide2.style.backgroundImage = `url(${
      images[(currentImageIndex + 1) % images.length]
    })`;

    const nextSlide = isSlide1Active ? slide2 : slide1;
    const currentSlide = isSlide1Active ? slide1 : slide2;

    // Add class to handle sliding transition
    nextSlide.classList.remove("translate-x-full");
    currentSlide.classList.add("translate-x-full");
  }, [currentImageIndex, isSlide1Active]);

  //Animation text
  useEffect(() => {
    const tourText = document.querySelector(".tour-text");
    const holidayText = document.querySelector(".holiday-text");

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

  //Hiện thị trang Chi tiết tour
  const navigate = useNavigate();

  const handleNavigate = (tour) => {
    navigate("/detail", { state: { tour } }); // Điều hướng đến trang khác
  };

  //Call API Tour by Region
  const fetchToursByRegion = async (region) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/tours/region`,
        {
          params: { region },
        }
      );

      // Cập nhật state tương ứng với miền
      if (region === "NORTH") {
        setNorthernTours(response.data);
      } else if (region === "CENTRAL") {
        setCentralTours(response.data);
      } else if (region === "SOUTH") {
        setSouthernTours(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchToursByRegion("NORTH");
    fetchToursByRegion("CENTRAL");
    fetchToursByRegion("SOUTH");
  }, []);

  // Hàm định dạng giá tiền
  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0, // không hiển thị số thập phân
      maximumFractionDigits: 0,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày và đảm bảo có 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng (tháng 0 bắt đầu từ 0)
    const year = date.getFullYear(); // Lấy năm
    return `${day}/${month}/${year}`; // Trả về định dạng "dd/mm/yyyy"
  };

  //Tour Card By Region
  const TourCard = ({ tour }) => {
    return (
      <div className="flex flex-col justify-between font-sriracha w-80 h-80 shadow-2xl shadow-gray-500/50 rounded-lg group overflow-hidden">
        <img
          src={tour.urlImage[0]}
          alt={tour.name}
          className="h-44 rounded-t-lg object-cover transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
        />
        <p className="text-black font-bold m-1 mt-2 text-xl">{tour.name}</p>
        <div className="flex ml-1 justify-between">
          <p className="text-xl text-red-500">{formatCurrency(tour.price)}</p>
          <div className="flex space-x-2 items-center mr-2">
            {tour.tourFeatureDTO.transportationMode.includes("AIRPLANE") && (
              <GiCommercialAirplane />
            )}
            {tour.tourFeatureDTO.transportationMode.includes("BUS") && (
              <FaBus />
            )}
            {tour.tourFeatureDTO.transportationMode.includes("TRAIN") && (
              <FaTrain />
            )}
            {tour.tourFeatureDTO.transportationMode.includes("PRIVATE_CAR") && (
              <FaCar />
            )}
          </div>
        </div>
        <p className="text-gray-400 text-sm ml-1 line-through self-start">
          {formatCurrency(tour.oldPrice || 10000000)}
        </p>
        <div className="flex ml-1 justify-between items-center text-sm">
          <div className="flex space-x-2 items-center">
            <BsCalendar4Week />
            <p>Khởi hành: {formatDate(tour.departureDate)}</p>
          </div>

          {/* Số chỗ trống di chuyển sát lề phải */}
          <p className="text-sm text-green-600 mr-2">
            {tour.availableSlot > 0
              ? `Còn ${tour.availableSlot} chỗ trống`
              : "Hết chỗ"}
          </p>
        </div>
        <div className="flex ml-1 items-center justify-between text-sm mb-2">
          <div className="flex space-x-2 items-center">
            <BsCalendarHeart />
            <p>
              Thời gian: {tour.day} ngày {tour.night} đêm
            </p>
          </div>
          <TiWeatherPartlySunny size={20} className="mr-2" />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <Header />
        <Menu name="Home" />

        <div className="relative w-full h-[500px] overflow-hidden md:h-[500px] sm:h-[250px]">
          <div
            id="slide1"
            className="absolute inset-0 bg-center bg-cover object-cover slide-background"
          >
            <div className="relative w-full h-full">
              <div className="flex items-center justify-center w-full h-full absolute top-0 left-0 z-20">
                <p className="text-white text-6xl font-dancing-script font-bold">
                  Trải nghiệm qua những chuyến đi
                </p>
              </div>
            </div>
          </div>
          <div
            id="slide2"
            className="absolute inset-0 bg-center bg-cover object-cover slide-background translate-x-full"
          >
            <div className="relative w-full h-full">
              <div className="flex items-center justify-center w-full h-full absolute top-0 left-0 z-20">
                <p className="text-white text-6xl font-dancing-script font-bold">
                  Đi cùng bạn, thích hơn nhiều
                </p>
              </div>
            </div>
          </div>
          <div
            className="absolute top-1/2 left-2 transform -translate-y-1/2 text-textColorCustom z-10 p-2 rounded-full bg-white/20 hover:bg-white/90"
            onClick={goToPreviousSlide}
          >
            <IoIosArrowDropleftCircle size={20} />
          </div>
          <div
            className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 text-textColorCustom p-2 rounded-full bg-white/20 hover:bg-white/90"
            onClick={goToNextSlide}
          >
            <IoIosArrowDroprightCircle size={20} />
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

        {/* Tour 4 miền */}
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
                Miền Bắc
              </p>
            </div>

            <div className="flex flex-wrap justify-center space-x-4 p-4">
              {northernTours.slice(0, 3).map((tour) => (
                <button
                  key={tour.id}
                  onClick={() => {
                    handleNavigate(tour);
                  }}
                >
                  <TourCard key={tour.id} tour={tour} />
                </button>
              ))}
            </div>
          </div>

          {/* MT */}
          <div className="flex items-center space-x-6 mt-3 mb-3">
            <div className="flex flex-wrap justify-center space-x-4 p-4">
              {centralTours.slice(0, 3).map((tour) => (
                <button key={tour.id} onClick={() => handleNavigate(tour)}>
                  <TourCard key={tour.id} tour={tour} />
                </button>
              ))}
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
                Miền Trung
              </p>
            </div>
          </div>

          {/* MN */}
          <div className="flex items-center space-x-6 mt-3 mb-3">
            <div
              ref={(el) => (elementRefs.current[2] = el)}
              data-direction="left"
              className="group overflow-hidden relative w-72 h-72 rounded-full "
            >
              <img
                src={BaDenImage}
                alt="Núi Bà Đen"
                className="w-full h-full object-cover rounded-full transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
              <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 text-4xl font-dancing-script text-white font-bold">
                Miền Nam
              </p>
            </div>

            <div className="flex flex-wrap justify-center space-x-4 p-4">
              {southernTours.slice(0, 3).map((tour) => (
                <button key={tour.id} onClick={() => handleNavigate(tour)}>
                  <TourCard key={tour.id} tour={tour} />
                </button>
              ))}
            </div>
          </div>

          {/* MTay */}
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
              ref={(el) => (elementRefs.current[3] = el)}
              data-direction="right"
              className="group overflow-hidden relative w-72 h-72 rounded-full "
            >
              <img
                src={PhuQuocImage}
                alt="Phú Quốc"
                className="w-full h-full object-cover rounded-full transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
              <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 text-4xl font-dancing-script text-white font-bold whitespace-nowrap">
                Miền Tây
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;

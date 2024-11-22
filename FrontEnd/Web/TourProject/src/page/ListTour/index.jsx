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

import { FaBus, FaCar, FaTrain } from "react-icons/fa6";
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
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ModalSetCriteria from "../../components/ModalSetCriteria";

function ListTour() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const region = queryParams.get("region");

  const [currentPage, setCurrentPage] = useState(1);
  const [toursPerPage, setToursPerPage] = useState(12);
  const [tourList, setTourList] = useState([]); // Danh sách tour
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const [sortType, setSortType] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
    console.log("hihi show modal")
  }
  const handleClose = () => setIsModalVisible(false);

  const fetchTours = async () => {
    try {
      let url = `http://localhost:8000/api/v1/tours/region`;
      const params = {
        region,
        page: currentPage,
        size: toursPerPage,
        isAscending: true,
      };

      switch (sortType) {
        case "startDateNew": // Mới nhất
          params.isAscending = false; // Ngày giảm dần
          break;

        case "priceDesc": // Giá cao nhất
          url = `http://localhost:8000/api/v1/tours/region-order-by-price`;
          params.isAscending = false;
          break;

        case "priceAsc": // Giá thấp nhất
          url = `http://localhost:8000/api/v1/tours/region-order-by-price`;
          params.isAscending = true;
          break;
        case "departureDateAsc": // Khởi hành sớm nhất
          url = `http://localhost:8000/api/v1/tours/region-order-by-departure-date`;
          params.isAscending = true;
          break;
        case "departureDateDesc": // Khởi hành muộn nhất
          url = `http://localhost:8000/api/v1/tours/region-order-by-departure-date`;
          params.isAscending = false;
          break;
        default:
          // Nếu không có sortType, giữ nguyên URL và params mặc định
          break;
      }

      const response = await axios.get(url, { params });
      setTourList(response.data.content); // Lưu danh sách tour
      setTotalPages(response.data?.totalPages || 0); // Tổng số trang
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, [region, currentPage, toursPerPage, sortType]);
  console.log("List Tour:", tourList);

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
          src={tour.urlImage?.[0] || "default-image-url.jpg"}
          alt={tour.name}
          className="h-44 rounded-t-lg object-cover transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
        />
        <p className="text-black font-bold m-1 mt-2 text-xl">{tour.name}</p>
        <div className="flex ml-1 justify-between">
          <p className="text-xl text-red-500">{formatCurrency(tour.price)}</p>
          <div className="flex space-x-2 items-center mr-2">
            {tour?.tourFeatureDTO?.transportationMode.includes("AIRPLANE") && (
              <GiCommercialAirplane />
            )}
            {tour?.tourFeatureDTO?.transportationMode.includes("BUS") && (
              <FaBus />
            )}
            {tour?.tourFeatureDTO?.transportationMode.includes("TRAIN") && (
              <FaTrain />
            )}
            {tour?.tourFeatureDTO?.transportationMode.includes(
              "PRIVATE_CAR"
            ) && <FaCar />}
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

  const handleNavigateDetailTour = (tour) => {
    navigate("/detail", { state: { tour } });
  };

  //Thực hiện phân trang
  // Hàm chuyển đến trang đầu tiên
  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  // Hàm chuyển đến trang cuối cùng
  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  // Hàm chuyển đến trang cụ thể
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Tạo danh sách trang hiển thị
  const pageNumbers = () => {
    const pageArr = [];
    let startPage = Math.max(1, currentPage - 2); // Bắt đầu hiển thị từ trang hiện tại - 2
    let endPage = Math.min(totalPages, currentPage + 2); // Kết thúc hiển thị ở trang hiện tại + 2

    if (currentPage <= 2) {
      endPage = Math.min(totalPages, 5);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(1, totalPages - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageArr.push(i);
    }

    return pageArr;
  };

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <Header />
        <Menu name="Tour" />
        <div className="w-full p-8 px-4 py-4 flex items-center justify-between">
          <div className="text-xl pl-[40px] font-bold">MIỀN TÂY</div>
          <div className="text-gray-600 pr-[40px]">
            Khám phá Miền Tây sông nước – Vùng đất yên bình với những trải
            nghiệm văn hóa, ẩm thực và thiên nhiên độc đáo.
          </div>
        </div>
        <div className="relative w-full pl-[50px] pr-[50px] mx-auto">
          <img
            alt="Aerial view of a coastal area with cable cars and boats"
            className="w-full  h-[600px] object-cover "
            src="https://res.cloudinary.com/doqbelkif/image/upload/v1726605769/9ae475e5-ab3e-4762-acd8-82a7a6e05086.png"
          />
        </div>

        <div className="bg-white container mx-auto px-8  w-3/4 py-6 flex justify-around text-center text-sm text-gray-700">
          <div className={"flex flex-col items-center justify-around"}>
            <img src={mountain} alt="Logo" className="w-[32px] h-auto" />
            <div>Tour mạo hiểm</div>
          </div>
          <div className={"flex flex-col items-center justify-center"}>
            <img src={river} alt="Logo" className="w-[32px] h-auto" />

            <div>Tour tham quan</div>
          </div>
          <div className={"flex flex-col items-center justify-center"}>
            <img src={buddhist} alt="Logo" className="w-[32px] h-auto" />
            <div>Tour văn hóa</div>
          </div>
          <div className={"flex flex-col items-center justify-center"}>
            <img src={jungle} alt="Logo" className="w-[32px] h-auto" />
            <div>Tour sinh thái</div>
          </div>
          <div className={"flex flex-col items-center justify-center"}>
            <img src={resort} alt="Logo" className="w-[32px] h-auto" />
            <div>Tour nghỉ dưỡng</div>
          </div>
          <div className={"flex flex-col items-center justify-center"}>
            <img src={target} alt="Logo" className="w-[32px] h-auto" />
            <div>Tour team building</div>
          </div>
        </div>
        <hr className="border-3 border-gray-500 w-full mb-4" />

        <div className="bg-white container mx-auto px-8  w-3/4 py-6 flex justify-around text-center text-sm text-gray-700">
          <div
            className={"flex flex-col items-center justify-center"}
            onClick={() => setSortType("startDateNew")}
          >
            <img src={news} alt="Logo" className="w-[32px] h-auto" />
            <div>Mới nhất</div>
          </div>
          <div
            className={"flex flex-col items-center justify-center"}
            onClick={() => setSortType("priceDesc")}
          >
            <img src={arrows} alt="Logo" className="w-[32px] h-auto" />
            <div>Giá cao nhất</div>
          </div>
          <div
            className={"flex flex-col items-center justify-center"}
            onClick={() => setSortType("priceAsc")}
          >
            <img src={arrows} alt="Logo" className="w-[32px] h-auto" />
            <div>Giá thấp nhất</div>
          </div>
          <div
            className={"flex flex-col items-center justify-center"}
            onClick={() => setSortType("departureDateAsc")}
          >
            <img src={early} alt="Logo" className="w-[32px] h-auto" />
            <div>Khởi hành sớm nhất</div>
          </div>
          <div
            className={"flex flex-col items-center justify-center"}
            onClick={() => setSortType("departureDateDesc")}
          >
            <img src={history} alt="Logo" className="w-[32px] h-auto" />
            <div>Khởi hành muộn nhất</div>
          </div>
          <div
            className={"flex flex-col items-center justify-center"}
            onClick={() => showModal()}
          >
            <img src={history} alt="Logo" className="w-[32px] h-auto" />
            <div>Lọc</div>
          </div>
        </div>
        {/* Tittle */}
        <div className="">
          <ModalSetCriteria
            visible={isModalVisible}
            onClose={handleClose}
          /></div>
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
          {/* Danh sách tour */}
          <div className="flex flex-wrap justify-center space-x-4 p-4">
            {tourList.map((tour, index) => (
              <button
                key={tour.tourId ? tour.tourId : `${index}`}
                onClick={() => handleNavigateDetailTour(tour)}
                className="mb-8"
              >
                <TourCard tour={tour} />
              </button>
            ))}
          </div>

          {/* Nút phân trang */}
          <div className="flex justify-center space-x-4 mt-4">
            {/* Nút trang đầu */}
            <button
              onClick={handleFirstPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Trang đầu
            </button>

            {/* Hiển thị các số trang */}
            {pageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded ${page === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                  }`}
              >
                {page}
              </button>
            ))}

            {/* Nút trang cuối */}
            <button
              onClick={handleLastPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Trang cuối
            </button>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default ListTour;

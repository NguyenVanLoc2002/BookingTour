import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "../../layouts/Header";
import Menu from "../../layouts/Menu";
import bn1 from "/src/assets/banner/h1-slider-img-1-.jpg";
import bn2 from "/src/assets/banner/h1-slider-img-2-.jpg";
import haLongImage from "/src/assets/famous-landmark/ha-long_MB.jpg";
import thacNuocImage from "/src/assets/famous-landmark/thac-nuoc-goi-y.jpg";
import HoiAnImage from "/src/assets/famous-landmark/HoiAn_MT.jpg";
import PhuQuocImage from "/src/assets/famous-landmark/PhuQuoc_MN.jpg";
import BaDenImage from "/src/assets/famous-landmark/Nui-ba-den-Tay-Ninh.jpg";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { FaBus, FaCar, FaTrain, FaAngleRight } from "react-icons/fa6";
import { GiCommercialAirplane, GiShipBow } from "react-icons/gi";
import { BsCalendar4Week, BsCalendarHeart } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import Footer from "../../layouts/Footer";
import { useNavigate } from "react-router-dom";
import ChatBot from "../../layouts/ChatBot";
function MainLayout() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSlide1Active, setIsSlide1Active] = useState(true);
  const [northernTours, setNorthernTours] = useState([]);
  const [centralTours, setCentralTours] = useState([]);
  const [southernTours, setSouthernTours] = useState([]);
  const [isAscending, setIsAscending] = useState(true);

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
    slide2.style.backgroundImage = `url(${images[(currentImageIndex + 1) % images.length]
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

  const handleNavigatePhuHop = (tours) => {
    navigate('/listTour', { state: { tours } }); // Điều hướng đến trang khác
  };
  const handleNavigateGoiY = (tours) => {
    navigate('/listTour', { state: { tours } }); // Điều hướng đến trang khác
  };

  //Call API Tour by Region
  const fetchToursByRegion = async (region) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/tours/region`,
        {
          params: { region, page: 1, size: 3 , isAscending}, 
        }
      );
      // Cập nhật state tương ứng với miền
      if (region === "NORTH") {
        setNorthernTours(response.data.content);
      } else if (region === "CENTRAL") {
        setCentralTours(response.data.content);
      } else if (region === "SOUTH") {
        setSouthernTours(response.data.content);
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

  const [listMienBac, setListMienBac] = useState([
    {
      id: 1,
      urlImage: ["https://res.cloudinary.com/doqbelkif/image/upload/v1731599270/e242afdc-8a8a-439f-b36c-02de8787a06f.png"],
      price: 6500000,
      oldPrice: 8500000,
      name: 'Vịnh Hạ Long-Quảng Ninh',
      tourFeatureDTO: { transportationMode: "BUS" },
      ngayKhoiHanh: "05-09-2024",
      thoiGian: "3 ngày 2 đêm",
      availableSlot: 25,
      departureDate: "05-11-2024",
      thoiTiet: "nang",
      soLuongVe: 50,
      soVeDaDat: 32,
      day: 3,
      night: 2,
      noiKhoiHanh: "Hồ Chí Minh",
      diemThamQuan: "Vịnh Hạ Long-Quảng Ninh-Núi Đá",
      noiNghiNgoi: "Khách sạn",
      amThuc: "03 bữa sáng + 03 bữa trưa + 02 bữa tối.",
      phuongTien: "may bay, xe du lịch",
      ngayKetThuc: "08-09-2024",
      noiKetThuc: "Phú Quốc",
      listAnh: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
        "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
        "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"],
      traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát rực rỡ và thời tiết nắng ấm quanh năm. Từng là bí mật, giờ đây Mũi Né đã trở thành điểm đến phổ biến cho những người tìm kiếm sự thư giãn, hoạt động ngoài trời và vẻ đẹp tự nhiên.",
      chuongTrinh: [{
        title: "Phan Thiết- Nui Tà Cù",
        detail: " Đến với Bình Thuận Quý khách dừng chân và tham quan:  + NÚI TÀ CÚ: là một địa điểm leo núi, khung cảnh nơi đây hoang sơ, ký vỹ với núi non trùng điệp, thấp thoáng mái chùa có kính ấn sau rừng cây. "
      },
      {
        title: "Khu du lịch Bàu Sen",
        detail: "  Đoàn dùng bữa trưa tại nhà hàng KDL TA CŨ dưới chân núi. Tại đây, quý khách có thể thu giân thưởng thức món giải khát thanh nhiệt, nổi tiếng Bình Thuận: MỦ TRÔM ĐƯỜNG PHÊN hoặc mua làm quà cho người thân.  "
      },
      {
        title: "Biển Mũi Né",
        detail: "Quý khách dùng bữa tối. Sau đó tự do nghỉ ngơi hoặc dạo biển đêm Mũi"
      }
      ],
      thongTinTapTrung: {
        ngay: "05-09-2024",
        noi: "Sân bay tân sơn nhất, HCM"
      },
      thongTinHuongDanVien: {
        doan: "Bảo Trúc",
        tien: "Mai"
      },
      dieuKien: {
        baoGom: "Khách sạn: Phòng tiện nghi điều hoà, tivi, nóng lạnh khép kín 02-03 người/phòng.Phương tiện: 01 xe ô tô chỗ du lịch hiện đại, điều hòa, đời mới đưa ",
        khongBaoGom: "Bữa chính: 03 bữa sáng + 03 bữa trưa + 02 bữa tối.Vé thắng cảnh vào cổng các điểm du lịch theo chương trình.",
        giaveTreEm: "Mỗi gia đình chỉ có tiêu chuẩn là 1 trẻ em, trẻ em thứ 2 tính như người lớn, tính 100% giá tour.Dưới 05 tuổi: Miễn phí giá tour. Bố Mẹ tự lo ăn, nghỉ, vé thăm quan - nếu có.",
        huyTour: "+ Quy định hủy đối với ngày lễ, tết - Hủy trước 10 ngày khởi hành hoàn 50% phí tour - Hủy trước 03-09 ngày khởi hành hoàn 25% phí  .",
        thanhToan: "Quý khách nộp hồ sơ và đặt cọc 50% chi phí dịch vụ và 100% chi phí phát sinh (nếu có) khi đặt chổ."
      }
    },
    {
      id: 2,
      urlImage: ["https://res.cloudinary.com/doqbelkif/image/upload/v1731599241/78905ba3-dba0-4abf-9497-1ede46f990a6.png"],
      price: 6500000,
      oldPrice: 8500000,
      name: 'Vịnh Hạ Long-Quảng Ninh',
      tourFeatureDTO: { transportationMode: "BUS" },
      ngayKhoiHanh: "05-09-2024",
      thoiGian: "3 ngày 2 đêm",
      availableSlot: 25,
      departureDate: "05-11-2024",
      thoiTiet: "nang",
      soLuongVe: 50,
      soVeDaDat: 32,
      day: 3,
      night: 2,
      noiKhoiHanh: "Hồ Chí Minh",
      diemThamQuan: "Vịnh Hạ Long-Quảng Ninh-Núi Đá",
      noiNghiNgoi: "Khách sạn",
      amThuc: "03 bữa sáng + 03 bữa trưa + 02 bữa tối.",
      phuongTien: "may bay, xe du lịch",
      ngayKetThuc: "08-09-2024",
      noiKetThuc: "Phú Quốc",
      listAnh: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
        "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
        "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"],
      traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát rực rỡ và thời tiết nắng ấm quanh năm. Từng là bí mật, giờ đây Mũi Né đã trở thành điểm đến phổ biến cho những người tìm kiếm sự thư giãn, hoạt động ngoài trời và vẻ đẹp tự nhiên.",
      chuongTrinh: [{
        title: "Phan Thiết- Nui Tà Cù",
        detail: " Đến với Bình Thuận Quý khách dừng chân và tham quan:  + NÚI TÀ CÚ: là một địa điểm leo núi, khung cảnh nơi đây hoang sơ, ký vỹ với núi non trùng điệp, thấp thoáng mái chùa có kính ấn sau rừng cây. "
      },
      {
        title: "Khu du lịch Bàu Sen",
        detail: "  Đoàn dùng bữa trưa tại nhà hàng KDL TA CŨ dưới chân núi. Tại đây, quý khách có thể thu giân thưởng thức món giải khát thanh nhiệt, nổi tiếng Bình Thuận: MỦ TRÔM ĐƯỜNG PHÊN hoặc mua làm quà cho người thân.  "
      },
      {
        title: "Biển Mũi Né",
        detail: "Quý khách dùng bữa tối. Sau đó tự do nghỉ ngơi hoặc dạo biển đêm Mũi"
      }
      ],
      thongTinTapTrung: {
        ngay: "05-09-2024",
        noi: "Sân bay tân sơn nhất, HCM"
      },
      thongTinHuongDanVien: {
        doan: "Bảo Trúc",
        tien: "Mai"
      },
      dieuKien: {
        baoGom: "Khách sạn: Phòng tiện nghi điều hoà, tivi, nóng lạnh khép kín 02-03 người/phòng.Phương tiện: 01 xe ô tô chỗ du lịch hiện đại, điều hòa, đời mới đưa ",
        khongBaoGom: "Bữa chính: 03 bữa sáng + 03 bữa trưa + 02 bữa tối.Vé thắng cảnh vào cổng các điểm du lịch theo chương trình.",
        giaveTreEm: "Mỗi gia đình chỉ có tiêu chuẩn là 1 trẻ em, trẻ em thứ 2 tính như người lớn, tính 100% giá tour.Dưới 05 tuổi: Miễn phí giá tour. Bố Mẹ tự lo ăn, nghỉ, vé thăm quan - nếu có.",
        huyTour: "+ Quy định hủy đối với ngày lễ, tết - Hủy trước 10 ngày khởi hành hoàn 50% phí tour - Hủy trước 03-09 ngày khởi hành hoàn 25% phí  .",
        thanhToan: "Quý khách nộp hồ sơ và đặt cọc 50% chi phí dịch vụ và 100% chi phí phát sinh (nếu có) khi đặt chổ."
      }
    },
    {
      id: 3,
      urlImage: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png"],
      price: 6500000,
      oldPrice: 8500000,
      name: 'Vịnh Hạ Long-Quảng Ninh',
      tourFeatureDTO: { transportationMode: "BUS" },
      ngayKhoiHanh: "05-09-2024",
      thoiGian: "3 ngày 2 đêm",
      availableSlot: 25,
      departureDate: "05-11-2024",
      thoiTiet: "nang",
      soLuongVe: 50,
      soVeDaDat: 32,
      day: 3,
      night: 2,
      noiKhoiHanh: "Hồ Chí Minh",
      diemThamQuan: "Vịnh Hạ Long-Quảng Ninh-Núi Đá",
      noiNghiNgoi: "Khách sạn",
      amThuc: "03 bữa sáng + 03 bữa trưa + 02 bữa tối.",
      phuongTien: "may bay, xe du lịch",
      ngayKetThuc: "08-09-2024",
      noiKetThuc: "Phú Quốc",
      listAnh: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
        "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
        "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"],
      traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát rực rỡ và thời tiết nắng ấm quanh năm. Từng là bí mật, giờ đây Mũi Né đã trở thành điểm đến phổ biến cho những người tìm kiếm sự thư giãn, hoạt động ngoài trời và vẻ đẹp tự nhiên.",
      chuongTrinh: [{
        title: "Phan Thiết- Nui Tà Cù",
        detail: " Đến với Bình Thuận Quý khách dừng chân và tham quan:  + NÚI TÀ CÚ: là một địa điểm leo núi, khung cảnh nơi đây hoang sơ, ký vỹ với núi non trùng điệp, thấp thoáng mái chùa có kính ấn sau rừng cây. "
      },
      {
        title: "Khu du lịch Bàu Sen",
        detail: "  Đoàn dùng bữa trưa tại nhà hàng KDL TA CŨ dưới chân núi. Tại đây, quý khách có thể thu giân thưởng thức món giải khát thanh nhiệt, nổi tiếng Bình Thuận: MỦ TRÔM ĐƯỜNG PHÊN hoặc mua làm quà cho người thân.  "
      },
      {
        title: "Biển Mũi Né",
        detail: "Quý khách dùng bữa tối. Sau đó tự do nghỉ ngơi hoặc dạo biển đêm Mũi"
      }
      ],
      thongTinTapTrung: {
        ngay: "05-09-2024",
        noi: "Sân bay tân sơn nhất, HCM"
      },
      thongTinHuongDanVien: {
        doan: "Bảo Trúc",
        tien: "Mai"
      },
      dieuKien: {
        baoGom: "Khách sạn: Phòng tiện nghi điều hoà, tivi, nóng lạnh khép kín 02-03 người/phòng.Phương tiện: 01 xe ô tô chỗ du lịch hiện đại, điều hòa, đời mới đưa ",
        khongBaoGom: "Bữa chính: 03 bữa sáng + 03 bữa trưa + 02 bữa tối.Vé thắng cảnh vào cổng các điểm du lịch theo chương trình.",
        giaveTreEm: "Mỗi gia đình chỉ có tiêu chuẩn là 1 trẻ em, trẻ em thứ 2 tính như người lớn, tính 100% giá tour.Dưới 05 tuổi: Miễn phí giá tour. Bố Mẹ tự lo ăn, nghỉ, vé thăm quan - nếu có.",
        huyTour: "+ Quy định hủy đối với ngày lễ, tết - Hủy trước 10 ngày khởi hành hoàn 50% phí tour - Hủy trước 03-09 ngày khởi hành hoàn 25% phí  .",
        thanhToan: "Quý khách nộp hồ sơ và đặt cọc 50% chi phí dịch vụ và 100% chi phí phát sinh (nếu có) khi đặt chổ."
      }
    },
    {
      id: 4,
      urlImage: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png"],
      price: '6500000',
      oldPrice: '8500000',
      name: 'Vịnh Hạ Long-Quảng Ninh',
      tourFeatureDTO: { transportationMode: "BUS" },
      ngayKhoiHanh: "05-09-2024",
      thoiGian: "3 ngày 2 đêm",
      availableSlot: 25,
      departureDate: "05-11-2024",
      thoiTiet: "nang",
      soLuongVe: 50,
      soVeDaDat: 32,
      day: 3,
      night: 2,
      noiKhoiHanh: "Hồ Chí Minh",
      diemThamQuan: "Vịnh Hạ Long-Quảng Ninh-Núi Đá",
      noiNghiNgoi: "Khách sạn",
      amThuc: "03 bữa sáng + 03 bữa trưa + 02 bữa tối.",
      phuongTien: "may bay, xe du lịch",
      ngayKetThuc: "08-09-2024",
      noiKetThuc: "Phú Quốc",
      listAnh: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
        "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
        "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"],
      traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát rực rỡ và thời tiết nắng ấm quanh năm. Từng là bí mật, giờ đây Mũi Né đã trở thành điểm đến phổ biến cho những người tìm kiếm sự thư giãn, hoạt động ngoài trời và vẻ đẹp tự nhiên.",
      chuongTrinh: [{
        title: "Phan Thiết- Nui Tà Cù",
        detail: " Đến với Bình Thuận Quý khách dừng chân và tham quan:  + NÚI TÀ CÚ: là một địa điểm leo núi, khung cảnh nơi đây hoang sơ, ký vỹ với núi non trùng điệp, thấp thoáng mái chùa có kính ấn sau rừng cây. "
      },
      {
        title: "Khu du lịch Bàu Sen",
        detail: "  Đoàn dùng bữa trưa tại nhà hàng KDL TA CŨ dưới chân núi. Tại đây, quý khách có thể thu giân thưởng thức món giải khát thanh nhiệt, nổi tiếng Bình Thuận: MỦ TRÔM ĐƯỜNG PHÊN hoặc mua làm quà cho người thân.  "
      },
      {
        title: "Biển Mũi Né",
        detail: "Quý khách dùng bữa tối. Sau đó tự do nghỉ ngơi hoặc dạo biển đêm Mũi"
      }
      ],
      thongTinTapTrung: {
        ngay: "05-09-2024",
        noi: "Sân bay tân sơn nhất, HCM"
      },
      thongTinHuongDanVien: {
        doan: "Bảo Trúc",
        tien: "Mai"
      },
      dieuKien: {
        baoGom: "Khách sạn: Phòng tiện nghi điều hoà, tivi, nóng lạnh khép kín 02-03 người/phòng.Phương tiện: 01 xe ô tô chỗ du lịch hiện đại, điều hòa, đời mới đưa ",
        khongBaoGom: "Bữa chính: 03 bữa sáng + 03 bữa trưa + 02 bữa tối.Vé thắng cảnh vào cổng các điểm du lịch theo chương trình.",
        giaveTreEm: "Mỗi gia đình chỉ có tiêu chuẩn là 1 trẻ em, trẻ em thứ 2 tính như người lớn, tính 100% giá tour.Dưới 05 tuổi: Miễn phí giá tour. Bố Mẹ tự lo ăn, nghỉ, vé thăm quan - nếu có.",
        huyTour: "+ Quy định hủy đối với ngày lễ, tết - Hủy trước 10 ngày khởi hành hoàn 50% phí tour - Hủy trước 03-09 ngày khởi hành hoàn 25% phí  .",
        thanhToan: "Quý khách nộp hồ sơ và đặt cọc 50% chi phí dịch vụ và 100% chi phí phát sinh (nếu có) khi đặt chổ."
      }
    },
    {
      id: 5,
      urlImage: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png"],
      price: '6500000',
      oldPrice: '8500000',
      name: 'Vịnh Hạ Long-Quảng Ninh',
      tourFeatureDTO: { transportationMode: "BUS" },
      ngayKhoiHanh: "05-09-2024",
      thoiGian: "3 ngày 2 đêm",
      availableSlot: 25,
      departureDate: "05-11-2024",
      thoiTiet: "nang",
      soLuongVe: 50,
      soVeDaDat: 32,
      day: 3,
      night: 2,
      noiKhoiHanh: "Hồ Chí Minh",
      diemThamQuan: "Vịnh Hạ Long-Quảng Ninh-Núi Đá",
      noiNghiNgoi: "Khách sạn",
      amThuc: "03 bữa sáng + 03 bữa trưa + 02 bữa tối.",
      phuongTien: "may bay, xe du lịch",
      ngayKetThuc: "08-09-2024",
      noiKetThuc: "Phú Quốc",
      listAnh: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
        "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
        "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"],
      traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát rực rỡ và thời tiết nắng ấm quanh năm. Từng là bí mật, giờ đây Mũi Né đã trở thành điểm đến phổ biến cho những người tìm kiếm sự thư giãn, hoạt động ngoài trời và vẻ đẹp tự nhiên.",
      chuongTrinh: [{
        title: "Phan Thiết- Nui Tà Cù",
        detail: " Đến với Bình Thuận Quý khách dừng chân và tham quan:  + NÚI TÀ CÚ: là một địa điểm leo núi, khung cảnh nơi đây hoang sơ, ký vỹ với núi non trùng điệp, thấp thoáng mái chùa có kính ấn sau rừng cây. "
      },
      {
        title: "Khu du lịch Bàu Sen",
        detail: "  Đoàn dùng bữa trưa tại nhà hàng KDL TA CŨ dưới chân núi. Tại đây, quý khách có thể thu giân thưởng thức món giải khát thanh nhiệt, nổi tiếng Bình Thuận: MỦ TRÔM ĐƯỜNG PHÊN hoặc mua làm quà cho người thân.  "
      },
      {
        title: "Biển Mũi Né",
        detail: "Quý khách dùng bữa tối. Sau đó tự do nghỉ ngơi hoặc dạo biển đêm Mũi"
      }
      ],
      thongTinTapTrung: {
        ngay: "05-09-2024",
        noi: "Sân bay tân sơn nhất, HCM"
      },
      thongTinHuongDanVien: {
        doan: "Bảo Trúc",
        tien: "Mai"
      },
      dieuKien: {
        baoGom: "Khách sạn: Phòng tiện nghi điều hoà, tivi, nóng lạnh khép kín 02-03 người/phòng.Phương tiện: 01 xe ô tô chỗ du lịch hiện đại, điều hòa, đời mới đưa ",
        khongBaoGom: "Bữa chính: 03 bữa sáng + 03 bữa trưa + 02 bữa tối.Vé thắng cảnh vào cổng các điểm du lịch theo chương trình.",
        giaveTreEm: "Mỗi gia đình chỉ có tiêu chuẩn là 1 trẻ em, trẻ em thứ 2 tính như người lớn, tính 100% giá tour.Dưới 05 tuổi: Miễn phí giá tour. Bố Mẹ tự lo ăn, nghỉ, vé thăm quan - nếu có.",
        huyTour: "+ Quy định hủy đối với ngày lễ, tết - Hủy trước 10 ngày khởi hành hoàn 50% phí tour - Hủy trước 03-09 ngày khởi hành hoàn 25% phí  .",
        thanhToan: "Quý khách nộp hồ sơ và đặt cọc 50% chi phí dịch vụ và 100% chi phí phát sinh (nếu có) khi đặt chổ."
      }
    },
    {
      id: 6,
      urlImage: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png"],
      price: '6500000',
      oldPrice: '8500000',
      name: 'Vịnh Hạ Long-Quảng Ninh',
      tourFeatureDTO: { transportationMode: "BUS" },
      ngayKhoiHanh: "05-09-2024",
      thoiGian: "3 ngày 2 đêm",
      availableSlot: 25,
      departureDate: "05-11-2024",
      thoiTiet: "nang",
      soLuongVe: 50,
      soVeDaDat: 32,
      day: 3,
      night: 2,
      noiKhoiHanh: "Hồ Chí Minh",
      diemThamQuan: "Vịnh Hạ Long-Quảng Ninh-Núi Đá",
      noiNghiNgoi: "Khách sạn",
      amThuc: "03 bữa sáng + 03 bữa trưa + 02 bữa tối.",
      phuongTien: "may bay, xe du lịch",
      ngayKetThuc: "08-09-2024",
      noiKetThuc: "Phú Quốc",
      listAnh: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
        "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
        "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"],
      traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát rực rỡ và thời tiết nắng ấm quanh năm. Từng là bí mật, giờ đây Mũi Né đã trở thành điểm đến phổ biến cho những người tìm kiếm sự thư giãn, hoạt động ngoài trời và vẻ đẹp tự nhiên.",
      chuongTrinh: [{
        title: "Phan Thiết- Nui Tà Cù",
        detail: " Đến với Bình Thuận Quý khách dừng chân và tham quan:  + NÚI TÀ CÚ: là một địa điểm leo núi, khung cảnh nơi đây hoang sơ, ký vỹ với núi non trùng điệp, thấp thoáng mái chùa có kính ấn sau rừng cây. "
      },
      {
        title: "Khu du lịch Bàu Sen",
        detail: "  Đoàn dùng bữa trưa tại nhà hàng KDL TA CŨ dưới chân núi. Tại đây, quý khách có thể thu giân thưởng thức món giải khát thanh nhiệt, nổi tiếng Bình Thuận: MỦ TRÔM ĐƯỜNG PHÊN hoặc mua làm quà cho người thân.  "
      },
      {
        title: "Biển Mũi Né",
        detail: "Quý khách dùng bữa tối. Sau đó tự do nghỉ ngơi hoặc dạo biển đêm Mũi"
      }
      ],
      thongTinTapTrung: {
        ngay: "05-09-2024",
        noi: "Sân bay tân sơn nhất, HCM"
      },
      thongTinHuongDanVien: {
        doan: "Bảo Trúc",
        tien: "Mai"
      },
      dieuKien: {
        baoGom: "Khách sạn: Phòng tiện nghi điều hoà, tivi, nóng lạnh khép kín 02-03 người/phòng.Phương tiện: 01 xe ô tô chỗ du lịch hiện đại, điều hòa, đời mới đưa ",
        khongBaoGom: "Bữa chính: 03 bữa sáng + 03 bữa trưa + 02 bữa tối.Vé thắng cảnh vào cổng các điểm du lịch theo chương trình.",
        giaveTreEm: "Mỗi gia đình chỉ có tiêu chuẩn là 1 trẻ em, trẻ em thứ 2 tính như người lớn, tính 100% giá tour.Dưới 05 tuổi: Miễn phí giá tour. Bố Mẹ tự lo ăn, nghỉ, vé thăm quan - nếu có.",
        huyTour: "+ Quy định hủy đối với ngày lễ, tết - Hủy trước 10 ngày khởi hành hoàn 50% phí tour - Hủy trước 03-09 ngày khởi hành hoàn 25% phí  .",
        thanhToan: "Quý khách nộp hồ sơ và đặt cọc 50% chi phí dịch vụ và 100% chi phí phát sinh (nếu có) khi đặt chổ."
      }
    },
    {
      id: 7,
      urlImage: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png"],
      price: '6500000',
      oldPrice: '8500000',
      name: 'Vịnh Hạ Long-Quảng Ninh',
      tourFeatureDTO: { transportationMode: "BUS" },
      ngayKhoiHanh: "05-09-2024",
      thoiGian: "3 ngày 2 đêm",
      availableSlot: 25,
      departureDate: "05-11-2024",
      thoiTiet: "nang",
      soLuongVe: 50,
      soVeDaDat: 32,
      day: 3,
      night: 2,
      noiKhoiHanh: "Hồ Chí Minh",
      diemThamQuan: "Vịnh Hạ Long-Quảng Ninh-Núi Đá",
      noiNghiNgoi: "Khách sạn",
      amThuc: "03 bữa sáng + 03 bữa trưa + 02 bữa tối.",
      phuongTien: "may bay, xe du lịch",
      ngayKetThuc: "08-09-2024",
      noiKetThuc: "Phú Quốc",
      listAnh: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
        "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
        "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"],
      traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát rực rỡ và thời tiết nắng ấm quanh năm. Từng là bí mật, giờ đây Mũi Né đã trở thành điểm đến phổ biến cho những người tìm kiếm sự thư giãn, hoạt động ngoài trời và vẻ đẹp tự nhiên.",
      chuongTrinh: [{
        title: "Phan Thiết- Nui Tà Cù",
        detail: " Đến với Bình Thuận Quý khách dừng chân và tham quan:  + NÚI TÀ CÚ: là một địa điểm leo núi, khung cảnh nơi đây hoang sơ, ký vỹ với núi non trùng điệp, thấp thoáng mái chùa có kính ấn sau rừng cây. "
      },
      {
        title: "Khu du lịch Bàu Sen",
        detail: "  Đoàn dùng bữa trưa tại nhà hàng KDL TA CŨ dưới chân núi. Tại đây, quý khách có thể thu giân thưởng thức món giải khát thanh nhiệt, nổi tiếng Bình Thuận: MỦ TRÔM ĐƯỜNG PHÊN hoặc mua làm quà cho người thân.  "
      },
      {
        title: "Biển Mũi Né",
        detail: "Quý khách dùng bữa tối. Sau đó tự do nghỉ ngơi hoặc dạo biển đêm Mũi"
      }
      ],
      thongTinTapTrung: {
        ngay: "05-09-2024",
        noi: "Sân bay tân sơn nhất, HCM"
      },
      thongTinHuongDanVien: {
        doan: "Bảo Trúc",
        tien: "Mai"
      },
      dieuKien: {
        baoGom: "Khách sạn: Phòng tiện nghi điều hoà, tivi, nóng lạnh khép kín 02-03 người/phòng.Phương tiện: 01 xe ô tô chỗ du lịch hiện đại, điều hòa, đời mới đưa ",
        khongBaoGom: "Bữa chính: 03 bữa sáng + 03 bữa trưa + 02 bữa tối.Vé thắng cảnh vào cổng các điểm du lịch theo chương trình.",
        giaveTreEm: "Mỗi gia đình chỉ có tiêu chuẩn là 1 trẻ em, trẻ em thứ 2 tính như người lớn, tính 100% giá tour.Dưới 05 tuổi: Miễn phí giá tour. Bố Mẹ tự lo ăn, nghỉ, vé thăm quan - nếu có.",
        huyTour: "+ Quy định hủy đối với ngày lễ, tết - Hủy trước 10 ngày khởi hành hoàn 50% phí tour - Hủy trước 03-09 ngày khởi hành hoàn 25% phí  .",
        thanhToan: "Quý khách nộp hồ sơ và đặt cọc 50% chi phí dịch vụ và 100% chi phí phát sinh (nếu có) khi đặt chổ."
      }
    },
  ]);

  //Tour Card By Region
  const TourCard = ({ tour }) => {
    return (
      <div className="bg-white flex flex-col justify-between font-sriracha w-80 h-80 shadow-2xl shadow-gray-500/50 rounded-lg group overflow-hidden">
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

  console.log("North: ", northernTours);
  console.log("MT: ", centralTours);
  console.log("MN: ", southernTours);

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
          {/*  list phù hợp */}
          <div className="bg-[#a0e9e5] rounded-2xl ">
            <div className="flex justify-between items-center space-x-6  ">
              <h2 className=" text-2xl font-sriracha font-bold pl-4 text-[#2c7a7b]">Tour phù hợp với bạn</h2>
              <button onClick={() => { handleNavigatePhuHop(listMienBac); }} className="pl-4 pr-4 p-2 bg-[#2c7a7b] bg-opacity-65 rounded-bl-2xl rounded-tr-2xl text-xl font-bold flex justify-center items-center text-[#e0fffa]">Xem tất cả  <FaAngleRight /></button>
            </div>
            <div className="flex flex-wrap justify-center space-x-4 p-4 ">
              {listMienBac.slice(0, 4).map((tour, index) => (
                <button
                  key={tour.id || index}
                  onClick={() => {
                    handleNavigate(tour);
                  }}
                >
                  <TourCard tour={tour} />
                </button>
              ))}
            </div>
          </div>
          {/*  list gợi ý */}
          <div className="bg-[#a0e8c5] rounded-2xl  ">
            <div className="flex justify-between items-center space-x-6  ">
              <h2 className=" text-2xl font-sriracha font-bold pl-4 text-[#00a86b]">Tour dành cho bạn</h2>
              <button
                onClick={() => { handleNavigateGoiY(listMienBac); }}
                className="pl-4 pr-4 p-2 bg-[#00a86b]  rounded-bl-2xl rounded-tr-2xl text-xl font-bold flex justify-center items-center text-[#f5f5dc]">Xem tất cả  <FaAngleRight /></button>
            </div>
            <div className="flex flex-wrap justify-center space-x-4 p-4 ">
              {listMienBac.slice(0, 4).map((tour, index) => (
                <button
                  key={tour.id || index}
                  onClick={() => {
                    handleNavigate(tour);
                  }}
                >
                  <TourCard tour={tour} />
                </button>
              ))}
            </div>
          </div>
          {/* MB */}
          <div className="flex items-center space-x-6 mt-3 mb-3">
            <div
              ref={(el) => (elementRefs.current[4] = el)}
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
              {northernTours.map((tour, index) => (
                <button
                  key={tour.id || index}
                  onClick={() => {
                    handleNavigate(tour);
                  }}
                >
                  <TourCard tour={tour} />
                </button>
              ))}
            </div>
          </div>

          {/* MT */}
          <div className="flex items-center space-x-6 mt-3 mb-3">
            <div className="flex flex-wrap justify-center space-x-4 p-4">
              {centralTours.map((tour, index) => (
                <button
                  key={tour.id || index}
                  onClick={() => handleNavigate(tour)}
                >
                  <TourCard tour={tour} />
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
              {southernTours.map((tour, index) => (
                <button
                  key={tour.id || index}
                  onClick={() => handleNavigate(tour)}
                >
                  <TourCard tour={tour} />
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
        <ChatBot />
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;

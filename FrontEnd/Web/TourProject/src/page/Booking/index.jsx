import { useEffect, useRef, useState } from "react";
import axios from "axios";

import Header from "../../layouts/Header";
import Menu from "../../layouts/Menu";
import Footer from "../../layouts/Footer";
import { useLocation } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

function Booking() {
  const location = useLocation();
  const { ticket } = location.state || {};
  const { tour } = location.state || {};
  const { user } = useUser();

  console.log("ticket: ", ticket);
  console.log("tour: ", tour);

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState(user?.address || "");
  const [modalMessage, setModalMessage] = useState(""); // Message to show in modal
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility

  const listTinh = [
    { label: "Hồ Chí Minh", value: "Hồ Chí Minh" },
    { label: "Long An", value: "Long An" },
    { label: "Tây Ninh", value: "Tây Ninh" },
    { label: "Hà Nội", value: "Hà Nội" },
  ];
  const listQuan = [
    { label: "Gò Vấp", value: "Gò Vấp" },
    { label: "Quận 1", value: "Quận 1" },
    { label: "Quận 2", value: "Quận 2" },
    { label: "Quận 3", value: "Quận 3" },
  ];
  const listPhuong = [
    { label: "Phường 1", value: "Phường 1" },
    { label: "Phường 2", value: "Phường 2" },
    { label: "Phường 3", value: "Phường 3" },
    { label: "Phường 4", value: "Phường 4" },
  ];
  const [selectedTinh, setSelectedTinh] = useState("Hồ Chí Minh");
  const [selectedQuan, setSelectedQuan] = useState("Gò Vấp");
  const [selectedPhuong, setSelectedPhuong] = useState("Phường 1");

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [toddlers, setToddlers] = useState(0);
  const [infants, setInfants] = useState(0);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const ascAdults = () => setAdults((prev) => prev + 1);
  const descAdults = () => setAdults((prev) => (prev > 1 ? prev - 1 : 1));
  const ascChildren = () => setChildren((prev) => prev + 1);
  const descChildren = () => setChildren((prev) => (prev > 0 ? prev - 1 : 0));
  const ascToddlers = () => setToddlers((prev) => prev + 1);
  const descToddlers = () => setToddlers((prev) => (prev > 0 ? prev - 1 : 0));
  const ascInfants = () => setInfants((prev) => prev + 1);
  const descInfants = () => setInfants((prev) => (prev > 0 ? prev - 1 : 0));

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

  const vndToUsdRate = 24000; // tỷ giá VND -> USD, ví dụ 1 USD = 24000 VND

  const bookingData = {
    tourId: tour.tourId,
    ticketId: ticket.ticketId,
    quantity: quantity,
    adults: adults,
    children: children,
    toddlers: toddlers,
    infants: infants,
    totalAmount: total /vndToUsdRate,
    customerId: user?.userId || null,
    email: user?.email || email,
    userName: user?.name || name,
    phoneNumber: user?.phoneNumber || phone,
    city: selectedTinh,
    district: selectedQuan,
    ward: selectedPhuong,
    address: user?.address || address,
  };
  console.log("booking Tour: ", bookingData);

  const handleBookTour = async () => {
    // Check if any of the required fields are empty
    if (!name || !phone || !email || !address) {
      setModalMessage("Vui lòng điền đầy đủ thông tin trước khi tiếp tục.");
      setIsModalOpen(true); // Open modal to inform user
      return; // Exit the function early if any field is missing
    }

    try {
      // Assuming `bookTour` is an async function that makes the API call
      const response = await bookTour(bookingData);
      console.log("API Response:", response);

      // If booking data is valid, show success modal
      setModalMessage(
        "Đặt tour thành công. Vui lòng kiểm tra email để xác nhận thông tin đặt tour và thực hiện thanh toán."
      );
      setIsModalOpen(true); // Open modal with success message
    } catch (error) {
      console.error("Error calling bookTour API:", error);
      setModalMessage("Đã xảy ra lỗi khi đặt tour. Vui lòng thử lại.");
      setIsModalOpen(true); // Open modal with error message
    }
  };

  console.log("Cus Info: ", user);

  const bookTour = async (bookingData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/booking/bookTour",
        bookingData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Booking Success:", response.data);
      return response.data; // Trả về dữ liệu từ API nếu cần sử dụng tiếp
    } catch (error) {
      if (error.response) {
        console.error("Booking Failed:", error.response.data);
      } else if (error.request) {
        console.error("No Response from Server");
      } else {
        console.error("Error:", error.message);
      }
      throw error; // Ném lỗi để xử lý ngoài hàm nếu cần
    }
  };

  // Hàm tính tổng tiền
  const calculateTotal = () => {
    let total = 0;
    let quantity = adults + children;

    // Tính tiền cho người lớn (100% giá vé)
    total += adults * tour.price;

    // Tính tiền cho trẻ em (70% giá vé cho tất cả trẻ em)
    total += children * (tour.price * 0.7);

    // Nếu thỏa mãn điều kiện có trẻ nhỏ (>= 2 trẻ nhỏ hoặc 1 trẻ nhỏ và 1 em bé)
    if (toddlers >= 2 || (toddlers >= 1 && infants >= 1)) {
      total += toddlers * (tour.price * 0.5);
      quantity += toddlers;
    }

    // Nếu thỏa mãn điều kiện có em bé (>= 2 em bé hoặc 1 em bé và 1 trẻ nhỏ)
    if (infants >= 2 || (infants >= 1 && toddlers >= 1)) {
      total += infants * (tour.price * 0.25);
      quantity += infants;
    }

    return { total, quantity };
  };

  // Hàm tính ngày kết thúc dựa trên ngày khởi hành và số ngày của tour
  const calculateEndDate = (departureDate, days) => {
    const startDate = new Date(departureDate); // Chuyển đổi ngày khởi hành thành đối tượng Date
    startDate.setDate(startDate.getDate() + days); // Cộng thêm số ngày của tour
    return startDate.toLocaleDateString("vi-VN"); // Định dạng ngày theo định dạng của Việt Nam (dd/mm/yyyy)
  };

  useEffect(() => {
    const { total, quantity } = calculateTotal();
    setTotal(total);
    setQuantity(quantity);
  }, [adults, children, toddlers, infants, tour.price]);

  // Modal component to show messages
  const Modal = ({ message, onClose }) => (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <p className="text-center text-lg mb-4">{message}</p>
        <button
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setIsModalOpen(false)}
        >
          Đóng
        </button>
      </div>
    </div>
  );

  console.log("Name: " + name);

  return (
    <>
      <div className="w-full h-full flex flex-col bg-slate-200">
        <Header />
        <Menu />
        <div className="flex mt-4 container mx-auto ">
          <div className="p-5 bg-gray-100 rounded-lg w-full">
            <div
              className="tour"
              style={{ display: "flex", alignItems: "flex-start" }}
            >
              <img
                src={tour?.urlImage[1]}
                alt="Tour"
                style={{
                  width: "60%",
                  height: "auto",
                  borderRadius: "8px",
                  paddingRight: 30,
                }}
              />
              <div
                className="detail-tour"
                style={{ marginLeft: "20px", flex: 1 }}
              >
                <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
                  {tour?.name}
                </h2>
                <p
                  style={{ fontSize: "18px", fontWeight: 500, paddingTop: 20 }}
                >
                  Khởi hành: {ticket?.departureDate}
                </p>

                <p style={{ fontSize: "18px", fontWeight: 500 }}>
                  Thời gian: {tour?.day} ngày {tour?.night} đêm
                </p>
                <p style={{ fontSize: "18px", fontWeight: 500 }}>
                  Số chỗ còn nhận: {ticket?.availableSlot}
                </p>
              </div>
            </div>
            <div
              className="box"
              style={{
                marginTop: "20px",
                padding: "15px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
            >
              <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>
                Số lượng:
              </h3>
              <div
                className="row-around"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div
                  className="box-hanhkhach"
                  style={{
                    border: "1px solid #3FD0D4",
                    borderRadius: "8px",
                    padding: "10px",
                    flex: "1",
                    margin: "5px",
                  }}
                >
                  <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Người lớn
                  </h4>
                  <p style={{ fontSize: "16px" }}>Từ 12 tuổi trở lên</p>
                  <button
                    onClick={descAdults}
                    style={{
                      padding: "5px 10px",
                      margin: "0 5px",
                      borderRadius: "5px",
                      backgroundColor: "gray",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {adults}
                  </span>
                  <button
                    onClick={ascAdults}
                    style={{
                      padding: "5px 10px",
                      margin: "0 5px",
                      borderRadius: "5px",
                      backgroundColor: "gray",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    +
                  </button>
                </div>

                <div
                  className="box-hanhkhach"
                  style={{
                    border: "1px solid #3FD0D4",
                    borderRadius: "8px",
                    padding: "10px",
                    flex: "1",
                    margin: "5px",
                  }}
                >
                  <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Trẻ em
                  </h4>
                  <p style={{ fontSize: "16px" }}>Từ 5 - dưới 12 tuổi</p>
                  <button
                    onClick={descChildren}
                    style={{
                      padding: "5px 10px",
                      margin: "0 5px",
                      borderRadius: "5px",
                      backgroundColor: "gray",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {children}
                  </span>
                  <button
                    onClick={ascChildren}
                    style={{
                      padding: "5px 10px",
                      margin: "0 5px",
                      borderRadius: "5px",
                      backgroundColor: "gray",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    +
                  </button>
                </div>

                <div
                  className="box-hanhkhach"
                  style={{
                    border: "1px solid #3FD0D4",
                    borderRadius: "8px",
                    padding: "10px",
                    flex: "1",
                    margin: "5px",
                  }}
                >
                  <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Trẻ nhỏ
                  </h4>
                  <p style={{ fontSize: "16px" }}>Từ 2 - dưới 5 tuổi</p>
                  <button
                    onClick={descToddlers}
                    style={{
                      padding: "5px 10px",
                      margin: "0 5px",
                      borderRadius: "5px",
                      backgroundColor: "gray",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {toddlers}
                  </span>
                  <button
                    onClick={ascToddlers}
                    style={{
                      padding: "5px 10px",
                      margin: "0 5px",
                      borderRadius: "5px",
                      backgroundColor: "gray",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    +
                  </button>
                </div>

                <div
                  className="box-hanhkhach"
                  style={{
                    border: "1px solid #3FD0D4",
                    borderRadius: "8px",
                    padding: "10px",
                    flex: "1",
                    margin: "5px",
                  }}
                >
                  <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Em bé
                  </h4>
                  <p style={{ fontSize: "16px" }}>Dưới 2 tuổi</p>
                  <button
                    onClick={descInfants}
                    style={{
                      padding: "5px 10px",
                      margin: "0 5px",
                      borderRadius: "5px",
                      backgroundColor: "gray",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {infants}
                  </span>
                  <button
                    onClick={ascInfants}
                    style={{
                      padding: "5px 10px",
                      margin: "0 5px",
                      borderRadius: "5px",
                      backgroundColor: "gray",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Thông tin liên lạc */}
            <div
              className="box"
              style={{
                marginTop: "20px",
                padding: "15px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
            >
              <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>
                Thông tin liên lạc
              </h3>
              <div className="only-one" style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Họ và tên *
                </label>
                <input
                  type="text"
                  value={user?.name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    padding: "10px",
                    width: "100%",
                    borderRadius: "5px",
                    border: "1px solid #3FD0D4",
                  }}
                />
              </div>
              <div className="only-one" style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Số điện thoại
                </label>
                <input
                  type="text"
                  value={user?.phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    padding: "10px",
                    width: "100%",
                    borderRadius: "5px",
                    border: "1px solid #3FD0D4",
                  }}
                />
              </div>
              <div className="only-one" style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Email *
                </label>
                <input
                  type="email"
                  value={user?.email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    padding: "10px",
                    width: "100%",
                    borderRadius: "5px",
                    border: "1px solid #3FD0D4",
                  }}
                />
              </div>

              {/* Tỉnh/Thành phố và Quận/Huyện */}
              <div
                className="row-around"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                }}
              >
                <div className="col" style={{ flex: "1", marginRight: "10px" }}>
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    Tỉnh/Thành phố
                  </label>
                  <select
                    value={selectedTinh}
                    onChange={(e) => setSelectedTinh(e.target.value)}
                    style={{
                      padding: "10px",
                      width: "100%",
                      borderRadius: "5px",
                      border: "1px solid #3FD0D4",
                    }}
                  >
                    {listTinh.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col" style={{ flex: "1", marginRight: "10px" }}>
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    Quận/Huyện
                  </label>
                  <select
                    value={selectedQuan}
                    onChange={(e) => setSelectedQuan(e.target.value)}
                    style={{
                      padding: "10px",
                      width: "100%",
                      borderRadius: "5px",
                      border: "1px solid #3FD0D4",
                    }}
                  >
                    {listQuan.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col" style={{ flex: "1" }}>
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    Phường/Xã
                  </label>
                  <select
                    value={selectedPhuong}
                    onChange={(e) => setSelectedPhuong(e.target.value)}
                    style={{
                      padding: "10px",
                      width: "100%",
                      borderRadius: "5px",
                      border: "1px solid #3FD0D4",
                    }}
                  >
                    {listPhuong.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="only-one" style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Địa chỉ cụ thể
                </label>
                <input
                  type="text"
                  value={user?.address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{
                    padding: "10px",
                    width: "100%",
                    borderRadius: "5px",
                    border: "1px solid #3FD0D4",
                  }}
                />
              </div>
            </div>

            <div
              className="box"
              style={{
                marginTop: "20px",
                padding: "15px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Tóm tắt chuyến đi
              </h3>

              <div style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>📅</span>
                  <div>
                    <p style={{ fontWeight: "bold" }}>
                      Bắt đầu chuyến đi:{" "}
                      <span>{formatDate(ticket.departureDate)}</span>
                    </p>
                    <p>
                      Nơi khởi hành: <span>{ticket.departureLocation}</span>
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: "10px" }}>📅</span>
                  <div>
                    <p style={{ fontWeight: "bold" }}>
                      Kết thúc chuyến đi:{" "}
                      <span>
                        {calculateEndDate(ticket.departureDate, tour.day)}
                      </span>
                    </p>
                    <p>
                      Nơi kết thúc: <span>{tour.destination}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Thông tin hành khách */}
              <h4 className="text-xl font-bold">Hành khách:</h4>

              {/* Thông tin người lớn */}
              <div className="border border-teal-400 rounded-lg p-4 mb-4">
                <p>
                  Người lớn: <span className="font-bold">{adults} người</span>
                </p>
                <p>
                  Giá tiền:{" "}
                  <span className="font-bold">
                    {adults} x {formatCurrency(tour.price)}
                  </span>
                </p>
                <p>
                  Phụ thu phòng riêng: <span className="font-bold">0đ</span>
                </p>
              </div>

              {/* Thông tin trẻ em */}
              {children > 0 && (
                <div className="border border-teal-400 rounded-lg p-4 mb-4">
                  <p>
                    Trẻ em: <span className="font-bold">{children} người</span>
                  </p>
                  <p>
                    Giá tiền:{" "}
                    <span className="font-bold">
                      {children} x {formatCurrency(tour.price * 0.7)}
                    </span>
                  </p>
                </div>
              )}

              {/* Thông tin trẻ nhỏ */}
              {(toddlers >= 2 || (toddlers >= 1 && infants >= 1) > 0) && (
                <div className="border border-teal-400 rounded-lg p-4 mb-4">
                  <p>
                    Trẻ nhỏ: <span className="font-bold">{toddlers} người</span>
                  </p>
                  <p>
                    Giá tiền:{" "}
                    <span className="font-bold">
                      {toddlers} x {formatCurrency(tour.price * 0.5)}
                    </span>
                  </p>
                </div>
              )}

              {/* Thông tin em bé */}
              {(infants >= 2 || (infants >= 1 && toddlers >= 1) > 0) && (
                <div className="border border-teal-400 rounded-lg p-4 mb-4">
                  <p>
                    Em bé: <span className="font-bold">{infants} người</span>
                  </p>
                  <p>
                    Giá tiền:{" "}
                    <span className="font-bold">
                      {infants} x {formatCurrency(tour.price * 0.25)}
                    </span>
                  </p>
                </div>
              )}

              {/* Thông tin khuyến mãi */}
              <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>
                Khuyến mãi:
              </h4>
              <div
                style={{
                  border: "1px solid #3FD0D4",
                  borderRadius: "8px",
                  padding: "10px",
                  marginBottom: "20px",
                }}
              >
                <p>
                  Ưu đãi giờ chót: còn {tour?.soLuongVe - tour?.soVeDaDat}/
                  {tour?.soLuongVe}
                </p>
                <p>
                  Người lớn:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    1 x{formatCurrency(300000)}
                  </span>
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                >
                  Mã giảm giá
                </button>
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#ff6f61",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  Áp dụng
                </button>
              </div>
            </div>
            <div
              style={{
                padding: "20px",
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                justifyItems: "center",
              }}
            >
              <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>
                TỔNG TIỀN: {formatCurrency(total)}
              </h4>
              <button
                style={{
                  padding: "10px 40px",
                  backgroundColor: "#3FD0D4",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
                onClick={handleBookTour}
              >
                THANH TOÁN
              </button>
              {isModalOpen && (
                <Modal
                  message={modalMessage}
                  onClose={() => setIsModalOpen(false)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default Booking;

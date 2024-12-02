import React, { useEffect, useState } from "react";
import PayPalButton from "@/components/PayPalButton.jsx";
import axios from "axios";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Menu from "../../layouts/Menu";
import { useUser } from "../../contexts/UserContext";
import { handleInteraction } from "../../services/api";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0); // Giả định số tiền cho tour
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const bookingId = queryParams.get("bookingId");
  const { user } = useUser();
  const token = localStorage.getItem("token");
  const [payment, setPayment] = useState();
  const [booking, setBooking] = useState({});
  const [tour, setTour] = useState({});

  useEffect(() => {
    const fetchBookingTour = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/booking/redis/${bookingId}`
        );
        setAmount(res.data.bookingDTO.totalAmount);
        setBooking(res.data.bookingDTO);
        setTour(res.data.tourDTO);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };
    if (bookingId) {
      fetchBookingTour();
    }
  }, [bookingId]);

  console.log("Book: ", booking);

  const handlePaymentSuccess = async (details) => {
    console.log("Payment successful:", details);

    const paymentID = details.id; // ID giao dịch từ PayPal
    const payerID = details.payer.payer_id; // ID người thanh toán
    const transactionId = details.purchase_units[0].payments.captures[0].id; // Lấy Transaction ID từ response của PayPal

    console.log("paymentID: ", paymentID);
    console.log("payerID: ", payerID);
    console.log("Transaction ID: ", transactionId);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/payments/success",
        {
          paymentId: paymentID,
          payerId: payerID,
          bookingId: bookingId,
          discountId: null,
          amount: details.purchase_units[0].amount.value, // Lấy số tiền từ purchase_units
          transactionId: transactionId,
        }
      );
      setPayment(res.data);
      console.log("Payment and booking status updated successfully.");

      if (user) {
        await handleInteraction(tour.tourId, "BOOK", user, token); 
      }
    } catch (error) {
      console.error("Error updating payment and booking status:", error);
    }
    setIsPaymentSuccess(true);
  };

  const handleCloseModal = () => {
    if (user) {
      navigate("/bookings");
      setIsPaymentSuccess(false);
    }else{
      navigate("/");
      setIsPaymentSuccess(false);
    }
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0, // không hiển thị số thập phân
      maximumFractionDigits: 0,
    });
  };

  const vndToUsdRate = 24000; // tỷ giá VND -> USD, ví dụ 1 USD = 24000 VND

  return (
    <>
      <div className="w-full h-full flex flex-col">
        {/* Header Section */}
        <Header />
        <Menu />
        {/* Booking Details Section */}
        <div className="w-full bg-gray-50 py-6">
          <div className="max-w-lg mx-auto text-center">
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Thông tin tour
            </h3>
            <p className="text-gray-600">
              Tour: Miền Tây - Khám phá sông nước.
            </p>
            <p className="text-gray-600">Ngày khởi hành: 01/12/2024</p>
          </div>
        </div>
        {/* Main Content Section */}
        <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
            Thanh toán tour du lịch
          </h2>
          <p className="mt-4 text-center text-gray-600">
            Số tiền cần thanh toán:{" "}
            <span className="font-semibold">
              {formatCurrency(amount * vndToUsdRate)}
            </span>
          </p>

          <div className="mt-6">
            <PayPalButton
              amount={amount}
              onSuccess={(details, data) => {
                handlePaymentSuccess(details);
              }}
            />
          </div>

          {isPaymentSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg p-6 text-center">
                <h2 className="text-2xl font-semibold text-green-600">
                  Thanh toán thành công!
                </h2>
                <p className="mt-2 text-gray-600">
                  Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
                </p>
                <p className="mt-4 text-sm text-gray-500">
                  Bạn sẽ được chuyển hướng đến trang đặt chỗ...
                </p>

                <button
                  onClick={handleCloseModal}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                >
                  Đóng
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Payment Confirmation Section */}
        <div className="w-full bg-white py-6 mt-6">
          <div className="max-w-lg mx-auto text-center">
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Xác nhận thanh toán
            </h3>
            <p className="text-gray-600">
              Sau khi thanh toán thành công, thông tin vé của bạn sẽ được cập
              nhật.
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <Footer />
      </div>
    </>
  );
};

export default PaymentPage;

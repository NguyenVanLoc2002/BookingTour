import React, { useEffect, useState } from "react";
import PayPalButton from "@/components/PayPalButton.jsx";
import axios from "axios";

const PaymentPage = () => {
  const [amount, setAmount] = useState(0); // Giả định số tiền cho tour
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const bookingId = queryParams.get("bookingId");
  const [payment, setPayment] = useState();

  useEffect(() => {
    

    const fetchBookingTour = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/booking/redis/${bookingId}`
        );
        setAmount(res.data.totalAmount);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };
    if (bookingId) {
      fetchBookingTour();
    }
  }, [bookingId]);

  const handlePaymentSuccess = async (details) => {
    console.log("Payment successful:", details);
    
    const paymentID = details.id; // ID giao dịch từ PayPal
    const payerID = details.payer.payer_id; // ID người thanh toán
    console.log("paymentID: ", paymentID);
    console.log("payerID: ", payerID);
    try {
      const  res = await axios.post("http://localhost:8000/api/v1/payments/success",{
          paymentId: paymentID,
          payerId: payerID,
          bookingId: bookingId,
          discountId: null,
          amount: details.purchase_units[0].amount.value, // Lấy số tiền từ purchase_units
      })
      setPayment(res.data);
      console.log("Payment and booking status updated successfully.");
    } catch (error) {
      console.error("Error updating payment and booking status:", error);
    }
    setIsPaymentSuccess(true);
  };

  console.log("payment: ", payment);

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0, // không hiển thị số thập phân
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Thanh toán tour du lịch
        </h2>
        <p className="mt-4 text-center text-gray-600">
          Số tiền cần thanh toán:{" "}
          <span className="font-semibold">{formatCurrency(amount)}</span>
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
          <div className="mt-6 p-4 text-center text-green-600 bg-green-100 rounded-md">
            Thanh toán thành công! Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;

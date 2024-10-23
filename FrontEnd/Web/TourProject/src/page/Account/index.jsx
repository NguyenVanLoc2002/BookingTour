import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "../../layouts/Header";
import Menu from "../../layouts/Menu";
import Footer from "../../layouts/Footer";

function Account() {
  // gioi tinh 1: nu, 2 nam
  const user = {
    name: "Bao Truc",
    url: "https://res.cloudinary.com/doqbelkif/image/upload/v1727453521/e015a22e-fa11-4f2c-86bf-322445d957ea.png",
    gioiTinh: 1,
    ngaySinh: "06/05/2002",
    email: "baotruc123@gmail.com",
    phone: "0338030541",
    city: "Hồ Chí Minh",
  };

  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [gioiTinh, setGioiTinh] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const token = localStorage.getItem("token"); // Lấy token từ localStorage

  const handleChinhSua = () => {
    setIsDisabled(false);
  };

  const handleHuy = () => {
    setIsDisabled(true);
  };

  const handleGenderChange = (e) => {
    setGioiTinh(e.target.value);
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 124 }, (_, i) => 1900 + i).reverse();
  const daysInMonth = month
    ? getDaysInMonth(month, year || new Date().getFullYear())
    : 31;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/customers/by-email",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCustomer(response.data);
        console.log("customer: ", response.data);
        setGioiTinh(response.data.gender);

        const dateParts = response.data.dateOfBirth.split("-");
        if (dateParts.length === 3) {
          setYear(dateParts[0]); // Lấy năm
          setMonth(dateParts[1]); // Lấy tháng
          setDay(dateParts[2]); // Lấy ngày
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [token]);

  const handleSave = async () => {
    const updatedCustomer = {
      name: customer.name,
      gender: gioiTinh,
      dateOfBirth: `${day}/${month}/${year}`,
      // Add other fields as needed
    };

    try {
      await axios.put(
        "http://localhost:8000/api/v1/customers/update",
        updatedCustomer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Information updated successfully!");
      setIsDisabled(true);
    } catch (error) {
      console.error("Error updating customer data:", error);
      alert("Failed to update information. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Hiển thị thông báo khi đang tải
  }

  return (
    <>
      <div className="w-full h-full flex flex-col bg-slate-200">
        <Header />
        <Menu />
        <div className="flex mt-4 container mx-auto">
          <div className="w-1/4 bg-white p-4 shadow rounded-lg">
            <div className="flex items-center space-x-4">
              <img
                className="h-24 w-24 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold border border-blue-300"
                src={user.url}
              />
              <div>
                <div className="font-bold text-lg">{customer.name}</div>
                <div className="text-gray-500">Google</div>
              </div>
            </div>
            <div className="mt-4 bg-yellow-100 p-2 rounded text-yellow-800">
              Chào mừng bạn là thành viên của LuckyPanda Travel
            </div>
            <div className="mt-4 space-y-2">
              <a className="flex items-center space-x-2 text-blue-600" href="#">
                Thẻ của tôi
              </a>
              <a className="flex items-center space-x-2 text-blue-600" href="#">
                <span>Thông tin hành khách</span>
              </a>
              <a className="flex items-center space-x-2 text-blue-600" href="#">
                <span>Hoàn tiền</span>
              </a>
            </div>
          </div>
          <div className="w-3/4 bg-white p-4 shadow ml-4 rounded-lg">
            <h2 className="text-2xl font-bold">Tài khoản và bảo mật</h2>
            <div className="mt-4">
              <div className="flex space-x-4 border-b">
                <a
                  className="pb-2 border-b-2 border-blue-600 text-blue-600"
                  href="#"
                >
                  Thông tin tài khoản
                </a>
                <a className="pb-2 text-gray-600" href="#">
                  Mật khẩu &amp; Bảo mật
                </a>
              </div>
              <div className="mt-4 pr-8 pl-4">
                <div className="flex justify-between">
                  <h3 className="text-xl font-bold">Dữ liệu cá nhân</h3>
                  <button
                    className="text-xl font-bold "
                    onClick={handleChinhSua}
                  >
                    THAY ĐỔI
                  </button>
                </div>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-gray-600">Tên đầy đủ</label>
                    <input
                      className={
                        isDisabled
                          ? "block appearance-none w-full bg-slate-200 border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          : "block appearance-none w-full bg-white border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      }
                      type="text"
                      value={customer.name}
                      disabled={isDisabled}
                    />
                  </div>
                  <div className="flex space-x-4 mb-4">
                    <div className="flex-1">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Giới tính
                      </label>
                      <div className="relative">
                        <select
                          disabled={isDisabled}
                          name="gioiTinh"
                          value={gioiTinh} // Lấy giá trị giới tính từ state
                          onChange={handleGenderChange}
                          className={
                            isDisabled
                              ? "block appearance-none w-full bg-slate-300 border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              : "block appearance-none w-full bg-white border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          }
                        >
                          <option value={false}>Nữ</option>
                          <option value={true}>Nam</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Ngày sinh
                      </label>
                      <div className="relative">
                        <select
                          disabled={isDisabled}
                          value={day}
                          onChange={(e) => setDay(e.target.value)}
                          className={
                            isDisabled
                              ? "block appearance-none w-full bg-slate-300 border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              : "block appearance-none w-full bg-white border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          }
                        >
                          {days.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Chọn tháng
                      </label>
                      <div className="relative">
                        <select
                          disabled={isDisabled}
                          value={month}
                          onChange={(e) => setMonth(e.target.value)}
                          className={
                            isDisabled
                              ? "block appearance-none w-full bg-slate-300 border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              : "block appearance-none w-full bg-white border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          }
                        >
                          {months.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Chọn năm
                      </label>
                      <div className="relative">
                        <select
                          disabled={isDisabled}
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className={
                            isDisabled
                              ? "block appearance-none w-full bg-slate-300 border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              : "block appearance-none w-full bg-white border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          }
                        >
                          {years.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Thành phố bạn đang ở
                    </label>
                    <input
                      disabled={isDisabled}
                      className={
                        isDisabled
                          ? "block appearance-none w-full bg-slate-200 border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          : "block appearance-none w-full bg-white border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      }
                      type="text"
                      value={user?.city ? user.city : ""}
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      className="bg-gray-200 text-gray-500 py-2 px-4 rounded"
                      onClick={handleHuy}
                    >
                      Hủy
                    </button>
                    <button className="bg-gray-200 text-gray-500 py-2 px-4 rounded">
                      Lưu
                    </button>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                  <div className="mb-4">
                    <h2 className="text-gray-800 text-lg font-semibold">
                      Email
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Chỉ có thể sử dụng tối đa 3 email
                    </p>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                    <div>
                      <p className="text-gray-800 font-medium">{customer?.email}</p>
                      <p className="text-green-600 text-sm">
                        Nơi nhận thông báo
                      </p>
                    </div>
                    <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded flex items-center">
                      Thêm email
                    </button>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                  <div className="mb-4">
                    <h2 className="text-gray-800 text-lg font-semibold">
                      Số điện thoại
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Chỉ có thể sử dụng tối đa 1 số điện thoại
                    </p>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                    <div>
                      <p className="text-gray-800 font-medium">{user?.phone}</p>
                      <p className="text-green-600 text-sm">
                        Nơi nhận thông báo
                      </p>
                    </div>
                    <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded flex items-center">
                      Thêm số điện thoại
                    </button>
                  </div>
                </div>
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

export default Account;

import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1";

// Hàm đăng nhập
export const loginApi = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    return response.data; // Trả về dữ liệu trả về từ API
  } catch (error) {
    alert("Tài khoản hoặc mật khẩu không đúng!");
    throw new Error("Login failed");
  }
};

// Hàm lấy thông tin người dùng bằng token
export const fetchUserInfo = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/customers/by-email`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user info");
  }
};

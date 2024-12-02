import axios from "axios";
import dayjs from "dayjs";

const BASE_URL = "http://localhost:8000/api/v1";

// Hàm đăng nhập
export const loginApi = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
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

// Hàm thêm  tiêu chí
export const addPreference = async (preference, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/recommendation/customer-preference`,
      preference,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding preference:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      "Failed to add preference: " +
        (error.response ? error.response.data : error.message)
    );
  }
};


export const handleInteraction = async (tourId, interactionType, user, token) => {
  if (!user) {
    console.warn("User is not logged in");
    return;
  }

  const interaction = {
    cusId: user.userId,
    tourId: tourId,
    interactionType: interactionType,
    interactionDate: dayjs().format("YYYY-MM-DD"),
  };

  try {
    await axios.post(
      `${BASE_URL}/recommendation/customer-interaction/interactions`,
      interaction,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(`Interaction ${interactionType} saved successfully`);
  } catch (error) {
    console.error(`Failed to save interaction ${interactionType}:`, error);
  }
};

export const deleteInteraction = async (interactionId, token) =>{
  try {
    const response = await axios.delete(`${BASE_URL}/recommendation/customer-interaction/interactions/${interactionId}`,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log(`Interaction ${interactionId} deleted successfully`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete interaction ${interactionId}:`, error);
  }
}

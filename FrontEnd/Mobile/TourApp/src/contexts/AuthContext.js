import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const BASE_URL = "http://localhost:8000/api/v1";
const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

// AsyncStorage.clear();
export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null); // Lưu thông tin người dùng
    // const [token, setToken] = useState(AsyncStorage.getItem("accessToken") || null); 
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInN1YiI6InRyYW5iYW90cnVjMjAwMmJjQGdtYWlsLmNvbSIsImlhdCI6MTczMzM1MTYwMiwiZXhwIjoxNzMzNDM4MDAyfQ.gl-xecnhEGZ0zEbveKnvnVBkFNWfsApaqMh6DCxOmrw");
    useEffect(() => {
        const loadData = async () => {
            try {
                await fetchUserInfo(token); // Lấy thông tin người dùng sau khi đăng nhập
            } catch (error) {
                throw new Error("Error loading data from AsyncStorage:", error);
            }
        };

        loadData();
    }, []);
    useEffect(() => {
        const saveData = async () => {
            try {
                if (authUser) {
                    await AsyncStorage.setItem("authUser", JSON.stringify(authUser));
                }
            } catch (error) {
                throw new Error("Error saving data to AsyncStorage:", error);
            }
        };
        saveData();
    }, [authUser]);
    const fetchUserInfo = async (token) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/customers/by-email`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAuthUser(response.data);
            return response.data;

        } catch (error) {
            throw new Error("Failed to fetch user info");
        }
    };
    return (
        <AuthContext.Provider
            value={{
                authUser,
                setAuthUser,
                accessToken,
                setAccessToken,
                refreshToken,
                setRefreshToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// export default AuthContextProvider;

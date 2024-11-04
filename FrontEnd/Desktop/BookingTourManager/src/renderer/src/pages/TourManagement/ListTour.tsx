// Import necessary hooks and components
import { useEffect, useRef, useState } from "react";
import MenuManagement from "../../components/Menu/MenuManagement";

// Define interfaces for the Tour structure (optional for clarity)
interface Tour {
    url: string;
    price: string;
    originalPrice: string;
    title: string;
    ngayKhoiHanh: string;
    thoiGian: string;
    thoiTiet: string;
    soLuongVe: number;
    soVeDaDat: number;
    noiKhoiHanh: string;
    diemThamQuan: string;
    noiNghiNgoi: string;
    amThuc: string;
    phuongTien: string;
    ngayKetThuc: string;
    noiKetThuc: string;
    listAnh: string[];
    traiNghiem: string;
    chuongTrinh: { title: string; detail: string }[];
    thongTinTapTrung: { ngay: string; noi: string };
    thongTinHuongDanVien: { doan: string; tien?: string };
    dieuKien: {
        baoGom: string;
        khongBaoGom: string;
        giaveTreEm: string;
        huyTour: string;
        thanhToan: string;
    };
}

// Functional component definition
function ListTour() {
    // State to hold the list of tours
    const [tours, setTours] = useState<Tour[]>([
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
            price: '6500000',
            originalPrice: '8500000',
            title: 'Vịnh Hạ Long-Quảng Ninh',
            ngayKhoiHanh: "05-09-2024",
            thoiGian: "3 ngày 2 đêm",
            thoiTiet: "nang",
            soLuongVe: 50,
            soVeDaDat: 32,
            noiKhoiHanh: "Hồ Chí Minh",
            diemThamQuan: "Vịnh Hạ Long-Quảng Ninh-Núi Đá",
            noiNghiNgoi: "Khách sạn",
            amThuc: "03 bữa sáng + 03 bữa trưa + 02 bữa tối.",
            phuongTien: "may bay, xe du lịch",
            ngayKetThuc: "08-09-2024",
            noiKetThuc: "Phú Quốc",
            listAnh: [
                "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
                "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
                "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"
            ],
            traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp...",
            chuongTrinh: [
                {
                    title: "Phan Thiết- Nui Tà Cù",
                    detail: "Đến với Bình Thuận Quý khách dừng chân và tham quan: + NÚI TÀ CÚ:..."
                },
                // Other items...
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
                baoGom: "Khách sạn: Phòng tiện nghi điều hoà...",
                khongBaoGom: "Bữa chính: 03 bữa sáng...",
                giaveTreEm: "Mỗi gia đình chỉ có tiêu chuẩn là 1 trẻ em...",
                huyTour: "+ Quy định hủy đối với ngày lễ, tết...",
                thanhToan: "Quý khách nộp hồ sơ và đặt cọc 50% chi phí dịch vụ..."
            }
        },
        // Other tours...
    ]);

    // Return statement to render the UI
    return (
        <div  className="flex-1 flex-row bg-white w-full h-full">
            <div className="w-[100%] justify-start"><MenuManagement /></div>
            <div className="w-[30%] justify-start"><MenuManagement /></div>
        </div>
    );
}

// Export the component
export default ListTour;

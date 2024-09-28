import React, { useEffect, useRef, useState } from "react";
import { View, Text, ImageBackground, Pressable, Button, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TourComponent from "./component/TourComponent"
// const Tab = createMaterialTopTabNavigator();

const HomeComponent = ({ navigation }) => {

    const [listMienBac, setListMienBac] = useState([
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
            ngayKetThuc:"08-09-2024",
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
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png",
            price: '7845000',
            originalPrice: '9550000',
            title: 'Hà Giang',
            ngayKhoiHanh: "15-09-2024",
            thoiGian: "3 ngày 2 đêm",
            thoiTiet: "nang",
            soLuongVe: 32,
            soVeDaDat: 12,
            noiKhoiHanh: "Đà Nẵng",
            diemThamQuan: "Vịnh Hạ Long-Quảng Ninh-Núi Đá",
            noiNghiNgoi: "Khách sạn",
            amThuc: "03 bữa sáng + 03 bữa trưa + 02 bữa tối.",
            phuongTien: "may bay, xe du lịch",
            ngayKetThuc:"08-09-2024",
            noiKetThuc: "Phú Quốc",
            listAnh: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png",
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
            }
        },
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png",
            price: '7880000',
            originalPrice: '10240000',
            title: 'Sapa',
            ngayKhoiHanh: "18-09-2024",
            thoiGian: "3 ngày 2 đêm",
            thoiTiet: "nang",
            soLuongVe: 52,
            soVeDaDat: 43,
            noiKhoiHanh: "Đà Nẵng",
            diemThamQuan: "Vịnh Hạ Long-Quảng Ninh-Núi Đá",
            noiNghiNgoi: "Khách sạn",
            amThuc: "03 bữa sáng + 03 bữa trưa + 02 bữa tối.",
            phuongTien: "may bay, xe du lịch",
            ngayKetThuc:"08-09-2024",
            noiKetThuc: "Phú Quốc",
            listAnh: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png",
                "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
                "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"],
            traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát rực rỡ và thời tiết nắng ấm quanh năm. Từng là bí mật, giờ đây Mũi Né đã trở thành điểm đến phổ biến cho những người tìm kiếm sự thư giãn, hoạt động ngoài trời và vẻ đẹp tự nhiên.",

        },
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605783/077dc171-f2ed-48e2-a4b4-2c20b5fa4bc7.png",
            price: '6500000',
            originalPrice: '8500000',
            title: 'Hội An',
            ngayKhoiHanh: "19-10-2024",
            thoiGian: "5 ngày 4 đêm",
            thoiTiet: "nang",
            soLuongVe: 45,
            soVeDaDat: 42,
            noiKhoiHanh: "Đà Nẵng",
            diemThamQuan: "Vịnh Hạ Long-Quảng Ninh-Núi Đá",
            noiNghiNgoi: "Khách sạn",
            amThuc: "03 bữa sáng + 03 bữa trưa + 02 bữa tối.",
            phuongTien: "may bay, xe du lịch",
            ngayKetThuc:"08-09-2024",
            noiKetThuc: "Phú Quốc",
            listAnh: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png",
                "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
                "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"],
            traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát rực rỡ và thời tiết nắng ấm quanh năm. Từng là bí mật, giờ đây Mũi Né đã trở thành điểm đến phổ biến cho những người tìm kiếm sự thư giãn, hoạt động ngoài trời và vẻ đẹp tự nhiên.",

        }, {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605866/35784823-5c44-4f7e-b095-ec45a2d129ec.png",
            price: '6570000',
            originalPrice: '8570000',
            title: 'Hải Phòng',
            ngayKhoiHanh: "06-09-2024",
            thoiGian: "3 ngày 2 đêm",
            thoiTiet: "nang",
            soLuongVe: 13,
            soVeDaDat: 6,
            noiKhoiHanh: "Đà Nẵng",
            diemThamQuan: "Vịnh Hạ Long-Quảng Ninh-Núi Đá",
            noiNghiNgoi: "Khách sạn",
            amThuc: "03 bữa sáng + 03 bữa trưa + 02 bữa tối.",
            phuongTien: "may bay, xe du lịch",
            listAnh: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png",
                "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
                "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"],
            traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát rực rỡ và thời tiết nắng ấm quanh năm. Từng là bí mật, giờ đây Mũi Né đã trở thành điểm đến phổ biến cho những người tìm kiếm sự thư giãn, hoạt động ngoài trời và vẻ đẹp tự nhiên.",

        },
        ,

    ]);
    const [listMienTay, setListMienTay] = useState([
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
            price: '6500000',
            originalPrice: '8500000',
            title: 'Ninh Bình',
            ngayKhoiHanh: "05-09-2024",
            thoiGian: "3 ngày 2 đêm",
            thoiTiet: "nang",
            soLuongVe: 50,
            soVeDaDat: 32,
        },
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png",
            price: '7845000',
            originalPrice: '9550000',
            title: 'Phú Quốc',
            ngayKhoiHanh: "15-09-2024",
            thoiGian: "3 ngày 2 đêm",
            thoiTiet: "nang",
            soLuongVe: 32,
            soVeDaDat: 12,
        },
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png",
            price: '7880000',
            originalPrice: '10240000',
            title: 'Long An',
            ngayKhoiHanh: "18-09-2024",
            thoiGian: "3 ngày 2 đêm",
            thoiTiet: "nang",
            soLuongVe: 52,
            soVeDaDat: 43,
        },
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605783/077dc171-f2ed-48e2-a4b4-2c20b5fa4bc7.png",
            price: '6500000',
            originalPrice: '8500000',
            title: 'Cà Mau',
            ngayKhoiHanh: "19-10-2024",
            thoiGian: "5 ngày 4 đêm",
            thoiTiet: "nang",
            soLuongVe: 45,
            soVeDaDat: 42,
        }, {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605866/35784823-5c44-4f7e-b095-ec45a2d129ec.png",
            price: '6570000',
            originalPrice: '8570000',
            title: 'Sóc Trăng',
            ngayKhoiHanh: "06-09-2024",
            thoiGian: "3 ngày 2 đêm",
            thoiTiet: "nang",
            soLuongVe: 13,
            soVeDaDat: 6,
        },
        ,

    ]);
    const [listMienTrung, setListMienTrung] = useState([
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
            price: '6500000',
            originalPrice: '8500000',
            title: 'Đà Nẵng',
            ngayKhoiHanh: "05-09-2024",
            thoiGian: "3 ngày 2 đêm",
            thoiTiet: "nang",
            soLuongVe: 50,
            soVeDaDat: 32,
        },
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png",
            price: '7845000',
            originalPrice: '9550000',
            title: 'Quảng Nam',
            ngayKhoiHanh: "15-09-2024",
            thoiGian: "3 ngày 2 đêm",
            thoiTiet: "nang",
            soLuongVe: 32,
            soVeDaDat: 12,
        },
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png",
            price: '7880000',
            originalPrice: '10240000',
            title: 'Quảng Ngãi',
            ngayKhoiHanh: "18-09-2024",
            thoiGian: "3 ngày 2 đêm",
            thoiTiet: "nang",
            soLuongVe: 52,
            soVeDaDat: 43,
        },
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605783/077dc171-f2ed-48e2-a4b4-2c20b5fa4bc7.png",
            price: '6500000',
            originalPrice: '8500000',
            title: 'Bình Thuận',
            ngayKhoiHanh: "19-10-2024",
            thoiGian: "5 ngày 4 đêm",
            thoiTiet: "nang",
            soLuongVe: 45,
            soVeDaDat: 42,
        }, {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605866/35784823-5c44-4f7e-b095-ec45a2d129ec.png",
            price: '6570000',
            originalPrice: '8570000',
            title: 'Biển Miềng Trung',
            ngayKhoiHanh: "06-09-2024",
            thoiGian: "3 ngày 2 đêm",
            thoiTiet: "nang",
            soLuongVe: 13,
            soVeDaDat: 6,
        },
        ,

    ]);
    const [listMienNam, setListMienNam] = useState([
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
            price: '6500000',
            originalPrice: '8500000',
            title: 'Hồ Chí Minh',
            ngayKhoiHanh: "05-09-2024",
            thoiGian: "3 ngày 2 đêm",
            thoiTiet: "nang",
            soLuongVe: 50,
            soVeDaDat: 32,
        },
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png",
            price: '7845000',
            originalPrice: '9550000',
            title: 'Nhà Thờ Dức Bà - Phố đi Bộ',
            ngayKhoiHanh: "15-09-2024",
            thoiGian: "3 ngày 2 đêm",
            thoiTiet: "nang",
            soLuongVe: 32,
            soVeDaDat: 12,
        },
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png",
            price: '7880000',
            originalPrice: '10240000',
            title: 'Tây Ninh',
            ngayKhoiHanh: "18-09-2024",
            thoiGian: "3 ngày 2 đêm",
            thoiTiet: "nang",
            soLuongVe: 52,
            soVeDaDat: 43,
        },
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605783/077dc171-f2ed-48e2-a4b4-2c20b5fa4bc7.png",
            price: '6500000',
            originalPrice: '8500000',
            title: 'Bình Dương',
            ngayKhoiHanh: "19-10-2024",
            thoiGian: "5 ngày 4 đêm",
            thoiTiet: "nang",
            soLuongVe: 45,
            soVeDaDat: 42,
        }, {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605866/35784823-5c44-4f7e-b095-ec45a2d129ec.png",
            price: '6570000',
            originalPrice: '8570000',
            title: 'Đồng Nai',
            ngayKhoiHanh: "06-09-2024",
            thoiGian: "3 ngày 2 đêm",
            thoiTiet: "nang",
            soLuongVe: 13,
            soVeDaDat: 6,
        },
        ,

    ]);
    const images = [
        "https://res.cloudinary.com/doqbelkif/image/upload/v1726605769/9ae475e5-ab3e-4762-acd8-82a7a6e05086.png",
        "https://res.cloudinary.com/doqbelkif/image/upload/v1726605783/077dc171-f2ed-48e2-a4b4-2c20b5fa4bc7.png",
        "https://res.cloudinary.com/doqbelkif/image/upload/v1726605800/0c0179e2-43ac-447e-a579-d2a1fbcc61e0.png",
        "https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png",
        "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png",
        "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
        "https://res.cloudinary.com/doqbelkif/image/upload/v1726605866/35784823-5c44-4f7e-b095-ec45a2d129ec.png"
    ];
    const [listDiemDenYeuThich, setListDiemDenYeuThich] = useState([
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
            local: "Đà Lạt"
        },
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png",
            local: "Hà Nội"
        },
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png",
            local: "Ninh Bình"
        },
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605783/077dc171-f2ed-48e2-a4b4-2c20b5fa4bc7.png",
            local: "Phú Quốc"
        }, {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605866/35784823-5c44-4f7e-b095-ec45a2d129ec.png",
            local: "Vịnh Hạ Long"
        },
        ,

    ]);


    // Animation for banner
    const scrollViewRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0); // Lưu vị trí cuộn hiện tại
    const scrollStep = 150;
    const screenWidth = Dimensions.get('window').width;
    const contentWidth = images.length * (153 + 20);

    // dành cho mục đề xuất & dành cho bạn
    const [choosedMuc, setChoosedMuc] = useState(0);
    const [choosedMien, setChoosedMien] = useState(0);
    const [choosedOption, setChoosedOption] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollViewRef.current) {
                // Cuộn tới vị trí mới
                scrollViewRef.current.scrollTo({ x: scrollPosition, animated: true });

                // Cập nhật vị trí cuộn mới
                setScrollPosition(prevPosition => {
                    const newPosition = prevPosition + scrollStep;
                    // Kiểm tra nếu đã cuộn hết, quay về vị trí 0
                    return newPosition > contentWidth - screenWidth ? 0 : newPosition;
                });
            }
        }, 5000); // Cuộn mỗi 3 giây

        return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
    }, [scrollPosition, contentWidth, screenWidth]);

    const clickDeXuat = () => {
        setChoosedMuc(0);
    };
    const clickDanhChoBan = () => {
        setChoosedMuc(1);
    };
    const chooseMien = (a) => {
        setChoosedMien(a);
    };
    const chooseOption = (a) => {
        setChoosedOption(a);
    };


    return (
        <ScrollView style={{ backgroundColor: "#c", height: "100%" }}>

            <ImageBackground source={{
                uri: "https://res.cloudinary.com/doqbelkif/image/upload/v1726601540/656c046a-02ef-4286-8f9f-34ca7ef6e82a.png"
            }} resizeMode="cover" style={styles.imageBia}>
                <View style={styles.header}>
                    <FontAwesome5 name={"search"} size={24} color={"black"} />
                    <TextInput placeholder="Nhập vào đây để tìm kiếm" style={styles.buttonSearch}>

                    </TextInput>
                </View>
            </ImageBackground>

            <View style={styles.viewBox}>
                {/* Main Options */}
                <View style={styles.optionsRow}>
                    <TouchableOpacity style={styles.optionButton}>
                        <Image
                            source={require('../../../assets/mountain.png')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={styles.textBox}>Tour mạo hiểm</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionButton}>
                        <Image
                            source={require('../../../assets/river.png')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={styles.textBox}>Tour tham quan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton}>
                        <Image
                            source={require('../../../assets/buddhist.png')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={styles.textBox}>Tour văn hóa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton}>
                        <Image
                            source={require('../../../assets/jungle.png')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={styles.textBox}>Tour sinh thái</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.optionsRow}>

                    <TouchableOpacity style={styles.optionButton}>
                        <Image
                            source={require('../../../assets/resort.png')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={styles.textBox}>Tour nghỉ dưỡng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton}>
                        <Image
                            source={require('../../../assets/target.png')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={styles.textBox}>Tour teambuilding</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton} onPress={() => { navigation.navigate("SetCriteria") }}>
                        <Image
                            source={require('../../../assets/setting.png')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={styles.textBox}>Thiết lập tiêu chí</Text>
                    </TouchableOpacity>
                </View>



            </View>
            <View style={styles.banner}>
                <Text style={styles.tieuDe}>Trải nghiệm những chuyến đi tuyệt vời với những khung cảnh tuyệt đẹp</Text>
                <ScrollView horizontal style={styles.bannerContainer}
                    ref={scrollViewRef}
                    showsHorizontalScrollIndicator={false} >
                    {images.map((image, index) => (
                        <Pressable key={index} style={styles.bannerRow}>
                            <Image
                                source={{
                                    uri: image
                                }}
                                style={styles.bannerAvt}
                                resizeMode="cover"
                            />
                        </Pressable>

                    ))}
                </ScrollView>
            </View>

            <View style={styles.mucContainer}>
                <View style={[styles.mucContent, { borderBottomWidth: choosedMuc == 0 ? 4 : 0 }]}>
                    <Pressable style={[styles.buttonMuc, { backgroundColor: choosedMuc == 0 ? "#3FD0D4" : "#fff" }]} onPress={clickDeXuat}>
                        <Text style={styles.textMuc}>Đề xuất</Text>
                    </Pressable>
                </View>

                <View style={[styles.mucContent, { borderBottomWidth: choosedMuc == 0 ? 0 : 4 }]}>
                    <Pressable style={[styles.buttonMuc, { backgroundColor: choosedMuc == 1 ? "#3FD0D4" : "#fff" }]} onPress={clickDanhChoBan}>
                        <Text style={styles.textMuc}>Dành cho bạn</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.banner}>
                <View style={styles.rowBetween}>
                    <Text style={styles.tieuDe}>Ưu đãi tour giờ chót</Text>
                    <Pressable onPress={() => { navigation.navigate("ListTour", { listTour: listMienBac, title: "TOUR GIỜ CHÓT" }); }}><Text style={styles.xemTatCa}>Xem tất cả</Text></Pressable>
                </View>

                <TourComponent listTour={listMienBac} navigation={navigation} />
            </View>

            <View style={styles.banner}>
                <Text style={styles.tieuDe}>Điểm đến được yêu thích</Text>
                <Text style={{ fontSize: 12, paddingLeft: 20, fontStyle: "italic" }}>Các điểm đến du lịch được đặt nhiều nhất trong năm</Text>
                <ScrollView horizontal style={styles.bannerContainer}
                >
                    {listDiemDenYeuThich.map((image, index) => (
                        <Pressable key={index} style={styles.bannerRow}>

                            <Image
                                source={{
                                    uri: image.url
                                }}
                                style={styles.bannerAvt}
                                resizeMode="cover"
                            />
                            <Text style={{ marginTop: "-80%", textAlign: "center", fontSize: 24, color: "#fff" }}>{image.local}</Text>
                        </Pressable>


                    ))}
                </ScrollView>
            </View>
            <View style={styles.banner}>
                <View style={styles.rowBetween}>
                    <Pressable style={[styles.buttonMucMien, { backgroundColor: choosedMien == 0 ? "#3FD0D4" : "#fff" }]} onPress={() => chooseMien(0)}>
                        <Text style={styles.textMucMien}>Miền Bắc</Text>
                    </Pressable>
                    <Pressable style={[styles.buttonMucMien, { backgroundColor: choosedMien == 1 ? "#3FD0D4" : "#fff" }]} onPress={() => chooseMien(1)}>
                        <Text style={styles.textMucMien}>Miền Trung</Text>
                    </Pressable>
                    <Pressable style={[styles.buttonMucMien, { backgroundColor: choosedMien == 2 ? "#3FD0D4" : "#fff" }]} onPress={() => chooseMien(2)}>
                        <Text style={styles.textMucMien}>Miền Nam</Text>
                    </Pressable>
                    <Pressable style={[styles.buttonMucMien, { backgroundColor: choosedMien == 3 ? "#3FD0D4" : "#fff" }]} onPress={() => chooseMien(3)}>
                        <Text style={styles.textMucMien}>Miền Tây</Text>
                    </Pressable>
                </View>

                <View style={{ display: choosedMien == 0 ? "block" : "none" }}>
                    <Pressable onPress={() => { navigation.navigate("ListTour", { listTour: listMienBac, title: "TOUR MIỀN BẮC" }); }}><Text style={styles.xemTatCaOption}>Xem tất cả</Text></Pressable>
                    <TourComponent listTour={listMienBac} navigation={navigation} />
                </View>
                <View style={{ display: choosedMien == 1 ? "block" : "none" }}>
                    <Pressable onPress={() => { navigation.navigate("ListTour", { listTour: listMienTrung, title: "TOUR MIỀN TRUNG" }); }}><Text style={styles.xemTatCaOption}>Xem tất cả</Text></Pressable>

                    <TourComponent listTour={listMienTrung} navigation={navigation} />
                </View>
                <View style={{ display: choosedMien == 2 ? "block" : "none" }}>
                    <Pressable onPress={() => { navigation.navigate("ListTour", { listTour: listMienNam, title: "TOUR MIỀN NAM" }); }}><Text style={styles.xemTatCaOption}>Xem tất cả</Text></Pressable>
                    <TourComponent listTour={listMienNam} navigation={navigation} />
                </View>
                <View style={{ display: choosedMien == 3 ? "block" : "none" }}>
                    <Pressable onPress={() => { navigation.navigate("ListTour", { listTour: listMienTay, title: "TOUR MIỀN TÂY" }); }}><Text style={styles.xemTatCaOption}>Xem tất cả</Text></Pressable>
                    <TourComponent listTour={listMienTay} navigation={navigation} />
                </View>
            </View>
            <View style={styles.banner}>
                <View style={styles.rowOption}>
                    <Pressable style={[styles.buttonOption, { backgroundColor: choosedOption == 0 ? "#3FD0D4" : "#fff" }]} onPress={() => chooseOption(0)}>
                        <Text style={styles.textMucMien}>Đang hot</Text>
                    </Pressable>
                    <Pressable style={[styles.buttonOption, { backgroundColor: choosedOption == 1 ? "#3FD0D4" : "#fff" }]} onPress={() => chooseOption(1)}>
                        <Text style={styles.textMucMien}>Đang giảm giá</Text>
                    </Pressable>
                </View>
                <View style={{ display: choosedOption == 0 ? "block" : "none" }}>
                    <Pressable onPress={() => { navigation.navigate("ListTour", { listTour: listMienNam, title: "TOUR ĐANG HOT" }); }}>
                        <Text style={styles.xemTatCaOption}>Xem tất cả</Text></Pressable>
                    <TourComponent listTour={listMienNam} navigation={navigation} />
                </View>
                <View style={{ display: choosedOption == 1 ? "block" : "none" }}>
                    <Pressable onPress={() => { navigation.navigate("ListTour", { listTour: listMienTay, title: "TOUR ĐANG GIẢM GIÁ" }); }}>
                        <Text style={styles.xemTatCaOption}>Xem tất cả</Text></Pressable>
                    <TourComponent listTour={listMienTay} navigation={navigation} />
                </View>
            </View>

        </ScrollView >
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 10,
        height: 40,
        backgroundColor: '#fff',
        width: "70%",
        marginLeft: 15
    },
    buttonSearch: {
        flex: 1,
        paddingLeft: 5
    },
    optionsRow: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    optionButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 85,
        height: 80,
        borderRadius: 8,
        width: '25%'

    },
    viewBox: {
        marginTop: -100,
        backgroundColor: "#fff",
        marginLeft: "5%",
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 10, // Android
        width: "90%",

    },

    textBox: {
        alignItems: "center",
        fontSize: 13,
        textAlign: "center",
    },
    imageBia: {
        width: '100%',
        height: 250,
        marginRight: 10,
        alignItems: "center",
    },
    bannerContainer: {
        height: 180,
    },
    bannerRow: {
        borderRadius: 10,
        height: 150,
        width: 150,
        marginRight: 5,
        borderRadius: 10,
        overflow: 'hidden', 
        backgroundColor: '#fff', 
        shadowColor: '#3FD0D4',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3, 
        shadowRadius: 8,
        elevation: 12, 
        marginLeft:5
    },

    bannerAvt: {
        height: 150,
        alignItems: "center",
        borderRadius: 10,
    },
    banner: {
        marginTop: 20
    },
    tieuDe: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10
    },
    mucContainer: {
        backgroundColor: "#fff",
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
        height: 54
    },
    buttonMuc: {
        height: 40,
        // backgroundColor:"#bbb",
        justifyContent: "center",
        width: 150,
        alignItems: "center",
        borderRadius: 20
    },
    textMuc: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "500"
    },
    mucContent: {
        width: "45%",
        justifyContent: 'center',
        alignItems: "center",
        borderBottomColor: "#3FD0D4",
        paddingBottom: 4,
    },
    rowBetween: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",

    },
    xemTatCa: {
        fontSize: 12,
        color: "#3FD0D4",
        fontStyle: "italic",
        paddingRight: 20,
        textAlign: "center"
    },
    buttonMucMien: {
        height: 40,
        backgroundColor: "#bbb",
        justifyContent: "center",
        width: "22%",
        alignItems: "center",
        borderRadius: 20
    },
    textMucMien: {
        textAlign: "center",
        fontSize: 13,
        fontWeight: "500"
    },
    rowOption: {
        display: "flex",
        flexDirection: "row",
    },
    buttonOption: {
        height: 40,
        backgroundColor: "#bbb",
        justifyContent: "center",
        width: "30%",
        alignItems: "center",
        borderRadius: 20,
        marginLeft: 15
    },
    xemTatCaOption: {
        fontSize: 13,
        color: "#3FD0D4",
        fontStyle: "italic",
        paddingRight: 20,
        textAlign: "right",
        padding: 10
    },
})
export default HomeComponent;
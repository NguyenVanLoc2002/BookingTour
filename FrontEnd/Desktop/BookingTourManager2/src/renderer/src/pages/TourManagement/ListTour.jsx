import { useEffect, useRef, useState } from "react";
import MenuManagement from "../../components/Menu/MenuManagement";
function ListTour() {
    const [tours, setTours] = useState([
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
    const user = {
        name: "Bao Truc",
        url: "https://res.cloudinary.com/doqbelkif/image/upload/v1727453521/e015a22e-fa11-4f2c-86bf-322445d957ea.png",
        gioiTinh: 1,
        ngaySinh: "06/05/2002",
        email: "baotruc123@gmail.com",
        phone: "0338030541",
        city: "Hồ Chí Minh",
      };
    return (
        <>
            <div className="w-full h-full flex flex-col">
                <div class="flex justify-between bg-teal-500 ">
                    <div class="text-white text-2xl font-bold pl-4">
                        {/* <img alt=logo" src="../assets/logo_Text.jpg" width="80px" /> */}
                    </div>
                    <div class="text-white justify-center items-center pr-4 pt-4">
                        <i class="fas fa-user-circle fa-2x"></i>
                    </div>

                </div>
                <div class="flex  bg-slate-300 justify-between">
                    <div class="w-1/6 bg-white p-2 m-2">
                       <MenuManagement user={user}/>

                    </div>
                    <div class="w-4/5 bg-white p-2 m-2">
                        <div class="flex justify-between items-center mb-4">
                            <div class="text-xl font-bold">
                                Danh sách tour
                            </div>
                            <div class="flex space-x-4">
                                <select class="border border-gray-300 rounded p-2">
                                    <option>
                                        Miền Bắc
                                    </option>
                                </select>
                                <select class="border border-gray-300 rounded p-2">
                                    <option>
                                        Mạo hiểm
                                    </option>
                                </select>
                                <input class="border border-gray-300 rounded p-2" type="text" value="9/10/2024-25/10/2024" />
                            </div>
                        </div>
                        <table class="w-full border-collapse">
                            <thead>
                                <tr class="bg-gray-100">
                                    <th class="border p-2">
                                        STT
                                    </th>
                                    <th class="border p-2">
                                        Ảnh đại diện
                                    </th>
                                    <th class="border p-2">
                                        Tên tour
                                    </th>
                                    <th class="border p-2">
                                        Thời gian
                                    </th>
                                    <th class="border p-2">
                                        Ngày khởi hành
                                    </th>
                                    <th class="border p-2">
                                        Giá tour
                                    </th>
                                    <th class="border p-2">
                                        #
                                    </th>
                                    <th class="border p-2">
                                        Đăng tour
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="border p-2 text-center">
                                        1
                                    </td>
                                    <td class="border p-2 text-center">
                                        <img alt="Tour image" height="50"
                                            src="https://storage.googleapis.com/a1aa/image/2rlUvPwJezw0L6d3K0SYWQsOHzd9yU5l5TCHjnuyTHpoGD0JA.jpg"
                                            width="50" />
                                    </td>
                                    <td class="border p-2">
                                        Phú Quốc - Bến Tre
                                    </td>
                                    <td class="border p-2 text-center">
                                        3 ngày 2 đêm
                                    </td>
                                    <td class="border p-2 text-center">
                                        10/11/2024
                                    </td>
                                    <td class="border p-2 text-center">
                                        6.500.000 đ
                                    </td>
                                    <td class="border p-2 text-center">
                                        <a class="text-teal-500" href="#">
                                            <i class="fas fa-edit">
                                            </i>
                                            Cập nhật
                                        </a>
                                        <br />
                                        <a class="text-teal-500" href="#">
                                            <i class="fas fa-info-circle">
                                            </i>
                                            Chi tiết
                                        </a>
                                    </td>
                                    <td class="border p-2 text-center">
                                        <input type="checkbox" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="border p-2 text-center">
                                        2
                                    </td>
                                    <td class="border p-2 text-center">
                                        <img alt="Tour image" height="50"
                                            src="https://storage.googleapis.com/a1aa/image/2rlUvPwJezw0L6d3K0SYWQsOHzd9yU5l5TCHjnuyTHpoGD0JA.jpg"
                                            width="50" />
                                    </td>
                                    <td class="border p-2">
                                        Cà Mau
                                    </td>
                                    <td class="border p-2 text-center">
                                        2 ngày 1 đêm
                                    </td>
                                    <td class="border p-2 text-center">
                                        10/11/2024
                                    </td>
                                    <td class="border p-2 text-center">
                                        4.500.000 đ
                                    </td>
                                    <td class="border p-2 text-center">
                                        <a class="text-teal-500" href="#">
                                            <i class="fas fa-edit">
                                            </i>
                                            Cập nhật
                                        </a>
                                        <br />
                                        <a class="text-teal-500" href="#">
                                            <i class="fas fa-info-circle">
                                            </i>
                                            Chi tiết
                                        </a>
                                    </td>
                                    <td class="border p-2 text-center">
                                        <input type="checkbox" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="border p-2 text-center">
                                        3
                                    </td>
                                    <td class="border p-2 text-center">
                                        <img alt="Tour image" height="50"
                                            src="https://storage.googleapis.com/a1aa/image/2rlUvPwJezw0L6d3K0SYWQsOHzd9yU5l5TCHjnuyTHpoGD0JA.jpg"
                                            width="50" />
                                    </td>
                                    <td class="border p-2">
                                        Cà Mau
                                    </td>
                                    <td class="border p-2 text-center">
                                        2 ngày 1 đêm
                                    </td>
                                    <td class="border p-2 text-center">
                                        10/11/2024
                                    </td>
                                    <td class="border p-2 text-center">
                                        4.500.000 đ
                                    </td>
                                    <td class="border p-2 text-center">
                                        <a class="text-teal-500" href="#">
                                            <i class="fas fa-edit">
                                            </i>
                                            Cập nhật
                                        </a>
                                        <br />
                                        <a class="text-teal-500" href="#">
                                            <i class="fas fa-info-circle">
                                            </i>
                                            Chi tiết
                                        </a>
                                    </td>
                                    <td class="border p-2 text-center">
                                        <input type="checkbox" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="border p-2 text-center">
                                        4
                                    </td>
                                    <td class="border p-2 text-center">
                                        <img alt="Tour image" height="50"
                                            src="https://storage.googleapis.com/a1aa/image/2rlUvPwJezw0L6d3K0SYWQsOHzd9yU5l5TCHjnuyTHpoGD0JA.jpg"
                                            width="50" />
                                    </td>
                                    <td class="border p-2">
                                        Cà Mau
                                    </td>
                                    <td class="border p-2 text-center">
                                        2 ngày 1 đêm
                                    </td>
                                    <td class="border p-2 text-center">
                                        10/11/2024
                                    </td>
                                    <td class="border p-2 text-center">
                                        4.500.000 đ
                                    </td>
                                    <td class="border p-2 text-center">
                                        <a class="text-teal-500" href="#">
                                            <i class="fas fa-edit">
                                            </i>
                                            Cập nhật
                                        </a>
                                        <br />
                                        <a class="text-teal-500" href="#">
                                            <i class="fas fa-info-circle">
                                            </i>
                                            Chi tiết
                                        </a>
                                    </td>

                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ListTour;

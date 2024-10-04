import { useEffect, useRef, useState } from "react";
import Header from "../../layouts/Header";
import Menu from "../../layouts/Menu";
import Footer from "../../layouts/Footer";
import * as Icons from 'react-icons/ai';
import TongQuan from './component/TongQuan'
import DieuKien from './component/DieuKien'
import ChuongTrinh from './component/ChuongTrinh'
function DetailTour() {
  const [tabNameSelect, setTabNameSelect] = useState('ChuongTrinh')
  const IconDisplay = ({ iconName }) => {
    const IconComponent = Icons[iconName]; // Lấy biểu tượng dựa trên tên truyền vào
    return (
      <div className="flex items-center space-x-2">
        {IconComponent ? <IconComponent size={24} /> : null} {/* Hiển thị biểu tượng nếu tồn tại */}
      </div>
    );
  };

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <Header />
        <Menu />
        <body class="bg-gray-100">
          <div class="w-full mx-auto p-4 bg-white shadow-md">
            <div class="flex justify-between items-center">
              <div>
                <h1 class="font-bold mb-3 text-xl">
                  Phan Thiết - Jeep Tour - Bàu Sen
                </h1>
                <div class="flex space-x-24 mb-4">
                  <div class="flex items-center justify-between">
                    <IconDisplay iconName="AiTwotoneTag" />
                    <span>
                      Giá Tour/khách: 
                      <span class="line-through text-red-500 pl-2 pr-2">
                        5,600,000đ 
                      </span>
                      4,500,000đ
                    </span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <IconDisplay iconName="AiOutlineCalendar" />
                    <span>
                      Ngày tour gần nhất: Thứ 6, ngày 13/09/2024
                    </span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <IconDisplay iconName="AiOutlineClockCircle" />
                    <span>
                      Thời gian tour: 3 ngày 2 đêm
                    </span>
                  </div>
                </div>
              </div>

            </div>
            <button class="bg-teal-500 text-black font-bold px-8 py-2 rounded-2xl mb-4">
              ĐẶT TOUR
            </button>
            <div class="flex  mb-8 text-base font-bold">
              <button class={tabNameSelect == "ChuongTrinh" ? " text-textColorCustom px-4 py-2 border-l border-r border-t border-textColorCustom " : " text-black px-4 py-2 border-b border-b-textColorCustom "} onClick={() => { setTabNameSelect('ChuongTrinh') }}>
                Chương trình tour
              </button>
              <button class={tabNameSelect == "TongQuan" ? " text-textColorCustom px-4 py-2 border-l border-r border-t border-textColorCustom " : " text-black px-4 py-2 border-b border-b-textColorCustom "} onClick={() => { setTabNameSelect('TongQuan') }}>
                Tổng quan tour
              </button>
              <button class={tabNameSelect == "DieuKien" ? " text-textColorCustom px-4 py-2 border-l border-r border-t border-textColorCustom " : " text-black px-4 py-2 border-b border-b-textColorCustom "} onClick={() => { setTabNameSelect('DieuKien') }}>
                Điều kiện tour
              </button>
            </div>
            {
              tabNameSelect == 'ChuongTrinh' ? <ChuongTrinh /> :
                (<div>
                  {
                    tabNameSelect == 'TongQuan' ? <TongQuan /> : <DieuKien />
                  }
                </div>)
            }
            {/* <div class="flex justify-around mb-6">
              <img alt="Beautiful beach" class="rounded h-128" src="https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png" width='600' />
              <div class="flex flex-col justify-between">
                <img alt="Phan Thiết city" class="rounded mb-2 h-64" src="https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png" width='360' />
                <img alt="Mui Ne" class="rounded h-64" src="https://res.cloudinary.com/doqbelkif/image/upload/v1726605769/9ae475e5-ab3e-4762-acd8-82a7a6e05086.png" width='360' />
              </div>
              <div class="flex flex-col justify-between ">
                <img alt="Phan Thiết city" class="rounded  h-40" src="https://res.cloudinary.com/doqbelkif/image/upload/v1726605783/077dc171-f2ed-48e2-a4b4-2c20b5fa4bc7.png" width='250' />
                <img alt="Mui Ne" class="rounded  h-40" src="https://res.cloudinary.com/doqbelkif/image/upload/v1726870188/484010f3-2134-4820-b713-511f1e106f22.png" width='250' />
                <img alt="Mui Ne" class="rounded h-40" src="https://res.cloudinary.com/doqbelkif/image/upload/v1726870188/484010f3-2134-4820-b713-511f1e106f22.png" width='250' />
              </div>
              <div class=" relative h-96 mt-auto mb-auto">
                <img
                  alt="Beautiful beach"
                  class="rounded h-96"
                  src="https://res.cloudinary.com/doqbelkif/image/upload/v1726601540/656c046a-02ef-4286-8f9f-34ca7ef6e82a.png"
                  width="600"
                />

                <span class="absolute  font-bold inset-0 flex items-center justify-center text-gray-600 bg-gray-200 bg-opacity-70 rounded ">
                  <IconDisplay iconName="AiOutlineCamera" /> Xem thêm ảnh
                </span>
              </div>
            </div>
            <div class="border p-4 mb-4 rounded-lg border-textColorCustom">
              <h2 class="font-bold mb-2">
                Bạn sẽ trải nghiệm
              </h2>
              <ul class="list-disc list-inside">
                <li>
                  Tham quan các điểm đẹp nhất Mũi Né chỉ trong 1 ngày
                </li>
                <li>
                  Lịch trình vào cát đỏ, vùng cảnh quan tựa như sa mạc cận Sahara và nhìn những cồn cát nhấp nhô tựa sóng kéo dài ngút tầm mắt
                </li>
                <li>
                  Ghé thăm một làng chài đặc trưng và thấy cuộc sống mộc mạc giản dị của một thị trấn ven biển
                </li>
                <li>
                  Cảm nhận làn nước mát lạnh của Suối Tiên chảy xuyên qua suối đá cát đỏ
                </li>
              </ul>
              <p>
                Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên bình, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát rực rỡ và thời tiết nắng ấm quanh năm. Từng là "nơi ít tròn nhất thế giới" bị mất, giờ đây Mũi Né đã trở thành điểm đến phổ biến cho những người tìm kiếm kỳ nghỉ, hoạt động ngoài trời và vẻ đẹp tự nhiên.
                Một trong những điểm thu hút lớn nhất của Mũi Né là những đồi cát nhấp nhô trải dài như sóng biển, thanh bình, nóng bỏng, mê hoặc. Bàu Đỏ giống như một ốc mạc thu nhỏ, cháy bỏng, hoang dại, mang đến một cảnh quan độc đáo để bạn khám phá và chụp ảnh.
                Ngoài ra, Mũi Né còn được biết đến với làng chài, nơi bạn có thể quan sát những chiếc thuyền đánh cá đầy màu sắc và chứng kiến cuộc sống nhộn nhịp của ngư dân miền biển giản dị. Đừng bỏ lỡ cơ hội thưởng thức hải sản tươi sống tại nhiều nhà hàng và quán ăn món ăn ngon đặc biệt từ sản phẩm đánh bắt trong ngày.
                Một sự pha trộn thú vị giữa vẻ đẹp tự nhiên, những cuộc phiêu lưu ngoài trời và khám phá văn hóa, đó chính là Mũi Né, một viên ngọc quý của Việt Nam.
              </p>
            </div>
            <div class="border pt-4 pb-4 border-textColorCustom rounded-lg">
              <h2 class="font-bold mb-2 pl-4">
                Vé trống cho bạn
              </h2>
              <hr class="border-3 border-[#3FD0D4] w-full mb-4" />
              <button class="bg-gray-200 text-gray-700 ml-4 px-4 py-2 rounded mb-4 flex">
                <IconDisplay iconName="AiOutlineCalendar" />Chọn ngày
              </button>
              <div class="space-y-4 pl-4">
                <div class="flex justify-between items-center border p-4 rounded">
                  <div>
                    <h3 class="font-bold">
                      Tour ghép - Khởi hành từ TP. Hồ Chí Minh
                    </h3>
                    <div class="flex">
                      <IconDisplay iconName="AiOutlineCalendar" />
                      <p> Ngày khởi hành: 18/09/2024</p>
                    </div>
                    <div class="flex">
                      <IconDisplay iconName="AiOutlineClockCircle" />
                      <p>Thời gian: 3 ngày 2 đêm
                      </p>
                    </div>
                    <a class="text-teal-500" href="#">
                      Xem chi tiết
                    </a>
                  </div>
                  <div class="text-right">
                    <div class="text-red-500 text-lg font-bold">
                      3.450.000đ
                    </div>
                    <button class="bg-teal-500 text-white px-4 py-2 rounded">
                      Chọn vé
                    </button>
                  </div>
                </div>
                <div class="flex justify-between items-center border p-4 rounded">
                  <div>
                    <h3 class="font-bold">
                      Tour ghép - Khởi hành từ Đà Nẵng
                    </h3>
                    <div class="flex">
                      <IconDisplay iconName="AiOutlineCalendar" />
                      <p> Ngày khởi hành: 18/09/2024</p>
                    </div>
                    <div class="flex">
                      <IconDisplay iconName="AiOutlineClockCircle" />
                      <p>Thời gian: 3 ngày 2 đêm
                      </p>
                    </div>
                    <a class="text-teal-500" href="#">
                      Xem chi tiết
                    </a>
                  </div>
                  <div class="text-right">
                    <div class="text-red-500 text-lg font-bold">
                      3.650.000đ
                    </div>
                    <button class="bg-teal-500 text-white px-4 py-2 rounded">
                      Chọn vé
                    </button>
                  </div>
                </div>
                <div class="flex justify-between items-center border p-4 rounded">
                  <div>
                    <h3 class="font-bold">
                      Tour ghép - Khởi hành từ TP. Hồ Chí Minh
                    </h3>
                    <div class="flex">
                      <IconDisplay iconName="AiOutlineCalendar" />
                      <p> Ngày khởi hành: 28/09/2024</p>
                    </div>
                    <div class="flex">
                      <IconDisplay iconName="AiOutlineClockCircle" />
                      <p>Thời gian: 3 ngày 2 đêm
                      </p>
                    </div>
                    <a class="text-teal-500" href="#">
                      Xem chi tiết
                    </a>
                  </div>
                  <div class="text-right">
                    <div class="text-red-500 text-lg font-bold">
                      3.450.000đ
                    </div>
                    <button class="bg-teal-500 text-white px-4 py-2 rounded">
                      Chọn vé
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </body>
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default DetailTour;

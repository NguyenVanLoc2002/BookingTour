import * as Icons from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";

function ChuongTrinh({ tourId }) {
  console.log("tourId Details: ", tourId);
  const IconDisplay = ({ iconName }) => {
    const IconComponent = Icons[iconName]; // Lấy biểu tượng dựa trên tên truyền vào

    return (
      <div className="flex items-center space-x-2">
        {IconComponent ? <IconComponent size={24} /> : null}{" "}
        {/* Hiển thị biểu tượng nếu tồn tại */}
      </div>
    );
  };

  //Call API Get Itineraries By TourId
  const [itineraries, setItineraries] = useState([]);
  useEffect(() => {
    const fetchItineraries = async () => {
      if (tourId) {
        try {
          const res = await axios.get(
            `http://localhost:8000/api/v1/itineraries/by-tour`,
            {
              params: { tourId: tourId },
            }
          );
          setItineraries(res.data);
          console.log(res.data);
        } catch (error) {
          console.error("Error fetching itinerary data:", error);
        }
      }
    };

    fetchItineraries();
  }, [tourId]);

  console.log("itineraries: ", itineraries);

  return (
    <>
      <div className="w-full h-full flex flex-col">
        {itineraries.map((it) => (
          <div key={it.itinerId} className="flex justify-around items-center">
            <img
              alt="Beautiful beach"
              className="rounded h-96 w-1/3"
              src="https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png"
            />
            <div className="bg-white p-4 rounded-lg shadow-md mb-4 text-base border border-textColorCustom w-7/12">
              <div className="flex items-center mb-2 ">
                <div className="bg-cyan-600 text-white rounded-full w-20 h-20 flex items-center justify-center font-bold">
                  Ngày {it.dayNumber}
                </div>
                <h1 className="ml-4 text-cyan-600 font-semibold text-xl">
                  {it.title}
                </h1>
              </div>

              <p className="text-gray-700 mb-2">{it.description}</p>

              {/* Task detail */}
              <p className="text-gray-700 mb-2">
                <strong>6h00:</strong>
                Xe và Hướng dẫn viên đón quý khách tại điểm hẹn, xe khởi hành,
                bắt đầu hành trình.
              </p>
              <p className="text-gray-700 mb-2">
                <strong>10h00:</strong>
                Đến với Bình Thuận quý khách dừng chân và tham quan:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-2">
                <li>
                  <strong>NÚI TÀ CÚ:</strong>
                  là một địa điểm leo núi, khuông cảnh hùng vĩ thơ mộng, kỳ vỹ
                  với núi non trùng điệp, tháp thoáng mái chùa cổ kính ẩn sâu
                  rừng cây.
                </li>
                <li>
                  <strong>CHÙA HẠ:</strong>
                  ngôi chùa nằm lưng chừng núi, chùa Hạ còn gọi là chùa dưới
                  trong chùa có tượng phật cao tuyệt đẹp.
                </li>
                <li>
                  Chiêm ngưỡng tượng
                  <strong>TAM THẾ PHẬT</strong>
                  vĩ đại.
                </li>
              </ul>
              <p className="text-gray-700 mb-2">
                <strong>12h00:</strong>
                Đoàn dùng bữa trưa tại nhà hàng KDL TÀ CÚ dưới chân núi. Tại
                đây, quý khách có thể tự do tham quan thưởng ngoạn cảnh thiên
                nhiên, nổi tiếng Bình Thuận: MŨI DƯƠNG PHIÊN hoặc mua quà cho
                người thân.
              </p>
              <p className="text-gray-700 mb-2">
                <strong>14h00:</strong>
                Đến điểm dừng resort MŨI NÉ, nhận phòng nghỉ ngơi. Tự do tắm
                biển, tận hưởng và trải nghiệm các tiện ích tại Resort.
              </p>
              <p className="text-gray-700 mb-2">
                <strong>18h00:</strong>
                Quý khách dùng bữa tối. Sau đó tự do nghỉ ngơi hoặc dạo biển đêm
                Mũi Né.
              </p>
              <p className="text-gray-700 mb-2">
                <strong>21h00:</strong>
                Quý khách có thể thay đổi không khí tham gia chương trình xem
                nhạc nước - fishermen.
              </p>
            </div>
          </div>
        ))}

        {/* <div className="flex justify-around  items-center ">
          <img
            alt="Beautiful beach"
            className="rounded h-96 w-1/3"
            src="https://res.cloudinary.com/doqbelkif/image/upload/v1726870188/484010f3-2134-4820-b713-511f1e106f22.png"
          />
          <div className="bg-white p-4 text-base rounded-lg shadow-md mb-4 border border-textColorCustom w-7/12">
            <div className="flex items-center mb-2 ">
              <div className="bg-cyan-600 text-white rounded-full w-20 h-20 flex items-center justify-center font-bold">
                Ngày 2
              </div>
              <h1 className="ml-4 text-cyan-600 font-semibold text-xl">
                Khu du lịch Bàu Sen
              </h1>
            </div>
            <p className="text-gray-700 mb-2">
              <strong>6h00:</strong>
              Xe và Hướng dẫn viên đón quý khách tại điểm hẹn, xe khởi hành, bắt
              đầu hành trình.
            </p>
            <p className="text-gray-700 mb-2">
              <strong>10h00:</strong>
              Đến với Bình Thuận quý khách dừng chân và tham quan:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-2">
              <li>
                <strong>NÚI TÀ CÚ:</strong>
                là một địa điểm leo núi, khuông cảnh hùng vĩ thơ mộng, kỳ vỹ với
                núi non trùng điệp, tháp thoáng mái chùa cổ kính ẩn sâu rừng
                cây.
              </li>
              <li>
                <strong>CHÙA HẠ:</strong>
                ngôi chùa nằm lưng chừng núi, chùa Hạ còn gọi là chùa dưới trong
                chùa có tượng phật cao tuyệt đẹp.
              </li>
              <li>
                Chiêm ngưỡng tượng
                <strong>TAM THẾ PHẬT</strong>
                vĩ đại.
              </li>
            </ul>
            <p className="text-gray-700 mb-2">
              <strong>12h00:</strong>
              Đoàn dùng bữa trưa tại nhà hàng KDL TÀ CÚ dưới chân núi. Tại đây,
              quý khách có thể tự do tham quan thưởng ngoạn cảnh thiên nhiên,
              nổi tiếng Bình Thuận: MŨI DƯƠNG PHIÊN hoặc mua quà cho người thân.
            </p>
            <p className="text-gray-700 mb-2">
              <strong>14h00:</strong>
              Đến điểm dừng resort MŨI NÉ, nhận phòng nghỉ ngơi. Tự do tắm biển,
              tận hưởng và trải nghiệm các tiện ích tại Resort.
            </p>
            <p className="text-gray-700 mb-2">
              <strong>18h00:</strong>
              Quý khách dùng bữa tối. Sau đó tự do nghỉ ngơi hoặc dạo biển đêm
              Mũi Né.
            </p>
            <p className="text-gray-700 mb-2">
              <strong>21h00:</strong>
              Quý khách có thể thay đổi không khí tham gia chương trình xem nhạc
              nước - fishermen.
            </p>
          </div>
        </div>
        <div className="flex justify-around  items-center ">
          <img
            alt="Beautiful beach"
            className="rounded h-96 w-1/3"
            src="https://res.cloudinary.com/doqbelkif/image/upload/v1726605783/077dc171-f2ed-48e2-a4b4-2c20b5fa4bc7.png"
          />
          <div className="bg-white p-4 rounded-lg text-base shadow-md mb-4 border border-textColorCustom w-7/12">
            <div className="flex items-center mb-2 ">
              <div className="bg-cyan-600 text-white rounded-full w-20 h-20 flex items-center justify-center font-bold">
                Ngày 3
              </div>
              <h1 className="ml-4 text-cyan-600 font-semibold text-xl">
                Phan Thiết - Núi Tà Cú - Mũi Né
              </h1>
            </div>
            <p className="text-gray-700 mb-2">
              <strong>6h00:</strong>
              Xe và Hướng dẫn viên đón quý khách tại điểm hẹn, xe khởi hành, bắt
              đầu hành trình.
            </p>
            <p className="text-gray-700 mb-2">
              <strong>10h00:</strong>
              Đến với Bình Thuận quý khách dừng chân và tham quan:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-2">
              <li>
                <strong>NÚI TÀ CÚ:</strong>
                là một địa điểm leo núi, khuông cảnh hùng vĩ thơ mộng, kỳ vỹ với
                núi non trùng điệp, tháp thoáng mái chùa cổ kính ẩn sâu rừng
                cây.
              </li>
              <li>
                <strong>CHÙA HẠ:</strong>
                ngôi chùa nằm lưng chừng núi, chùa Hạ còn gọi là chùa dưới trong
                chùa có tượng phật cao tuyệt đẹp.
              </li>
              <li>
                Chiêm ngưỡng tượng
                <strong>TAM THẾ PHẬT</strong>
                vĩ đại.
              </li>
            </ul>
            <p className="text-gray-700 mb-2">
              <strong>12h00:</strong>
              Đoàn dùng bữa trưa tại nhà hàng KDL TÀ CÚ dưới chân núi. Tại đây,
              quý khách có thể tự do tham quan thưởng ngoạn cảnh thiên nhiên,
              nổi tiếng Bình Thuận: MŨI DƯƠNG PHIÊN hoặc mua quà cho người thân.
            </p>
            <p className="text-gray-700 mb-2">
              <strong>14h00:</strong>
              Đến điểm dừng resort MŨI NÉ, nhận phòng nghỉ ngơi. Tự do tắm biển,
              tận hưởng và trải nghiệm các tiện ích tại Resort.
            </p>
            <p className="text-gray-700 mb-2">
              <strong>18h00:</strong>
              Quý khách dùng bữa tối. Sau đó tự do nghỉ ngơi hoặc dạo biển đêm
              Mũi Né.
            </p>
            <p className="text-gray-700 mb-2">
              <strong>21h00:</strong>
              Quý khách có thể thay đổi không khí tham gia chương trình xem nhạc
              nước - fishermen.
            </p>
          </div>
        </div> */}
      </div>

      <div className="mt-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow-md border border-textColorCustom w-1/2">
          <h2 className="mb-2 font-bold text-base">Thông tin chuyến bay</h2>
          <div className="grid grid-cols-2 gap-4 ">
            <div className="bg-[#D9D9D9]  text-base p-4">
              <p className="text-gray-500 mb-1">
                <strong>NGÀY ĐI</strong>
              </p>
              <p className="text-gray-700 mb-1 font-semibold">
                <span className="text-blue-500 font-semibold"> 06:00</span> ngày
                13/09/2024
              </p>
              <p className="text-gray-700 mb-1 font-semibold">
                <span className="text-blue-500 font-semibold"> 09:30</span> ngày
                13/09/2024
              </p>
              <p className="text-gray-700 mb-1 font-semibold">
                Chuyến bay:{" "}
                <span className="text-cyan-600 font-semibold">VN600</span>
              </p>
            </div>
            <div className="bg-[#D9D9D9] text-base p-4">
              <p className="text-gray-500 mb-1   ">
                <strong>NGÀY VỀ</strong>
              </p>
              <p className="text-gray-700 mb-1 font-semibold">
                <span className="text-blue-500 font-semibold"> 19:00</span> ngày
                15/09/2024
              </p>
              <p className="text-gray-700 mb-1 font-semibold">
                <span className="text-blue-500 font-semibold"> 22:30</span> ngày
                15/09/2024
              </p>
              <p className="text-gray-700 mb-1 font-semibold">
                Chuyến bay:{" "}
                <span className="text-cyan-600 font-semibold">VN601</span>
              </p>
            </div>
          </div>
          <p className="text-gray-500 mt-2 text-base">
            Chú ý: Vé máy bay không hoàn, không đổi, không hủy, sai tên mất 100%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-5 text-base">
        <div className="col-span-2 mr-5 bg-white p-4 rounded-lg shadow-md border border-textColorCustom ">
          <h3 className="text-cyan-600 font-semibold mb-2">
            Thông tin tập trung
          </h3>

          <div className="grid grid-cols-5">
            <p className="text-gray-700 col-span-2 mb-4">
              <strong>Ngày giờ tập trung</strong>
            </p>
            <p className="text-gray-700 mb-1 col-span-2">
              19:00 Ngày 15/09/2024
            </p>
          </div>
          <div className="grid grid-cols-5">
            <p className="text-gray-700 mb-1 col-span-2">
              <strong>Nơi tập trung</strong>
            </p>
            <p className="text-gray-700 mb-1 col-span-2">
              Sân bay Tân Sơn Nhất, TP.HCM
            </p>
          </div>
        </div>
        <div className=" bg-white p-4 col-span-2 rounded-lg shadow-md border border-textColorCustom">
          <h3 className="text-cyan-600 font-semibold mb-2">
            Thông tin hướng dẫn viên
          </h3>
          <div className="grid grid-cols-5">
            <p className="text-gray-700 col-span-2 mb-4">
              <strong>HDV dẫn đoàn</strong>
            </p>
            <p className="text-gray-700 mb-1 col-span-2">Đang cập nhật</p>
          </div>
          <div className="grid grid-cols-5">
            <p className="text-gray-700 mb-1 col-span-2">
              <strong>HDV tiễn</strong>
            </p>
            <p className="text-gray-700 mb-1 col-span-2">Đang cập nhật</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChuongTrinh;

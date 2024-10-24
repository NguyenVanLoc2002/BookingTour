import * as Icons from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";

function ChuongTrinh({ tour }) {
  console.log("tour Details: ", tour);
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
      if (tour) {
        try {
          const res = await axios.get(
            `http://localhost:8000/api/v1/itineraries/by-tour`,
            {
              params: { tourId: tour.tourId },
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
  }, [tour]);

  console.log("itineraries: ", itineraries);

  //Call API  Get Activities By ItineraryId
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivitiesByItinerary = async (itinerId) => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/itineraries/activities/by-itinerary`,
          {
            params: { itinerId },
          }
        );
        // Lưu activity theo itinerId
        setActivities((prev) => ({
          ...prev,
          [itinerId]: res.data,
        }));
      } catch (error) {
        console.error("Error fetching itinerary data:", error);
      }
    };

    // Kiểm tra xem itineraries có tồn tại và không rỗng
    if (itineraries.length > 0) {
      itineraries.forEach((it) => {
        fetchActivitiesByItinerary(it.itinerId); // Truyền itinerId vào hàm
      });
    }
  }, [itineraries]);

  console.log("activities: ", activities);

  return (
    <>
      <div className="w-full h-full flex flex-col">
        {itineraries.map((it, index) => (
          <div
            key={it.itinerId}
            className="flex justify-around items-stretch mb-4"
          >
            <img
              alt="Beautiful beach"
              className="rounded h-96 w-1/3 object-cover"
              src={tour.urlImage[index]}
            />
            <div className="bg-white p-4 rounded-lg shadow-md text-base border border-textColorCustom w-7/12 flex flex-col ">
              <div className="flex items-center mb-10">
                <div className="bg-cyan-600 text-white rounded-full w-20 h-20 flex items-center justify-center font-bold">
                  Ngày {it.dayNumber}
                </div>
                <h1 className="ml-4 text-cyan-600 font-semibold text-xl">
                  {it.title}
                </h1>
              </div>

              {/* Task detail */}
              <ul>
                {activities[it.itinerId]?.map((activity) => (
                  <li key={activity.activityId}>
                    <p className="text-gray-700 mb-2">
                      <strong>{activity.time}: </strong>
                      {activity.activityDescription}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
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

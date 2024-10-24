import axios from "axios";
import { useEffect, useState } from "react";
import * as Icons from "react-icons/ai";

function TongQuan({ tour }) {
  const IconDisplay = ({ iconName }) => {
    const IconComponent = Icons[iconName]; // Lấy biểu tượng dựa trên tên truyền vào
    console.log("Tong Quan tour: ", tour.tourId);

    return (
      <div className="flex items-center space-x-2">
        {IconComponent ? <IconComponent size={24} /> : null}{" "}
        {/* Hiển thị biểu tượng nếu tồn tại */}
      </div>
    );
  };

  //Call API Ticket Tour
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    const fetchTickets = async () => {
      if (tour) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/v1/tours/tour-tickets/by-tour/${tour.tourId}`
          );
          setTickets(response.data);
        } catch (error) {
          console.error("Error fetching Ticket Tour data:", error);
        }
      }
    };
    fetchTickets();
  }, [tour]);

  console.log("Ticket: ", tickets);

  // Hàm định dạng giá tiền
  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0, // không hiển thị số thập phân
      maximumFractionDigits: 0,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày và đảm bảo có 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng (tháng 0 bắt đầu từ 0)
    const year = date.getFullYear(); // Lấy năm
    return `${day}/${month}/${year}`; // Trả về định dạng "dd/mm/yyyy"
  };

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <body className="bg-gray-100">
          <div className="w-full mx-auto p-4 bg-white shadow-md">
            <div className="flex justify-around mb-6">
              <img
                alt="Beautiful beach"
                className="rounded h-128"
                src="https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png"
                width="600"
              />
              <div className="flex flex-col justify-between">
                <img
                  alt="Phan Thiết city"
                  className="rounded mb-2 h-64"
                  src="https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png"
                  width="360"
                />
                <img
                  alt="Mui Ne"
                  className="rounded h-64"
                  src="https://res.cloudinary.com/doqbelkif/image/upload/v1726605769/9ae475e5-ab3e-4762-acd8-82a7a6e05086.png"
                  width="360"
                />
              </div>
              <div className="flex flex-col justify-between ">
                <img
                  alt="Phan Thiết city"
                  className="rounded  h-40"
                  src="https://res.cloudinary.com/doqbelkif/image/upload/v1726605783/077dc171-f2ed-48e2-a4b4-2c20b5fa4bc7.png"
                  width="250"
                />
                <img
                  alt="Mui Ne"
                  className="rounded  h-40"
                  src="https://res.cloudinary.com/doqbelkif/image/upload/v1726870188/484010f3-2134-4820-b713-511f1e106f22.png"
                  width="250"
                />
                <img
                  alt="Mui Ne"
                  className="rounded h-40"
                  src="https://res.cloudinary.com/doqbelkif/image/upload/v1726870188/484010f3-2134-4820-b713-511f1e106f22.png"
                  width="250"
                />
              </div>
              <div className=" relative h-96 mt-auto mb-auto">
                <img
                  alt="Beautiful beach"
                  className="rounded h-96"
                  src="https://res.cloudinary.com/doqbelkif/image/upload/v1726601540/656c046a-02ef-4286-8f9f-34ca7ef6e82a.png"
                  width="600"
                />

                <span className="absolute  font-bold inset-0 flex items-center justify-center text-gray-600 bg-gray-200 bg-opacity-70 rounded ">
                  <IconDisplay iconName="AiOutlineCamera" /> Xem thêm ảnh
                </span>
              </div>
            </div>
            <div className="border p-4 mb-4 rounded-lg border-textColorCustom">
              <h2 className="font-bold mb-2">Bạn sẽ trải nghiệm</h2>
              <ul className="list-disc list-inside">
                <li>Tham quan các điểm đẹp nhất Mũi Né chỉ trong 1 ngày</li>
                <li>
                  Lịch trình vào cát đỏ, vùng cảnh quan tựa như sa mạc cận
                  Sahara và nhìn những cồn cát nhấp nhô tựa sóng kéo dài ngút
                  tầm mắt
                </li>
                <li>
                  Ghé thăm một làng chài đặc trưng và thấy cuộc sống mộc mạc
                  giản dị của một thị trấn ven biển
                </li>
                <li>
                  Cảm nhận làn nước mát lạnh của Suối Tiên chảy xuyên qua suối
                  đá cát đỏ
                </li>
              </ul>
              <p>
                Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ
                dưỡng yên bình, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát
                rực rỡ và thời tiết nắng ấm quanh năm. Từng là "nơi ít tròn nhất
                thế giới" bị mất, giờ đây Mũi Né đã trở thành điểm đến phổ biến
                cho những người tìm kiếm kỳ nghỉ, hoạt động ngoài trời và vẻ đẹp
                tự nhiên. Một trong những điểm thu hút lớn nhất của Mũi Né là
                những đồi cát nhấp nhô trải dài như sóng biển, thanh bình, nóng
                bỏng, mê hoặc. Bàu Đỏ giống như một ốc mạc thu nhỏ, cháy bỏng,
                hoang dại, mang đến một cảnh quan độc đáo để bạn khám phá và
                chụp ảnh. Ngoài ra, Mũi Né còn được biết đến với làng chài, nơi
                bạn có thể quan sát những chiếc thuyền đánh cá đầy màu sắc và
                chứng kiến cuộc sống nhộn nhịp của ngư dân miền biển giản dị.
                Đừng bỏ lỡ cơ hội thưởng thức hải sản tươi sống tại nhiều nhà
                hàng và quán ăn món ăn ngon đặc biệt từ sản phẩm đánh bắt trong
                ngày. Một sự pha trộn thú vị giữa vẻ đẹp tự nhiên, những cuộc
                phiêu lưu ngoài trời và khám phá văn hóa, đó chính là Mũi Né,
                một viên ngọc quý của Việt Nam.
              </p>
            </div>
            <div className="border pt-4 pb-4 border-textColorCustom rounded-lg">
              <h2 className="font-bold mb-2 pl-4">Vé trống cho bạn</h2>
              <hr className="border-3 border-[#3FD0D4] w-full mb-4" />
              <button className="bg-gray-200 text-gray-700 ml-4 px-4 py-2 rounded mb-4 flex">
                <IconDisplay iconName="AiOutlineCalendar" />
                Chọn ngày
              </button>

              <div className="space-y-4 pl-4">
                {tickets.map((ticket_tour) => (
                  <div
                    className="flex justify-between items-center border p-4 rounded"
                    key={ticket_tour.ticketId}
                  >
                    <div>
                      <h3 className="font-bold">
                        Tour ghép - Khởi hành từ {tour.departureLocation}
                      </h3>
                      <div className="flex">
                        <IconDisplay iconName="AiOutlineCalendar"/>
                        <p  className="ml-1"> Ngày khởi hành: {formatDate(tour.departureDate)}</p>
                      </div>
                      <div className="flex">
                        <Icons.AiOutlineUser className="mr-2" size={20}/>
                        <p>
                          Số chỗ:{" "}
                          {tour.availableSlot > 0
                            ? `Còn ${tour.availableSlot} chỗ trống`
                            : "Hết chỗ"}
                        </p>
                      </div>
                      <a className="text-teal-500" href="#">
                        Xem chi tiết
                      </a>
                    </div>
                    <div className="text-right">
                      <div className="text-red-500 text-lg font-bold">
                        {formatCurrency(tour.price)}
                      </div>
                      <button className="bg-teal-500 text-white px-4 py-2 rounded">
                        Chọn vé
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </body>
      </div>
    </>
  );
}

export default TongQuan;

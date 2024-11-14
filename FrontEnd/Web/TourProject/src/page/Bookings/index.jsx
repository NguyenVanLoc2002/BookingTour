import { useEffect, useRef, useState } from "react";
import Header from "../../layouts/Header";
import Menu from "../../layouts/Menu";
import Footer from "../../layouts/Footer";
import DetailBooking from "./component/DetailBooking";
import { Button, Input, Space, Table, Tag } from "antd";
import {CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined,DeleteOutlined, SyncOutlined, EyeOutlined } from '@ant-design/icons';
function Bookings() {
  const [tabNameSelect, setTabNameSelect] = useState("DaDat");
  const [textMaDatTour, setTextMaDatTour] = useState("");
  const [textMail, setTextMail] = useState("");
  const [tourData, setTourData] = useState({});
  const columns = [
    {
      title: 'Mã đặt tour',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Tên Tour',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Ngày Khởi Hành',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Thời Gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (text) => {
        // Định dạng giá sử dụng Intl.NumberFormat
        return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(text);
      },
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (text) => (
        <>
          {
            text === "DaDat" ? (<Tag icon={<ClockCircleOutlined eOutlined />} color="success">
              Đã đặt
            </Tag>) : (
              text === "DangXuLy" ? (<Tag icon={<SyncOutlined spin />} color="processing">
                Đang xử lý
              </Tag>) : (
                text === "DaHuy" ? (<Tag icon={<CloseCircleOutlined />} color="error">
                  Đã hủy
                </Tag>) : (
                  <Tag icon={<CheckCircleOutlined />} color="cyan">
                    Đã hoàn thành
                  </Tag>
                )
              )
            )
          }
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'status',
      render: (text,record) => (
        <>
          {
            (text === "DaDat" || text === "DangXuLy") ? (
              <div>

                <Button type="primary" icon={<EyeOutlined />} className="mr-2"  onClick={()=>{showModal(record)}}>
                  Xem chi tiết
                </Button>
                <Button type="primary" icon={<DeleteOutlined />} danger>
                  Hủy Tour
                </Button>
              </div>

            ) : (
              <Button
                type="primary"
                icon={<EyeOutlined />}
                onClick={()=>{showModal(record)}}
              >
                Xem chi tiết
              </Button>
            )
          }

        </>



      ),
    },
  ];
  const dataBookings = [{
    id: "DT001",
    name: "Phú Quốc - Hà Giang",
    date: "18-12-2024",
    time: "06:20",
    price: 5465000,
    status: "DaDat",
    bookingCode: "B457FA",
    customerName: "TRAN BAO TRUC",
    flightCode:"VN 2002",
    flightTime:"2 tiếng 20 phút",
    departureTime: "12:00",
    arrivalTime: "14:05",
    departure: "Hồ Chí Minh (SGN)",
    destination: "Đà Lạt (DLT)",
    airline: "VIETNAM AIRLINES",
    distance:"182",
    tramDung:0,
    rank:"Thương gia",
    statusFlight:"Đã xác nhận"
  },
  {
    id: "DT002",
    name: "Cà Mau - Long An",
    date: "18-12-2024",
    time: "06:20",
    price: 5465000,
    status: "DaHoanThanh",
    bookingCode: "B457FA",
    customerName: "TRAN PHI PHAT",
    flightCode:"VN 2002",
    flightTime:"1 tiếng 20 phút",
    departureTime: "12:00",
    arrivalTime: "14:05",
    departure: "Hồ Chí Minh (SGN)",
    destination: "Long An (LAB)",
    airline: "VIETNAM AIRLINES",
    distance:"182",
    tramDung:0,
    rank:"Thương gia",
    statusFlight:"Đã hoàn thành"
  },
  {
    id: "DT003",
    name: "Tây Ninh",
    date: "18-12-2024",
    time: "06:20",
    price: 5465000,
    status: "DaHuy",
    bookingCode: "B457FA",
    customerName: "NGUYEN VAN LOC",
    flightCode:"VN 2002",
    flightTime:"1 tiếng 20 phút",
    departureTime: "12:00",
    arrivalTime: "14:05",
    departure: "Hồ Chí Minh (SGN)",
    destination: "Thanh Hóa (THD)",
    airline: "VIETNAM AIRLINES",
    distance:"182",
    tramDung:0,
    rank:"Thương gia",
    statusFlight:"Đã hủy"
  },
  {
    id: "DT004",
    name: "Long An",
    date: "18-12-2024",
    time: "06:20",
    price: 5465000,
    status: "DangXuLy",
    bookingCode: "B457FA",
    customerName: "TRAN THI YEN NHI",
    flightCode:"VN 2002",
    flightTime:"1 tiếng 20 phút",
    departureTime: "12:00",
    arrivalTime: "14:05",
    departure: "Hồ Chí Minh (SGN)",
    destination: "Thanh Hóa (THD)",
    airline: "VIETNAM AIRLINES",
    distance:"182",
    tramDung:0,
    rank:"Khoang thường",
    statusFlight:"Đang xử lý"
  },
  {
    id: "DT004",
    name: "Long An",
    date: "18-12-2024",
    time: "06:20",
    price: 5465000,
    status: "DangXuLy",
    bookingCode: "B457FA",
    customerName: "BUI TRI THUC",
    flightCode:"VN 2002",
    flightTime:"1 tiếng 20 phút",
    departureTime: "12:00",
    arrivalTime: "14:05",
    departure: "Hồ Chí Minh (SGN)",
    destination: "Thanh Hóa (THD)",
    airline: "VIETNAM AIRLINES",
    distance:"182",
    tramDung:0,
    rank:"Thương gia",
    statusFlight:"Đã xác nhận"
  },
  {
    id: "DT005",
    name: "Long Khánh",
    date: "18-12-2024",
    time: "06:20",
    price: 5465000,
    status: "DangXuLy",
    bookingCode: "B457FA",
    customerName: "TRAN BAO TRAN",
    flightCode:"VN 2002",
    flightTime:"1 tiếng 20 phút",
    departureTime: "12:00",
    arrivalTime: "14:05",
    departure: "Hồ Chí Minh (SGN)",
    destination: "Thanh Hóa (THD)",
    airline: "VIETNAM AIRLINES",
    distance:"182",
    tramDung:0,
    rank:"Thương gia",
    statusFlight:"Đã xác nhận"
  },
  {
    id: "DT006",
    name: "Đà Lạt",
    date: "18-12-2024",
    time: "06:20",
    price: 5465000,
    status: "DaDat",
    bookingCode: "B457FA",
    customerName: "PHAM TRAN GIA BAO",
    flightCode:"VN 2002",
    flightTime:"1 tiếng 20 phút",
    departureTime: "12:00",
    arrivalTime: "14:05",
    departure: "Hồ Chí Minh (SGN)",
    destination: "Thanh Hóa (THD)",
    airline: "VIETNAM AIRLINES",
    distance:"182",
    tramDung:0,
    rank:"Thương gia",
    statusFlight:"Đã xác nhận"
  },
  {
    id: "DT007",
    name: "Biên Hòa",
    date: "18-12-2024",
    time: "06:20",
    price: 5465000,
    status: "DaHoanThanh",
    bookingCode: "B457FA",
    customerName: "NGUYEN TRAN GIA LAM",
    flightCode:"VN 2002",
    flightTime:"1 tiếng 20 phút",
    departureTime: "12:00",
    arrivalTime: "14:05",
    departure: "Hồ Chí Minh (SGN)",
    destination: "Thanh Hóa (THD)",
    airline: "VIETNAM AIRLINES",
    distance:"182",
    tramDung:0,
    rank:"Thương gia",
    statusFlight:"Đã xác nhận"
  },
  {
    id: "DT008",
    name: "An Giang",
    date: "18-12-2024",
    time: "06:20",
    price: 5465000,
    status: "DaHuy",
    bookingCode: "B457FA",
    customerName: "NGUYEN TRAN TRAM ANH",
    flightCode:"VN 2002",
    flightTime:"1 tiếng 20 phút",
    departureTime: "12:00",
    arrivalTime: "14:05",
    departure: "Hồ Chí Minh (SGN)",
    destination: "Thanh Hóa (THD)",
    airline: "VIETNAM AIRLINES",
    distance:"182",
    tramDung:0,
    rank:"Thương gia",
    statusFlight:"Đã xác nhận"
  },
  {
    id: "DT009",
    name: "Đà Lạt",
    date: "18-12-2024",
    time: "06:20",
    price: 5465000,
    status: "DaDat",
    bookingCode: "B457FA",
    customerName: "NGUYEN TRAN NHA HAN",
    flightCode:"VN 2002",
    flightTime:"1 tiếng 20 phút",
    departureTime: "12:00",
    arrivalTime: "14:05",
    departure: "Hồ Chí Minh (SGN)",
    destination: "Thanh Hóa (THD)",
    airline: "VIETNAM AIRLINES",
    distance:"182",
    tramDung:0,
    rank:"Thương gia",
    statusFlight:"Đã xác nhận"
  },
  {
    id: "DT010",
    name: "Biên Hòa",
    date: "18-12-2024",
    time: "06:20",
    price: 5465000,
    status: "DaHoanThanh",
    bookingCode: "B457FA",
    customerName: "NGUYEN TRAN GIA HUY",
    flightCode:"VN 2002",
    flightTime:"1 tiếng 20 phút",
    departureTime: "12:00",
    arrivalTime: "14:05",
    departure: "Hồ Chí Minh (SGN)",
    destination: "Biên Hòa (BHD)",
    airline: "VIETNAM AIRLINES",
    distance:"182",
    tramDung:0,
    rank:"Thương gia",
    statusFlight:"Đã xác nhận"
  },
  {
    id: "DT011",
    name: "An Giang",
    date: "18-12-2024",
    time: "06:20",
    price: 5465000,
    status: "DaHuy",
    bookingCode: "B457FA",
    customerName: "NGO NGOC DIEM PHUC",
    flightCode:"VN 2002",
    flightTime:"1 tiếng 20 phút",
    departureTime: "12:00",
    arrivalTime: "14:05",
    departure: "Hồ Chí Minh (SGN)",
    destination: "An Giang (AG)",
    airline: "VIETNAM AIRLINES",
    distance:"182",
    tramDung:0,
    rank:"Thương gia",
    statusFlight:"Đã xác nhận"
  },
  ]
  const dataDaDat = dataBookings.filter(item => item.status === "DaDat");
  const dataDaHuy = dataBookings.filter(item => item.status === "DaHuy");
  const dataDaHoanThanh = dataBookings.filter(item => item.status === "DaHoanThanh");
  const dataDangXuLy = dataBookings.filter(item => item.status === "DangXuLy");
  const [isModalVisible, setIsModalVisible] = useState(false);

  

  const showModal = (record) => {
    setTourData(record);
    setIsModalVisible(true);
    
  }
  const handleClose = () => setIsModalVisible(false);

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <Header />
        <Menu />
        <body className="bg-gray-100">
          <DetailBooking
            visible={isModalVisible}
            onClose={handleClose}
            tourData={tourData}
          />
          <div className="w-full mx-auto p-4 bg-white shadow-md">
            <div className="flex  mb-8 text-base font-bold">
              <button
                className={
                  tabNameSelect == "TimKiem"
                    ? " text-textColorCustom px-4 py-2 border-l border-r border-t border-textColorCustom "
                    : " text-black px-4 py-2 border-b border-b-textColorCustom "
                }
                onClick={() => {
                  setTabNameSelect("TimKiem");
                }}
              >
                Tất cả
              </button>
              <button
                className={
                  tabNameSelect == "DaDat"
                    ? " text-textColorCustom px-4 py-2 border-l border-r border-t border-textColorCustom "
                    : " text-black px-4 py-2 border-b border-b-textColorCustom "
                }
                onClick={() => {
                  setTabNameSelect("DaDat");
                }}
              >
                Tour đã đặt
              </button>
              <button
                className={
                  tabNameSelect == "DangXuLy"
                    ? " text-textColorCustom px-4 py-2 border-l border-r border-t border-textColorCustom "
                    : " text-black px-4 py-2 border-b border-b-textColorCustom "
                }
                onClick={() => {
                  setTabNameSelect("DangXuLy");
                }}
              >
                Tour đang xử lý
              </button>
              <button
                className={
                  tabNameSelect == "DaHoanThanh"
                    ? " text-textColorCustom px-4 py-2 border-l border-r border-t border-textColorCustom "
                    : " text-black px-4 py-2 border-b border-b-textColorCustom "
                }
                onClick={() => {
                  setTabNameSelect("DaHoanThanh");
                }}
              >
                Tour đã hoàn thành
              </button>
              <button
                className={
                  tabNameSelect == "DaHuy"
                    ? " text-textColorCustom px-4 py-2 border-l border-r border-t border-textColorCustom "
                    : " text-black px-4 py-2 border-b border-b-textColorCustom "
                }
                onClick={() => {
                  setTabNameSelect("DaHuy");
                }}
              >
                Tour đã hủy
              </button>

            </div>
            {tabNameSelect == "TimKiem" ? (
              <div>
                <div className="flex">

                  <Input
                    placeholder="Mã đặt tour"
                    value={textMaDatTour}
                    onChange={(e) => setTextMaDatTour(e.target.value)}
                    className="rounded-xl h-10 mr-2  text-base" style={{ width: 300 }}
                  />
                  <Input
                    placeholder="Email"
                    value={textMail}

                    onChange={(e) => setTextMail(e.target.value)}
                    className="rounded-xl h-10 mr-2  text-base required:" style={{ width: 500 }}
                  />
                  <Button className="rounded-xl h-10 pl-8 pr-8 font-bold mr-2 bg-customColor text-lg ">Tìm kiếm</Button>


                </div>
                <Table columns={columns} dataSource={dataBookings} className="mt-8" pagination={{ pageSize: 5 }} />
              </div>
            ) : (
              <div>
                {tabNameSelect == "DaDat" ? (
                  <Table columns={columns} dataSource={dataDaDat} pagination={{ pageSize: 5 }} />
                ) : (
                  <div>
                    {tabNameSelect == "DangXuLy" ? (
                      <Table columns={columns} dataSource={dataDangXuLy} pagination={{ pageSize: 5 }} />
                    ) : (
                      <div>
                        {tabNameSelect == "DaHuy" ? (
                          <Table columns={columns} dataSource={dataDaHuy} pagination={{ pageSize: 5 }} />
                        ) : (
                          <Table columns={columns} dataSource={dataDaHoanThanh} pagination={{ pageSize: 5 }} />
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

          </div>
        </body>
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default Bookings;

import { Modal, Typography, Divider, Table } from 'antd';
import logoText from "../../../assets/logo_Text.jpg";
import { FaPlane } from "react-icons/fa";
const {  Text } = Typography;
import {
  CaretRightOutlined
} from '@ant-design/icons';

const DetailBooking = ({ visible, onClose, tourData }) => {
  const columns = [
    {
      title: 'Tên hành khách',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Ghế',
      dataIndex: 'position',
      key: 'position',
      render: (text) => <a>{text ? (text) : ("Được thông báo khi check in")}</a>,
    },
    {
      title: 'Hạng',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'Tình trạng',
      dataIndex: 'statusFlight',
      key: 'statusFlight',
    },

  ];
  return (
    <>
      <Modal
        title="Thông tin đặt chỗ"
        visible={visible}
        onCancel={onClose}
        footer={null}
        width={800}
      >
        <div className="flex justify-end">
          <Text strong>CHUYẾN ĐI ĐẾN<Text className="text-lg"> {tourData.name}, Việt Nam</Text></Text>
        </div>
        <Divider style={{ marginBottom: -15 }} />
        <div className="flex justify-between items-center">
          <Text strong >Mã đặt chỗ:  <Text code className="text-lg">{tourData.bookingCode}</Text></Text>
          <div className="w-full md:w-[15%]">
            <img src={logoText} alt="Logo" className="w-[120px] h-auto" />
          </div>
        </div>
        <Divider style={{ marginTop: -15 }} />

        <div className="flex">
          <FaPlane size={32} />
          <div className="flex flex-col mr-4 ml-4 mb-4">
            <Text className="text-lg  font-bold">KHỞI HÀNH : {tourData.time}, {tourData.date}</Text>
            <Text>Quý khách vui lòng kiểm tra thời gian bay trước khi khởi hành</Text>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col p-4  bg-slate-300">
            <Text className="text-lg ">{tourData.airline}</Text>
            <Text className="text-lg  font-bold pb-2">{tourData.flightCode}</Text>
            <Text>Thời gian bay: {tourData.flightTime}</Text>
          </div>
          <div className="bg-white flex  flex-row border-l border-r border-gray-300">
            <div className="bg-white flex flex-col border-l border-r border-gray-300">
              <div className="flex justify-between text-lg font-bold  border-t border-b border-gray-300 p-4">
                <Text>{tourData.departure}</Text>
                <CaretRightOutlined />
                <Text>{tourData.destination}</Text>
              </div>
              <div className="flex flex-row  text-lg font-bold border-b border-gray-300">
                <div className="flex flex-col text-lg font-bold  border-r p-4 border-gray-300" style={{ width: '50%' }}>
                  <Text>Giờ khởi hành</Text>
                  <Text>{tourData.departureTime}</Text>
                </div>
                <div className="flex flex-col text-lg font-bold p-4 " style={{ width: '50%' }}>
                  <Text>Giờ đến</Text>
                  <Text>{tourData.arrivalTime}</Text>
                </div>
              </div>
            </div>
            <div className="flex flex-col border-t border-b border-gray-300 p-4">
              <Text className="font-bold">Quảng đường đi: {tourData.distance} km</Text>
              <Text>Trạm dừng: {tourData.tramDung}</Text>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Table columns={columns} dataSource={[tourData]} pagination={false} />
        </div>
      </Modal>
    </>
  );
}

export default DetailBooking;

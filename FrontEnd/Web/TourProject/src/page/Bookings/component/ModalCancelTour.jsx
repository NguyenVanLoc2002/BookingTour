import { useEffect, useRef, useState } from "react";
import { Modal, Typography, Button } from 'antd';
import panda from "../../../assets/iconTour/panda.png";
const { Text } = Typography;
import dayjs from "dayjs";

const ModalCancelTour = ({ visible, onClose, tourData }) => {
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState('');
  const [numDay, setNumDay] = useState('');
  // const [priceRefund, setPriceRefund] = useState('');
  const format = "DD-MM-YYYY"; // Định dạng ngày tháng
  const today = dayjs();
  useEffect(() => {
    const date = dayjs(tourData?.date, format);
    const num = date.diff(today, "day");
    setNumDay(num)
    if (num > 9) {
      setPercent(75);
    }
    else if (num <= 9 && num >= 5) {
      setPercent(50);
    } else if (num <= 4 && num >= 2) {
      setPercent(25);
    }
    else setPercent(0)
  }, [tourData]);
  const formatMoney = (data) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency', currency: 'VND',
    }).format(data)

  }
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  return (
    <>
      <Modal
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button key="back" onClick={onClose}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Xác nhận
          </Button>,
        
        ]}
        width={600}
      >
        <div class="flex items-center mt-4">
          <div class="border-t border-gray-400 flex-1"></div>
          <span class="mx-4 text-gray-600 text-lg font-bold">Xác nhận hủy tour</span>
          <div class="border-t border-gray-400 flex-1"></div>
        </div>
        <div className='pl-4 pt-6'>
          <div className='pb-2'><Text className='font-bold text-red-500 text-base'>Thông tin</Text></div>
          <div className='flex'>
            <div className='flex flex-col w-56 font-bold'>
              <Text>Mã đơn đặt tour:</Text>
              <Text>Tên tour:</Text>
              <Text>Ngày khởi hành:</Text>
              <Text>Giá tiền:</Text>
              <Text>Số ngày đến ngày khởi hành:</Text>
            </div>
            <div className='flex flex-col'>
              <Text>{tourData?.id}</Text>
              <Text>{tourData?.name}</Text>
              <Text>{tourData?.date}</Text>
              <Text>{formatMoney(tourData?.price)}</Text>
              <Text>{numDay}</Text>
            </div>
          </div>
          <div className="p-2">
            <div className="flex justify-center p-2"><Text className="font-bold text-center  text-lg">Bạn có chắc chắn muốn hủy tour trên không?</Text></div>
            
            <Text>Nếu bạn hủy đơn đặt tour ngay bây giờ thì thì bạn sẽ được hoàn </Text>
            <Text strong>{formatMoney(tourData.price * percent / 100)} ({percent}%) </Text>
           
          </div>


        </div>
      </Modal>
    </>
  );
}

export default ModalCancelTour;

import { useEffect, useRef, useState } from "react";

import Header from "../../layouts/Header";
import Menu from "../../layouts/Menu";
import Footer from "../../layouts/Footer";

function Booking() {
  const tour = {
    url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605783/077dc171-f2ed-48e2-a4b4-2c20b5fa4bc7.png",
    price: 6500000,
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
    ngayKetThuc: "08-09-2024",
    noiKetThuc: "Phú Quốc",
    listAnh: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png",
      "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
      "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"],
    traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát rực rỡ và thời tiết nắng ấm quanh năm. Từng là bí mật, giờ đây Mũi Né đã trở thành điểm đến phổ biến cho những người tìm kiếm sự thư giãn, hoạt động ngoài trời và vẻ đẹp tự nhiên.",

  }

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [diaChi, setDiaChi] = useState('');
  const listTinh = [
    { label: 'Hồ Chí Minh', value: 'VN' },
    { label: 'Long An', value: 'Fran' },
    { label: 'Tây Ninh', value: 'UK' },
    { label: 'Hà Nội', value: 'USA' },
  ]
  const listQuan = [
    { label: 'Gò Vấp', value: 'VN' },
    { label: 'Quận 1', value: 'Fran' },
    { label: 'Quận 2', value: 'UK' },
    { label: 'Quận 3', value: 'USA' },
  ]
  const listPhuong = [
    { label: 'Phường 1', value: '1' },
    { label: 'Phường 2', value: '2' },
    { label: 'Phường 3', value: '3' },
    { label: 'Phường 4', value: '4' },
  ]
  const [selectedTinh, setSelectedTinh] = useState('');
  const [selectedQuan, setSelectedQuan] = useState('');
  const [selectedPhuong, setSelectedPhuong] = useState('');

  const [nguoiLon, setNguoiLon] = useState(1);
  const [treEm, setTreEm] = useState(0);
  const [treNho, setTreNho] = useState(0);
  const [emBe, setEmBe] = useState(0);

  const tangNguoiLon = () => setNguoiLon(prev => prev + 1);
  const giamNguoiLon = () => setNguoiLon(prev => (prev > 1 ? prev - 1 : 1));
  const tangTreEm = () => setTreEm(prev => prev + 1);
  const giamTreEm = () => setTreEm(prev => (prev > 0 ? prev - 1 : 0));
  const tangTreNho = () => setTreNho(prev => prev + 1);
  const giamTreNho = () => setTreNho(prev => (prev > 0 ? prev - 1 : 0));
  const tangEmBe = () => setEmBe(prev => prev + 1);
  const giamEmBe = () => setEmBe(prev => (prev > 0 ? prev - 1 : 0));

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0, // không hiển thị số thập phân
      maximumFractionDigits: 0,
    });
  };

  return (
    <>
      <div className="w-full h-full flex flex-col bg-slate-200">
        <Header />
        <Menu />
        <div className="flex mt-4 container mx-auto">
          <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <div className="tour" style={{ display: 'flex', alignItems: 'flex-start' }}>
              <img src={tour?.url} alt="Tour" style={{ width: '60%', height: 'auto', borderRadius: '8px', paddingRight: 30 }} />
              <div className="detail-tour" style={{ marginLeft: '20px', flex: 1 }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{tour?.title}</h2>
                <p style={{ fontSize: '18px', fontWeight: 500, paddingTop: 20 }} >Khởi hành: {tour?.ngayKhoiHanh}</p>

                <p style={{ fontSize: '18px', fontWeight: 500 }}>Thời gian: {tour?.thoiGian}</p>
                <p style={{ fontSize: '18px', fontWeight: 500 }}>Số chỗ còn nhận: {tour?.soLuongVe - tour?.soVeDaDat}/{tour?.soLuongVe}</p>

              </div>
            </div>
            <div className="box" style={{ marginTop: '20px', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Hành khách:</h3>
              <div className="row-around" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="box-hanhkhach" style={{ border: '1px solid #3FD0D4', borderRadius: '8px', padding: '10px', flex: '1', margin: '5px' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Người lớn</h4>
                  <p style={{ fontSize: '16px' }}>Từ 12 tuổi trở lên</p>
                  <button onClick={giamNguoiLon} style={{ padding: '5px 10px', margin: '0 5px', borderRadius: '5px', backgroundColor: 'gray', color: '#fff', border: 'none' }}>-</button>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{nguoiLon}</span>
                  <button onClick={tangNguoiLon} style={{ padding: '5px 10px', margin: '0 5px', borderRadius: '5px', backgroundColor: 'gray', color: '#fff', border: 'none' }}>+</button>
                </div>

                <div className="box-hanhkhach" style={{ border: '1px solid #3FD0D4', borderRadius: '8px', padding: '10px', flex: '1', margin: '5px' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Trẻ em</h4>
                  <p style={{ fontSize: '16px' }}>Từ 5 - dưới 12 tuổi</p>
                  <button onClick={giamTreEm} style={{ padding: '5px 10px', margin: '0 5px', borderRadius: '5px', backgroundColor: 'gray', color: '#fff', border: 'none' }}>-</button>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{treEm}</span>
                  <button onClick={tangTreEm} style={{ padding: '5px 10px', margin: '0 5px', borderRadius: '5px', backgroundColor: 'gray', color: '#fff', border: 'none' }}>+</button>

                </div>

                <div className="box-hanhkhach" style={{ border: '1px solid #3FD0D4', borderRadius: '8px', padding: '10px', flex: '1', margin: '5px' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Trẻ nhỏ</h4>
                  <p style={{ fontSize: '16px' }}>Từ 2 - dưới 5 tuổi</p>
                  <button onClick={giamTreNho} style={{ padding: '5px 10px', margin: '0 5px', borderRadius: '5px', backgroundColor: 'gray', color: '#fff', border: 'none' }}>-</button>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{treNho}</span>
                  <button onClick={tangTreNho} style={{ padding: '5px 10px', margin: '0 5px', borderRadius: '5px', backgroundColor: 'gray', color: '#fff', border: 'none' }}>+</button>

                </div>

                <div className="box-hanhkhach" style={{ border: '1px solid #3FD0D4', borderRadius: '8px', padding: '10px', flex: '1', margin: '5px' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Em bé</h4>
                  <p style={{ fontSize: '16px' }}>Dưới 2 tuổi</p>
                  <button onClick={giamEmBe} style={{ padding: '5px 10px', margin: '0 5px', borderRadius: '5px', backgroundColor: 'gray', color: '#fff', border: 'none' }}>-</button>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{emBe}</span>
                  <button onClick={tangEmBe} style={{ padding: '5px 10px', margin: '0 5px', borderRadius: '5px', backgroundColor: 'gray', color: '#fff', border: 'none' }}>+</button>

                </div>
              </div>
            </div>

            {/* Thông tin liên lạc */}
            <div className="box" style={{ marginTop: '20px', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Thông tin liên lạc</h3>
              <div className="only-one" style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Họ và tên *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #3FD0D4' }}
                />
              </div>
              <div className="only-one" style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Số điện thoại</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #3FD0D4' }}
                />
              </div>
              <div className="only-one" style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #3FD0D4' }}
                />
              </div>

              {/* Tỉnh/Thành phố và Quận/Huyện */}
              <div className="row-around" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <div className="col" style={{ flex: '1', marginRight: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Tỉnh/Thành phố</label>
                  <select value={selectedTinh} onChange={(e) => setSelectedTinh(e.target.value)} style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #3FD0D4' }}>
                    {listTinh.map((item, index) => (
                      <option key={index} value={item.value}>{item.label}</option>
                    ))}
                  </select>
                </div>
                <div className="col" style={{ flex: '1', marginRight: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Quận/Huyện</label>
                  <select value={selectedQuan} onChange={(e) => setSelectedQuan(e.target.value)} style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #3FD0D4' }}>
                    {listQuan.map((item, index) => (
                      <option key={index} value={item.value}>{item.label}</option>
                    ))}
                  </select>
                </div>
                <div className="col" style={{ flex: '1' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Phường/Xã</label>
                  <select value={selectedPhuong} onChange={(e) => setSelectedPhuong(e.target.value)} style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #3FD0D4' }}>
                    {listPhuong.map((item, index) => (
                      <option key={index} value={item.value}>{item.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="only-one" style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Địa chỉ cụ thể</label>
                <input
                  type="text"
                  value={diaChi}
                  onChange={(e) => setDiaChi(e.target.value)}
                  style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #3FD0D4' }}
                />
              </div>
            </div>


            <div className="box" style={{ marginTop: '20px', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Tóm tắt chuyến đi</h3>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  <span style={{ marginRight: '10px' }}>📅</span>
                  <div>
                    <p style={{ fontWeight: 'bold' }}>Bắt đầu chuyến đi: <span>13/09/2024</span></p>
                    <p>Nơi khởi hành: <span>TP. Hồ Chí Minh</span></p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '10px' }}>📅</span>
                  <div>
                    <p style={{ fontWeight: 'bold' }}>Kết thúc chuyến đi: <span>16/09/2024</span></p>
                    <p >Nơi kết thúc: <span>Phú Quốc</span></p>
                  </div>
                </div>
              </div>

              {/* Thông tin hành khách */}
              <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Hành khách:</h4>
              <div style={{ border: '1px solid #3FD0D4', borderRadius: '8px', padding: '10px', marginBottom: '10px' }}>
                <p >Người lớn: <span style={{ fontWeight: 'bold' }}>1 người</span></p>
                <p>Giá tiền: <span style={{ fontWeight: 'bold' }}>1 x {formatCurrency(tour.price)}</span></p>
                <p >Phụ thu phòng riêng: <span style={{ fontWeight: 'bold' }}>0đ</span></p>
              </div>

              {/* Thông tin khuyến mãi */}
              <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Khuyến mãi:</h4>
              <div style={{ border: '1px solid #3FD0D4', borderRadius: '8px', padding: '10px', marginBottom: '20px' }}>
                <p >Ưu đãi giờ chót: còn {tour?.soLuongVe - tour?.soVeDaDat}/{tour?.soLuongVe}</p>
                <p >Người lớn: <span style={{ fontWeight: 'bold' }}>1 x{formatCurrency(300000)}</span></p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button style={{ padding: '10px 20px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px' }}>Mã giảm giá</button>
                <button style={{ padding: '10px 20px', backgroundColor: '#ff6f61', color: '#fff', border: 'none', borderRadius: '5px' }}>Áp dụng</button>
              </div>
            </div>
            <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', justifyItems:"center" }}>
            <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>TỔNG TIỀN: {formatCurrency(tour.price - 300000)}</h4>
            <button style={{ padding: '10px 40px', backgroundColor: '#3FD0D4', color: '#fff', border: 'none', borderRadius: '5px',fontSize:20, fontWeight:'bold' }}>THANH TOÁN</button>
          </div>

          </div>
        
        </div>


        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default Booking;

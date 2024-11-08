import React, { useState } from 'react';
import {
    Button,
    Cascader,
    Checkbox,
    Col,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Rate,
    Row,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { PlusOutlined } from '@ant-design/icons';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
const { TextArea } = Input;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};


const ModalCreateInfo: React.FC = () => {
    const loaiTour = [
        { value: 'mh', label: 'Mạo hiểm' },
        { value: 'tq', label: 'Tham quan' },
        { value: 'vh', label: 'Văn hóa' },
        { value: 'st', label: 'Sinh thái' },
        { value: 'nd', label: 'Nghỉ dưỡng' },
        { value: 'tb', label: 'Team building' },
    ]
    const vungMien = [
        { value: 'mb', label: 'Miền Bắc' },
        { value: 'mtr', label: 'Miền Trung' },
        { value: 'mt', label: 'Miền Tây' },
        { value: 'mn', label: 'Miền Nam' },
    ]
    const thoiGian = [
        { value: '1n', label: 'Trong ngày' },
        { value: '2n1d', label: '2 ngày 1 đêm' },
        { value: '3n2d', label: '3 ngày 2 đêm' },
        { value: '4n3d', label: '4 ngày 3 đêm' },
    ]
    const phuongTien = [
        { value: 'mb', label: 'Máy bay' },
        { value: 'bus', label: 'Xe buýt' },
        { value: 'oto', label: 'Ô tô' },
    ]
    const chatLuongChoO = [
        { value: 'ks5', label: 'Khách sạn 5 sao' },
        { value: 'ks4', label: 'Khách sạn 4 sao' },
        { value: 'ks3', label: 'Khách sạn 3 sao' },
        { value: 'motel', label: 'Nhà nghỉ' },
    ]
    const thanhPho = [
        { value: 'an_giang', label: 'An Giang' },
        { value: 'ba_ria_vung_tau', label: 'Bà Rịa - Vũng Tàu' },
        { value: 'bac_lieu', label: 'Bạc Liêu' },
        { value: 'bac_kan', label: 'Bắc Kạn' },
        { value: 'bac_giang', label: 'Bắc Giang' },
        { value: 'bac_ninh', label: 'Bắc Ninh' },
        { value: 'ben_tre', label: 'Bến Tre' },
        { value: 'binh_duong', label: 'Bình Dương' },
        { value: 'binh_dinh', label: 'Bình Định' },
        { value: 'binh_phuoc', label: 'Bình Phước' },
        { value: 'binh_thuan', label: 'Bình Thuận' },
        { value: 'ca_mau', label: 'Cà Mau' },
        { value: 'cao_bang', label: 'Cao Bằng' },
        { value: 'can_tho', label: 'Cần Thơ' },
        { value: 'da_nang', label: 'Đà Nẵng' },
        { value: 'dak_lak', label: 'Đắk Lắk' },
        { value: 'dak_nong', label: 'Đắk Nông' },
        { value: 'dien_bien', label: 'Điện Biên' },
        { value: 'dong_nai', label: 'Đồng Nai' },
        { value: 'dong_thap', label: 'Đồng Tháp' },
        { value: 'gia_lai', label: 'Gia Lai' },
        { value: 'ha_giang', label: 'Hà Giang' },
        { value: 'ha_nam', label: 'Hà Nam' },
        { value: 'ha_noi', label: 'Hà Nội' },
        { value: 'ha_tinh', label: 'Hà Tĩnh' },
        { value: 'hai_duong', label: 'Hải Dương' },
        { value: 'hai_phong', label: 'Hải Phòng' },
        { value: 'hau_giang', label: 'Hậu Giang' },
        { value: 'hoa_binh', label: 'Hòa Bình' },
        { value: 'hung_yen', label: 'Hưng Yên' },
        { value: 'khanh_hoa', label: 'Khánh Hòa' },
        { value: 'kien_giang', label: 'Kiên Giang' },
        { value: 'kon_tum', label: 'Kon Tum' },
        { value: 'lai_chau', label: 'Lai Châu' },
        { value: 'lam_dong', label: 'Lâm Đồng' },
        { value: 'lang_son', label: 'Lạng Sơn' },
        { value: 'lao_cai', label: 'Lào Cai' },
        { value: 'long_an', label: 'Long An' },
        { value: 'nam_dinh', label: 'Nam Định' },
        { value: 'nghe_an', label: 'Nghệ An' },
        { value: 'ninh_binh', label: 'Ninh Bình' },
        { value: 'ninh_thuan', label: 'Ninh Thuận' },
        { value: 'phu_tho', label: 'Phú Thọ' },
        { value: 'phu_yen', label: 'Phú Yên' },
        { value: 'quang_binh', label: 'Quảng Bình' },
        { value: 'quang_nam', label: 'Quảng Nam' },
        { value: 'quang_ngai', label: 'Quảng Ngãi' },
        { value: 'quang_ninh', label: 'Quảng Ninh' },
        { value: 'quang_tri', label: 'Quảng Trị' },
        { value: 'soc_trang', label: 'Sóc Trăng' },
        { value: 'son_la', label: 'Sơn La' },
        { value: 'tay_ninh', label: 'Tây Ninh' },
        { value: 'thai_binh', label: 'Thái Bình' },
        { value: 'thai_nguyen', label: 'Thái Nguyên' },
        { value: 'thanh_hoa', label: 'Thanh Hóa' },
        { value: 'thua_thien_hue', label: 'Thừa Thiên Huế' },
        { value: 'tien_giang', label: 'Tiền Giang' },
        { value: 'tp_ho_chi_minh', label: 'TP Hồ Chí Minh' },
        { value: 'tra_vinh', label: 'Trà Vinh' },
        { value: 'tuyen_quang', label: 'Tuyên Quang' },
        { value: 'vinh_long', label: 'Vĩnh Long' },
        { value: 'vinh_phuc', label: 'Vĩnh Phúc' },
        { value: 'yen_bai', label: 'Yên Bái' }
    ];
    const tanSuat = [
        { value: '1t1l', label: '1 tuần 1 lần' },
        { value: '2t1l', label: '2 tuần 1 lần' },
        { value: '3t1l', label: '3 tuần 1 lần' },
        { value: '4t1l', label: '1 tháng 1 lần' },

    ]

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const dateFormat = 'DD/MM/YYYY';
    const today: string = dayjs().format('DD/MM/YYYY');
    dayjs.extend(customParseFormat);

    return (
        <div className=''>
            <h2 className='font-bold text-xl mb-5 mt-[-25px]'>Tạo Tour</h2>
            <Form
                labelCol={{ span: 40 }}
                layout="vertical"
                wrapperCol={{ span: 24 }}
                className='w-full'
            >
                <Row className='pr-6 justify-between'>
                    <Col span={14} >
                        <Form.Item label="Tên tour" className='custom-border'>
                            <Input />
                        </Form.Item>
                        <Row className='justify-between'>
                            <Form.Item label="Loại tour" style={{ width: '40%' }} className='custom-border'>
                                <Select
                                    defaultValue="mh"
                                    options={loaiTour}
                                />
                            </Form.Item>
                            <Form.Item label="Vùng miền" style={{ width: '40%' }} className='custom-border'>
                                <Select
                                    defaultValue="mb"
                                    options={vungMien}
                                />
                            </Form.Item>
                        </Row>
                    </Col>
                    <Col span={8} >
                        <Form.Item label="Ảnh đại diện" className='font-bold '>
                            <Upload action="/upload.do" listType="picture-card">
                                <button style={{ border: 0, background: 'none' }} type="button">
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <Row className='pr-6 justify-between'>
                    <Col span={14} >

                        <Row className='justify-between'>
                            <Form.Item label="Thời gian" style={{ width: '40%' }} className='custom-border'>
                                <Select
                                    defaultValue="1n"
                                    options={thoiGian}
                                />
                            </Form.Item>
                            <Form.Item label="Giá Tour" style={{ width: '40%' }} className='custom-border'>
                                <Input />
                            </Form.Item>
                        </Row>
                    </Col>
                    <Col span={8} >
                        <Form.Item label="Số lượng" className='custom-border'>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row className='pr-6 justify-between'>
                    <Col span={14} >

                        <Row className='justify-between' >
                            <Form.Item label="Phương tiện" style={{ width: '40%' }} className='custom-border'>
                                <Select
                                    defaultValue="mb"
                                    options={phuongTien}
                                />
                            </Form.Item>
                            <Form.Item label="Chất lượng chổ ở" style={{ width: '40%' }} className='custom-border'>
                                <Select
                                    defaultValue="ks5"
                                    options={chatLuongChoO}
                                />
                            </Form.Item>
                        </Row>
                    </Col>
                    <Col span={8} >
                        <Form.Item label="Nơi bắt đầu" className='custom-border' >
                            <Select
                                defaultValue="tp_ho_chi_minh"
                                options={thanhPho}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row className='pr-6 justify-between'>
                    <Col span={14} >

                        <Row className='justify-between'>
                            <Form.Item label="Ngày đi" style={{ width: '40%' }} className='custom-border'>
                                <DatePicker onChange={onChange} defaultValue={dayjs()} format={dateFormat} />
                            </Form.Item>
                            <Form.Item label="Tần suất" style={{ width: '40%' }} className='custom-border'>
                                <Select
                                    defaultValue="2t1l"
                                    options={tanSuat}
                                />
                            </Form.Item>
                        </Row>
                    </Col>
                    <Col span={8} >
                        <Form.Item label="Ngày bắt đầu" className='custom-border'>
                            <DatePicker onChange={onChange} defaultValue={dayjs()} format={dateFormat} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Trải nghiệm" className='w-[97%] custom-border'>
                    <TextArea rows={4} />
                </Form.Item>
                <Row className='justify-end w-[97%]'>
                    <Button className='pr-4 pl-4 p-2 bg-[#3fd0d4]' ><span className='font-bold text-white text-lg'>TIẾP TỤC</span></Button>
                </Row>
            </Form>
        </div>
    );
};

export default ModalCreateInfo;

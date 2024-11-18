import { useEffect, useRef, useState } from "react";
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
    Modal,
    Typography
} from 'antd';
import { FaPlane } from "react-icons/fa";
const { Text } = Typography;
import {
    CaretRightOutlined
} from '@ant-design/icons';
const { RangePicker } = DatePicker;
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
const ModalSetCriteria = ({ visible, onClose }) => {
    const [formValues, setFormValues] = useState({
        type: 'mh',
        region: 'mb',
        time: '1n',
        transportation: 'mb',
        qualityOfAccommodation: 'ks5',
        city: 'tp_ho_chi_minh',
        startDate: dayjs(),
        endDate: dayjs(),
        maxPrice: '',
        numberOfPeople: ''
    });
    const types = [
        { value: 'mh', label: 'Mạo hiểm' },
        { value: 'tq', label: 'Tham quan' },
        { value: 'vh', label: 'Văn hóa' },
        { value: 'st', label: 'Sinh thái' },
        { value: 'nd', label: 'Nghỉ dưỡng' },
        { value: 'tb', label: 'Team building' },
    ]
    const regions = [
        { value: 'mb', label: 'Miền Bắc' },
        { value: 'mtr', label: 'Miền Trung' },
        { value: 'mt', label: 'Miền Tây' },
        { value: 'mn', label: 'Miền Nam' },
    ]
    const times = [
        { value: '1n', label: 'Trong ngày' },
        { value: '2n1d', label: '2 ngày 1 đêm' },
        { value: '3n2d', label: '3 ngày 2 đêm' },
        { value: '4n3d', label: '4 ngày 3 đêm' },
    ]
    const transportations = [
        { value: 'mb', label: 'Máy bay' },
        { value: 'bus', label: 'Xe buýt' },
        { value: 'oto', label: 'Ô tô' },
    ]
    const qualityOfAccommodations = [
        { value: 'ks5', label: 'Khách sạn 5 sao' },
        { value: 'ks4', label: 'Khách sạn 4 sao' },
        { value: 'ks3', label: 'Khách sạn 3 sao' },
        { value: 'motel', label: 'Nhà nghỉ' },
    ]
    const citys = [
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
    const handleChange = (key, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [key]: value,
        }));
    };

    const handleRangePickerChange = (dates, dateStrings) => {
        if (dates) {
            setFormValues({
                ...formValues,
                startDate: dates[0], // Lưu giá trị startDate (dayjs object)
                endDate: dates[1],   // Lưu giá trị endDate (dayjs object)
            });
        } else {
            // Nếu người dùng xóa giá trị, đặt null cho cả startDate và endDate
            setFormValues({
                ...formValues,
                startDate: today,
                endDate: today,
            });
        }
    };
    const dateFormat = 'DD/MM/YYYY';
    const today = dayjs().format('DD/MM/YYYY');
    dayjs.extend(customParseFormat);
    const submit = () => {

        console.log(formValues)
    };
    return (
        <>
            {visible && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                        className="bg-white rounded-lg shadow-lg"
                    >
                        <Modal
                            title={<div className="text-xl font-bold">Thiết lập tiêu chí</div>}
                            open={visible}
                            onCancel={onClose}
                            footer={null}
                            width={'60%'}
                            style={{
                                borderRadius: 30,
                            }}>
                            <Form
                                labelCol={{ span: 40 }}
                                layout="vertical"
                                wrapperCol={{ span: 24 }}
                                className='w-full mt-10 p-2'
                            >
                                <Row className='pr-6 justify-between'>
                                    <Col span={11} >
                                        <Form.Item label="Chọn điểm khởi hành" name="city" className='custom-border'
                                            rules={[{ required: true, }]} >
                                            <Select
                                                value={formValues.city}
                                                defaultValue={formValues.city}
                                                onChange={(value) => handleChange('city', value)}
                                                options={citys}
                                                style={{ height: 40 }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={11} >
                                        <Form.Item label="Vùng miền" name="region" className='custom-border'
                                            rules={[{ required: true, },]} >
                                            <Select
                                                value={formValues.region}
                                                defaultValue={formValues.region}
                                                onChange={(value) => handleChange('region', value)}
                                                options={regions} style={{ height: 40 }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row className='pr-6 justify-between'>
                                    <Col span={11} >
                                    <Form.Item label="Thời gian tour" className='custom-border'
                                            name="time"
                                            rules={[
                                                { required: true, },
                                            ]} >
                                            <Select
                                                value={formValues.time}
                                                defaultValue={formValues.time}
                                                onChange={(value) => handleChange('time', value)}
                                                options={times} style={{ height: 40 }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={11} >

                                        <Form.Item label="Loại tour" name="type" className='custom-border'
                                            rules={[{ required: true, },]} >
                                            <Select
                                                value={formValues.type}
                                                defaultValue={formValues.type}
                                                onChange={(value) => handleChange('type', value)}
                                                options={types} style={{ height: 40 }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row className='pr-6 justify-between'>
                                    <Col span={11} >
                                        <Form.Item label="Chất lượng chổ ở" name="qualityOfAccommodation" className='custom-border'
                                            rules={[{ required: true, },]} >
                                            <Select
                                                value={formValues.qualityOfAccommodation}
                                                defaultValue={formValues.qualityOfAccommodation}
                                                onChange={(value) => handleChange('qualityOfAccommodation', value)}
                                                options={qualityOfAccommodations} style={{ height: 40 }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={11} >

                                        <Form.Item label="Phương tiện di chuyển" name="transportation" className='custom-border'
                                            rules={[{ required: true, }]} >
                                            <Select
                                                value={formValues.transportation}
                                                defaultValue={formValues.transportation}
                                                onChange={(value) => handleChange('transportation', value)}
                                                options={transportations} style={{ height: 40 }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row className='pr-6 justify-between' >
                                    <Col span={11} >
                                        <Form.Item label="Chọn giá tối đa" className='custom-border'
                                            name="maxPrice"
                                            rules={[
                                                { required: true, },
                                            ]} >
                                            <Input value={formValues.maxPrice} style={{ height: 40 }} className="rounded-md"
                                                onChange={(e) => handleChange('maxPrice', e.target.value)} />
                                        </Form.Item>

                                    </Col>
                                    <Col span={11} >

                                        <Form.Item label="Số lượng người" name="numberOfPeople" className='custom-border'
                                            rules={[{ required: true, },]} >
                                            <Input value={formValues.numberOfPeople} style={{ height: 40 }} className="rounded-md"
                                                onChange={(e) => handleChange('numberOfPeople', e.target.value)} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row className='pr-6 justify-between' >
                                    <Col span={11} >
                                        
                                        <Form.Item label="Chọn khoảng thời gian" name="city" className='custom-border'
                                            rules={[{ required: true, }]} >
                                            <RangePicker
                                                defaultValue={[dayjs(today, dateFormat), dayjs(today, dateFormat)]}
                                                format={dateFormat}
                                                onChange={handleRangePickerChange} style={{ height: 40, width: "100%" }} className="rounded-md"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={11} >
                                    <Form.Item label=" " name="city" className='custom-border'>
                                            <Button className=' bg-[#3fd0d4] pr-5 pl-5 w-full h-[40px]'  type="primary" onClick={submit} ><span className='font-bold text-white text-lg'>XÁC NHẬN</span></Button>
                                        </Form.Item>
                                        
                                    </Col>
                                </Row>
                            </Form>
                        </Modal>

                    </div>
                </div>
            )}

        </>
    );
};

export default ModalSetCriteria;

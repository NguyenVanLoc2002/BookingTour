import React, { useEffect, useRef, useState } from "react";
import { View, Text, ImageBackground, Pressable, StyleSheet, TextInput, Image, ScrollView } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import TourTabbar from "./component/TourTabbar";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Picker } from '@react-native-picker/picker';
import Feather from '@expo/vector-icons/Feather';
const DatTour = ({ navigation, route }) => {
    const { tour } = route.params
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
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
    const [selectedQuocGia, setSelectedQuocGia] = useState(listTinh[0].value);
    const [selectedQuocTich, setSelectedQuocTich] = useState(listQuan[0].value);
    
    return (
        <View style={{ flex: 1, backgroundColor: "#fafafa", }}>
            <View style={styles.header}>
                <Text style={styles.textName}>Thông tin đặt tour</Text>
            </View>
            <ScrollView>
                <View style={styles.tour}>

                    <Image
                        source={{
                            uri: tour?.url
                        }}
                        style={styles.tourAvt}
                        resizeMode="cover"
                    />
                    <View style={styles.detailTour}>
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>{tour?.title}</Text>

                        <View>
                            <Text style={{ fontSize: 14 }}>Khởi hành: {tour?.ngayKhoiHanh}</Text>
                            <Text style={{ fontSize: 14 }}>Thời gian: {tour?.thoiGian}</Text>
                            <Text style={{ fontSize: 14 }}>Số chổ còn nhận: {Number(tour?.soLuongVe - tour?.soVeDaDat)}/{tour?.soLuongVe}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={{ fontSize: 14, fontWeight: "500", color: 'gray', paddingBottom: 10 }}>Hành khách</Text>
                    <View style={styles.rowAround}>
                        <View style={styles.boxHanhKhach}>
                            <Text style={styles.textBoxtitle}>Người lớn</Text>
                            <Text style={styles.textBoxdetail}>Từ 12 tuổi trở lên</Text>
                            <View style={[styles.rowAround, { paddingBottom: 0, paddingTop: 5 }]}>
                                <Feather name="minus-circle" size={24} color="black" />
                                <Text style={[styles.textName, { paddingTop: 0, paddingBottom: 0 }]}>1</Text>
                                <Feather name="plus-circle" size={24} color="black" />
                            </View>
                        </View>
                        <View style={styles.boxHanhKhach}>
                            <Text style={styles.textBoxtitle}>Trẻ em</Text>
                            <Text style={styles.textBoxdetail}>Từ 5 - dưới 12 tuổi</Text>
                            <View style={[styles.rowAround, { paddingBottom: 0, paddingTop: 5 }]}>
                                <Feather name="minus-circle" size={24} color="black" />
                                <Text style={[styles.textName, { paddingTop: 0, paddingBottom: 0 }]}>1</Text>
                                <Feather name="plus-circle" size={24} color="black" />
                            </View>
                        </View>
                    </View>
                    <View style={[styles.rowAround, { paddingBottom: 0 }]}>
                        <View style={styles.boxHanhKhach}>
                            <Text style={styles.textBoxtitle}>Trẻ nhỏ</Text>
                            <Text style={styles.textBoxdetail}>Từ 2 - dưới 5 tuổi</Text>
                            <View style={[styles.rowAround, { paddingBottom: 0, paddingTop: 5 }]}>
                                <Feather name="minus-circle" size={24} color="black" />
                                <Text style={[styles.textName, { paddingTop: 0, paddingBottom: 0 }]}>1</Text>
                                <Feather name="plus-circle" size={24} color="black" />
                            </View>
                        </View>
                        <View style={styles.boxHanhKhach}>
                            <Text style={styles.textBoxtitle}>Em bé</Text>
                            <Text style={styles.textBoxdetail}>Dưới 2 tuổi</Text>
                            <View style={[styles.rowAround, { paddingBottom: 0, paddingTop: 5 }]}>
                                <Feather name="minus-circle" size={24} color="black" />
                                <Text style={[styles.textName, { paddingTop: 0, paddingBottom: 0 }]}>1</Text>
                                <Feather name="plus-circle" size={24} color="black" />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={{ fontSize: 14, fontWeight: "500", color: 'gray', paddingBottom: 10 }}>Thông tin liên lạc</Text>
                    <View style={styles.onlyOne}>
                        <Text style={styles.textTitle}>Họ và tên<Text style={[styles.textTitle, { color: "red" }]}> *</Text></Text>
                        <TextInput
                            style={[styles.formPicker, { paddingLeft: 15 }]}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View style={styles.onlyOne}>
                        <Text style={styles.textTitle}>Số điện thoại</Text>
                        <TextInput
                            style={[styles.formPicker, { paddingLeft: 15 }]}
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>
                    <View style={styles.onlyOne}>

                        <Text style={styles.textTitle}>Email<Text style={[styles.textTitle, { color: "red" }]}> *</Text></Text>
                        <TextInput
                            style={[styles.formPicker, { paddingLeft: 15 }]}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.rowAround}>
                        <View style={styles.col}>
                            <Text style={styles.textTitle}>Tỉnh/ Thành phố</Text>
                            <View style={styles.formPicker}>
                                <Picker
                                    selectedValue={selectedQuocGia}
                                    onValueChange={(itemValue) => setSelectedQuocGia(itemValue)}
                                >
                                    {listTinh.map((item, index) => (
                                        <Picker.Item key={index} label={item.label} value={item.value} style={styles.textPicker} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.textTitle}>Quận/Huyện</Text>
                            <View style={styles.formPicker}>
                                <Picker
                                    selectedValue={selectedQuocTich}
                                    onValueChange={(itemValue) => setSelectedQuocTich(itemValue)}
                                >
                                    {listQuan.map((item, index) => (
                                        <Picker.Item key={index} label={item.label} value={item.value} style={styles.textPicker} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <View style={styles.onlyOne}>
                        <Text style={styles.textTitle}>Phường/Xã</Text>
                        <View style={styles.formPicker}>
                            <Picker
                                selectedValue={selectedQuocTich}
                                onValueChange={(itemValue) => setSelectedQuocTich(itemValue)}
                            >
                                {listQuan.map((item, index) => (
                                    <Picker.Item key={index} label={item.label} value={item.value} style={styles.textPicker} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.onlyOne}>
                        <Text style={styles.textTitle}>Địa chỉ cụ thể</Text>
                        <TextInput
                            style={[styles.formPicker, { paddingLeft: 15 }]}
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={{ fontSize: 14, fontWeight: "500", color: 'gray', paddingBottom: 10 }}>Ghi chú thêm</Text>
                    <View style={styles.onlyOne}>
                        <Text style={styles.textTitle}>Ghi chú thêm</Text>
                        <TextInput
                            style={[styles.formPicker, { paddingLeft: 15 }]}
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={{ fontSize: 14, fontWeight: "500", color: 'gray', paddingBottom: 10 }}>Tóm tắt chuyến đi</Text>
                    <View style={styles.row}>
                        <AntDesign name="calendar" size={24} color="black" />
                        <View>
                            <Text style={{ fontSize: 14, fontWeight: "500", color: 'gray', paddingBottom: 10 }}>Bắt đầu chuyến đi</Text>
                            <Text style={{ fontSize: 14, fontWeight: "500", color: 'black', paddingBottom: 10 }}>{tour?.ngayKhoiHanh}</Text>
                            <Text style={{ fontSize: 14, fontWeight: "500", color: 'gray', paddingBottom: 10 }}>{tour?.noiKhoiHanh}</Text>

                        </View>
                    </View>
                    <View style={styles.row}>
                        <AntDesign name="calendar" size={24} color="black" />
                        <View>
                            <Text style={{ fontSize: 14, fontWeight: "500", color: 'gray', paddingBottom: 10 }}>Kết thúc chuyến đi</Text>
                            <Text style={{ fontSize: 14, fontWeight: "500", color: 'black', paddingBottom: 10 }}>{tour?.ngayKetThuc}</Text>
                            <Text style={{ fontSize: 14, fontWeight: "500", color: 'gray', paddingBottom: 10 }}>{tour?.noiKetThuc}</Text>
                        </View>
                    </View>

                    <Text style={{ fontSize: 14, fontWeight: "500", paddingBottom: 10 }}>Hành khách</Text>

                </View>
            </ScrollView>
            <View style={styles.priceBox}>
                <Text style={{ fontSize: 15, paddingLeft: 10, color: "red", fontWeight: "500" }}>{tour?.price}đ</Text>

                <Pressable style={styles.buttonDat} onPress={() => { navigation.navigate("DatTour", { tour: tour }); }}>
                    <Text style={styles.textDat}>ĐẶT NGAY</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#3FD0D4",
        marginBottom: 10,
    },
    textName: {
        fontSize: 20,
        fontWeight: "500",
        padding: 10,
        textAlign: 'center'
    },
    itemTour: {
        backgroundColor: "#fff",
        shadowColor: "black",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 10, // Android,
        borderRadius: 10

    },
    tour: {
        flexDirection: "row",
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '92%',
        marginLeft: '4%',
        marginTop: 15
    },
    tourAvt: {
        width: 120,
        height: 120,
        backgroundColor: "red",
        borderRadius: 5
    },
    detailTour: {
        paddingLeft: 20,
        flexDirection: "column",
        justifyContent: "space-between",
        height: 120,
    },
    row: {
        display: 'flex',
        flexDirection: "row",
    },
    rowAround: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-around",
        paddingBottom: 10,

    },
    boxHanhKhach: {
        backgroundColor: "#f2f2f2",
        width: '40%',
        borderRadius: 5,
        padding: 5
    },
    textBoxdetail: {
        fontSize: 12,
        color: 'gray',
        fontWeight: '300'
    },
    textBoxtitle: {
        fontSize: 13,
        fontWeight: '500'
    },
    box: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '92%',
        marginLeft: '4%',
        marginTop: 15
    },
    col: {
        flexDirection: "column",
        width: "48%",
    },
    textTitle: {
        fontSize: 13,
        fontWeight: "500",
        paddingLeft: 10,
        color: "#3FD0D4"
    },
    formPicker: {
        borderWidth: 1,
        borderColor: "#3FD0D4",
        borderRadius: 10,
        height: 40,
        display: "flex",
        justifyContent: "center",
        marginLeft: 5,
        marginRight: 5

    },
    input: {
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#3FD0D4',
        borderRadius: 5,
    },
    onlyOne: {
        padding: 8,
    },
    buttonDat: {
        height: 40,
        backgroundColor: "#3FD0D4",
        justifyContent: "center",
        width: 150,
        alignItems: "center",
        borderRadius: 20,
        marginRight: 10
    },
    textDat: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "500",

    },
    priceBox: {
        backgroundColor: "#ffcccc",
        justifyContent: 'center',
        alignItems: 'center'
    },



});
export default DatTour;
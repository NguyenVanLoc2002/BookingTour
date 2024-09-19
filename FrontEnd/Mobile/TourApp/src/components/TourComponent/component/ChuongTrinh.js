import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

const ChuongTrinh = ({ navigation, route }) => {
    const { tour } = route.params;
    const [expanded, setExpanded] = useState({}); // Quản lý trạng thái mở của mỗi ngày

    // Hàm để xử lý việc ẩn hoặc hiện phần chi tiết của một ngày cụ thể
    const toggleDetail = (index) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [index]: !prevExpanded[index], // Đảo ngược trạng thái của ngày hiện tại
        }));
    };
    return (
        <ScrollView style={styles.container}>
            <View >
                {tour?.chuongTrinh.map((ct, index) => (
                    <View style={styles.detailBox}>
                       <View style={styles.rowBetween}><Text style={styles.tieuDe}>Ngày {index + 1}: {ct?.title}</Text>
                        <Pressable style={{paddingRight:10}} onPress={() => toggleDetail(index)}>
                            {expanded[index] ? (
                                <Ionicons name="arrow-down-circle" size={24} color="black" />
                            ) : (<Ionicons name="arrow-up-circle" size={24} color="black" />)}
                        </Pressable></View>
                        {expanded[index] && (
                            <Text style={{ fontSize: 13, paddingTop: 15, }}>{ct?.detail}</Text>
                        )}

                    </View>
                ))}
            </View>
            <View style={styles.detailBox}>
                <Text style={styles.tieuDe}>Thông tin tập trung</Text>
                <View style={styles.row}>
                    <Text style={{ fontSize: 13, paddingTop: 15, width: "40%", color: "#8C8C8C" }}>Ngày tập trung</Text>
                    <Text style={{ fontSize: 13, paddingTop: 15, }}>{tour?.thongTinTapTrung?.ngay}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={{ fontSize: 13, paddingTop: 15, width: "40%", color: "#8C8C8C" }}>Nơi tập trung</Text>
                    <Text style={{ fontSize: 13, paddingTop: 15, }}>{tour?.thongTinTapTrung?.noi}</Text>
                </View>
            </View>
            <View style={styles.detailBox}>
                <Text style={styles.tieuDe}>Thông tin hướng dẫn viên</Text>
                <View style={styles.row}>
                    <Text style={{ fontSize: 13, paddingTop: 15, width: "40%", color: "#8C8C8C" }}>Ngày tập trung</Text>
                    <Text style={{ fontSize: 13, paddingTop: 15, }}>{tour?.thongTinHuongDanVien?.doan}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={{ fontSize: 13, paddingTop: 15, width: "40%", color: "#8C8C8C" }}>Nơi tập trung</Text>
                    <Text style={{ fontSize: 13, paddingTop: 15, }}>{tour?.thongTinHuongDanVien?.tien ? tour?.thongTinHuongDanVien?.tien : "Đang cập nhật"}</Text>
                </View>
            </View>




        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F2F2F2"
    },
    row: {
        display: 'flex',
        flexDirection: "row",
    },
    row50: {
        display: 'flex',
        flexDirection: "row",
        width: "48%",
        paddingTop: 5
    },
    rowBetween: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between"
    },
    column: {
        display: 'flex',
        flexDirection: "col",
        width: "90%",
    },
    detailBox: {
        width: "90%",
        marginLeft: "5%",
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        marginTop: 20,
    },
    detailBoxBorder: {
        width: "90%",
        marginLeft: "5%",
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 20,
        borderColor: "#3FD0D4",
        borderWidth: 1
    },
    bannerContainer: {
        margin: 10
    },
    bannerRow: {
        borderRadius: 10,
        height: 156,
        width: 150,
    },

    bannerAvt: {
        height: 150,
        margin: 3,
        alignItems: "center",
        // backgroundColor: "black",
        borderRadius: 15
    },
    banner: {
        marginTop: 20
    },
    tieuDe: {
        fontSize: 14,
        fontWeight: "500",
        // textAlign: "center",
    }
})

export default ChuongTrinh;
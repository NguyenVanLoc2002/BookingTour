import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const ListBooking = ({ navigation, route, listBooking, trangThai }) => {
    //trang thai 1 cho thanh toan, 2 da dat, 3 da hoan thanh, 4 da huy
    const loaiBooking = (loai) => {
        if (loai == 1)
            return "Chờ thanh toán"
        else if (loai == 2)
            return "Đã đặt"
        else if (loai == 3)
            return "Đã hoàn thành"
        else if (loai == 4)
            return "Đã hủy"
        else
            return "Đang xử lý"
    };
    const mauTrangThai = (loai) => {
        if (loai == 1)
            return "#FFCCCC"
        else if (loai == 2)
            return "#3FD0D4"
        else if (loai == 3)
            return "#fff"
        else if (loai == 4)
            return "#E1E1E1"
    };
    return (
        <ScrollView style={styles.tourContainer}>
            {listBooking?.map((booking, index) => (
                <View key={index}>
                    {trangThai != 0 ? (
                        <View>
                            {booking?.trangThai == trangThai ? (
                                <View style={styles.tourRow}>
                                    <Pressable
                                        style={[styles.itemTour, { backgroundColor: mauTrangThai(booking?.trangThai) }]}
                                        onPress={() => { navigation.navigate("DetailTour", { tour: booking?.tour }); }}
                                    >
                                        <View style={styles.tour}>
                                            <View style={styles.avt}>
                                                <Image
                                                    source={{
                                                        uri: booking?.tour.url
                                                    }}
                                                    style={styles.tourAvt}
                                                    resizeMode="cover"
                                                />
                                            </View>
                                            <View style={styles.detailTour}>
                                                <Text style={{ fontSize: 14, fontWeight: "500", padding: 5, paddingBottom: 10 }}>{booking?.tour.title}</Text>

                                                <View style={styles.row}><AntDesign name="calendar" size={16} color="black" /><Text style={{ fontSize: 12 }}>Khởi hành: {booking?.tour.ngayKhoiHanh}</Text></View>
                                                <View style={styles.row}><AntDesign name="clockcircleo" size={16} color="black" /><Text style={{ fontSize: 12 }}>Thời gian: {booking?.tour.thoiGian}</Text></View>

                                                <View style={styles.row}><AntDesign name="team" size={16} color="black" /><Text style={{ fontSize: 12 }}>Số vé đã đặt: {booking?.soVe}</Text></View>
                                                <View style={styles.row}><Text style={{ fontSize: 12 }}>{loaiBooking(booking?.trangThai)}</Text></View>
                                            </View>
                                        </View>
                                    </Pressable>
                                </View>
                            ) : (<View></View>)}
                        </View>
                    ) : (
                        <View style={styles.tourRow}>
                            <Pressable
                                style={[styles.itemTour, { backgroundColor: mauTrangThai(booking?.trangThai) }]}
                                onPress={() => { navigation.navigate("DetailTour", { tour: booking?.tour }); }}
                            >
                                <View style={styles.tour}>
                                    <View style={styles.avt}>
                                        <Image
                                            source={{
                                                uri: booking?.tour.url
                                            }}
                                            style={styles.tourAvt}
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <View style={styles.detailTour}>
                                        <Text style={{ fontSize: 14, fontWeight: "500", padding: 5, paddingBottom: 10 }}>{booking?.tour.title}</Text>

                                        <View style={styles.row}><AntDesign name="calendar" size={16} color="black" /><Text style={{ fontSize: 12 }}>Khởi hành: {booking?.tour.ngayKhoiHanh}</Text></View>
                                        <View style={styles.row}><AntDesign name="clockcircleo" size={16} color="black" /><Text style={{ fontSize: 12 }}>Thời gian: {booking?.tour.thoiGian}</Text></View>

                                        <View style={styles.row}><AntDesign name="team" size={16} color="black" /><Text style={{ fontSize: 12 }}>Số vé đã đặt: {booking?.soVe}</Text></View>
                                        <View style={styles.row}><Text style={{ fontSize: 12 }}>{loaiBooking(booking?.trangThai)}</Text></View>
                                    </View>
                                </View>
                            </Pressable>
                        </View>
                    )
                    }
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    tourContainer: {
        flex: 1,

    },
    tourRow: {
        borderRadius: 10,
        width: '90%',
        marginLeft: "5%",
        padding: 5,
        paddingBottom: 10,
        paddingRight: 7
    },
    itemTour: {
        backgroundColor: '#fff',
        shadowColor: "black",
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 10,
    },
    tour: {
        flexDirection: "row",
    },
    tourAvt: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    avt: {
        justifyContent: "center",
        padding: 5
    },

    detailTour: {
        paddingLeft: 5
    },
    row: {
        display: 'flex',
        flexDirection: "row",
        paddingBottom: 3
    },
    rowAround: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between"

    },

});

export default ListBooking;
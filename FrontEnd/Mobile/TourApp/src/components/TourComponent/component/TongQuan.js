import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
const TongQuan = ({ navigation, route }) => {
    const { tour } = route.params;
    return (
        <ScrollView style={styles.container}>
            <View style={styles.detailBox}>
                <View style={styles.row}><AntDesign name="calendar" size={20} color="black" /><Text style={{ fontSize: 14, paddingLeft: 10 }}>Khởi hành: {tour?.ngayKhoiHanh}</Text></View>
                <View style={styles.row}><AntDesign name="clockcircleo" size={20} color="black" /><Text style={{ fontSize: 14, paddingLeft: 10 }}>Thời gian: {tour?.thoiGian}</Text></View>
                <View style={styles.row}><AntDesign name="team" size={20} color="black" /><Text style={{ fontSize: 14, paddingLeft: 10 }}>Số chổ còn nhận: {Number(tour?.soLuongVe - tour?.soVeDaDat)}/{tour?.soLuongVe}</Text></View>
                <View style={styles.row}><FontAwesome6 name="location-dot" size={20} color="black" /><Text style={{ fontSize: 14, paddingLeft: 10 }}>Số chổ còn nhận: {Number(tour?.soLuongVe - tour?.soVeDaDat)}/{tour?.soLuongVe}</Text></View>

            </View>

            <View style={styles.detailBox}>
                <View style={styles.rowBetween}>
                    <View style={styles.row50}>
                        <FontAwesome6 name="map-location-dot" size={16} color="black" />
                        <View style={styles.column}>
                            <Text style={{ fontSize: 13, paddingLeft: 10 }}>Điểm tham quan</Text><Text style={{ fontSize: 12, fontStyle: "italic" }}> {tour?.diemThamQuan}</Text></View></View>
                    <View style={styles.row50}>
                        <FontAwesome6 name="hotel" size={16} color="black" />
                        <Text style={{ fontSize: 13, paddingLeft: 10 }}>{tour?.noiNghiNgoi}</Text>
                    </View>
                </View>
                <View style={styles.rowBetween}>
                    <View style={styles.row50}><Ionicons name="fast-food-sharp" size={16} color="black" />
                        <View style={styles.column}>
                            <Text style={{ fontSize: 13, paddingLeft: 10 }}>Ẩm thực</Text><Text style={{ fontSize: 12, fontStyle: "italic" }}> {tour?.amThuc}</Text>
                        </View>
                    </View>
                    <View style={styles.row50}><AntDesign name="car" size={16} color="black" />
                        <View style={styles.column}>
                            <Text style={{ fontSize: 13, paddingLeft: 10 }}>Phương tiện di chuyển</Text><Text style={{ fontSize: 12, fontStyle: "italic" }}> {tour?.phuongTien}</Text>
                        </View>
                    </View>
                </View>

            </View>
            <View style={styles.banner}>
                <Text style={styles.tieuDe}>Những địa điểm tham quan</Text>
                <ScrollView horizontal style={styles.bannerContainer}
                >
                    {tour?.listAnh.map((image, index) => (
                        <Pressable key={index} style={styles.bannerRow}>

                            <Image
                                source={{
                                    uri: image
                                }}
                                style={styles.bannerAvt}
                                resizeMode="cover"
                            />
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.detailBoxBorder}>
                <Text style={[styles.tieuDe,{borderColor: "#3FD0D4",borderBottomWidth: 1, paddingBottom:10}]}>Bạn sẽ trải nghiệm</Text>
                <Text style={{ fontSize: 14, paddingLeft: 10 , paddingTop:20}}>{tour?.traiNghiem}</Text>
            </View>
            <View style={styles.detailBoxBorder}>
                <Text style={[styles.tieuDe,{borderColor: "#3FD0D4",borderBottomWidth: 1, paddingBottom:10}]}>Vé trống cho bạn</Text>
                <Text style={{ fontSize: 14, paddingLeft: 10 , paddingTop:20}}>{tour?.traiNghiem}</Text>
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
        // justifyContent: "space-evenly"
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
        borderRadius: 20,
        paddingTop: 15,
        paddingLeft: 15,
        paddingBottom: 15,
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
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
    }
})
export default TongQuan;
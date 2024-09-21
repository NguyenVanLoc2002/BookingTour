import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const TourComponent = ({ navigation, route, listTour }) => {
    return (
        <ScrollView horizontal style={styles.tourContainer}>
            {listTour.map((tour, index) => (
                <View key={index} style={styles.tourRow}>
                    <Pressable
                        style={styles.itemTour}
                        onPress={() => { navigation.navigate("DetailTour", { tour: tour }); }}
                    >
                        <View style={styles.tour}>
                            <Image
                                source={{
                                    uri: tour.url
                                }}
                                style={styles.tourAvt}
                                resizeMode="cover"
                            />
                            <View style={styles.detailTour}>
                                <Text style={{ fontSize: 14, fontWeight: "500" }}>{tour.title}</Text>
                                <View style={styles.rowAround}>

                                    <View>

                                        <Text style={{ fontSize: 14, fontWeight: "500", color: "red" }}>{Number(tour.price).toLocaleString('vi-VN')} đ</Text>
                                        <Text style={{ textDecorationLine: "line-through", fontSize: 14, fontWeight: "500", color: "gray" }}>{Number(tour.originalPrice).toLocaleString('vi-VN')} đ</Text>

                                    </View>
                                    <View style={[styles.row, { paddingRight: 10, alignItems: "center" }]}>
                                        <FontAwesome6 style={{ paddingRight: 10 }} name="bus-simple" size={16} color="black" />
                                        <FontAwesome6 name="plane" size={16} color="black" />
                                    </View>
                                </View>
                                <View style={styles.row}><AntDesign name="calendar" size={16} color="black" /><Text style={{ fontSize: 12 }}>Khởi hành: {tour.ngayKhoiHanh}</Text></View>
                                <View style={styles.row}><AntDesign name="clockcircleo" size={16} color="black" /><Text style={{ fontSize: 12 }}>Thời gian: {tour.thoiGian}</Text></View>
                                <View style={styles.row}><AntDesign name="team" size={16} color="black" /><Text style={{ fontSize: 12 }}>Số chổ còn nhận: {Number(tour.soLuongVe - tour.soVeDaDat)}/{tour.soLuongVe}</Text></View>

                            </View>
                        </View>
                    </Pressable>
                </View>

            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    tourContainer: {
        flex: 1,
        flexDirection: "row",
    },
    tourRow: {
        borderRadius: 10,
        width: 220,
        // margin: 5,
        padding:5,
        paddingBottom:10,
        paddingRight:7
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
        flexDirection: "col",
    },
    tourAvt: {
        width: '100%',
        height: 140,
        backgroundColor: "red",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    detailTour: {
        paddingLeft: 5
    },
    row: {
        display: 'flex',
        flexDirection: "row",
    },
    rowAround: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between"

    },

});

export default TourComponent;
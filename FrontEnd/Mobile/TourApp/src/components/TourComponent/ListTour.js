import React, { useEffect, useRef, useState } from "react";
import { View, Text, ImageBackground, Pressable, Button, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// const Tab = createMaterialTopTabNavigator();

const ListTour = ({ navigation, route }) => {
    const { listTour, title } = route.params

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#fafafa", }}>

            <View style={styles.header}><Text style={styles.textHeader}>{title}</Text></View>
            <View style={styles.RowChoice}>
                <TouchableOpacity style={styles.optionButton}>
                    <Image
                        source={require('../../../assets/new.png')}
                        style={{ width: 24, height: 24 }}
                    />
                    <Text style={styles.textBox}>Mới nhất</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton}>
                    <Image
                        source={require('../../../assets/arrows.png')}
                        style={{ width: 24, height: 24, transform: [{ rotate: '90deg' }] }}
                    />
                    <Text style={styles.textBox}>Giá cao nhất</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton}>
                    <Image
                        source={require('../../../assets/arrows.png')}
                        style={{ width: 24, height: 24, transform: [{ rotate: '270deg' }] }}
                    />
                    <Text style={styles.textBox}>Giá thấp nhất</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton}>
                    <Image
                        source={require('../../../assets/early.png')}
                        style={{ width: 24, height: 24 }}
                    />
                    <Text style={styles.textBox}>Khởi hành sớm nhất</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton}>
                    <Image
                        source={require('../../../assets/after.png')}
                        style={{ width: 24, height: 24 }}
                    />
                    <Text style={styles.textBox}>Khởi hành muộn nhất</Text>
                </TouchableOpacity>
            </View>
            {listTour?.map((tour, index) => (
                <View key={index} style={styles.tourList}>
                    <Pressable
                        style={styles.itemTour}
                        onPress={() => { navigation.navigate("DetailTour", { tour: tour }); }}
                    >
                        <View >
                            <Image
                                source={{
                                    uri: tour.url
                                }}
                                style={styles?.tourAvt}
                                resizeMode="cover"
                            />
                            <View style={styles.detailTour}>
                                <Text style={{ fontSize: 16, fontWeight: "500" }}>{tour?.title}</Text>
                                <View style={styles.rowAround}>
                                    <View>
                                        <Text style={{ fontSize: 14, fontWeight: "500", color: "red" }}>{Number(tour?.price).toLocaleString('vi-VN')} đ</Text>
                                        <Text style={{ textDecorationLine: "line-through", fontSize: 14, fontWeight: "500", color: "gray" }}>{Number(tour?.originalPrice).toLocaleString('vi-VN')} đ</Text>
                                    </View>
                                    <View style={[styles.row, { paddingRight: 10, alignItems: "center" }]}>
                                        <FontAwesome6 style={{ paddingRight: 10 }} name="bus-simple" size={20} color="black" />
                                        <FontAwesome6 name="plane" size={20} color="black" />
                                    </View>
                                </View>
                                <View style={styles.row}><AntDesign name="calendar" size={20} color="black" /><Text style={{ fontSize: 14 }}>Khởi hành: {tour?.ngayKhoiHanh}</Text></View>
                                <View style={styles.row}><AntDesign name="clockcircleo" size={20} color="black" /><Text style={{ fontSize: 14 }}>Thời gian: {tour?.thoiGian}</Text></View>
                                <View style={styles.row}><AntDesign name="team" size={20} color="black" /><Text style={{ fontSize: 14 }}>Số chổ còn nhận: {Number(tour?.soLuongVe - tour?.soVeDaDat)}/{tour?.soLuongVe}</Text></View>

                            </View>
                        </View>
                    </Pressable>
                </View>

            ))}


        </ScrollView >
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#fff",
    },
    textHeader: {
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        padding: 8
    },
    RowChoice: {
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "row",
        paddingTop: 15
    },
    optionButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 85,
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 8,
        width: "18%",
        shadowColor: "black",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 10, // Android,
    },
    textBox: {
        alignItems: "center",
        fontSize: 13,
        textAlign: "center",
    },
    tourList: {
        width: '90%',
        margin: "auto",
        paddingTop: 20,

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
    tourAvt: {
        width: '100%',
        height: 140,
        backgroundColor: "red",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        // marginRight: 10,
        // alignItems: "center",
    },
    detailTour: {
        padding: 10,
        paddingLeft: 20
    },
    row: {
        display: 'flex',
        flexDirection: "row",
    },
    rowAround: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 10

    },




});
export default ListTour;
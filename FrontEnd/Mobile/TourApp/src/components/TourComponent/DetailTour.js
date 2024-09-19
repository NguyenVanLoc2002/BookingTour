import React, { useEffect, useRef, useState } from "react";
import { View, Text, ImageBackground, Pressable, Button, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TourTabbar from "./component/TourTabbar";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// const Tab = createMaterialTopTabNavigator();

const DetailTour = ({ navigation, route }) => {
    const { tour } = route.params



    return (
        // <ScrollView style={{flex:1 , backgroundColor: "#fafafa", }}>
        <View style={{ flex: 1, backgroundColor: "#fafafa", }}>
            <ImageBackground source={{
                uri: tour.url
            }} resizeMode="cover" style={styles.imageBia}>
                <View style={styles.header}>
                    <FontAwesome5 name={"search"} size={24} color={"black"} />
                    <TextInput placeholder="Nhập vào đây để tìm kiếm" style={styles.buttonSearch}>

                    </TextInput>
                </View>
            </ImageBackground>

            <View style={styles.viewBox}>
                <TourTabbar navigation={navigation} tour={tour} style={styles.viewBox} />
            </View>
            <View style={styles.priceBox}>
                <View style={styles.rowBetween}>
                    <View style={styles.column}>
                        <Text style={{ fontSize: 14, paddingLeft: 10, color: "#8C8C8C", fontWeight: "500", textDecorationLine: "line-through" }}>Giá: {tour?.originalPrice}đ</Text>
                        <Text style={{ fontSize: 15, paddingLeft: 10, color: "red", fontWeight: "500" }}>{tour?.price}đ/khách</Text>
                    </View>
                    <Pressable style={styles.buttonDat} >
                        <Text style={styles.textDat}>ĐẶT NGAY</Text>
                    </Pressable>
                </View>
            </View>

        </View>



        //  {/* </ScrollView > */}
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 10,
        height: 40,
        backgroundColor: '#fff',
        width: "70%",
        marginLeft: 15
    },
    buttonSearch: {
        flex: 1,
        paddingLeft: 5
    },
    iconSearch: {
        marginRight: 10,
    },
    optionsRow: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        marginVertical: 10,
    },
    viewBox: {
        flex: 1,
        marginTop: -50,
        backgroundColor: "transparent",
        borderRadius: 10,
        width: "100%",
        // height: "100%"
        height: '80%'
    },

    imageBia: {
        width: '100%',
        height: 250,
        marginRight: 10,
        alignItems: "center",
    },

    rowBetween: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 6
    },

    priceBox: {
        backgroundColor: "#ffcccc"
    },
    row: {
        display: 'flex',
        flexDirection: "row",
    },
    column: {
        display: 'flex',
        flexDirection: "col",
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



});
export default DetailTour;
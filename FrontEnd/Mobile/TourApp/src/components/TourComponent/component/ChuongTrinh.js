import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import axiosInstance from "../../../api/axiosInstance";
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
    const [itineraries, setItineraries] = useState([]);
    useEffect(() => {
      const fetchItineraries = async () => {
        if (tour) {
          try {
            const res = await axiosInstance.get(
              `/v1/itineraries/by-tour`,
              {
                params: { tourId: tour.tourId },
              }
            );
            setItineraries(res.data);
            console.log(res.data);
          } catch (error) {
            console.error("Error fetching itinerary data:", error);
          }
        }
      };
  
      fetchItineraries();
    }, [tour]);
  
  
    //Call API  Get Activities By ItineraryId
    const [activities, setActivities] = useState([]);
  
    useEffect(() => {
      const fetchActivitiesByItinerary = async (itinerId) => {
        try {
          const res = await axiosInstance.get(
            `/v1/itineraries/activities/by-itinerary`,
            {
              params: { itinerId },
            }
          );
          // Lưu activity theo itinerId
          setActivities((prev) => ({
            ...prev,
            [itinerId]: res.data,
          }));
        } catch (error) {
          console.error("Error fetching itinerary data:", error);
        }
      };
  
      // Kiểm tra xem itineraries có tồn tại và không rỗng
      if (itineraries.length > 0) {
        itineraries.forEach((it) => {
          fetchActivitiesByItinerary(it.itinerId); // Truyền itinerId vào hàm
        });
      }
    }, [itineraries]);
  
    //Call API Ticket Tour
    // const [tickets, setTickets] = useState([]);
    // useEffect(() => {
    //   const fetchTickets = async () => {
    //     if (tour) {
    //       try {
    //         const response = await axiosInstance.get(
    //           `/v1/tours/tour-tickets/by-tour/${tour.tourId}`
    //         );
    //         setTickets(response.data);
    //       } catch (error) {
    //         console.error("Error fetching Ticket Tour data:", error);
    //       }
    //     }
    //   };
    //   fetchTickets();
    // }, [tour]);
  

    return (
        <ScrollView style={styles.container}>
            <View >
                {tour?.chuongTrinh?.map((ct, index) => (
                    <View style={styles.detailBox} key={index}>
                        <Pressable style={{ paddingRight: 10 }} onPress={() => toggleDetail(index)}>
                            <View style={styles.rowBetween}><Text style={styles.tieuDe}>Ngày {index + 1}: {ct?.title}</Text>
                                {expanded[index] ? (
                                    <Ionicons name="arrow-down-circle" size={24} color="black" />
                                ) : (<Ionicons name="arrow-up-circle" size={24} color="black" />)}
                            </View>  
                            </Pressable>
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
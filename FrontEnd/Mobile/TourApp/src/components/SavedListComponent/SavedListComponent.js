import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";

const SavedListComponent = ({ navigation, route }) => {

    return (
        <View style={{ backgroundColor: "white", height: "100%" }}>
            <Text style={{ fontSize: 16 }}>Mã QR của tôi</Text>
        </View>
    );
};

export default SavedListComponent;
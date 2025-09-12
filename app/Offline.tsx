import Constants from "expo-constants";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Offline() {
    const { expoConfig } = Constants;
    return (
        <View style={styles.container}>
            <Image
                source={expoConfig?.extra?.appiconPath}
                style={styles.icon}
            />
            <Text style={styles.text}>No Internet Connection</Text>
            <Text style={styles.subtext}>Please check your network and try again.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
    icon: { width: 100, height: 100, marginBottom: 20 },
    text: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
    subtext: { fontSize: 14, color: "#666" },
});

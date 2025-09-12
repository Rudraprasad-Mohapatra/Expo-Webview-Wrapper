import Constants from "expo-constants";
import { Image } from "expo-image";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

type Props = { onFinish: () => void };

export default function SplashScreenComponent({ onFinish }: Props) {
    const { expoConfig } = Constants;
    useEffect(() => {
        const timer = setTimeout(() => onFinish(), 3000); // auto-hide after 3s
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.loadingContainer}>
                <Image
                    source={require("../assets/gif/webviewloader.gif")}
                    style={styles.loadingGif}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject, // ✅ fills the screen
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff", // optional background
    },
    loadingGif: {
        width: 120,
        height: 120,
    },
});

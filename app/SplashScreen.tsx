import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { APP_CONFIG } from "../config";

type Props = { onFinish: () => void };

export default function SplashScreenComponent({ onFinish }: Props) {
    useEffect(() => {
        const timer = setTimeout(() => onFinish(), 3000); // auto-hide after 3s
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={APP_CONFIG.splash}
                style={styles.image}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
    image: { width: 250, height: 250 },
});

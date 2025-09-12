import NetInfo from "@react-native-community/netinfo";
import Constants from "expo-constants";
import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import Offline from "./Offline";

export default function Home() {
    const webviewRef = useRef<WebView>(null);
    const [isConnected, setIsConnected] = useState(true);
    // const [loading, setLoading] = useState(true);
    const { expoConfig } = Constants;

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected ?? false);
        });
        return () => unsubscribe();
    }, []);

    // Android back button
    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            if (webviewRef.current) {
                webviewRef.current.goBack();
                return true;
            }
            return false;
        });
        return () => backHandler.remove();
    }, []);

    // if (loading) {
    //     return <SplashScreenComponent onFinish={() => setLoading(false)} />;
    // }

    if (!isConnected) {
        return <Offline />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <WebView
                ref={webviewRef}
                source={{ uri: expoConfig?.extra?.url }}
                javaScriptEnabled
                domStorageEnabled
                startInLoadingState={true}
                renderLoading={() => (
                    <View style={styles.loadingContainer}>
                        <Image
                            source={require("../assets/gif/webviewloader.gif")}
                            style={styles.loadingGif}
                        />
                    </View>
                )}
                onError={() => setIsConnected(false)}
            />
        </SafeAreaView>
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

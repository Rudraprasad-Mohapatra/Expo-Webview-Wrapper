import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useRef, useState } from "react";
import { BackHandler, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { APP_CONFIG } from "../config";
import Offline from "./Offline";
import SplashScreenComponent from "./SplashScreen";

export default function Home() {
    const webviewRef = useRef<WebView>(null);
    const [isConnected, setIsConnected] = useState(true);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <SplashScreenComponent onFinish={() => setLoading(false)} />;
    }

    if (!isConnected) {
        return <Offline />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <WebView
                ref={webviewRef}
                source={{ uri: APP_CONFIG.url }}
                javaScriptEnabled
                domStorageEnabled
                startInLoadingState
                onError={() => setIsConnected(false)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
});

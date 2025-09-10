import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { APP_CONFIG } from "../config";
import Notifications from "./Notifications";

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={APP_CONFIG.themeColor} />
      {APP_CONFIG.notifications && <Notifications />}
      <Slot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" }
});

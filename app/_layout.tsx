import Constants from "expo-constants";
import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import Notifications from "./Notifications";

export default function RootLayout() {
  const { expoConfig } = Constants;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={expoConfig?.extra?.themeColor} />
      {expoConfig?.extra?.notifications && <Notifications />}
      <Slot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" }
});

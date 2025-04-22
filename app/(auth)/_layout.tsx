import { Stack } from "expo-router";
import React from "react";
import AuthScreenWrapper from "../components/global/AuthScreenWrapper";
import { View, StyleSheet } from "react-native";

export default function AuthLayout() {
  return (
    <View style={styles.container}>
      <AuthScreenWrapper>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            contentStyle: {
              backgroundColor: "transparent",
            },
            presentation: "transparentModal",
          }}
        />
      </AuthScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000504",
  },
}); 
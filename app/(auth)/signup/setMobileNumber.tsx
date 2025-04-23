import React from "react";
import { View, StyleSheet, TextInput, useWindowDimensions } from "react-native";
import { useUserStore } from "@/utils/store";
import NumberPadSvg from "../../components/Svg/NumberPadSvg";

export default function SetMobileNumber() {
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / 375, 1);
  const heightScale = Math.min(height / 800, 1);
  const { mobileNumber, setMobileNumber } = useUserStore();

  const handleMobileNumberChange = (text: string) => {
    // Only allow numbers
    const numericText = text.replace(/[^0-9]/g, "");
    setMobileNumber(numericText);
  };

  const styles = createStyles(scale, heightScale);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          mobileNumber
            ? styles.inputContainerFilled
            : styles.inputContainerEmpty,
        ]}
      >
        <NumberPadSvg />
        <TextInput
          style={styles.input}
          value={mobileNumber}
          onChangeText={handleMobileNumberChange}
          placeholder="mobile number"
          placeholderTextColor="rgba(255,255,255,0.6)"
          keyboardType="number-pad"
          maxLength={10}
          autoFocus
        />
      </View>
    </View>
  );
}

const createStyles = (scale: number, heightScale: number) =>
  StyleSheet.create({
    container: { width: "100%", backgroundColor: "#000504" },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: 1,
      padding: 12 * scale,
    },
    inputContainerEmpty: {
      borderColor: "rgba(255,255,255,0.8)",
    },
    inputContainerFilled: {
      borderColor: "rgba(255, 255, 255, 0.20)", // Teal color for filled inputs
    },
    input: { flex: 1, color: "white", fontSize: 18, marginLeft: 16 * scale },
  });

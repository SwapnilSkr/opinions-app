import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { createTextStyle } from "@/utils/theme";
import LockSvg from "@/app/components/Svg/LockSvg";
import NumberPadSvg from "@/app/components/Svg/NumberPadSvg";
import { useUserStore } from "@/utils/store";

export default function SetMobileNumber() {
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / 375, 1);
  const heightScale = Math.min(height / 800, 1);

  const { mobileNumber, setMobileNumber } = useUserStore();
  const router = useRouter();

  const handleContinue = () => {
    if (mobileNumber.length >= 10) {
      router.push("/(auth)/signup/verifyOtp");
    }
  };

  const styles = createStyles(scale, heightScale);

  const privacyText = "your phone number is never shared with third parties.";

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputIconContainer}>
          <NumberPadSvg />
        </View>
        <TextInput
          style={styles.input}
          value={mobileNumber}
          onChangeText={setMobileNumber}
          placeholder="mobile number"
          placeholderTextColor="white"
          keyboardType="phone-pad"
          maxLength={10}
          autoFocus
        />
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          mobileNumber.length >= 10
            ? styles.buttonActive
            : styles.buttonInactive,
        ]}
        onPress={handleContinue}
        disabled={mobileNumber.length < 10}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>send otp</Text>
          <Text style={styles.arrowIcon}>→</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.privacyContainer}>
        <View style={styles.lockIcon}>
          <LockSvg />
        </View>
        <View style={styles.privacyTextContainer}>
          <MaskedView
            maskElement={
              <Text style={styles.privacyText}>{privacyText}</Text>
            }
          >
            <LinearGradient
              colors={["#FFFFFF", "#676767"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <Text style={[styles.privacyText, { opacity: 0 }]}>
                {privacyText}
              </Text>
            </LinearGradient>
          </MaskedView>
        </View>
      </View>
    </View>
  );
}

const createStyles = (scale: number, heightScale: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "flex-start",
      backgroundColor: "#000504",
      paddingTop: 58 * heightScale,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20 * heightScale,
      borderWidth: 1,
      width: "100%",
      borderColor: "rgba(255, 255, 255, 0.80)",
      borderRadius: 1,
      paddingVertical: 12 * heightScale,
      paddingHorizontal: 16 * scale,
    },
    inputIconContainer: {
      marginRight: 12 * scale,
    },
    input: {
      flex: 1,
      ...createTextStyle("medium", "xl", "white"),
      padding: 0,
    },
    button: {
      borderRadius: 1,
      paddingVertical: 16 * heightScale,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10 * heightScale,
      width: "50%",
    },
    buttonContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    buttonText: {
      ...createTextStyle("medium", "lg", "#000504"),
      fontWeight: "400",
      letterSpacing: -0.4,
      fontSize: 18 * scale,
    },
    arrowIcon: {
      ...createTextStyle("medium", "lg", "#000504"),
      marginLeft: 10 * scale,
      fontWeight: "400",
      fontSize: 18 * scale,
    },
    buttonActive: {
      backgroundColor: "white",
    },
    buttonInactive: {
      backgroundColor: "rgba(255,255,255,0.1)",
    },
    privacyContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginTop: 24 * heightScale,
      width: "100%",
    },
    lockIcon: {
      marginTop: 2 * heightScale,
    },
    privacyTextContainer: {
      flex: 1,
      marginLeft: 8 * scale,
    },
    privacyText: {
      ...createTextStyle("regular", "xl", "white"),
      letterSpacing: -0.8,
      flexWrap: "wrap",
      flexShrink: 1,
    },
  });

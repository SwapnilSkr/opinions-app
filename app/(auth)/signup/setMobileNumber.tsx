import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { createTextStyle } from "@/utils/theme";
import AuthScreenWrapper from "@/app/components/global/AuthScreenWrapper";
import LockSvg from "@/app/components/Svg/LockSvg";

export default function SetMobileNumber() {
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / 375, 1);
  const heightScale = Math.min(height / 800, 1);

  const [mobileNumber, setMobileNumber] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (mobileNumber.length >= 10) {
      router.push("/(auth)/signup/verifyOtp");
    }
  };

  const styles = createStyles(scale, heightScale);

  const privacyText = "your phone number is never shared with third parties.";

  return (
    <AuthScreenWrapper
      keyboardAvoidingEnabled
      headerImage={require("../../../assets/images/visual.png")}
      geometricBackground={require("../../../assets/images/graphic.png")}
      headerTitle="JOIN US"
      headerSubtitle="tell us your mobile number"
      titleStyle={styles.title}
      subtitleStyle={styles.subtitle}
      showMobileInput
      mobileNumber={mobileNumber}
      onMobileNumberChange={setMobileNumber}
    >
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
        <LockSvg />
        <MaskedView
          style={{ flex: 1 }}
          maskElement={
            <Text style={styles.privacyText}>{privacyText}</Text>
          }
        >
          <LinearGradient
            colors={["#FFFFFF", "#676767"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ flex: 1, opacity: 0.7 }}
          >
            <Text style={[styles.privacyText, { opacity: 0 }]}>
              {privacyText}
            </Text>
          </LinearGradient>
        </MaskedView>
      </View>
    </AuthScreenWrapper>
  );
}

const createStyles = (scale: number, heightScale: number) =>
  StyleSheet.create({
    title: {
      ...createTextStyle("medium", "md", "white"),
    },
    subtitle: {
      ...createTextStyle("bold", "xxl", "rgba(255,255,255,0.9)"),
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
    },
    privacyText: {
      ...createTextStyle("regular", "xl", "white"),
      marginLeft: 8 * scale,
      letterSpacing: -0.8,
    },
  });
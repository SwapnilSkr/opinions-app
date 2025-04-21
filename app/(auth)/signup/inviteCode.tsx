import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { createTextStyle } from "@/utils/theme";
import AuthScreenWrapper from "@/app/components/global/AuthScreenWrapper";

export default function InviteCode() {
  const {width, height} = useWindowDimensions();
  const scale = Math.min(width / 375, 1);
  const heightScale = Math.min(height / 800, 1);

  const [otp, setOtp] = useState(["", "", "", ""]);
  const router = useRouter();
  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null]);

  const handleOtpChange = (text: string, index: number) => {
    if (text.length > 1) {
      // If pasted text with multiple characters, distribute them
      const chars = text.split("").slice(0, 4);
      const newOtp = [...otp];
      
      chars.forEach((char, i) => {
        if (index + i < 4) {
          newOtp[index + i] = char;
        }
      });
      
      setOtp(newOtp);
      
      // Move focus to appropriate input
      const nextIndex = Math.min(index + chars.length, 3);
      if (nextIndex < 4) {
        inputRefs.current[nextIndex]?.focus();
      } else {
        Keyboard.dismiss();
      }
    } else {
      // Normal single character input
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      
      // Auto-advance to next input
      if (text && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleContinue = () => {
    const otpString = otp.join("");
    if (otpString.length === 4) {
      router.push("/(auth)/signup/continuePage");
    }
  };

  const isOtpComplete = otp.every(digit => digit !== "");
  
  // Create responsive styles with scale and heightScale
  const styles = createStyles(scale, heightScale);

  return (
    <AuthScreenWrapper 
      keyboardAvoidingEnabled={true}
      headerImage={require("../../../assets/images/visual.png")}
      geometricBackground={require("../../../assets/images/graphic.png")}
      headerTitle="ONE LAST THING"
      headerSubtitle="share your invite code"
      titleStyle={styles.title}
      subtitleStyle={styles.subtitle}
      showOtpInput={true}
      otp={otp}
      onOtpChange={handleOtpChange}
      onOtpKeyPress={handleKeyPress}
      otpInputRefs={inputRefs}
    >      
      <TouchableOpacity 
        style={[
          styles.button, 
          isOtpComplete ? styles.buttonActive : styles.buttonInactive
        ]}
        onPress={handleContinue}
        disabled={!isOtpComplete}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>
            verify invite
          </Text>
          <Text style={styles.arrowIcon}>→</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.privacyContainer}>
        <Text style={styles.privacyText}>don’t have an invite yet? </Text>
        <Text style={styles.privacyText2}>apply to our waitlist! </Text>
      </View>
    </AuthScreenWrapper>
  );
}

// Create responsive styles function
const createStyles = (scale: number, heightScale: number) => StyleSheet.create({
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
    backgroundColor: "white",
    marginTop: 10 * heightScale,
    width: "50%",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    ...createTextStyle("medium", "xl", "#000504"),
    fontWeight: "400",
    letterSpacing: -0.4,
    fontSize: 20 * scale,
  },
  arrowIcon: {
    ...createTextStyle("medium", "xl", "#000504"),
    marginLeft: 10 * scale,
    fontWeight: "400",
    fontSize: 20 * scale,
  },
  buttonActive: {
    backgroundColor: "white",
  },
  buttonInactive: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  privacyContainer: {
    flexDirection: "column",
    marginTop: 24 * heightScale,
  },
  privacyText: {
    ...createTextStyle("regular", "xl", "rgba(255, 255, 255, 0.40)"),
    letterSpacing: -0.4,
    lineHeight: 22 * heightScale,
  },
  privacyText2: {
    ...createTextStyle("regular", "xl", "white"),
    letterSpacing: -0.4,
    lineHeight: 22 * heightScale,
  },
  resendContainer: {
    marginTop: 20 * heightScale,
  },
  resendText: {
    ...createTextStyle("regular", "md", "rgba(255,255,255,0.6)"),
  },
  resendLink: {
    ...createTextStyle("medium", "md", "white"),
  },
}); 
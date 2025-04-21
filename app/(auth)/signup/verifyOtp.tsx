import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Pressable,
  useWindowDimensions,
} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { createTextStyle } from "@/utils/theme";
import AuthScreenWrapper from "@/app/components/global/AuthScreenWrapper";
import LockSvg from "@/app/components/Svg/LockSvg";

export default function VerifyOtp() {
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
      console.log("OTP submitted:", otpString);
      router.push("/(auth)/signup/inviteCode");
    }
  };

  const handleResend = () => {
    console.log("Resend OTP");
    // In a real app, would trigger OTP resend
  };

  const isOtpComplete = otp.every(digit => digit !== "");
  
  // Create responsive styles with scale and heightScale
  const styles = createStyles(scale, heightScale);

  const privacyText = "your phone number is never shared with third parties.";

  return (
    <AuthScreenWrapper 
      keyboardAvoidingEnabled={true}
      headerImage={require("../../../assets/images/visual.png")}
      geometricBackground={require("../../../assets/images/graphic.png")}
      headerTitle="JOIN US"
      headerSubtitle="verify the OTP that we sent you on +91 6290880584"
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
            verify otp
          </Text>
          <Text style={styles.arrowIcon}>→</Text>
        </View>
      </TouchableOpacity>
      
      <Pressable 
        style={styles.resendContainer} 
        onPress={handleResend}
      >
        <Text style={styles.resendText}>
          Didn't receive code? <Text style={styles.resendLink}>Resend</Text>
        </Text>
      </Pressable>
      
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
    ...createTextStyle("medium", "lg", "#000504"),
    fontWeight: "400",
    letterSpacing: -0.4,
    fontSize: 16 * scale,
  },
  arrowIcon: {
    ...createTextStyle("medium", "lg", "#000504"),
    marginLeft: 10 * scale,
    fontWeight: "400",
    fontSize: 16 * scale,
  },
  buttonActive: {
    backgroundColor: "white",
  },
  buttonInactive: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  privacyContainer: {
    flexDirection: "row",
    marginTop: 24 * heightScale,
  },
  privacyText: {
    ...createTextStyle("regular", "xl", "white"),
    marginLeft: 8 * scale,
    letterSpacing: -0.8,
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
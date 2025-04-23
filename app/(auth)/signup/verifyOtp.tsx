import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { useUserStore } from "@/utils/store";

export default function VerifyOtp() {
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / 375, 1);
  const heightScale = Math.min(height / 800, 1);

  const [otp, setOtp] = useState(["", "", "", ""]);
  const { setOtpCode } = useUserStore();
  const router = useRouter();
  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null]);

  // Update OTP in store whenever local state changes
  useEffect(() => {
    const otpString = otp.join("");
    setOtpCode(otpString);
  }, [otp, setOtpCode]);

  const handleOtpChange = (text: string, index: number) => {
    // Filter out non-numeric characters
    const numericText = text.replace(/[^0-9]/g, "");
    
    if (numericText.length > 1) {
      // If pasted text with multiple characters, distribute them
      const chars = numericText.split("").slice(0, 4);
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
    } else if (numericText.length === 1) {
      // Normal single character input
      const newOtp = [...otp];
      newOtp[index] = numericText;
      setOtp(newOtp);
      
      // Auto-advance to next input
      if (numericText && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (text === '') {
      // Handle backspace from onChangeText (more reliable than onKeyPress)
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      
      // If we just cleared this box and it's not the first one, move back
      if (otp[index] !== '' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const styles = createStyles(scale, heightScale);

  return (
    <View style={styles.container}>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <View 
            key={index} 
            style={[
              styles.otpInputWrapper,
              digit ? styles.otpInputWrapperFilled : styles.otpInputWrapperEmpty
            ]}
          >
            <TextInput
              ref={el => {
                if (inputRefs.current) {
                  inputRefs.current[index] = el;
                }
              }}
              style={styles.otpInput}
              value={digit}
              onChangeText={text => handleOtpChange(text, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectionColor="white"
              autoFocus={index === 0}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

// Create responsive styles function
const createStyles = (scale: number, heightScale: number) => StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#000504",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "#000504",
  },
  otpInputWrapper: {
    width: 52 * scale,
    height: 52 * heightScale,
    borderWidth: 1,
    marginRight: 12 * scale,
    justifyContent: "center",
    alignItems: "center",
  },
  otpInputWrapperEmpty: {
    borderColor: "rgba(255,255,255,0.8)",
  },
  otpInputWrapperFilled: {
    borderColor: "rgba(255, 255, 255, 0.20)", // Teal color for filled inputs
  },
  otpInput: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
}); 
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { createTextStyle } from "@/utils/theme";
import { useUserStore } from "@/utils/store";

export default function InviteCode() {
  const {width, height} = useWindowDimensions();
  const scale = Math.min(width / 375, 1);
  const heightScale = Math.min(height / 800, 1);

  const [code, setCode] = useState(["", "", "", ""]);
  const { setInviteCode, setAuthenticated } = useUserStore();
  const router = useRouter();
  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null]);

  const handleCodeChange = (text: string, index: number) => {
    if (text.length > 1) {
      // If pasted text with multiple characters, distribute them
      const chars = text.split("").slice(0, 4);
      const newCode = [...code];
      
      chars.forEach((char, i) => {
        if (index + i < 4) {
          newCode[index + i] = char;
        }
      });
      
      setCode(newCode);
      
      // Move focus to appropriate input
      const nextIndex = Math.min(index + chars.length, 3);
      if (nextIndex < 4) {
        inputRefs.current[nextIndex]?.focus();
      } else {
        Keyboard.dismiss();
      }
    } else {
      // Normal single character input
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);
      
      // Auto-advance to next input
      if (text && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === "Backspace") {
      if (!code[index] && index > 0) {
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleContinue = () => {
    const codeString = code.join("");
    if (codeString.length === 4) {
      setInviteCode(codeString);
      setAuthenticated(true);
      router.push("/(auth)/signup/continuePage");
    }
  };

  const isCodeComplete = code.every(digit => digit !== "");
  
  // Create responsive styles with scale and heightScale
  const styles = createStyles(scale, heightScale);

  return (
    <View style={styles.container}>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <View 
            key={index} 
            style={[
              styles.codeInputWrapper,
              digit ? styles.codeInputWrapperFilled : styles.codeInputWrapperEmpty
            ]}
          >
            <TextInput
              ref={el => {
                if (inputRefs.current) {
                  inputRefs.current[index] = el;
                }
              }}
              style={styles.codeInput}
              value={digit}
              onChangeText={text => handleCodeChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              keyboardType="default"
              maxLength={1}
              selectionColor="white"
              autoFocus={index === 0}
              autoCapitalize="characters"
            />
          </View>
        ))}
      </View>
      
      <TouchableOpacity 
        style={[
          styles.button, 
          isCodeComplete ? styles.buttonActive : styles.buttonInactive
        ]}
        onPress={handleContinue}
        disabled={!isCodeComplete}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>
            verify invite
          </Text>
          <Text style={styles.arrowIcon}>→</Text>
        </View>
      </TouchableOpacity>
      
      <View style={styles.privacyContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.privacyText}>don't have an invite yet? </Text>
          <Text style={styles.privacyText2}>apply to our waitlist! </Text>
        </View>
      </View>
    </View>
  );
}

// Create responsive styles function
const createStyles = (scale: number, heightScale: number) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "#000504",
    paddingTop: 58 * heightScale,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20 * heightScale,
    width: "100%",
  },
  codeInputWrapper: {
    width: 48 * scale,
    height: 60 * heightScale,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16 * scale,
  },
  codeInputWrapperFilled: {
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  codeInputWrapperEmpty: {
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  codeInput: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    ...createTextStyle("medium", "xl", "white"),
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
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 24 * heightScale,
    width: "100%",
  },
  textContainer: {
    flex: 1,
  },
  privacyText: {
    ...createTextStyle("regular", "xl", "rgba(255, 255, 255, 0.40)"),
    letterSpacing: -0.4,
    lineHeight: 22 * heightScale,
    flexWrap: "wrap",
  },
  privacyText2: {
    ...createTextStyle("regular", "xl", "white"),
    letterSpacing: -0.4,
    lineHeight: 22 * heightScale,
    flexWrap: "wrap",
  },
}); 
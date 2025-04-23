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

export default function InviteCode() {
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / 375, 1);
  const heightScale = Math.min(height / 800, 1);

  const [code, setCode] = useState(["", "", "", ""]);
  const { setInviteCode, setAuthenticated } = useUserStore();
  const router = useRouter();
  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null]);

  // Update invite code in store whenever local state changes
  useEffect(() => {
    const codeString = code.join("");
    setInviteCode(codeString);
  }, [code, setInviteCode]);

  const handleCodeChange = (text: string, index: number) => {
    // Allow alphanumeric characters and convert to uppercase
    const cleanedText = text.replace(/[^A-Za-z0-9]/g, "");
    
    if (cleanedText.length > 1) {
      // If pasted text with multiple characters, distribute them
      const chars = cleanedText.split("").slice(0, 4);
      const newCode = [...code];
      
      chars.forEach((char, i) => {
        if (index + i < 4) {
          newCode[index + i] = char.toUpperCase();
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
    } else if (cleanedText.length === 1) {
      // Normal single character input
      const newCode = [...code];
      newCode[index] = cleanedText.toUpperCase();
      setCode(newCode);
      
      // Auto-advance to next input
      if (cleanedText && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (text === '') {
      // Handle backspace from onChangeText (more reliable than onKeyPress)
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
      
      // If we just cleared this box and it's not the first one, move back
      if (code[index] !== '' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const styles = createStyles(scale, heightScale);

  return (
    <View style={styles.container}>
      <View style={styles.codeContainer}>
        {code.map((char, index) => (
          <View 
            key={index} 
            style={[
              styles.codeInputWrapper,
              char ? styles.codeInputWrapperFilled : styles.codeInputWrapperEmpty
            ]}
          >
            <TextInput
              ref={el => {
                if (inputRefs.current) {
                  inputRefs.current[index] = el;
                }
              }}
              style={styles.codeInput}
              value={char}
              onChangeText={text => handleCodeChange(text, index)}
              keyboardType="default"
              maxLength={1}
              selectionColor="white"
              autoFocus={index === 0}
              autoCapitalize="characters"
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
  codeContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "#000504",
  },
  codeInputWrapper: {
    width: 52 * scale,
    height: 52 * heightScale,
    borderWidth: 1,
    marginRight: 12 * scale,
    justifyContent: "center",
    alignItems: "center",
  },
  codeInputWrapperEmpty: {
    borderColor: "rgba(255,255,255,0.8)",
  },
  codeInputWrapperFilled: {
    borderColor: "rgba(255, 255, 255, 0.20)", // Teal color for filled inputs
  },
  codeInput: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
}); 
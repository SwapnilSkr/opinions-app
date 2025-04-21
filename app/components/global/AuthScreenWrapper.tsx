import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  useWindowDimensions,
  TextInput,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { createTextStyle } from "@/utils/theme";
import NumberPadSvg from "../Svg/NumberPadSvg";

type AuthScreenWrapperProps = {
  children: React.ReactNode;
  keyboardAvoidingEnabled?: boolean;
  scrollEnabled?: boolean;
  style?: any;
  headerImage?: any;
  geometricBackground?: any;
  headerTitle?: string;
  headerSubtitle?: string;
  titleStyle?: any;
  subtitleStyle?: any;
  renderHeader?: () => React.ReactNode; // For custom header rendering
  
  // Mobile number input props
  showMobileInput?: boolean;
  mobileNumber?: string;
  onMobileNumberChange?: (text: string) => void;
  
  // OTP input props
  showOtpInput?: boolean;
  otp?: string[];
  onOtpChange?: (text: string, index: number) => void;
  onOtpKeyPress?: (e: any, index: number) => void;
  otpInputRefs?: React.MutableRefObject<Array<TextInput | null>>;
};

export default function AuthScreenWrapper({
  children,
  keyboardAvoidingEnabled = true,
  scrollEnabled = true,
  style,
  headerImage,
  geometricBackground,
  headerTitle,
  headerSubtitle,
  titleStyle,
  subtitleStyle,
  renderHeader,
  
  // Mobile number input props
  showMobileInput = false,
  mobileNumber = "",
  onMobileNumberChange,
  
  // OTP input props
  showOtpInput = false,
  otp = ["", "", "", ""],
  onOtpChange,
  onOtpKeyPress,
  otpInputRefs,
}: AuthScreenWrapperProps) {
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / 375, 1); // Base scale on standard width of 375
  const heightScale = Math.min(height / 800, 1);

  // Create responsive styles with scale and heightScale
  const styles = createStyles(scale, heightScale);

  const renderDefaultHeader = () => {
    if (!headerImage && !headerTitle && !headerSubtitle) return null;

    return (
      <View style={styles.headerSection}>
        {headerImage && (
          <>
            <Image
              source={headerImage}
              style={styles.backgroundImage}
              contentFit="cover"
            />
            {geometricBackground && (
              <Image
                source={geometricBackground}
                style={styles.geometricBackground}
                contentFit="cover"
              />
            )}
          </>
        )}

        {(headerTitle || headerSubtitle) && (
          <View style={styles.textContainer}>
            {headerTitle && (
              <Text style={[styles.title, titleStyle]}>{headerTitle}</Text>
            )}

            {headerSubtitle && (
              <Text style={[styles.subtitle, subtitleStyle]}>
                {headerSubtitle}
              </Text>
            )}
          </View>
        )}
        
        <LinearGradient
          colors={['#000000', '#000000', '#3CFFDC', '#000000', '#000000']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          locations={[0, 0.2, 0.5, 0.8, 1]}
          style={styles.gradientBorder}
        />
      </View>
    );
  };

  const renderMobileInput = () => {
    if (!showMobileInput) return null;
    
    return (
      <View style={styles.inputContainer}>
        <View style={styles.inputIconContainer}>
          <NumberPadSvg />
        </View>
        <TextInput
          style={styles.input}
          value={mobileNumber}
          onChangeText={onMobileNumberChange}
          placeholder="mobile number"
          placeholderTextColor="white"
          keyboardType="phone-pad"
          maxLength={10}
          autoFocus
        />
      </View>
    );
  };

  const renderOtpInput = () => {
    if (!showOtpInput || !otpInputRefs) return null;
    
    return (
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
                if (otpInputRefs && otpInputRefs.current) {
                  otpInputRefs.current[index] = el;
                }
              }}
              style={styles.otpInput}
              value={digit}
              onChangeText={text => onOtpChange?.(text, index)}
              onKeyPress={e => onOtpKeyPress?.(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectionColor="white"
              autoFocus={index === 0}
            />
          </View>
        ))}
      </View>
    );
  };

  const content = scrollEnabled ? (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {renderHeader ? renderHeader() : renderDefaultHeader()}
      {renderMobileInput()}
      {renderOtpInput()}
      {children}
    </ScrollView>
  ) : (
    <View style={styles.content}>
      {renderHeader ? renderHeader() : renderDefaultHeader()}
      {renderMobileInput()}
      {renderOtpInput()}
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000504" />

      {keyboardAvoidingEnabled ? (
        <KeyboardAvoidingView
          style={[styles.keyboardAvoidingView, style]}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {content}
        </KeyboardAvoidingView>
      ) : (
        <View style={[styles.nonKeyboardView, style]}>{content}</View>
      )}
    </SafeAreaView>
  );
}

// Create responsive styles with scale and heightScale factors
const createStyles = (scale: number, heightScale: number) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000504",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  nonKeyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24 * scale,
    paddingTop: 20 * heightScale,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24 * scale,
    paddingTop: 20 * heightScale,
    paddingBottom: 40 * heightScale,
  },
  headerSection: {
    marginBottom: 30 * heightScale,
    position: "relative",
    overflow: "hidden",
    flex: 0.4,
    minHeight: 180 * heightScale,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  textContainer: {
    zIndex: 3,
    position: "absolute",
    bottom: 18 * heightScale,
    left: 0,
    right: 0,
  },
  title: {
    letterSpacing: 1.44,
    fontWeight: "400",
    opacity: 0.4,
    marginBottom: 12 * heightScale,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    letterSpacing: -0.64,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  geometricBackground: {
    position: "absolute",
    bottom: -290 * heightScale,
    alignSelf: "center",
    width: 500 * scale,
    aspectRatio: 1,
    resizeMode: "contain",
    zIndex: 2,
  },
  // Mobile input styles
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.80)",
    borderRadius: 1,
    marginBottom: 20 * heightScale,
    marginTop: 30 * heightScale,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255, 255, 255, 0.01)",
  },
  inputIconContainer: {
    marginRight: 15 * scale,
  },
  input: {
    flex: 1,
    ...createTextStyle("regular", "xl", "white"),
    fontSize: 20 * scale,
    opacity: 0.7,
    padding: 0,
  },
  // OTP input styles
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20 * heightScale,
    marginTop: 30 * heightScale,
    width: "65%",
  },
  otpInputWrapper: {
    width: 50 * scale,
    height: 50 * scale,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  otpInputWrapperEmpty: {
    borderColor: "white",
  },
  otpInputWrapperFilled: {
    borderColor: "rgba(255, 255, 255, 0.20)",
  },
  otpInput: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    fontSize: 24 * scale,
    fontWeight: "500",
    color: "white",
  },
  gradientBorder: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    zIndex: 4,
  },
});

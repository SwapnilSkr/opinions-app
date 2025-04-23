import React, { ReactNode } from "react";
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
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { createTextStyle } from "@/utils/theme";
import { usePathname } from "expo-router";
import { useUserStore } from "@/utils/store";
import MaskedView from "@react-native-masked-view/masked-view";
import LockSvg from "../Svg/LockSvg";
import RightArrowSvg from "../Svg/RightArrowSvg";

type AuthScreenWrapperProps = {
  children: ReactNode;
  onButtonPress?: () => void;
  buttonDisabled?: boolean;
  showResendOption?: boolean;
  onResendPress?: () => void;
  customPrivacyText?: ReactNode;
};

export default function AuthScreenWrapper({
  children,
  onButtonPress,
  buttonDisabled = false,
  showResendOption = false,
  onResendPress,
  customPrivacyText,
}: AuthScreenWrapperProps) {
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / 375, 1);
  const heightScale = Math.min(height / 800, 1);
  const pathname = usePathname();
  const { mobileNumber } = useUserStore();

  const getScreenContent = () => {
    if (pathname.includes("setMobileNumber")) {
      return {
        headerTitle: "JOIN US",
        headerSubtitle: "tell us your mobile number",
        buttonText: "send otp",
        privacyText: "your phone number is never shared with third parties.",
        showResend: false,
      };
    } else if (pathname.includes("verifyOtp")) {
      return {
        headerTitle: "JOIN US",
        headerSubtitle: `verify the OTP that we sent you on +91 ${mobileNumber}`,
        buttonText: "verify otp",
        privacyText: "your phone number is never shared with third parties.",
        showResend: true,
      };
    } else if (pathname.includes("inviteCode")) {
      return {
        headerTitle: "ONE LAST THING",
        headerSubtitle: "share your invite code",
        buttonText: "verify invite",
        privacyText: "",
        showCustomPrivacy: true,
      };
    }
    return {
      headerTitle: "",
      headerSubtitle: "",
      buttonText: "",
      privacyText: "",
    };
  };

  const content = getScreenContent();
  const styles = createStyles(scale, heightScale);

  const privacyText = content.privacyText;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000504" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerSection}>
            <Image
              source={require("../../../assets/images/visual.png")}
              style={styles.backgroundImage}
              contentFit="cover"
            />
            <Image
              source={require("../../../assets/images/graphic.png")}
              style={styles.geometricBackground}
              contentFit="cover"
            />
            <View style={styles.textContainer}>
              {content.headerTitle && (
                <Text style={styles.title}>{content.headerTitle}</Text>
              )}
              {content.headerSubtitle && (
                <Text style={styles.subtitle}>{content.headerSubtitle}</Text>
              )}
            </View>
            <LinearGradient
              colors={["#000000", "#000000", "#AEFFF0", "#000000", "#000504"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              locations={[0, 0.1, 0.5, 0.85, 1]}
              style={styles.gradientBorder}
            />
          </View>

          <View style={styles.contentContainer}>
            {children}

            <TouchableOpacity
              style={[
                styles.button,
                buttonDisabled ? styles.buttonInactive : styles.buttonActive,
              ]}
              onPress={onButtonPress}
              disabled={buttonDisabled}
            >
              <Text style={styles.buttonText}>{content.buttonText}</Text>
              <RightArrowSvg />
            </TouchableOpacity>

            {content.showResend && showResendOption && (
              <Pressable onPress={onResendPress} style={styles.resendContainer}>
                <Text style={styles.resendText}>
                  Didn't receive code?{" "}
                  <Text style={styles.resendLink}>Resend</Text>
                </Text>
              </Pressable>
            )}

            {!content.showCustomPrivacy && privacyText !== "" && (
              <View style={styles.privacyContainer}>
                <View style={styles.lockIcon}>
                  <LockSvg />
                </View>
                <MaskedView
                  style={styles.maskWrapper} // ← apply marginLeft here
                  maskElement={
                    <Text style={styles.privacyText}>{privacyText}</Text>
                  }
                >
                  <LinearGradient
                    colors={["#FFFFFF", "#676767"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{ flex: 1}} // ← fill the mask, no extra margin
                  >
                    {/* invisible text to actually "paint" the gradient */}
                    <Text style={[styles.privacyText, { opacity: 0 }]}>
                      {privacyText}
                    </Text>
                  </LinearGradient>
                </MaskedView>
              </View>
            )}

            {content.showCustomPrivacy && customPrivacyText}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (scale: number, heightScale: number) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000504" },
    keyboardAvoidingView: { flex: 1 },
    scrollContent: {
      paddingHorizontal: 16 * scale,
      paddingBottom: 20 * heightScale,
    },
    contentContainer: { paddingTop: 58 * heightScale },
    headerSection: {
      height: 330 * heightScale,
      backgroundColor: "#000504",
      overflow: "hidden",
    },
    backgroundImage: {
      position: "absolute",
      width: "100%",
      height: "100%",
      opacity: 0.75,
    },
    geometricBackground: {
      position: "absolute",
      bottom: -250 * scale,
      left: -100 * scale,
      width: 550 * scale,
      height: 400 * heightScale,
      opacity: 0.75,
    },
    textContainer: { position: "absolute", bottom: 20 * heightScale },
    title: {
      ...createTextStyle("plusJakartaSansMedium", "md", "white"),
      marginBottom: 4 * heightScale,
      opacity: 0.4,
    },
    subtitle: {
      ...createTextStyle(
        "plusJakartaSansBold",
        "xxxl",
        "rgba(255,255,255,0.9)"
      ),
      fontSize: 26 * heightScale,
      lineHeight: 30 * heightScale,
      letterSpacing: -0.56 * heightScale,
    },
    gradientBorder: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 0.5,
    },
    button: {
      marginTop: 30 * heightScale,
      paddingVertical: 14 * heightScale,
      paddingHorizontal: 24 * scale,
      alignItems: "center",
      borderRadius: 1,
      width: "50%",
      flexDirection: "row",
      justifyContent: "center",
      gap: 16 * scale,
      borderColor: "rgba(255,255,255,0.01)",
      borderWidth: 1,
    },
    buttonActive: { backgroundColor: "white" },
    buttonInactive: { backgroundColor: "rgba(255,255,255,0.2)" },
    buttonText: {
      ...createTextStyle("plusJakartaSansMedium", "lg", "#000504"),
      fontWeight: "600",
      letterSpacing: -0.4 * heightScale,
    },
    resendContainer: { marginTop: 20 * heightScale },
    resendText: {
      ...createTextStyle("plusJakartaSansMedium", "md", "rgba(255,255,255,0.6)"),
    },
    resendLink: { color: "white" },

    privacyContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 27 * heightScale,
      position: "relative",
    },
    maskWrapper: {
      flex: 1,
      marginLeft: 12 * scale,
    },
    privacyText: {
      ...createTextStyle("plusJakartaSansMedium", "lg", "white"),
      letterSpacing: -0.8 * heightScale,
      lineHeight: 28 * heightScale,
      fontWeight: "500",
      opacity: 0.6,
    },
    lockIcon: {
      paddingBottom: 24 * heightScale,
    },
  });

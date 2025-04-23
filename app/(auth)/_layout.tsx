// app/(auth)/signup/_layout.tsx
import React from "react";
import { Slot, usePathname, useRouter } from "expo-router";
import AuthScreenWrapper from "../components/global/AuthScreenWrapper";
import { View, StyleSheet, Text, ViewStyle, useWindowDimensions } from "react-native";
import { useUserStore } from "@/utils/store";
import { createTextStyle } from "@/utils/theme";

type LayoutProps = {};

export default function AuthLayout(props: LayoutProps) {
  const {width, height} = useWindowDimensions();
  const scale = Math.min(width / 375, 1);
  const heightScale = Math.min(height / 800, 1);
  const router = useRouter();
  const pathname = usePathname();
  const { mobileNumber, otpCode, inviteCode, setAuthenticated } =
    useUserStore();

  const styles = createStyles(scale, heightScale);
  const getButtonDisabled = () => {
    if (pathname.includes("setMobileNumber")) {
      return mobileNumber.length < 10;
    } else if (pathname.includes("verifyOtp")) {
      return (otpCode?.length || 0) < 4;
    } else if (pathname.includes("inviteCode")) {
      return (inviteCode?.length || 0) < 4;
    }
    return false;
  };

  const handleButtonPress = () => {
    if (pathname.includes("setMobileNumber")) {
      router.push("/(auth)/signup/verifyOtp");
    } else if (pathname.includes("verifyOtp")) {
      router.push("/(auth)/signup/inviteCode");
    } else if (pathname.includes("inviteCode")) {
      setAuthenticated(true);
      router.push("/continuePage");
    }
  };

  const handleResendOtp = () => {
    console.log("Resend OTP logic here");
  };

  const renderInvitePrivacyText = () => (
    <View style={styles.privacyContainer}>
      <Text style={styles.privacyText}>don't have an invite yet? </Text>
      <Text style={styles.privacyTextHighlight}>apply to our waitlist!</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <AuthScreenWrapper
        onButtonPress={handleButtonPress}
        buttonDisabled={getButtonDisabled()}
        showResendOption={pathname.includes("verifyOtp")}
        onResendPress={handleResendOtp}
        customPrivacyText={
          pathname.includes("inviteCode")
            ? renderInvitePrivacyText()
            : undefined
        }
      >
        <Slot />
      </AuthScreenWrapper>
    </View>
  );
}

const createStyles = (scale: number, heightScale: number) => StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000504" },
  privacyContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 24,
  },
  privacyText: {
    ...createTextStyle("plusJakartaSansMedium", "xl", "rgba(255,255,255,0.6)"),
    letterSpacing: -0.4 * heightScale,
    lineHeight: 22 * heightScale,
  },
  privacyTextHighlight: {
    ...createTextStyle("plusJakartaSansMedium", "xl", "white"),
    letterSpacing: -0.4 * heightScale,
    lineHeight: 22 * heightScale,
  },
});

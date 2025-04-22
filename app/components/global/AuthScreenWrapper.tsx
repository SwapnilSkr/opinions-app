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
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { createTextStyle } from "@/utils/theme";
import { usePathname } from "expo-router";
import { useUserStore } from "@/utils/store";

type AuthScreenWrapperProps = {
  children: React.ReactNode;
  style?: any;
  keyboardAvoidingEnabled?: boolean;
  scrollEnabled?: boolean;
};

export default function AuthScreenWrapper({
  children,
  style,
  keyboardAvoidingEnabled = true,
  scrollEnabled = true,
}: AuthScreenWrapperProps) {
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / 375, 1);
  const heightScale = Math.min(height / 800, 1);
  const pathname = usePathname();
  const { mobileNumber } = useUserStore();

  // Create responsive styles with scale and heightScale
  const styles = createStyles(scale, heightScale);

  // Get screen-specific content
  const getScreenContent = () => {
    // Set Mobile Number screen
    if (pathname.includes("setMobileNumber")) {
      return {
        headerTitle: "JOIN US",
        headerSubtitle: "tell us your mobile number",
      };
    }
    // Verify OTP screen
    else if (pathname.includes("verifyOtp")) {
      return {
        headerTitle: "JOIN US",
        headerSubtitle: `verify the OTP that we sent you on +91 ${mobileNumber}`,
      };
    }
    // Invite Code screen
    else if (pathname.includes("inviteCode")) {
      return {
        headerTitle: "ONE LAST THING",
        headerSubtitle: "share your invite code",
      };
    }
    // Default content
    return {
      headerTitle: "",
      headerSubtitle: "",
    };
  };

  const content = getScreenContent();

  const renderHeader = () => {
    return (
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
          colors={["#000000", "#000000", "#AEFFF0", "#000000", "#000000"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          locations={[0, 0.1, 0.5 ,0.85, 1]}
          style={styles.gradientBorder}
        />
      </View>
    );
  };

  const mainContent = scrollEnabled ? (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {renderHeader()}
      {children}
    </ScrollView>
  ) : (
    <View style={styles.content}>
      {renderHeader()}
      {children}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000504"
        translucent={false}
      />
      {keyboardAvoidingEnabled ? (
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          {mainContent}
        </KeyboardAvoidingView>
      ) : (
        mainContent
      )}
    </SafeAreaView>
  );
}

const createStyles = (scale: number, heightScale: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000504",
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20 * scale,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: 20 * scale,
      paddingBottom: 20 * heightScale,
    },
    backgroundImage: {
      position: "absolute",
      width: "100%",
      height: "100%",
    },
    geometricBackground: {
      position: "absolute",
      bottom: -250 * heightScale,
      left: -100 * scale,
      width: 550 * scale,
      height: 400 * scale,
    },
    headerSection: {
      height: "40%",
      position: "relative",
    },
    gradientBorder: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 0.5,
    },
    textContainer: {
      position: "absolute",
      bottom: 16 * heightScale,
      left: 0,
    },
    title: {
      ...createTextStyle("medium", "md", "white"),
      marginBottom: 4 * heightScale,
    },
    subtitle: {
      ...createTextStyle("bold", "xxl", "rgba(255,255,255,0.9)"),
    },
  });

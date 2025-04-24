import { Slot } from "expo-router";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { createTextStyle } from "@/utils/theme";
import OnboardingHeaderRadial from "@/app/components/global/OnboardingHeaderRadial";
import RoundDotSvg from "../components/Svg/RoundDotSvg";
import CancelSvg from "../components/Svg/CancelSvg";
import PauseSvg from "../components/Svg/PauseSvg";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  FadeIn,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { interestsArray } from "@/utils/data/interestsArray";

const activeTab = "firstQuestion";

const TabBreadcrumbs = () => {
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / 375, 1);
  const heightScale = Math.min(height / 800, 1);
  const styles = createStyles(scale, heightScale);
  return (
    <View style={styles.tabBreadcrumbs}>
      {Array.from({ length: 9 }).map((_, index) => (
        <View key={index} style={styles.tabBreadcrumb}></View>
      ))}
    </View>
  );
};

export default function OnboardingLayout() {
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / 375, 1);
  const heightScale = Math.min(height / 800, 1);
  const styles = createStyles(scale, heightScale);
  const [interests, setInterests] = useState(interestsArray);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = withSpring(event.contentOffset.y, {
        damping: 20,
        stiffness: 90,
        mass: 0.5,
      });
    },
  });

  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: scrollY.value * 0.05 }],
    };
  });

  return (
    <View style={styles.container}>
      <OnboardingHeaderRadial>
        <View>
          <TabBreadcrumbs />
          <View style={styles.onboardingTextContainer}>
            <RoundDotSvg fillColor="#3CFFDC" />
            <MaskedView
              style={styles.gradientText}
              maskElement={
                <Text
                  style={[
                    styles.onboardingText,
                    { backgroundColor: "transparent", color: "#000" },
                  ]}
                >
                  ONBOARDING SURVEY
                </Text>
              }
            >
              <LinearGradient
                colors={["#14E9C7", "#14E9C7"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientText}
              >
                <Text style={[styles.onboardingText, { opacity: 0 }]}>
                  ONBOARDING SURVEY
                </Text>
              </LinearGradient>
            </MaskedView>
          </View>
          <View style={styles.questionContainer}>
            <Text style={styles.questionNumber}>
              QUESTION 1 OF 9 • VOICE BASED
            </Text>
            <Text style={styles.questionText}>
              tell us about yourself and pick at least three interests.
            </Text>
          </View>
          <LinearGradient
            colors={["#000000", "#000000", "#AEFFF0", "#000000", "#000504"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            locations={[0, 0.1, 0.5, 0.85, 1]}
            style={styles.gradientBorder}
          />
        </View>
      </OnboardingHeaderRadial>
      <Animated.ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={true}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        decelerationRate={0.992}
        overScrollMode="always"
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View style={[styles.voiceContainer, animatedContentStyle]}>
          <Text style={styles.voiceContainerTitleText}>
            TELL US ABOUT YOURSELF
          </Text>
          <View style={styles.voiceContainerBox}>
            <View style={styles.voiceTimerBox}>
              <RoundDotSvg fillColor="#F31D33" />
              <Text style={styles.voiceTimerText}>7 seconds left</Text>
            </View>
          </View>
          <View style={styles.voiceControlButtonsContainer}>
            <View
              style={[
                styles.voiceControlButton,
                { backgroundColor: "#1D1D1D" },
              ]}
            >
              <PauseSvg />
              <Text style={styles.voiceControlButtonText}>Pause</Text>
            </View>
            <View
              style={[
                styles.voiceControlButton,
                { backgroundColor: "#330F0F" },
              ]}
            >
              <CancelSvg />
              <Text style={styles.voiceControlButtonText}>Stop</Text>
            </View>
          </View>
          <View style={styles.interestContainer}>
            <Text style={styles.interestTitle}>pick up to five interests</Text>
            <View style={styles.interestBox}>
              {interests.map((interest) => (
                <TouchableOpacity
                  style={[
                    styles.interestBoxItem,
                    {
                      backgroundColor: interest.isSelected
                        ? "#FFFFFF"
                        : "#1B1B1B",
                    },
                  ]}
                  key={interest.id}
                  onPress={() => {
                    setInterests(
                      interests.map((i) =>
                        i.id === interest.id
                          ? { ...i, isSelected: !i.isSelected }
                          : i
                      )
                    );
                  }}
                >
                  <Text
                    style={[
                      styles.interestBoxItemText,
                      { color: interest.isSelected ? "#000000" : "#D0D0D0" },
                    ]}
                  >
                    {interest.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}

const createStyles = (scale: number, heightScale: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000504",
      paddingHorizontal: 20 * scale,
      paddingTop: 12 * heightScale,
    },
    tabBreadcrumbs: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10 * scale,
    },
    tabBreadcrumb: {
      width: 30 * scale,
      height: 7 * scale,
      borderRadius: 16 * scale,
      backgroundColor: "#3CFFDC",
      opacity: 0.1,
    },
    tabBreadcrumbActive: {
      width: 30 * scale,
      height: 7 * scale,
      borderRadius: 16 * scale,
      backgroundColor: "#3CFFDC",
      opacity: 0.7,
    },
    onboardingTextContainer: {
      marginVertical: 30 * heightScale,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8 * scale,
    },
    gradientText: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    onboardingText: {
      ...createTextStyle("plusJakartaSansMedium", "md", "#14E9C7"),
      letterSpacing: -0.48 * scale,
      margin: 0,
      paddingBottom: 4 * heightScale,
    },
    questionContainer: {
      paddingVertical: 25 * heightScale,
      paddingHorizontal: 25 * scale,
      display: "flex",
      backgroundColor: "rgba(6, 12, 11, 0.70)",
      borderWidth: 1 * scale,
      borderColor: "rgba(70, 74, 73, 0.60)",
      borderRadius: 16 * scale,
      marginBottom: 12 * heightScale,
    },
    questionNumber: {
      ...createTextStyle("plusJakartaSansMedium", "md", "#868686"),
      letterSpacing: 0.48 * scale,
      margin: 0,
    },
    questionText: {
      ...createTextStyle("plusJakartaSansBold", "xxxl", "#D5D5D5"),
      letterSpacing: -0.56 * scale,
      margin: 0,
    },
    scrollContainer: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 30 * heightScale,
    },
    gradientBorder: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 0.5,
    },
    voiceContainer: {
      marginTop: 34 * heightScale,
      display: "flex",
      justifyContent: "center",
      paddingBottom: 20 * heightScale,
    },
    voiceContainerTitleText: {
      ...createTextStyle("plusJakartaSansBold", "md", "#363938"),
      letterSpacing: 0.32 * scale,
      marginBottom: 8 * heightScale,
    },
    voiceContainerBox: {
      display: "flex",
      height: 244 * heightScale,
      alignItems: "center",
      borderWidth: 1 * scale,
      borderColor: "rgba(70, 74, 73, 0.60)",
      borderRadius: 12 * scale,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
    voiceTimerBox: {
      marginTop: 18 * heightScale,
      paddingHorizontal: 12 * scale,
      paddingVertical: 8 * heightScale,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8 * scale,
      backgroundColor: "rgba(0, 0, 0, 0.80)",
      borderWidth: 1 * scale,
      borderColor: "rgba(255, 255, 255, 0.20)",
      borderRadius: 8 * scale,
    },
    voiceTimerText: {
      ...createTextStyle("plusJakartaSansMedium", "lg", "white"),
      letterSpacing: 0.32 * scale,
      margin: 0,
      paddingBottom: 4 * heightScale,
    },
    voiceControlButtonsContainer: {
      marginTop: 8 * heightScale,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 12 * scale,
    },
    voiceControlButton: {
      width: "49%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 12 * scale,
      paddingHorizontal: 4 * scale,
      paddingVertical: 16 * heightScale,
      borderRadius: 12 * scale,
      backgroundColor: "rgba(0, 0, 0, 0.80)",
      borderWidth: 1 * scale,
    },
    voiceControlButtonText: {
      ...createTextStyle("plusJakartaSansBold", "lg", "white"),
      letterSpacing: 0.32 * scale,
      margin: 0,
      textTransform: "lowercase",
    },
    interestContainer: {
      marginTop: 50 * heightScale,
    },
    interestTitle: {
      ...createTextStyle("plusJakartaSansMedium", "md", "#363938"),
      letterSpacing: 0.32 * scale,
      marginBottom: 12 * heightScale,
      textTransform: "uppercase",
    },
    interestBox: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 16 * scale,
    },
    interestBoxItem: {
      paddingHorizontal: 10 * scale,
      paddingVertical: 8 * heightScale,
      borderRadius: 8 * scale,
    },
    interestBoxItemText: {
      ...createTextStyle("plusJakartaSansSemiBold", "lg", "#363938"),
      lineHeight: 25 * heightScale,
      letterSpacing: -0.19 * scale,
      margin: 0,
    },
  });

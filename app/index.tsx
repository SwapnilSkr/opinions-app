import React, { useRef, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  useWindowDimensions,
  Platform,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  SharedValue,
} from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import { useRouter } from "expo-router";

import SwiggySvg from "./components/Svg/LogoSvgs/SwiggySvg";
import GoldGymSvg from "./components/Svg/LogoSvgs/GoldGymSvg";
import NikeSvg from "./components/Svg/LogoSvgs/NikeSvg";
import HdfcSvg from "./components/Svg/LogoSvgs/HdfcSvg";
import CredSvg from "./components/Svg/LogoSvgs/CredSvg";
import GivaSvg from "./components/Svg/LogoSvgs/GivaSvg";
import HotstarSvg from "./components/Svg/LogoSvgs/HotstarSvg";
import BlueTokaiSvg from "./components/Svg/LogoSvgs/BlueTokaiSvg";
import { createTextStyle } from "@/utils/theme";

// Create styles with access to the heightScale
const createStyles = (heightScale: number) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000504",
  },
  mainContainer: { 
    flex: 1,
  },
  upperSection: {
    position: "relative",
    overflow: "hidden",
  },
  bottomSection: {
    backgroundColor: "#000504",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    zIndex: 0,
  },
  logosContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "10%",
    zIndex: 1,
  },
  logoColumn: { 
    flex: 1, 
    overflow: "hidden" 
  },
  fadeTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  fadeBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  geometricBackground: {
    position: "absolute",
    bottom: -338,
    alignSelf: "center",
    width: "100%",
    aspectRatio: 1,
    resizeMode: "contain",
    zIndex: 0,
  },
  brandText: {
    ...createTextStyle("regular", "sm", "white"),
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    opacity: 0.8,
    zIndex: 3,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingTop: "3%",
    height: "100%",
  },
  welcomeTitle: {
    ...createTextStyle("medium", "md", "white"),
    marginTop: `${Math.max(4 * heightScale, 2)}%`,
    marginBottom: "2%",
    letterSpacing: 1.44,
    opacity: 0.4,
  },
  welcomeText: {
    ...createTextStyle("bold", "xxxxl", "white"),
    marginBottom: "5%",
    letterSpacing: -0.64,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "5%",
    width: "100%",
    gap: 14,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexGrow: 1,
    marginHorizontal: 0,
  },
  buttonText: {
    ...createTextStyle("medium", "md", "#0A0A0A"),
    fontWeight: "400",
    textAlign: "center",
    opacity: 0.9,
    letterSpacing: -0.4,
    lineHeight: 30,
  },
  termsContainer: { 
    marginTop: `${Math.max(7 * heightScale, 4)}%`
  },
  termsText: {
    ...createTextStyle("medium", "md", "rgba(255,255,255,0.5)"),
  },
  termsLink: { 
    color: "white" 
  },
});

const Index = () => {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / 375, 1); // Base scale on standard width of 375
  const heightScale = Math.min(height / 800, 1);
  
  // Create styles with height scale
  const styles = createStyles(heightScale);

  // logo arrays
  const column1Logos = [SwiggySvg, GoldGymSvg, NikeSvg, HdfcSvg];
  const column2Logos = [CredSvg, GivaSvg, HotstarSvg, BlueTokaiSvg];

  const [upperHeight, setUpperHeight] = useState(0);

  const scrollY1 = useSharedValue(0);
  const scrollY2 = useSharedValue(0);

  const animationStarted = useRef(false);
  const redirectTimer = useRef<NodeJS.Timeout | null>(null);

  // Setup the redirect timer when the component mounts
  useEffect(() => {
    // Set a timer to redirect after 5 seconds
    redirectTimer.current = setTimeout(() => {
      router.replace("/(auth)/signup/setMobileNumber");
    }, 5000);

    // Clear the timer when component unmounts
    return () => {
      if (redirectTimer.current) {
        clearTimeout(redirectTimer.current);
      }
    };
  }, [router]);

  useEffect(() => {
    if (upperHeight <= 0 || animationStarted.current) return;

    const logoItemHeight = upperHeight / column1Logos.length;
    const total = logoItemHeight * column1Logos.length;

    const start = (sv: SharedValue<number>) => {
      sv.value = withRepeat(
        withTiming(total, { duration: 15000, easing: Easing.linear }),
        -1,
        false,
      );
    };

    start(scrollY1);
    start(scrollY2);
    animationStarted.current = true;
  }, [upperHeight]);
  
  // Handle button presses
  const handleButtonPress = (action: string) => {
    // Clear the automatic redirect timer
    if (redirectTimer.current) {
      clearTimeout(redirectTimer.current);
    }
    
    if (action === "opinionate") {
      router.replace("/(auth)/signup/setMobileNumber");
    }
    // Other button actions can be handled here
  };

  const renderColumn = (logos: (() => React.JSX.Element)[], sv: SharedValue<number>, key: string, dir: string) => {
    const itemH = upperHeight ? upperHeight / column1Logos.length : 0;
    const total = itemH * column1Logos.length;

    const aStyle = useAnimatedStyle(() => {
      const off = sv.value % total;
      const ty = dir === "up" ? -off : off - total;
      return { transform: [{ translateY: ty }] };
    });

    if (!upperHeight) return null;

    return (
      <Animated.View style={aStyle}>
        {[...logos, ...logos].map((Logo, i) => (
          <View key={`${key}-${i}`} style={{ height: itemH, justifyContent: "center", alignItems: "center" }}>
            <Logo />
          </View>
        ))}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#000504"
        translucent={false}
      />
      <View style={styles.mainContainer}>
        {/* upper section - adjust ratio for smaller screens */}
        <View 
          style={[styles.upperSection, { 
            height: height * (height < 700 ? 0.5 : 0.55)
          }]} 
          onLayout={(e) => setUpperHeight(e.nativeEvent.layout.height)}
        >
          {/* background image */}
          <Image source={require("../assets/images/visual.png")} style={styles.backgroundImage}/>

          <View style={styles.logosContainer}>
            <View style={styles.logoColumn}>{renderColumn(column1Logos, scrollY1, "c1", "down")}</View>
            <View style={styles.logoColumn}>{renderColumn(column2Logos, scrollY2, "c2", "up")}</View>
          </View>

          {/* gradients */}
          <LinearGradient 
            colors={["rgba(0,5,4,0.8)", "rgba(0,5,4,0)"]} 
            style={[styles.fadeTop, { height: 60 * scale }]} 
            pointerEvents="none" 
          />
          <LinearGradient 
            colors={["rgba(0,5,4,0)", "rgba(0,5,4,0.8)"]} 
            style={[styles.fadeBottom, { height: 60 * scale }]} 
            pointerEvents="none" 
          />

          <Image source={require("../assets/images/graphic.png")} style={styles.geometricBackground}/>
          <Text style={[styles.brandText, { fontSize: 14 * scale }]}>trusted by 25+ global brands</Text>
        </View>

        {/* bottom section - adjust ratio for smaller screens */}
        <View style={[styles.bottomSection, { 
          height: height * (height < 700 ? 0.4 : 0.45)
        }]}>
          <View style={styles.welcomeSection}>
            <Text style={[styles.welcomeTitle, { 
              fontSize: 14 * scale,
              marginBottom: height < 700 ? "1%" : "2%"
            }]}>WELCOME</Text>
            <Text style={[styles.welcomeText, { 
              fontSize: 34 * scale, 
              lineHeight: 38 * scale,
              marginBottom: height < 700 ? "3%" : "5%" 
            }]}>
              where your voice meets real cash.
            </Text>

            <View style={[styles.buttonContainer, {
              marginBottom: height < 700 ? "3%" : "5%"
            }]}>
              {[
                { label: "learn", action: "learn" },
                { label: "opinionate", action: "opinionate" },
                { label: "earn", action: "earn" },
              ].map(({ label, action }) => {
                // Scale padding based on device width
                const scaledHorizontalPadding = label === "opinionate" 
                  ? Math.max(10 * scale, 8) 
                  : Math.max(30 * scale, 20);
                
                return (
                  <TouchableOpacity 
                    key={label} 
                    style={[styles.button, { 
                      paddingVertical: 5 * heightScale,
                      paddingHorizontal: scaledHorizontalPadding
                    }]}
                    onPress={() => handleButtonPress(action)}
                  >
                    <Text 
                      style={styles.buttonText}
                      numberOfLines={1}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.termsContainer}>
              <Text style={[styles.termsText, { 
                fontSize: 17 * scale, 
                lineHeight: height < 700 ? 19 : 23 * scale 
              }]}>
                by signing up, you agree to our <Text style={styles.termsLink}>terms and conditions</Text> and <Text style={styles.termsLink}>privacy policy</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

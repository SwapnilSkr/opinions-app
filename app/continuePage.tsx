import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { createTextStyle } from "@/utils/theme";

type Props = {
  onStart: () => void;
};

export default function ContinuePage({ onStart }: Props) {
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / 375, 1);
  const heightScale = Math.min(height / 800, 1);
  const styles = createStyles(scale, heightScale);

  const upperText = "take your first survey for us to get to know you. speak your mind – no pressure to type! no abusive words, your feedback is anonymized.";
  const bottomText =
    "this survey is your first step in, it helps us tailor the experience just for you.";

  return (
    <View style={styles.container}>
      {/* background checkmark */}
      <Image
        source={require("../assets/images/checkmark.png")}
        style={styles.checkmark}
        contentFit="contain"
      />

      {/* overlayed content */}
      <View style={styles.overlay}>
        <Text style={styles.title}>you’re in! 🎉</Text>

        <MaskedView
          style={styles.mask}
          maskElement={<Text style={styles.maskText}>{upperText}</Text>}
        >
          <LinearGradient
            colors={["#FFFFFF", "#999999"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ flex: 1 }}
          >
            <Text style={[styles.maskText, { opacity: 0 }]}>
              {upperText}
            </Text>
          </LinearGradient>
        </MaskedView>

        <TouchableOpacity style={styles.button} onPress={onStart}>
          <Text style={styles.buttonText}>understood, let’s start!</Text>
        </TouchableOpacity>

        <MaskedView
          style={styles.mask}
          maskElement={<Text style={styles.maskText}>{bottomText}</Text>}
        >
          <LinearGradient
            colors={["#FFFFFF", "#676767"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ flex: 1 }}
          >
            <Text style={[styles.maskTextBottom, { opacity: 0 }]}>
              {bottomText}
            </Text>
          </LinearGradient>
        </MaskedView>
      </View>
    </View>
  );
}

const createStyles = (scale: number, heightScale: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000504",
    },
    checkmark: {
      position: "absolute",
      alignSelf: "center",
      width: 430 * scale,
      height: 656 * scale,
      top: "33%",
      marginTop: -(656 * scale) / 2,
    },
    overlay: {
      position: "absolute",
      width: "100%",
      bottom: 55 * heightScale,
      alignItems: "center",
      paddingHorizontal: 20 * scale,
    },
    title: {
      ...createTextStyle("medium", "xxxl", "white"),
      fontWeight: "700",
      lineHeight: 30 * scale,
      letterSpacing: -0.56,
      marginBottom: 16 * heightScale,
    },
    description: {
      ...createTextStyle("regular", "xl", "white"),
      lineHeight: 20 * scale,
      textAlign: "center",
      marginBottom: 24 * heightScale,
    },
    button: {
      backgroundColor: "white",
      borderRadius: 1 * heightScale,
      borderWidth: 1 * heightScale,
      borderColor: "rgba(255, 255, 255, 0.01)",
      paddingHorizontal: 32 * scale,
      paddingVertical: 16 * heightScale,
      width: "100%",
      alignItems: "center",
      marginBottom: 24 * heightScale,
    },
    buttonText: {
      ...createTextStyle("medium", "xl", "#000504"),
      letterSpacing: -0.4,
      fontWeight: "400",
    },
    mask: {
      width: "100%",
      marginBottom: 40 * heightScale,
    },
    maskText: {
      ...createTextStyle("regular", "xl", "white"),
      lineHeight: 24 * scale,
      fontWeight: "500",
      textAlign: "center",
    },
    maskTextBottom: {
      ...createTextStyle("regular", "xl", "white"),
      opacity: 0.6,
      letterSpacing: -0.8,
      lineHeight: 24 * scale,
      fontWeight: "400",
      textAlign: "center",
    },
  });

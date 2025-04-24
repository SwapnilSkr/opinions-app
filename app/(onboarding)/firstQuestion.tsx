import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { createTextStyle } from "@/utils/theme";

export default function FirstQuestion() {
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / 375, 1);
  const heightScale = Math.min(height / 800, 1);
  const styles = createStyles(scale, heightScale);
  return (
    <View>
      <Text style={styles.question}>First Question</Text>
  </View>
  );
}

const createStyles = (scale: number, heightScale: number) => StyleSheet.create({
  question: {
    ...createTextStyle("plusJakartaSansMedium", "xl", "white"),
  },
});

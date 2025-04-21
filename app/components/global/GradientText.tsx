import React from 'react';
import { Text, StyleSheet } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientTextProps {
  style?: object;
  colors: [string, string, ...string[]];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  children: React.ReactNode;
}

const GradientText: React.FC<GradientTextProps> = ({
  style,
  colors,
  start = { x: 0, y: 0 },
  end = { x: 0, y: 1 },
  children,
}) => {
  return (
    <MaskedView
      maskElement={
        <Text style={[styles.text, style]}>
          {children}
        </Text>
      }
    >
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        style={{ flex: 1 }}
      >
        <Text style={[styles.text, style, { opacity: 0 }]}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
});

export default GradientText;

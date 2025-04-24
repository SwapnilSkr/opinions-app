import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

export default function OnboardingHeaderRadial({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient
            id="grad"
            cx="50%"           // 50% horizontal center
            cy="100%"          // 100% vertical bottom
            rx="44.65%"        // 44.65% horizontal radius
            ry="140%"          // 100% vertical radius
            fx="50%"           // focal x
            fy="100%"          // focal y
          >
            <Stop offset="0%" stopColor="#0D1F1C" />
            <Stop offset="100%" stopColor="#000504" />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        overflow: 'hidden',
      },
});
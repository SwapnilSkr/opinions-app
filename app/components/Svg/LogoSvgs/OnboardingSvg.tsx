import React from 'react';
import Svg, { G, Rect, Defs, Pattern, Use } from 'react-native-svg';
import { ViewStyle } from 'react-native';

interface OnboardingSvgProps {
  style?: ViewStyle;
}

export default function OnboardingSvg({ style }: OnboardingSvgProps) {
  return (
    <Svg
      width="430"
      height="219"
      viewBox="0 0 430 219"
      fill="none"
      style={style}
    >
      <G style={{ mixBlendMode: 'screen' }} opacity="0.2">
        <Rect
          x="-79.1973"
          y="88.1022"
          width="507.36"
          height="507.36"
          transform="rotate(-10 -79.1973 88.1022)"
          fill="#3CFFDC"
        />
      </G>
    </Svg>
  );
} 
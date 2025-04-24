import Svg, { Rect } from "react-native-svg";

export default function RoundDotSvg({fillColor}: {fillColor: string}) {
  return (
    <Svg
      width="11"
      height="10"
      viewBox="0 0 11 10"
      fill="none"
    >
      <Rect x="0.5" width="10" height="10" rx="5" fill={fillColor} />
    </Svg>
  );
}

import Svg, { G, Path } from "react-native-svg";

export default function CredSvg() {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
      <Path
        d="M8.5 5.5V34.75L24 42.5L39.5 34.75V5.5H8.5Z"
        stroke="white"
        strokeWidth="2.88"
        strokeLinejoin="round"
      />
      <Path
        d="M27.5 17.4215H14.5V31.75L24 36.5L33.5 31.75V22M33.5 19V11.5H13"
        stroke="white"
        strokeWidth="2.88"
        strokeLinejoin="round"
      />
      <Path
        d="M20.5 22V28.75L24 30.5L27.5 28.75"
        stroke="white"
        strokeWidth="2.88"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

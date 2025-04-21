import Svg, { G, Path } from "react-native-svg";

export default function HdfcSvg() {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
    >
      <G style={{ mixBlendMode: "luminosity" }}>
        <Path d="M0 0H40V40H0V0Z" fill="white" />
        <Path
          d="M7.00049 7.00049H33.0035V33.0035H7.00049V7.00049Z"
          fill="#061210"
        />
        <Path d="M18.0001 0H21.999V40H18.0001V0Z" fill="#061210" />
        <Path d="M0 18.0051H40V22.004H0V18.0051Z" fill="#061210" />
        <Path d="M14.002 14.0012H26.002V26.0021H14.002V14.0012Z" fill="white" />
      </G>
    </Svg>
  );
}

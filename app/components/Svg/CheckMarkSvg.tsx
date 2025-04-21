import Svg, { Circle, Defs, FeBlend, FeColorMatrix, FeComposite, FeFlood, FeGaussianBlur, FeOffset, Filter, G, LinearGradient, Path, Rect, Stop } from "react-native-svg";

export default function CheckMarkSvg() {
  return (
    <Svg
      width="430"
      height="666"
      viewBox="0 0 430 666"
      fill="none"
    >
      <G  filter="url(#filter0_dddddd_105_1095)">
        <G
          style={{ mixBlendMode: "plus-lighter" }}
          filter="url(#filter1_f_105_1095)"
        >
          <Path
            d="M292 338.5C294 323.5 294.734 313.884 288.414 301C282.094 288.115 277.888 276.453 266.54 267.668C255.192 258.883 242.057 256.889 228 254C212 256.5 206.393 256.903 192.5 260.5L189.099 265.12C200.836 262.082 213.113 261.771 224.989 264.212C236.865 266.653 248.024 271.781 257.611 279.202C267.199 286.624 274.959 296.142 280.299 307.027C285.638 317.912 288.414 329.876 288.414 342L292 338.5Z"
            fill="url(#paint0_linear_105_1095)"
          />
        </G>
        <G
          style={{ mixBlendMode: "plus-lighter" }}
          filter="url(#filter2_f_105_1095)"
        >
          <Path
            d="M135.521 323.5C133.521 338.5 132.788 348.115 139.108 361C145.428 373.884 149.633 385.547 160.982 394.331C172.33 403.116 185.464 405.11 199.521 408C215.521 405.5 221.128 405.096 235.021 401.5L238.423 396.879C226.686 399.918 214.409 400.228 202.533 397.787C190.657 395.346 179.497 390.219 169.91 382.797C160.323 375.376 152.562 365.858 147.223 354.972C141.884 344.087 139.108 332.124 139.108 320L135.521 323.5Z"
            fill="url(#paint1_linear_105_1095)"
          />
        </G>
        <Rect
          x="133.5"
          y="251.5"
          width="163"
          height="163"
          rx="81.5"
          stroke="black"
          stroke-width="3"
        />
        <Rect
          x="134.5"
          y="252.5"
          width="161"
          height="161"
          rx="80.5"
          stroke="white"
        />
        <G filter="url(#filter3_d_105_1095)">
          <Circle
            cx="215"
            cy="333"
            r="80"
            fill="url(#paint2_linear_105_1095)"
          />
        </G>
        <G filter="url(#filter4_dii_105_1095)">
          <Path
            d="M199.778 343.153L182.814 328.016C181.563 326.9 179.687 326.854 178.383 327.907L171.835 333.194C170.256 334.469 170.126 336.829 171.555 338.27L200.871 367.831C202.273 369.244 204.579 369.169 205.886 367.668L257.871 307.951C259.162 306.468 258.942 304.205 257.389 302.998L250.137 297.361C248.723 296.262 246.7 296.438 245.498 297.765L204.596 342.897C203.333 344.291 201.182 344.405 199.778 343.153Z"
            fill="url(#paint3_linear_105_1095)"
          />
          <Path
            d="M199.778 343.153L182.814 328.016C181.563 326.9 179.687 326.854 178.383 327.907L171.835 333.194C170.256 334.469 170.126 336.829 171.555 338.27L200.871 367.831C202.273 369.244 204.579 369.169 205.886 367.668L257.871 307.951C259.162 306.468 258.942 304.205 257.389 302.998L250.137 297.361C248.723 296.262 246.7 296.438 245.498 297.765L204.596 342.897C203.333 344.291 201.182 344.405 199.778 343.153Z"
            stroke="white"
            stroke-width="0.142703"
          />
        </G>
        <Path
          d="M199.55 344.738L182.694 328.923C181.401 327.71 179.397 327.684 178.073 328.862L173.122 333.269C171.662 334.568 171.584 336.824 172.95 338.221L200.707 366.617C202.108 368.051 204.436 367.979 205.747 366.463L255.994 308.343C257.227 306.917 257.076 304.763 255.656 303.523L250.837 299.314C249.441 298.095 247.329 298.207 246.071 299.566L204.407 344.567C203.116 345.962 200.936 346.038 199.55 344.738Z"
          fill="url(#paint4_linear_105_1095)"
          stroke="white"
          stroke-width="0.142703"
        />
      </G>
      <Defs>
        <Filter
          id="filter0_dddddd_105_1095"
          x="-131"
          y="-13"
          width="692"
          height="692"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <FeOffset />
          <FeGaussianBlur stdDeviation="4.8384" />
          <FeColorMatrix
            type="matrix"
            values="0 0 0 0 0.113725 0 0 0 0 0.286275 0 0 0 0 0.258824 0 0 0 1 0"
          />
          <FeBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_105_1095"
          />
          <FeColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <FeOffset />
          <FeGaussianBlur stdDeviation="9.6768" />
          <FeColorMatrix
            type="matrix"
            values="0 0 0 0 0.113725 0 0 0 0 0.286275 0 0 0 0 0.258824 0 0 0 1 0"
          />
          <FeBlend
            mode="normal"
            in2="effect1_dropShadow_105_1095"
            result="effect2_dropShadow_105_1095"
          />
          <FeColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <FeOffset />
          <FeGaussianBlur stdDeviation="33.8688" />
          <FeColorMatrix
            type="matrix"
            values="0 0 0 0 0.113725 0 0 0 0 0.286275 0 0 0 0 0.258824 0 0 0 1 0"
          />
          <FeBlend
            mode="normal"
            in2="effect2_dropShadow_105_1095"
            result="effect3_dropShadow_105_1095"
          />
          <FeColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <FeOffset />
          <FeGaussianBlur stdDeviation="67.7376" />
          <FeColorMatrix
            type="matrix"
            values="0 0 0 0 0.113725 0 0 0 0 0.286275 0 0 0 0 0.258824 0 0 0 1 0"
          />
          <FeBlend
            mode="normal"
            in2="effect3_dropShadow_105_1095"
            result="effect4_dropShadow_105_1095"
          />
          <FeColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <FeOffset />
          <FeGaussianBlur stdDeviation="116.122" />
          <FeColorMatrix
            type="matrix"
            values="0 0 0 0 0.113725 0 0 0 0 0.286275 0 0 0 0 0.258824 0 0 0 1 0"
          />
          <FeBlend
            mode="normal"
            in2="effect4_dropShadow_105_1095"
            result="effect5_dropShadow_105_1095"
          />
          <FeColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <FeOffset />
          <FeGaussianBlur stdDeviation="125" />
          <FeColorMatrix
            type="matrix"
            values="0 0 0 0 0.113725 0 0 0 0 0.286275 0 0 0 0 0.258824 0 0 0 1 0"
          />
          <FeBlend
            mode="normal"
            in2="effect5_dropShadow_105_1095"
            result="effect6_dropShadow_105_1095"
          />
          <FeBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect6_dropShadow_105_1095"
            result="shape"
          />
        </Filter>
        <Filter
          id="filter1_f_105_1095"
          x="161.099"
          y="226"
          width="160.324"
          height="144"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <FeGaussianBlur
            stdDeviation="14"
            result="effect1_foregroundBlur_105_1095"
          />
        </Filter>
        <Filter
          id="filter2_f_105_1095"
          x="106.099"
          y="292"
          width="160.324"
          height="144"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <FeGaussianBlur
            stdDeviation="14"
            result="effect1_foregroundBlur_105_1095"
          />
        </Filter>
        <Filter
          id="filter3_d_105_1095"
          x="131"
          y="249"
          width="168"
          height="168"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <FeOffset />
          <FeGaussianBlur stdDeviation="2" />
          <FeComposite in2="hardAlpha" operator="out" />
          <FeColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <FeBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_105_1095"
          />
          <FeBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_105_1095"
            result="shape"
          />
        </Filter>
        <Filter
          id="filter4_dii_105_1095"
          x="169.919"
          y="295.142"
          width="89.4354"
          height="74.9155"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <FeOffset dy="0.570811" />
          <FeGaussianBlur stdDeviation="0.285405" />
          <FeComposite in2="hardAlpha" operator="out" />
          <FeColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <FeBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_105_1095"
          />
          <FeBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_105_1095"
            result="shape"
          />
          <FeColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <FeOffset dy="1.14162" />
          <FeGaussianBlur stdDeviation="0.856216" />
          <FeComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <FeColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"
          />
          <FeBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_105_1095"
          />
          <FeColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <FeOffset dy="-1.85514" />
          <FeGaussianBlur stdDeviation="0.713514" />
          <FeComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <FeColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <FeBlend
            mode="normal"
            in2="effect2_innerShadow_105_1095"
            result="effect3_innerShadow_105_1095"
          />
        </Filter>
        <LinearGradient
          id="paint0_linear_105_1095"
          x1="206.066"
          y1="248"
          x2="303"
          y2="340"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#B451FF" />
          <Stop offset="1" stopColor="#0C51FF" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_105_1095"
          x1="221.455"
          y1="414"
          x2="124.521"
          y2="322"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFD651" />
          <Stop offset="1" stopColor="#0CFF55" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_105_1095"
          x1="283.75"
          y1="273.75"
          x2="131.25"
          y2="389.75"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#42E6CA" />
          <Stop offset="0.35" stopColor="#42E6CA" />
          <Stop offset="0.499036" stopColor="white" />
          <Stop offset="0.65" stopColor="#4FFCA6" />
          <Stop offset="1" stopColor="#4FFCA6" />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_105_1095"
          x1="214.566"
          y1="295.412"
          x2="214.566"
          y2="370.448"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#1A3731" />
          <Stop offset="1" stopColor="#000504" />
        </LinearGradient>
        <LinearGradient
          id="paint4_linear_105_1095"
          x1="214.332"
          y1="297.125"
          x2="214.332"
          y2="369.281"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#1A3731" />
          <Stop offset="1" stopColor="#000504" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

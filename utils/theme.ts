export const typography = {
  fontFamily: {
    light: 'Gilroy-Light',
    regular: 'Gilroy-Regular',
    medium: 'Gilroy-Medium',
    bold: 'Gilroy-Bold',
    heavy: 'Gilroy-Heavy',
    mono: 'SpaceMono-Regular',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    xxxxl: 32,
  },
};

export const createTextStyle = (
  fontFamily: keyof typeof typography.fontFamily = 'regular',
  fontSize: keyof typeof typography.fontSize = 'md',
  color: string = '#000000'
) => {
  return {
    fontFamily: typography.fontFamily[fontFamily],
    fontSize: typography.fontSize[fontSize],
    color,
  };
}; 
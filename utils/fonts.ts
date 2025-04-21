import * as Font from 'expo-font';

export const fonts = {
  'Gilroy-Light': require('../assets/fonts/Gilroy-Light.ttf'),
  'Gilroy-Regular': require('../assets/fonts/Gilroy-Regular.ttf'),
  'Gilroy-Medium': require('../assets/fonts/Gilroy-Medium.ttf'),
  'Gilroy-Bold': require('../assets/fonts/Gilroy-Bold.ttf'),
  'Gilroy-Heavy': require('../assets/fonts/Gilroy-Heavy.ttf'),
  'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
};

export const loadFonts = () => {
  return Font.loadAsync(fonts);
}; 
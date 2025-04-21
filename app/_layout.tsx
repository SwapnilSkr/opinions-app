import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { loadFonts } from "../utils/fonts";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        await loadFonts();
        // Tell the application to render
        setFontsLoaded(true);
      } catch (e) {
        console.warn(e);
      } finally {
        // Hide splash screen
        await SplashScreen.hideAsync();
      }
    }
    
    prepare();
  }, []);

  if (!fontsLoaded) {
    return <View />;
  }
  
  return <Stack screenOptions={{ headerShown: false }} />;
}

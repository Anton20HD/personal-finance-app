import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return (
    //Gömmer den specifika routen som du är inne på
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

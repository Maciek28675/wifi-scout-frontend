import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    'Neotriad': require('../assets/fonts/Neotriad.otf')
  })
  
  if (!fontsLoaded) {
    return null; 
  }

  return(
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{headerShown: false}}/>
        <Stack.Screen name="(logged-in)" options={{headerShown: false}}/>
      </Stack>
    </AuthProvider>
  );
}

import { Stack } from 'expo-router';
import { ThemeProvider } from '@/app/context/ThemeContext';

export default function LoggedInLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

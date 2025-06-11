import { Stack } from 'expo-router';

export default function LoggedInLayout() {

    // Check if authenticated
    
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen
                name="modal"
                options={{
                    presentation: 'transparentModal',
                    animation: 'fade',
                    headerShown: false,
                }}
            />
        </Stack>
    )
}
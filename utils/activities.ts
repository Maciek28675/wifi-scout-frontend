import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';
const ACTIVITIES_KEY = 'latest_activities'

export interface Activity {
    latitude: number,
    longitude: number,
    height?: number | null,
    download_speed: number,
    upload_speed: number,
    ping: number,
    color: string,
    building: string,
    timestamp: Date
}

export async function getActivities(): Promise<Activity[]> {
    try {
        const jsonValue = await AsyncStorage.getItem(ACTIVITIES_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : []
    }
    catch (e) {
        console.error('Failed to load activities', e);
        return [];
    }
}

export async function addActivity(newActivity: Activity) {
    try {
        const activites: Array<Activity> = await getActivities();
        activites.push(newActivity)

        if (activites.length > 10) {
            activites.shift();
        }

        await AsyncStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activites));
    }
    catch (e) {
        console.error('Failed to save activity', e);
    }
}

export async function clearActivities() {
    try {
        await AsyncStorage.removeItem(ACTIVITIES_KEY);
        console.log('Activities cleared.');
    } catch (e) {
        console.error('Failed to clear activities', e);
    }
}


export async function getActivitiesLength() {
  const activities = await getActivities();
  return activities.length;
}
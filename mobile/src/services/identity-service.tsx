import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth, TempoAuth } from '@src/types/api/session';

const AUTH_TOKEN_KEY = 'AUTH';



export const setAuth = async (auth: Auth | TempoAuth): Promise<void> => {
    try {
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(auth));
    } catch (error) {
        console.error('Error setting auth token:', error);
    }
};

export const getAuth = async (): Promise<Auth | TempoAuth | null> => {
    try {
        const auth = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
        return auth ? JSON.parse(auth) : null;
    } catch (error) {
        console.error('Error getting auth token:', error);
        return null;
    }
};

export const removeAuth = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    } catch (error) {
        console.error('Error removing auth token:', error);
    }
};

export const isAuthenticated = async (): Promise<boolean> => {
    const auth = await getAuth();
    return !!auth;
};
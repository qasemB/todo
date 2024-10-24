import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeStringData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        // saving error
    }
};

export const storeObjectData = async (key: string, value: object) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        // saving error
    }
};

export const getStringData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value
    } catch (e) {
        // error reading value
    }
};

const getObjectData = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
};
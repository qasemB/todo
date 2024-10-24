import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from "react";
SplashScreen.preventAutoHideAsync();

const loadFonts = () => {
    return Font.loadAsync({
        'irsans': require('../assets/fonts/IRANSansXFaNum-Medium.ttf'),
    });
};
export const useCustomFont = () => {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function loadAssets() {
            try { await loadFonts(); }
            catch (e) { console.warn(e); }
            finally { setFontLoaded(true); await SplashScreen.hideAsync(); }
        }
        loadAssets();
    }, []);

    return fontLoaded
}
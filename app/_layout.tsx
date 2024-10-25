import { useCustomFont } from "@/hooks/useCustomFont";
import { Stack } from "expo-router";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

const MainLayout = () => {
  const fontLoaded = useCustomFont()

  if (!fontLoaded) { return null; }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Stack screenOptions={{ headerShown: false, contentStyle: styles.allScreens }} />
    </SafeAreaView>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, paddingTop: StatusBar.currentHeight },
  allScreens: { backgroundColor: "#ffffff00" }
})





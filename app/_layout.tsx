import { useCustomFont } from "@/hooks/useCustomFont";
import { Stack } from "expo-router";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient();

const MainLayout = () => {
  const fontLoaded = useCustomFont()

  if (!fontLoaded) { return null; }

  return (

    <QueryClientProvider client={queryClient}>

      <SafeAreaView style={styles.mainContainer}>
        <Stack screenOptions={{ headerShown: false, contentStyle: styles.allScreens }} />
      </SafeAreaView>
    </QueryClientProvider>

  );
};

export default MainLayout;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, paddingTop: StatusBar.currentHeight },
  allScreens: { backgroundColor: "#ffffff00" }
})





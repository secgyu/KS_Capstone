import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import queryClient from "./api/queryClient";
import RootNavigator from "./navigations/root/RootNavigator";
import Toast, { BaseToast, BaseToastProps, ErrorToast } from "react-native-toast-message";
import { colors } from "./constants";
import useThemeStorage from "./hooks/useThemeStorage";
import { StatusBar } from "react-native";
import { hideAsync, preventAutoHideAsync, setOptions } from "expo-splash-screen";

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors["light"].BLUE_500 }}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: colors["light"].RED_500 }}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
};

hideAsync();
// setOptions({
//   duration: 1000,
//   fade: true,
// });

function App() {
  const { theme } = useThemeStorage();
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle={theme === "light" ? "dark-content" : "light-content"} />
      <NavigationContainer>
        <RootNavigator />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;

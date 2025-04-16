import React, { Suspense } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import FeedList from "@/components/feed/FeedList";
import Loader from "@/components/common/Loader";
import RetryErrorBoundary from "@/components/common/RetryErrorBoundary";
import { useTheme } from "@react-navigation/native";
import { ThemeMode } from "@/types";
import useThemeStore from "@/store/useThemeStore";

function FeedHomeScreen() {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  return (
    <SafeAreaView style={styles.container}>
      <RetryErrorBoundary>
        <Suspense fallback={<Loader />}>
          <FeedList />
        </Suspense>
      </RetryErrorBoundary>
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === "dark" ? "black" : "white",
    },
  });

export default FeedHomeScreen;

import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { colors } from "@/constants";
import FeedSearchList from "@/components/feed/FeedSearchList";
import { ThemeMode } from "@/types";
import useThemeStore from "@/store/useThemeStore";

function FeedSearchScreen() {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  return (
    <SafeAreaView style={styles.container}>
      <FeedSearchList />
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
  });

export default FeedSearchScreen;

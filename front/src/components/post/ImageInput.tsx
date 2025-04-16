import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { ThemeMode } from "@/types";
import useThemeStore from "@/store/useThemeStore";

interface ImageInputProps {
  onChange: () => void;
}

function ImageInput({ onChange }: ImageInputProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  return (
    <Pressable style={({ pressed }) => [pressed && styles.imageInputPressed, styles.imageInput]} onPress={onChange}>
      <Ionicons name="camera-outline" size={20} color={colors[theme].GRAY_500} />
      <Text style={styles.inputText}>사진 추가</Text>
    </Pressable>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    imageInput: {
      borderWidth: 1.5,
      borderStyle: "dotted",
      borderColor: colors[theme].GRAY_300,
      height: 70,
      width: 70,
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
    },
    imageInputPressed: {
      opacity: 0.5,
    },
    inputText: {
      fontSize: 12,
      color: colors[theme].GRAY_500,
    },
  });

export default ImageInput;

import React from "react";
import { Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "@/constants";
import { ThemeMode } from "@/types";
import useThemeStore from "@/store/useThemeStore";

interface DatePickerOptionProps {
  isVisible: boolean;
  date: Date;
  onChangeDate: (date: Date) => void;
  onConfirmDate: () => void;
}

function DatePickerOption({ isVisible, date, onChangeDate, onConfirmDate }: DatePickerOptionProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <SafeAreaView style={[styles.optionBackground, styles.dimmed]}>
        <View style={styles.optionContainer}>
          <View style={styles.pickerContainer}>
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              textColor="black"
              locale="ko"
              onChange={(event, selectedDate) => {
                // Android에서는 사용자가 취소하면 selectedDate가 undefined가 될 수 있음
                if (selectedDate) {
                  onChangeDate(selectedDate);
                }
              }}
            />
          </View>
        </View>
        <View style={styles.optionContainer}>
          <Pressable style={styles.optionButton} onPress={onConfirmDate}>
            <Text style={styles.optionText}>확인</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    pickerContainer: {
      alignItems: "center",
    },
    optionBackground: {
      flex: 1,
      justifyContent: "flex-end",
    },
    dimmed: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    optionContainer: {
      borderRadius: 15,
      marginHorizontal: 10,
      marginBottom: 10,
      backgroundColor: colors[theme].GRAY_100,
      overflow: "hidden",
    },
    optionButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 50,
      gap: 5,
    },
    optionText: {
      fontSize: 17,
      color: colors[theme].BLUE_500,
      fontWeight: "500",
    },
  });

export default DatePickerOption;

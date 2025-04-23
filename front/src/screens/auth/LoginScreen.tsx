import React, { useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import InputField from "@/components/common/InputField";
import CustomButton from "@/components/common/CustomButton";
import useForm from "@/hooks/useForm";
import useAuth from "@/hooks/queries/useAuth";
import { validateLogin } from "@/utils";
import { colors, errorMessages } from "@/constants";
import { ThemeMode } from "@/types";
import useThemeStore from "@/store/useThemeStore";

function LoginScreen() {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const { loginMutation } = useAuth();
  const passwordRef = useRef<TextInput | null>(null);
  const login = useForm({
    initialValue: { email: "", password: "" },
    validate: validateLogin,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    loginMutation.mutate(login.values, {
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: error.response?.data.message || error.message + error.stack || errorMessages.UNEXPECT_ERROR,
          position: "bottom",
          visibilityTime: 2000,
        });
        setErrorMessage(error.response?.data.message || error.message + error.stack || errorMessages.UNEXPECT_ERROR);
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={login.errors.email}
          touched={login.touched.email}
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...login.getTextInputProps("email")}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          error={login.errors.password}
          touched={login.touched.password}
          secureTextEntry
          returnKeyType="join"
          onSubmitEditing={handleSubmit}
          {...login.getTextInputProps("password")}
        />
        <ScrollView>
          <View>
            <Text>에러메시지 : {errorMessage}</Text>
          </View>
        </ScrollView>
      </View>
      <CustomButton label="로그인" variant="filled" size="large" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      margin: 30,
      backgroundColor: colors[theme].WHITE,
    },
    inputContainer: {
      gap: 20,
      marginBottom: 30,
    },
  });

export default LoginScreen;

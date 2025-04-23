import React, { useRef, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import InputField from "@/components/common/InputField";
import CustomButton from "@/components/common/CustomButton";
import useForm from "@/hooks/useForm";
import useAuth from "@/hooks/queries/useAuth";
import { validateSignup } from "@/utils";
import { errorMessages } from "@/constants";
import { Text } from "react-native";
import { ScrollView } from "react-native";
import axios from "axios";

function formatAxiosError(error: Error) {
  if (axios.isAxiosError(error)) {
    const url = error.config?.url;
    const method = error.config?.method;
    const serverData = error.response?.data;

    return JSON.stringify(
      {
        where: `${method?.toUpperCase()} ${url}`,
        status: `res:${error.response?.status}, stat:${error.status}`,
        code: error.code,
        cause: error.cause,
        message: `serverMessage:${serverData?.message}\n\n` + `serverData:${serverData}` + `errorMSG:${error.message}`,
        // dev only
        stack: process.env.NODE_ENV === "development" ? error.stack : error.stack,
        // 필요 시 서버 validation errors
        errors: serverData?.errors,
      },
      null,
      2
    );
  } else {
    // AxiosError 가 아닐 때
    return error.toString();
  }
}

function SignupScreen() {
  const { signupMutation, loginMutation } = useAuth();
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const signup = useForm({
    initialValue: { email: "", password: "", passwordConfirm: "" },
    validate: validateSignup,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = () => {
    const { email, password } = signup.values;
    signupMutation.mutate(
      { email, password },
      {
        onSuccess: () => loginMutation.mutate({ email, password }),
        onError: (error) => {
          Toast.show({
            type: "error",
            text1: error.response?.data.message || error.message + error.stack || errorMessages.UNEXPECT_ERROR,
            position: "bottom",
            visibilityTime: 2000,
          });
          setErrorMessage(formatAxiosError(error));
        },
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={signup.errors.email}
          touched={signup.touched.email}
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...signup.getTextInputProps("email")}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          textContentType="oneTimeCode"
          error={signup.errors.password}
          touched={signup.touched.password}
          secureTextEntry
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...signup.getTextInputProps("password")}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          error={signup.errors.passwordConfirm}
          touched={signup.touched.passwordConfirm}
          secureTextEntry
          returnKeyType="join"
          onSubmitEditing={handleSubmit}
          {...signup.getTextInputProps("passwordConfirm")}
        />
      </View>
      <ScrollView>
        <View>
          <Text>에러메시지 : {errorMessage}</Text>
        </View>
      </ScrollView>
      <CustomButton label="회원가입" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default SignupScreen;

import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Dimensions, Image, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { AuthStackParamList } from "@/navigations/stack/AuthStackNavigator";
import CustomButton from "@/components/common/CustomButton";
import { authNavigations, colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import { ThemeMode } from "@/types";
import useThemeStore from "@/store/useThemeStore";

type Props = StackScreenProps<AuthStackParamList, typeof authNavigations.AUTH_HOME>;

function AuthHomeScreen({ navigation }: Props) {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const { appleLoginMutation } = useAuth();

  const handlePressAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      });

      if (credential.identityToken) {
        appleLoginMutation.mutate({
          identityToken: credential.identityToken,
          appId: "com.company.matzipapp",
          nickname: credential.fullName?.givenName ?? null,
        });
      }
    } catch (error: any) {
      if (error.code !== "ERR_CANCELED") {
        Toast.show({
          type: "error",
          text1: "애플 로그인이 실패했습니다.",
          text2: "나중에 다시 시도해주세요.",
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image resizeMode="contain" style={styles.image} source={require("@/assets/matzip.png")} />
      </View>

      <View style={styles.buttonContainer}>
        {Platform.OS === "ios" && (
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={5}
            style={styles.appleButton}
            onPress={handlePressAppleLogin}
          />
        )}

        <CustomButton
          label="카카오 로그인하기"
          onPress={() => navigation.navigate(authNavigations.KAKAO)}
          style={styles.kakaoButtonContainer}
          textStyle={styles.kakaoButtonText}
          icon={<Ionicons name="chatbubble-sharp" color="#181500" size={16} />}
        />

        <CustomButton
          label="이메일 로그인하기"
          onPress={() => {
            navigation.navigate(authNavigations.LOGIN);
          }}
        />

        <Pressable onPress={() => navigation.navigate(authNavigations.SIGNUP)}>
          <Text style={styles.emailText}>이메일로 가입하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: { flex: 1, alignItems: "center", margin: 30 },
    imageContainer: {
      flex: 1.5,
      width: Dimensions.get("screen").width / 2,
    },
    image: { width: "100%", height: "100%" },
    buttonContainer: { flex: 1, alignItems: "center", gap: 10 },
    kakaoButtonContainer: { backgroundColor: "#FEE503" },
    kakaoButtonText: { color: "#181600" },
    emailText: {
      textDecorationLine: "underline",
      fontWeight: "500",
      padding: 10,
      color: colors[theme].BLACK,
    },
    appleButton: {
      width: Dimensions.get("screen").width - 60,
      height: 45,
    },
  });

export default AuthHomeScreen;

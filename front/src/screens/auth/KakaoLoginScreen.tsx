import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import useThemeStore from "@/store/useThemeStore";
import { ThemeMode } from "@/types";
import axios from "axios";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native";
import { ActivityIndicator, Dimensions, Platform, SafeAreaView, StyleSheet, View } from "react-native";
// import Config from "react-native-config";
import WebView, { WebViewNavigation } from "react-native-webview";

// 리다이렉트 URI (iOS와 Android에서 각각 다른 로컬 주소 사용)
const REDIRECT_URI = `${
  Platform.OS === "ios" ? `${process.env.EXPO_PUBLIC_API_URL}` : `${process.env.EXPO_PUBLIC_API_URL}`
}/auth/oauth/kakao`;
console.log("kakao redirect uri", REDIRECT_URI);
const Config = { KAKAO_REST_API_KEY: process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY };

function KakaoLoginScreen() {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const { kakaoLoginMutation } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  // 토큰 요청을 한 번만 수행하기 위한 플래그
  const [hasRequestedToken, setHasRequestedToken] = useState(false);

  // 웹뷰 내비게이션 상태가 변경될 때마다 호출
  const handleNavigationChangeState = (event: WebViewNavigation) => {
    // 리다이렉트 URI에 코드가 포함된 경우
    if (!hasRequestedToken && event.url.includes(`${REDIRECT_URI}?code=`)) {
      setHasRequestedToken(true); // 중복 요청 방지
      const code = event.url.replace(`${REDIRECT_URI}?code=`, "");
      requestToken(code);
    }
    // 로딩 상태 업데이트 (event.loading이 true면 페이지가 로딩 중)
    setIsLoading(event.loading);
  };

  // 카카오 토큰 요청 함수
  const requestToken = async (code: string) => {
    console.log("카카오 로그인 진입, code:", code);
    try {
      const response = await axios({
        method: "post",
        url: "https://kauth.kakao.com/oauth/token",
        params: {
          grant_type: "authorization_code",
          client_id: Config.KAKAO_REST_API_KEY,
          redirect_uri: REDIRECT_URI,
          code,
        },
      });
      console.log("access token:", response.data.access_token);
      kakaoLoginMutation.mutate(response.data.access_token);
    } catch (e) {
      const error = e as Error;
      console.error("토큰 요청 에러:", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <View style={styles.kakaoLoadingContainer}>
          <ActivityIndicator size="small" color={colors[theme].BLACK} />
        </View>
      )}
      <View>
        <Text>redirect_URI : {REDIRECT_URI}</Text>
      </View>
      <WebView
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        onNavigationStateChange={handleNavigationChangeState}
      />
    </SafeAreaView>
  );
}

// 일반 회원가입 : axios 에러가 뜨는데 보이질않음.
// 카카오 로그인 : https 원인 에러가 뜨는거같음.

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    kakaoLoadingContainer: {
      backgroundColor: colors[theme].WHITE,
      height: Dimensions.get("window").height,
      paddingBottom: 100,
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default KakaoLoginScreen;

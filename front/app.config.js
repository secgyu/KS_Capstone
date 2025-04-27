import "dotenv/config";
export default {
  expo: {
    name: "MatzipApp",
    slug: "MatzipApp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    scheme: "matzipapp",
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.company.matzipapp",
      usesAppleSignIn: true,
      infoPlist: {
        NSLocationWhenInUseUsageDescription: "앱 사용 중에 위치 정보를 사용합니다.",
        NSLocationAlwaysAndWhenInUseUsageDescription: "앱이 백그라운드에서도 위치 정보를 사용합니다.",
        NSPhotoLibraryUsageDescription: "앱에서 사진 라이브러리에 접근합니다.",
        NSPhotoLibraryAddUsageDescription: "앱에서 사진을 추가할 수 있도록 허용합니다.",
        NSUserNotificationUsageDescription: "앱에서 알림을 보내기 위해 권한이 필요합니다.",
        NSAppleMusicUsageDescription: "앱 내 오디오 재생 및 음원 라이브러리 접근을 위해 필요합니다.",
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: true,
          NSExceptionDomains: {
            "15.165.132.138:3030": {
              NSIncludesSubdomains: true,
              NSTemporaryExceptionAllowsInsecureHTTPLoads: true,
            },
          },
        },
      },
    },
    android: {
      package: "com.company.matzipapp",
      usesCleartextTraffic: true,
      permissions: ["ACCESS_COARSE_LOCATION", "ACCESS_FINE_LOCATION", "READ_MEDIA_IMAGES", "POST_NOTIFICATIONS"],
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
        },
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      "expo-asset",
      [
        "expo-build-properties",
        {
          android: {
            compileSdkVersion: 35,
            targetSdkVersion: 35,
            buildToolsVersion: "35.0.0",
            usesCleartextTraffic: true,
          },
          ios: {
            deploymentTarget: "15.1",
          },
        },
      ],
      [
        "expo-splash-screen",
        {
          backgroundColor: "#ffffff",
          image: "./assets/splash.png",
        },
      ],
      "react-native-edge-to-edge",
      "expo-secure-store",
      [
        "react-native-permissions",
        {
          iosPermissions: [
            "LocationAccuracy",
            "LocationAlways",
            "LocationWhenInUse",
            "MediaLibrary",
            "Notifications",
            "PhotoLibrary",
            "PhotoLibraryAddOnly",
          ],
        },
      ],
      [
        "expo-location",
        {
          locationWhenInUsePermission: "앱 사용 중에 위치 정보를 사용합니다.",
        },
      ],
      "expo-apple-authentication",
      "@react-native-community/datetimepicker",
    ],
    extra: {
      eas: {
        projectId: "286587b9-9118-4363-8b6b-f44ef310e310",
      },
    },
  },
};

import React from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

import useAuth from "@/hooks/queries/useAuth";
import { colors, mainNavigations, settingNavigations } from "@/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeMode } from "@/types";
import useThemeStore from "@/store/useThemeStore";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { getProfileQuery } = useAuth();
  const { email, nickname, imageUri, kakaoImageUri } = getProfileQuery.data || {};
  const { theme } = useThemeStore();
  const styles = styling(theme);

  const handlePressSetting = () => {
    props.navigation.navigate(mainNavigations.SETTING, {
      screen: settingNavigations.SETTING_HOME,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle={styles.contentContainer}>
        <View style={styles.userInfoContainer}>
          <Pressable style={styles.userImageContainer}>
            {/* 기본 이미지 */}
            {imageUri == null && kakaoImageUri == null && (
              <Image source={require("@/assets/user-default.png")} style={styles.userImage} />
            )}
            {/* 카카오 프로필 */}
            {imageUri == null && kakaoImageUri != null && (
              <Image
                source={{
                  // 192.168.0.8
                  uri: kakaoImageUri,
                }}
                style={styles.userImage}
              />
            )}
            {/* 직접 업로드한 프로필 */}
            {imageUri != null && (
              <Image
                source={{
                  uri: imageUri,
                }}
                style={styles.userImage}
              />
            )}
          </Pressable>

          <Text style={styles.nameText}>{nickname ?? email}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.bottomContainer}>
        <Pressable style={styles.bottomMenu} onPress={handlePressSetting}>
          <MaterialIcons name="settings" color={colors[theme].GRAY_700} size={18} />
          <Text style={styles.bottomMenuText}>설정</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: { flex: 1 },
    contentContainer: { backgroundColor: colors[theme].WHITE },
    userInfoContainer: {
      alignItems: "center",
      marginTop: 15,
      marginBottom: 30,
      marginHorizontal: 15,
    },
    userImageContainer: {
      width: 70,
      height: 70,
      borderRadius: 35,
      marginBottom: 10,
    },
    userImage: {
      width: "100%",
      height: "100%",
      borderRadius: 35,
    },
    nameText: { color: colors[theme].BLACK },
    bottomContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderTopWidth: 1,
      borderTopColor: colors[theme].GRAY_200,
    },
    bottomMenu: { flexDirection: "row", alignItems: "center", gap: 5 },
    bottomMenuText: {
      fontWeight: "600",
      fontSize: 15,
      color: colors[theme].GRAY_700,
    },
  });

export default CustomDrawerContent;

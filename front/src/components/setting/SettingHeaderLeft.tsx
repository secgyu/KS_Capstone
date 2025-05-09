import React from "react";
import HeaderButton from "../common/HeaderButton";
import { colors } from "@/constants";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { MainDrawerParamList } from "@/navigations/drawer/MainDrawerNavigator";
import { SettingStackParamList } from "@/navigations/stack/SettingStackNavigator";
import { Ionicons } from "@expo/vector-icons";
import useThemeStore from "@/store/useThemeStore";

type SettingHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<SettingStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function SettingHeaderLeft(navigation: SettingHeaderLeftProps) {
  const { theme } = useThemeStore();
  return (
    <HeaderButton
      icon={<Ionicons name="menu" color={colors[theme].BLACK} size={25} />}
      onPress={() => navigation.openDrawer()}
    />
  );
}

export default SettingHeaderLeft;

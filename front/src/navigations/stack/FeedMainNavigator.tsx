import React from "react";
import { colors, feedMainNavigations, feedNavigations } from "@/constants";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator, { FeedTabParamList } from "../tab/FeedTabNavigator";
import FeedDetailScreen from "@/screens/feed/FeedDetailScreen";
import useThemeStorage from "@/hooks/useThemeStorage";
import { FeedStackParamList } from "./FeedStackNavigator";
import ImageZoomScreen from "@/screens/feed/ImageZoomScreen";

export type FeedMainStackParamList = {
  [feedMainNavigations.FEED_WRAPPER_MAIN]: FeedTabParamList;
  [feedMainNavigations.FEED_DETAIL]: { id: number };
  [feedMainNavigations.IMAGE_ZOOM]: { index: number };
};

const Stack = createStackNavigator<FeedMainStackParamList>();

export function FeedMainNavigator() {
  const { theme } = useThemeStorage();
  return (
    <Stack.Navigator initialRouteName={feedMainNavigations.FEED_WRAPPER_MAIN} screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={feedMainNavigations.FEED_DETAIL}
        component={FeedDetailScreen}
        options={{
          headerShown: false,
          headerTitle: " ",
          cardStyle: {
            backgroundColor: colors[theme].GRAY_100,
          },
        }}
      />
      <Stack.Screen
        name={feedMainNavigations.IMAGE_ZOOM}
        component={ImageZoomScreen}
        options={{
          headerTitle: " ",
          headerShown: false,
        }}
      />
      <Stack.Screen name={feedMainNavigations.FEED_WRAPPER_MAIN} component={TabNavigator} />
    </Stack.Navigator>
  );
}

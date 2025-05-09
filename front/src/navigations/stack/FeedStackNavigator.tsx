import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LatLng } from "react-native-maps";
import { colors, feedNavigations } from "@/constants";
import FeedHomeScreen from "@/screens/feed/FeedHomeScreen";
import FeedDetailScreen from "@/screens/feed/FeedDetailScreen";
import EditPostScreen from "@/screens/feed/EditPostScreen";
import FeedHomeHeaderLeft from "@/components/feed/FeedHomeHeaderLeft";
import ImageZoomScreen from "@/screens/feed/ImageZoomScreen";
import useThemeStore from "@/store/useThemeStore";

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  [feedNavigations.EDIT_POST]: { location: LatLng };
};

const Stack = createStackNavigator<FeedStackParamList>();

function FeedStackNavigator() {
  const { theme } = useThemeStore();

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors[theme].WHITE,
        },
        headerStyle: {
          shadowColor: colors[theme].GRAY_200,
          backgroundColor: colors[theme].WHITE,
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: colors[theme].BLACK,
      }}
    >
      <Stack.Screen
        name={feedNavigations.FEED_HOME}
        component={FeedHomeScreen}
        options={({ navigation }) => ({
          headerTitle: "피드",
          headerLeft: () => FeedHomeHeaderLeft(navigation),
        })}
      />

      <Stack.Screen
        name={feedNavigations.EDIT_POST}
        component={EditPostScreen}
        options={{
          headerTitle: "장소 수정",
        }}
      />
    </Stack.Navigator>
  );
}

export default FeedStackNavigator;

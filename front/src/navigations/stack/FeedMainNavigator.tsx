import React from 'react';
import {colors, feedNavigations} from '@/constants';
import {createStackNavigator} from '@react-navigation/stack';
import {TabNavigator} from '../tab/FeedTabNavigator';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';

export type FeedStackParamList = {
  ['Main']: undefined;
  [feedNavigations.FEED_DETAIL]: {id: number};
};

const Stack = createStackNavigator<FeedStackParamList>();

export function FeedMainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={feedNavigations.FEED_DETAIL}
        component={FeedDetailScreen}
        options={{
          headerShown: false,
          headerTitle: ' ',
          cardStyle: {
            backgroundColor: colors.GRAY_100,
          },
        }}
      />
      <Stack.Screen name={'Main'} component={TabNavigator} />
    </Stack.Navigator>
  );
}

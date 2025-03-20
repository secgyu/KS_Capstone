import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {colors, feedNavigations} from '@/constants';
import FeedFavoriteList from '@/components/feed/FeedFavoriteList';
import {createStackNavigator} from '@react-navigation/stack';

export type FeedStackParamList = {
  ['FAVORITE_HOME']: undefined;
  [feedNavigations.FEED_DETAIL]: {id: number};
};

const Stack = createStackNavigator<FeedStackParamList>();

function FeedFavoriteScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: 'white',
          },
          headerStyle: {
            shadowColor: 'gray',
            backgroundColor: 'white',
          },
          headerTitleStyle: {
            fontSize: 15,
          },
          headerTintColor: 'black',
        }}>
        <Stack.Screen
          name={'FAVORITE_HOME'}
          component={FeedFavoriteList}
          options={{
            headerShown: false,
            headerTitle: ' ',
            cardStyle: {
              backgroundColor: colors.GRAY_100,
            },
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
export default FeedFavoriteScreen;

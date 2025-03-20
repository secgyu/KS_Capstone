import React from 'react';
import HeaderButton from '../common/HeaderButton';
import {colors} from '@/constants';
import Ionicons from '@react-native-vector-icons/ionicons';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';

export type FeedHomeHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function FeedHomeHeaderLeft(navigation: FeedHomeHeaderLeftProps) {
  // return (
  //   <Pressable
  //     style={styles.drawerIconContainer}
  //     onPress={() => navigation.openDrawer()}>
  //     <Ionicons name={'menu'} color={colors.BLACK} size={25} />
  //   </Pressable>
  // );
  return (
    <HeaderButton
      icon={<Ionicons name="menu" color={colors.BLACK} size={25} />}
      onPress={() => navigation.openDrawer()}
    />
  );
}

export default FeedHomeHeaderLeft;

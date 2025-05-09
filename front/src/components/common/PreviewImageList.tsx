import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, View, Platform } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { ImageUri, ThemeMode } from "@/types";
import { colors, feedMainNavigations, feedNavigations } from "@/constants";
import { FeedStackParamList } from "@/navigations/stack/FeedStackNavigator";
import { Ionicons } from "@expo/vector-icons";
import useThemeStore from "@/store/useThemeStore";
import { FeedMainStackParamList } from "@/navigations/stack/FeedMainNavigator";

interface PreviewImageListProps {
  imageUris: ImageUri[];
  onDelete?: (uri: string) => void;
  onChangeOrder?: (fromIndex: number, toIndex: number) => void;
  showOption?: boolean;
  zoomEnable?: boolean;
}

function PreviewImageList({
  imageUris,
  onDelete,
  onChangeOrder,
  showOption = false,
  zoomEnable = false,
}: PreviewImageListProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<NavigationProp<FeedMainStackParamList>>();

  const handlePressImage = (index: number) => {
    if (zoomEnable) {
      navigation.navigate(feedMainNavigations.IMAGE_ZOOM, {
        index,
      });
    }
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {imageUris.map(({ uri }, index) => {
          return (
            <View key={uri} style={styles.imageContainer}>
              <Pressable onPress={() => handlePressImage(index)}>
                <Image
                  style={styles.image}
                  source={{
                    // 192.168.0.8
                    uri: uri,
                  }}
                  resizeMode="cover"
                />
                {showOption && (
                  <>
                    <Pressable
                      style={[styles.imageButton, styles.deleteButton]}
                      onPress={() => onDelete && onDelete(uri)}
                    >
                      <Ionicons name="close" size={16} color={colors[theme].WHITE} />
                    </Pressable>
                    {index > 0 && (
                      <Pressable
                        style={[styles.imageButton, styles.moveLeftButton]}
                        onPress={() => onChangeOrder && onChangeOrder(index, index - 1)}
                      >
                        <Ionicons name="arrow-back-outline" size={16} color={colors[theme].WHITE} />
                      </Pressable>
                    )}
                    {index < imageUris.length - 1 && (
                      <Pressable
                        style={[styles.imageButton, styles.moveRightButton]}
                        onPress={() => onChangeOrder && onChangeOrder(index, index + 1)}
                      >
                        <Ionicons name="arrow-forward-outline" size={16} color={colors[theme].WHITE} />
                      </Pressable>
                    )}
                  </>
                )}
              </Pressable>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      paddingHorizontal: 15,
      gap: 15,
    },
    imageContainer: {
      width: 70,
      height: 70,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    imageButton: {
      position: "absolute",
      backgroundColor: colors[theme].BLACK,
      zIndex: 1,
    },
    deleteButton: {
      top: 0,
      right: 0,
    },
    moveLeftButton: {
      bottom: 0,
      left: 0,
    },
    moveRightButton: {
      bottom: 0,
      right: 0,
    },
  });

export default PreviewImageList;

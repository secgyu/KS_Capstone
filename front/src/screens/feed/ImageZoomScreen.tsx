import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import ImageCarousel from "@/components/common/ImageCarousel";
import { feedNavigations } from "@/constants";
import { FeedStackParamList } from "@/navigations/stack/FeedStackNavigator";
import useDetailPostStore from "@/store/useDetailPostStore";

type ImageZoomScreenProps = StackScreenProps<FeedStackParamList, typeof feedNavigations.IMAGE_ZOOM>;

function ImageZoomScreen({ route }: ImageZoomScreenProps) {
  const { index } = route.params;
  const { detailPost } = useDetailPostStore();

  return <ImageCarousel images={detailPost?.images ?? []} pressedIndex={index} />;
}

export default ImageZoomScreen;

import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

import useMutateImages from './queries/useMutateImages';
import type { ImageUri } from '@/types';
import { getFormDataImages } from '@/utils';

interface UseImagePickerProps {
  initialImages?: ImageUri[];
  mode?: 'multiple' | 'single';
  onSettled?: () => void;
}

function useImagePicker({
  initialImages = [],
  mode = 'multiple',
  onSettled,
}: UseImagePickerProps) {
  const [imageUris, setImageUris] = useState<ImageUri[]>(initialImages);
  const uploadImages = useMutateImages();

  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 5) {
      Alert.alert('이미지 개수 초과', '추가 가능한 이미지는 최대 5개입니다.');
      return;
    }
    setImageUris(prev => [...prev, ...uris.map(uri => ({ uri }))]);
  };

  const replaceImageUri = (uris: string[]) => {
    if (uris.length > 1) {
      Alert.alert('이미지 개수 초과', '추가 가능한 이미지는 최대 1개입니다.');
      return;
    }
    setImageUris([...uris.map(uri => ({ uri }))]);
  };

  const deleteImageUri = (uri: string) => {
    setImageUris(prev => prev.filter(img => img.uri !== uri));
  };

  const changeImageUrisOrder = (fromIndex: number, toIndex: number) => {
    const copy = [...imageUris];
    const [moved] = copy.splice(fromIndex, 1);
    copy.splice(toIndex, 0, moved);
    setImageUris(copy);
  };

  const handleChange = async () => {
    // 1) 권한 요청
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Toast.show({
        type: 'error',
        text1: '권한 거부',
        text2: '갤러리 접근 권한을 허용해주세요.',
        position: 'bottom',
      });
      return;
    }

    try {
      // 2) 갤러리 열기
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: mode === 'multiple',
        selectionLimit: mode === 'multiple' ? 5 : 1,
        quality: 1,
        base64: false,
      });

      // 3) 취소 처리
      if (result.canceled) {
        onSettled?.();
        return;
      }

      // 4) FormData 생성
      const assets = result.assets; // expo-image-picker Asset[]
      const formData = getFormDataImages('images', assets);

      // 5) 업로드 및 상태 업데이트
      uploadImages.mutate(formData, {
        onSuccess: data => {
          if (mode === 'multiple') addImageUris(data);
          else replaceImageUri(data);
        },
        onSettled: () => onSettled?.(),
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '갤러리를 열 수 없어요.',
        text2: '권한을 허용했는지 확인해주세요.',
        position: 'bottom',
      });
    }
  };

  return {
    imageUris,
    handleChange,
    delete: deleteImageUri,
    changeOrder: changeImageUrisOrder,
    isUploading: uploadImages.isPending,
  };
}

export default useImagePicker;

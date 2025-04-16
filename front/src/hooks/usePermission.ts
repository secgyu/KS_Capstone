import { useEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import { alerts } from '@/constants/messages';

type PermissionType = 'LOCATION' | 'PHOTO';

function usePermission(type: PermissionType) {
  useEffect(() => {
    (async () => {
      const isAndroid = Platform.OS === 'android';

      // 1) 현재 권한 상태 확인
      let permResponse: { status: string };
      if (type === 'LOCATION') {
        permResponse = await Location.getForegroundPermissionsAsync();
      } else {
        permResponse = await MediaLibrary.getPermissionsAsync();
      }
      const { status } = permResponse;

      // 2) 권한 거부 시 얼럿 띄우는 함수
      const showPermissonAlert = () => {
        Alert.alert(
          alerts[`${type}_PERMISSION`].TITLE,
          alerts[`${type}_PERMISSION`].DESCRIPTION,
          [
            { text: '설정하기', onPress: () => Linking.openSettings() },
            { text: '취소', style: 'cancel' },
          ]
        );
      };

      // 3) 권한이 없으면
      if (status !== 'granted') {
        if (isAndroid) {
          // Android: 바로 설정 유도
          showPermissonAlert();
          return;
        }
        // iOS: 권한 요청
        let reqResponse: { status: string };
        if (type === 'LOCATION') {
          reqResponse = await Location.requestForegroundPermissionsAsync();
        } else {
          reqResponse = await MediaLibrary.requestPermissionsAsync();
        }
        // 요청 후에도 허용 안 되면 설정 유도
        if (reqResponse.status !== 'granted') {
          showPermissonAlert();
        }
      }
    })();
  }, []);
}

export default usePermission;

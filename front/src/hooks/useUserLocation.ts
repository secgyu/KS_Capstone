import { useEffect, useState } from 'react';
import { LatLng } from 'react-native-maps';
import GeoLocation from '@react-native-community/geolocation';

function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.550263,
    longitude: 126.997083,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);

  useEffect(() => {
    GeoLocation.getCurrentPosition(
      info => {
        const { latitude, longitude } = info.coords;
        setUserLocation({ latitude, longitude });
        setIsUserLocationError(false);
      },
      () => {
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, []);

  return { userLocation, isUserLocationError };
}

export default useUserLocation;

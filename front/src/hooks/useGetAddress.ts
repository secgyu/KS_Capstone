import axios from 'axios';
import { useEffect, useState } from 'react';
import type { LatLng } from 'react-native-maps';
import { errorMessages } from '@/constants';

function useGetAddress(location: LatLng) {
  const { latitude, longitude } = location;
  const [result, setResult] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address|route|political&key=AIzaSyCL7M31j8IUVCp8FCgoLdQu7hB09jj00A4&language=ko`,
        );
        const address = data.results.length
          ? data.results[0].formatted_address
          : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

        setResult(address);
      } catch (e) {
        const error = e as Error;
        setResult('에러 발생 : ' + error.message + error.stack);
      }
    })();
  }, [latitude, longitude]);

  return result;
}

export default useGetAddress;
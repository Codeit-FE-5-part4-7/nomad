import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  address: string;
}

// const appKey = 'f7adb5c4574cc3a1412885d9f0aff326';

function Map({ address }: MapProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=f7adb5c4574cc3a1412885d9f0aff326&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
      const { kakao } = window;
      kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(37.56785, 126.9888), // 초기 중심 위치 (코드잇)
          level: 4,
        };
        const map = new kakao.maps.Map(container, options);

        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            const markerImageSrc = '/images/test_map_marker.png';
            const markerImageSize = new kakao.maps.Size(65, 90);
            const markerImageOptions = { offset: new kakao.maps.Point(27, 69) };
            const markerImage = new kakao.maps.MarkerImage(markerImageSrc, markerImageSize, markerImageOptions);

            const markerPosition = coords;
            const marker = new kakao.maps.Marker({
              map,
              position: markerPosition,
              image: markerImage,
            });
            marker.setMap(map);

            map.setCenter(coords);
            setLoading(false);
          }
        });
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [address]);

  return (
    <div className=' className="w-[79rem] h-[45rem] rounded-[1.6rem] md:w-full md:h-[27.6rem] sm:w-full sm:h-[45rem]'>
      <div id='map' className='w-full h-full' />
      {loading && <p className='absolute text-nomad-black text-[2rem]'>카카오 지도 API 연결 중...</p>}
    </div>
  );
}

export default Map;

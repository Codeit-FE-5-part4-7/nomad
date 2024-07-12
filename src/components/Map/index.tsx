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
          center: new kakao.maps.LatLng(37.56785, 126.9888), // 중심 위치 임의 설정 (코드잇)
          level: 4,
        };
        const map = new kakao.maps.Map(container, options);

        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 마커 이미지 설정
            const markerImageSrc = '/images/test_map_marker.png';
            const markerImageSize = new kakao.maps.Size(65, 90);
            const markerImageOptions = { offset: new kakao.maps.Point(27, 69) };
            const markerImage = new kakao.maps.MarkerImage(markerImageSrc, markerImageSize, markerImageOptions);

            // 마커 위치 임의 설정 (코드잇)
            const markerPosition = new kakao.maps.LatLng(37.56785, 126.9888);
            const marker = new kakao.maps.Marker({
              map,
              position: markerPosition,
              image: markerImage,
            });
            marker.setMap(map); // 수정하면서 마커 렌더링 안되는 이슈 발생

            // 커스텀 오버레이 수정중
            // const content = `
            //   <div class="customoverlay">
            //     <div class="overlay-inner">
            //       <span class="title"></span>
            //     </div>
            //   </div>
            // `;
            // const overlayPosition = new window.kakao.maps.LatLng(37.56785, 126.9888);
            // const customOverlay = new window.kakao.maps.CustomOverlay({
            //   map,
            //   position: overlayPosition,
            //   content,
            //   yAnchor: 1,
            // });

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
    <div className='relative flex items-center justify-center bg-[#fffff] border-[0.2rem] rounded-[0.8rem] w-[79rem] h-[47.6rem]'>
      <div id='map' className='w-full h-full' />
      {loading && <p className='absolute text-[#112211] text-[2rem]'>카카오 지도 API 연결 중...</p>}
    </div>
  );
}

export default Map;

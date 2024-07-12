import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

function Map() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = document.getElementById(`map`);
    const options = {
      center: new window.kakao.maps.LatLng(37.56785, 126.9888), // 중심 위치 임의 설정 (코드잇)
      level: 4,
    };

    const map = new window.kakao.maps.Map(container, options);

    const imageSrc = '/images/test_map_marker.png';
    const imageSize = new window.kakao.maps.Size(65, 90);
    const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    // 마커 위치 임의 설정 (코드잇)
    const markerPosition = new window.kakao.maps.LatLng(37.56785, 126.9888);

    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });
    marker.setMap(map);

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

    setLoading(false);
  }, []);

  return (
    <div className='relative flex items-center justify-center bg-[#fffff] border-[0.2rem] rounded-[0.8rem] w-[79rem] h-[47.6rem]'>
      <div id='map' className='w-full h-full' />
      {loading && <p className='absolute text-[#112211] text-[2rem]'>카카오 지도 API 연결 중...</p>}
    </div>
  );
}

export default Map;

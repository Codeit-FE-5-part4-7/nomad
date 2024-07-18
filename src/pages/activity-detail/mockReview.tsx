const mockReview = {
  averageRating: 4.5,
  totalCount: 4,
  reviews: [
    {
      id: 1,
      user: {
        profileImageUrl: '/images/test_kitty.png',
        nickname: '키티1',
        id: 1,
      },
      activityId: 101,
      rating: 5,
      content: '패러글라이딩 정말 최고였어요! 하늘을 나는 기분이 너무 짜릿했어요.',
      createdAt: '2024-07-15T08:30:00.000Z',
      updatedAt: '2024-07-16T10:20:00.000Z',
    },
    {
      id: 2,
      user: {
        profileImageUrl: '/images/test_kitty2.png',
        nickname: '키티2',
        id: 2,
      },
      activityId: 102,
      rating: 4,
      content: '서핑 수업 덕분에 새로운 취미를 찾았어요. 강사님도 친절하고 재미있었어요.',
      createdAt: '2024-07-12T09:15:00.000Z',
      updatedAt: '2024-07-14T11:30:00.000Z',
    },
    {
      id: 3,
      user: {
        profileImageUrl: '/images/test_kitty3.png',
        nickname: '키티3',
        id: 3,
      },
      activityId: 103,
      rating: 5,
      content: '하이킹 코스가 너무 아름다웠습니다. 자연과 함께하는 시간이 정말 힐링이었어요.',
      createdAt: '2024-07-10T07:45:00.000Z',
      updatedAt: '2024-07-11T08:50:00.000Z',
    },
    {
      id: 4,
      user: {
        profileImageUrl: '/images/test_kitty4.png',
        nickname: '키티4',
        id: 4,
      },
      activityId: 104,
      rating: 4,
      content: '카약킹을 처음 해봤는데 너무 재미있었어요. 다음에도 꼭 할거에요!',
      createdAt: '2024-07-08T10:00:00.000Z',
      updatedAt: '2024-07-09T12:00:00.000Z',
    },
  ],
};

export default mockReview;

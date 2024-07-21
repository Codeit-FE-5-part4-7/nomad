import instance from '../axios';

export interface GetDetailsForActivityParams {
  id: number;
}
export interface GetDetailsForActivityResponse {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages: [
    {
      id: number;
      imageUrl: string;
    },
  ];
  schedules: [
    {
      endTime: string;
      startTime: string;
      date: string;
      id: number;
    },
  ];
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  // creatorId: number; // 사용자가 만든 체험인지 확인하는 기능 수정중
}

export interface GetReviewsForActivityParams {
  id: number;
  page: number;
  size: number;
}
export interface GetReviewsForActivityResponse {
  averageRating: number;
  totalCount: number;
  reviews: [
    {
      id: number;
      user: {
        profileImageUrl: string;
        nickname: string;
        id: number;
      };
      activityId: number;
      rating: number;
      content: string;
      createdAt: string;
      updatedAt: string;
    },
  ];
}

export interface PostActivityReservParams {
  scheduleId: number;
  headCount: number;
}

export interface PostActivityReservResponse {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export const getDetailsForActivity = async (params: GetDetailsForActivityParams): Promise<GetDetailsForActivityResponse> => {
  const { id } = params;
  const response = await instance.get(`/activities/${id}`);
  return response.data;
};

export const getReviewsForActivity = async (params: GetReviewsForActivityParams): Promise<GetReviewsForActivityResponse> => {
  const { id, page = 1, size = 3 } = params;
  const response = await instance.get(`/activities/${id}/reviews`, {
    params: { page, size },
  });
  return response.data;
};

export const PostActivityReserv = async (activityId: number, params: PostActivityReservParams): Promise<PostActivityReservResponse> => {
  const response = await instance.post(`/activities/${activityId}/reservations`, {
    scheduleId: params.scheduleId,
    headCount: params.headCount,
  });
  return response.data;
};

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

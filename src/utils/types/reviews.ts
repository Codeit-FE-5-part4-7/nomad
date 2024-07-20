export interface Review {
  id: number;
  user: {
    id: number;
    nickname: string;
    profileImageUrl: string;
  };
  activityId: number;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsData {
  reviews: Review[];
  totalCount: number;
  averageRating: number;
}

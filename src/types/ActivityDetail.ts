export interface SubImage {
  id: number;
  imageUrl: string;
}

export interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface Activity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: SubImage[];
  schedules: Schedule[];
}

export interface ActivityDetailsProps {
  activity: Activity;
}

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

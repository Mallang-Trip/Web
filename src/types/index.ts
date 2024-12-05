export interface Article {
  articleId: number;
  profileImg: string | null;
  nickname: string;
  introduction: string;
  title: string;
  content: string;
  updatedAt: string;
  createdAt: string;
  commentsCount: number;
  image: string | null;
  articleDeleted?: boolean;
}

export interface Destination {
  address: string;
  destinationId: number;
  lat: number;
  lon: number;
  name: string;
}

export interface Course {
  capacity: number;
  courseId: number;
  discountPrice: number;
  images: string[];
  name: string;
  region: string;
  totalDays: number;
  totalPrice: number;
  days: {
    day: number;
    endTime: string;
    hours: number;
    price: number;
    startTime: string;
    destinations: Destination[];
  }[];
}

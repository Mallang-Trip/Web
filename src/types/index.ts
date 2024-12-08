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

export interface Notification {
  alarmId: number;
  checked: boolean;
  content: string;
  createdAt: string;
  targetId: number | undefined;
  type: string;
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

export interface Review {
  content: string;
  createdAt: string;
  images: string[];
  nickname: string;
  profileImg: string | null;
  rate: number;
  reviewId: number;
  updatedAt: string;
  userId: number;
}

export interface Place extends Destination {
  images: (string | File)[];
  content: string;
}

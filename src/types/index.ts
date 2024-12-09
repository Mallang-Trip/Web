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
  views: number;
  avgRate: number;
  reviews: Review[];
}

export interface Report {
  content: string;
  createdAt: string;
  reportId: number;
  reporteeId: number;
  reporteeLoginId: string;
  reporteeNickname: string;
  reporterId: number;
  reporterLoginId: string;
  reporterNickname: string;
  status: string;
  targetId: number;
  type: string;
  suspensionContent: string;
  suspensionExist: boolean;
}

export interface Party {
  partyId: number;
  name: string;
  startDate: string;
  headcount: number;
  capacity: number;
  promotion: boolean;
  driverName: string;
  image: string;
  price: number;
  content: string;
  course: Course;
  dibs: boolean;
  driverId: number;
  driverReady: boolean;
  endDate: string;
  members: {
    ageRange: number;
    companions: any;
    gender: string;
    headcount: number;
    introduction: string;
    nickname: string;
    profileImg: string | null;
    ready: boolean;
    userId: number;
  }[];
  monopoly: boolean;
  myParty: boolean;
  partyStatus: string;
  proposal: any;
  proposalExists: boolean;
  region: string;
  reservation: any;
}

export interface RegionDriverData {
  createdAt: string;
  driverId: number;
  introduction: string;
  loginId: string;
  profileImg: string;
  suspensionDuration: number;
  userId: number;
  userNickname: string;
}

export interface Message {
  type: string;
  userId: number;
  profileImg: string | null;
  content: string;
  createdAt: string;
  messageId: number;
  nickname: string;
}

export interface UserData {
  createdAt: string;
  driverRegion: string[] | null;
  introduction: string;
  loginId: string;
  name: string;
  phoneNumber: string;
  profileImg: string | null;
  role: string;
  suspensionDuration: number;
  userId: number;
  userNickname: string;
}

export interface CourseType {
  courseImg: string;
  courseName: string;
  courseId: number;
}

export interface DriverInfo {
  accountHolder: string;
  accountNumber: string;
  bank: string;
  courses: CourseType[];
  driverLicenceImg: string;
  holidays: string[];
  insuranceLicenceImg: string;
  introduction: string;
  name: string;
  phoneNumber: string;
  prices: { hours: number; price: number }[];
  profileImg: string | null;
  region: string[];
  status: string;
  taxiLicenceImg: string;
  userId: number;
  vehicleCapacity: number;
  vehicleImgs: string[];
  vehicleModel: string;
  vehicleNumber: string;
  weeklyHoliday: string[];
}

export interface NewDriverInfo {
  accountHolder: string;
  accountNumber: string;
  bank: string;
  driverId: number;
  driverLicenceImg: string;
  insuranceLicenceImg: string;
  introduction: string;
  phoneNumber: string;
  prices: { hours: number; price: number }[];
  profileImg: string | undefined;
  region: string[];
  status: string;
  taxiLicenceImg: string;
  vehicleCapacity: number;
  vehicleImgs: string[];
  vehicleModel: string;
  vehicleNumber: string;
}

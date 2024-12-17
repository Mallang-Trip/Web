import { partyStatusObj } from "@/utils/data";

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
  avgRate: number | null;
  reviews: Review[];
  dibs: boolean;
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
  status: keyof typeof partyStatusObj;
}

export interface HeartParty {
  capacity: number;
  createdAt: string;
  driverName: string;
  endDate: string;
  headcount: number;
  image: string;
  name: string;
  partyId: number;
  price: number;
  startDate: string;
  status: keyof typeof partyStatusObj;
  updatedAt: string;
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

export interface Reply {
  replyId: number;
  profileImg: string | undefined;
  nickname: string;
  createdAt: string;
  content: string;
  userId: number;
  deleted: boolean;
}

export interface Comment {
  commentId: number;
  profileImg: string | undefined;
  nickname: string;
  createdAt: string;
  content: string;
  userId: number;
  deleted: boolean;
  replies: {
    replyId: number;
    profileImg: string | undefined;
    nickname: string;
    createdAt: string;
    content: string;
    userId: number;
    deleted: boolean;
  }[];
}

export interface ArticleDetailType {
  articleId: number;
  comments: Comment[];
  commentsCount: number;
  content: string;
  createdAt: string;
  dibs: boolean;
  images: string[];
  nickname: string;
  partyId: number | null;
  partyName: string | null;
  profileImg: string | undefined;
  title: string;
  type: string;
  updatedAt: string;
  userId: number;
}

export type ArticleCategoryType =
  | "전체"
  | "자유게시판"
  | "동행구해요"
  | "피드백";

export interface Payment {
  cancelReceiptUrl: string | null;
  partyId: number;
  partyName: string;
  partyStartDate: string;
  paymentAmount: number;
  paymentTime: string;
  receiptUrl: string | null;
  refundAmount: number;
  refundTime: string;
  status: string;
}

export type NotifyType = "PARTY" | "ARTICLE" | "DRIVER" | "NONE";

export interface Notify {
  alarmId: number;
  checked: boolean;
  content: string;
  createdAt: string;
  targetId: number | null;
  type: NotifyType;
}

export interface InviteChatMember {
  nickName: string;
  profileImg: string | null;
  userId: number;
}

export interface ChatMember {
  createdAt: string;
  deleted: boolean;
  introduction: string;
  nickname: string;
  profileImg: string | null;
  suspensionDuration: number | null;
  userId: number;
}

export type ChatRoomType =
  | "COUPLE"
  | "GROUP"
  | "PARTY_PUBLIC"
  | "PARTY_PRIVATE";

export interface ChatRoomList {
  chatRoomId: number;
  content: string;
  headCount: number;
  image: string | null;
  roomName: string;
  type: ChatRoomType;
  unreadCount: number;
  updatedAt: string;
}

export interface ChatRoomDetail {
  chatRoomId: number;
  headCount: number;
  isBlock: boolean;
  isBlocked: boolean;
  members: {
    createdAt: string;
    deleted: boolean;
    introduction: string;
    isMyParty: boolean;
    nickname: string;
    profileImg: string | null;
    userId: number;
  }[];
  messages: {
    content: string;
    createdAt: string;
    messageId: number;
    nickname: string;
    profileImg: string | null;
    type: string;
    userId: number;
  }[];
  myParty: boolean | null;
  partyId: number | null;
  publicRoomId: number | null;
  roomName: string;
  type: ChatRoomType;
}

export interface RegionData {
  image: string;
  name: string;
  province: string | null;
  regionId: number;
}

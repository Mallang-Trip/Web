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

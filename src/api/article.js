import { GET } from "../utils/axios";

export const getArticleList = async (type, page) =>
  await GET(`/article?type=${type}&page=${page}`);

export const getArticleDetail = async (articleId) =>
  await GET(`/article/${articleId}`);

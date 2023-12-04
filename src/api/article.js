import { DELETE, GET, POST, PUT } from "../utils/axios";

export const getArticleList = async (type, page) =>
  await GET(`/article?type=${type}&page=${page}`);

export const getArticleDetail = async (articleId) =>
  await GET(`/article/${articleId}`);

export const getMyArticleList = async (page) =>
  await GET(`/article/my?page=${page}`, true);

export const postNewArticle = async (body) =>
  await POST(`/article`, body, true);

export const updateMyArticle = async (articleId, body) =>
  await PUT(`/article/${articleId}`, body, true);

export const deleteMyArticle = async (articleId) =>
  await DELETE(`/article/${articleId}`, true);

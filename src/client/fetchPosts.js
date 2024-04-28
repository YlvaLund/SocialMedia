import axios from "axios";
import { retrieveToken } from "../storage/token";
const apiUrl = process.env.REACT_APP_API_URL;

export async function fetchPosts() {
  //TODO: Handle pagination?
  let token = await retrieveToken();
  const res = await axios.get(`${apiUrl}/api/v1/social/posts?_reactions=true`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return res;
}

export async function reactToPost(symbol, id) {
  let token = await retrieveToken();
  const res = await axios({
    method: "put",
    url: `${apiUrl}/api/v1/social/posts/${id}/react/${symbol}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return res;
}

export async function fetchPostById(id) {
  let token = await retrieveToken();
  const res = await axios({
    method: "get",
    url: `${apiUrl}/api/v1/social/posts/${id}?_author=true&_reactions=true&_comments=true`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return res;
}

export async function createNewPost(post) {
  let token = await retrieveToken();
  const res = await axios({
    method: "post",
    url: `${apiUrl}/api/v1/social/posts`,
    data: post,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return res;
}

export async function updatePost(post) {
  let postId = post.id;
  delete post.id;
  let token = await retrieveToken();
  const res = await axios({
    method: "put",
    url: `${apiUrl}/api/v1/social/posts/${postId}`,
    data: post,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return res;
}

export async function deletePost(post) {
  let postId = post.id;
  delete post.id;
  let token = await retrieveToken();
  const res = await axios({
    method: "delete",
    url: `${apiUrl}/api/v1/social/posts/${postId}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return res;
}

export async function createNewComment(id, comment) {
  let token = await retrieveToken();
  const res = await axios({
    method: "post",
    url: `${apiUrl}/api/v1/social/posts/${id}/comment`,
    data: comment,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return res;
}

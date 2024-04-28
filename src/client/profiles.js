import axios from "axios";
import { retrieveToken } from "../storage/token";
const apiUrl = process.env.REACT_APP_API_URL;

export async function fetchProfiles(offset) {
  let token = await retrieveToken();
  const res = await axios.get(`${apiUrl}/api/v1/social/profiles?offset=${offset ?? 0}&limit=100`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return res;
}

export async function fetchProfileByName(name) {
  let token = await retrieveToken();
  const res = await axios.get(`${apiUrl}/api/v1/social/profiles/${name}?_followers=true&_following=true&_posts=true`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return res;
}

export async function followProfileName(name) {
  let token = await retrieveToken();
  const res = await axios({
    method: "put",
    url: `${apiUrl}/api/v1/social/profiles/${name}/follow`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return res;
}

export async function unFollowProfileName(name) {
  let token = await retrieveToken();
  const res = await axios({
    method: "put",
    url: `${apiUrl}/api/v1/social/profiles/${name}/unfollow`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return res;
}

export async function updateProfileMedia(name, avatar, banner) {
  let token = await retrieveToken();
  const res = await axios({
    method: "put",
    url: `${apiUrl}/api/v1/social/profiles/${name}/media`,
    data: {
      banner: banner,
      avatar: avatar,
    },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return res;
}

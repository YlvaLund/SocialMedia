import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export async function checkApiStatus() {
  const res = await axios.get(apiUrl + "/status");
  return res;
}
export async function registerUser({ name, email, banner, avatar, password }) {
  const res = await axios.post(`${apiUrl}/api/v1/social/auth/register`, {
    name: name,
    email: email,
    banner: banner,
    avatar: avatar,
    password: password,
  });
  return res;
}

export async function loginUser({ email, password }) {
  const res = await axios.post(`${apiUrl}/api/v1/social/auth/login`, {
    email: email,
    password: password,
  });
  return res;
}

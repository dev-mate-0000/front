import axios from "axios";

export default async function LoginGithubUrlApi() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/login/github`);
  return response.data;
}
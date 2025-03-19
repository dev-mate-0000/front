import axios from "axios";

export default async function LoginGithubUrlApi(): Promise<string> {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/oauth/github`);
  return response.data;
}
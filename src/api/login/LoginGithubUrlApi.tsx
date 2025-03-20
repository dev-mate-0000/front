import axios from "axios";

export default async function LoginGithubUrlApi(): Promise<string> {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/oauth/github`);
  return response.data;
}
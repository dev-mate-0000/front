import { LoginUrlType } from "@/type/GetLoginType";
import axios, { AxiosResponse } from "axios";

export default async function LoginGithubUrlApi(): Promise<AxiosResponse<LoginUrlType>> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/oauth/github`,
    { withCredentials: true }
  );
  return response;
}

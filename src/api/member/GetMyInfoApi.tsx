import axios from "axios";

export type GetMyInfoApiResponse = {
    name: string,
    githubUrl: string,
    job: string,
    bio: string,
    languages: string[]
}

export default async function GetMyInfoApi(): Promise<GetMyInfoApiResponse> {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/members/self`,
        { withCredentials: true }
    );
    return response.data;
}
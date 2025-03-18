import axios from "axios";

export type GetMemerDetailApiResponse = {
    id: number,
    name: string,
    githubUrl: string,
    job: string,
    bio: string,
    languages: string[]
}

export default async function GetMemerDetailApi(id: number): Promise<GetMemerDetailApiResponse> {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/members/${id}`,
        { withCredentials: true }
    );
    return response.data;
}
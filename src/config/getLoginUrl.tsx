import LoginGithubUrlApi from "@/api/login/LoginGithubUrlApi";

export default async function getLoginGithubUrl(): Promise<string | null> {
  try {
    const response = await LoginGithubUrlApi();
    if (response.status === 200 && response.data?.url) {
      return response.data.url;
    }
    return null;
  } catch (err) {
    console.error("GitHub 로그인 URL을 가져오는 중 오류 발생:", err);
    return null;
  }
};

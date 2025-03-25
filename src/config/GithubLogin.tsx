import LoginGithubUrlApi from "@/api/login/LoginGithubUrlApi";

export const LoginGithub = () => {
  LoginGithubUrlApi()
    .then((response) => {
        if (!confirm("GitHub 계정으로 로그인하시겠습니까?")) return;
      if (response.status === 200 && response.data?.url) {
        window.location.href = response.data.url;
      }
    })
};

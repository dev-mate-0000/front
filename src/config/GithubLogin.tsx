import LoginGithubUrlApi from "@/api/login/LoginGithubUrlApi";

export const LoginGithub = () => {
  LoginGithubUrlApi()
    .then((response) => {
      if (response.status === 200 && response.data?.url) {
        window.location.href = response.data.url;
      }
    })
};

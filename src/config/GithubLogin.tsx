import LoginGithubUrlApi from "@/api/login/LoginGithubUrlApi";

export const LoginGithub = () => {
  LoginGithubUrlApi()
  .then(rtn => {
    window.location.href = rtn;
  })
  .catch(err => {
    console.log(err);
  });
}
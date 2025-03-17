"use client";

import LoginGithubUrlApi from "../api/login/LoginGithubUrlApi";

export default function Login() {
  const loginGithub = () => {
    LoginGithubUrlApi()
    .then(rtn => {
        console.log(rtn)
        // window.location.href = rtn;
    })
    .catch(err => {
        console.log(err);
    });
  }
  
  return (
    <>
        <button onClick={() => loginGithub() }>github</button>
    </>
  );
}

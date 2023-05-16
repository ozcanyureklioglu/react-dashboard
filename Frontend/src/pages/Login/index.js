import React, { useState } from "react";

function Login() {
  const [mail, setMail] = useState(0);
  const [password, setPassword] = useState(0);
  const [isLogin, setIsLogin] = useState(false);

  const login = async () => {
    try {
      const login = {
        email: mail,
        password: password,
      };
      var response = await fetch("https://localhost:5001/api/v1/Auth/login", {
        method: "POST",
        body: JSON.stringify(login),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const json = await response.json();
      localStorage.setItem("token", json.data.token);
      setIsLogin(true);
      const jsonToken = parseJwt(json.data.token);
      const nameIdentifier =
        jsonToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];
      const userName =
        jsonToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      localStorage.setItem("user-id", nameIdentifier);
      localStorage.setItem("user-name", userName);
      window.location = "/";
    } catch (e) {
      console.log("Getting login failed.", e);
    }
  };
  const onMailUpdate = (e) => {
    setMail(e.target.value);
  };
  const onPasswordUpdate = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div class="flex h-screen dark:bg-gray-600 justify-center h-full items-center">
      <div class="w-1/3 ">
        <div class="relative z-0 mb-6 group">
          <input
            type="email"
            id="mail"
            name="mail"
            onChange={onMailUpdate}
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div class="relative z-0  mb-6 group">
          <input
            type="password"
            id="password"
            name="password"
            onChange={onPasswordUpdate}
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_password"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>

        <button
          type="submit"
          onClick={login}
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Ateşleee
        </button>
      </div>
    </div>
  );
}

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
export default Login;

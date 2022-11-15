import { createStore } from "vuex";
import router from "@/router";

import { basicRoute } from "@/config/config";

export const store = createStore({
  state() {
    return {
      token: "",
      authorizeMessage: "",
    };
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setAuthorizeMessage(state, message) {
      state.authorizeMessage = message;
    },
  },

  actions: {
    async SignIn(context, user) {
      try {
        const response = await fetch(`${basicRoute}user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(user),
        });
        const result = await response.json();

        if (result.token) {
          context.commit("setToken", result.token);
          localStorage.setItem("token", result.token);
          router.push("/");
        } else {
          context.commit("setAuthorizeMessage", result.message);
        }
      } catch (error) {
        context.commit("setAuthorizeMessage", error);
      }
    },
    async SignUp(context, user) {
      try {
        const response = await fetch(`${basicRoute}user/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(user),
        });
        const result = await response.json();

        if (response.ok) context.dispatch("SignIn", user);
        else context.commit("setAuthorizeMessage", result.message);
      } catch (error) {
        context.commit("setAuthorizeMessage", error);
      }
    },
    SignOut(context) {
      localStorage.removeItem("token");
      context.commit("setToken", "");
      router.push("/");
    },
  },
});

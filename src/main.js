import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createStore } from 'vuex'
import { basicRoute } from '@/config/config'

const store = createStore({
    state() {
        return {
            token: null,
            loginError: '',
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setLogError(state, error) {
            state.loginError = error;
        }
    },
    actions: {
        async SignIn(context, user) {
            try {
                let response = await fetch(`${basicRoute}user/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify(user.value),
                });
                let result = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', result.token);
                    console.log(result.token);
                    context.commit('setToken', result.token);
                    //TODO:Show real message
                } else {
                    context.commit('setLogError', 'error!')
                }
            } catch (error) {
                context.commit('setLogError', 'error!')
            }

        },
        async SignUp(context, user) {
            try {
                let response = await fetch(basicRoute + "user/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify(user.value),
                });
                if (response.ok) {
                    console.log(response);
                    //TODO:Show real message
                    context.dispatch('SignIn', user)
                } else {
                    context.commit('setLogError', 'error!')
                }
            } catch (error) {
                context.commit('setLogError', 'error!')
            }

        }
    },
})

const app = createApp(App);

app.use(router);
app.use(store);
app.mount("#app");

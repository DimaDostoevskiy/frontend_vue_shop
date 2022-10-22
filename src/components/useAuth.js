import { basicRoute } from "@/config/config"
import { ref } from "vue"

export default () => {
    const user = ref(
        {
            name: "",
            email: "",
            password: "",
        }
    );

    const hasError = ref(false);

    const signIn = async () => {
        try {
            let response = await fetch(basicRoute + "user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(user.value),
            });
            let result = await response.json();

            if (response.ok) {
                localStorage.setItem('token', result.token);
                return result.token;
            } else {
                hasError.value = true;
            }
        } catch (error) {
            hasError.value = true;
        }
    }

    const signUp = async () => {
        try {
            let response = await fetch(basicRoute + "user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(user.value),
            });
            if (response.ok) {
                return await signIn();
            } else {
                hasError.value = true;
            }
        } catch (error) {
            hasError.value = true;
        }
    }

    return {
        user,
        hasError,
        signIn,
        signUp
    }
};
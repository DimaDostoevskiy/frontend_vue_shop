<template>
  <div>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-lg-3 col-sm-6 col-12">
          <div class="card text-bg-dark">
            <div class="card-header text-center fs-2">Sign In</div>
            <p v-if="hasError" class="text-center text-danger fs-4 mt-4">
              error message
            </p>
            <form class="card-body">
              <input
                v-model.trim="user.email"
                class="form-control text-bg-dark"
                type="text"
                placeholder="email"
              />
              <input
                v-model.trim="user.password"
                class="form-control text-bg-dark"
                type="password"
                placeholder="password"
              />
              <button
                @click="singUpEmit"
                class="btn btn-dark w-100"
                type="button"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useAuth from "@/components/useAuth";
export default {
  name: "SignInFormComp",
  setup(props, { emit }) {
    const { user, hasError, signIn } = useAuth();

    const singUpEmit = async () => {
      const token = await signIn();
      console.log(token);
      if (token) emit("signin", token);
    };

    return {
      user,
      hasError,
      singUpEmit,
    };
  },
};
</script>

<style scoped>
.container-fluid {
  padding-top: 120px;
}
.card-header {
  margin-top: 12px;
}
input {
  margin-top: 12px;
  border-color: rgba(255, 255, 255, 0.7);
}
.btn {
  margin-top: 32px;
  border-color: rgba(255, 255, 255, 0.7);
}
</style>
  
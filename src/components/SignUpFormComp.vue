<template>
  <div>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-lg-3 col-sm-6 col-12">
          <div class="card text-bg-dark">
            <div class="card-header text-center fs-2">Sign Up</div>
            <h3 v-if="hasError" class="text-center text-danger">
              error message
            </h3>
            <div class="card-body">
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
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useAuth from "@/components/useAuth";
export default {
  name: "SignUpFormComp",
  setup(props, { emit }) {
    const { user, hasError, signUp } = useAuth();

    const singUpEmit = async () => {
      const token = await signUp();
      if (token) emit("signup", token);
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
input {
  margin-top: 12px;
  border-color: rgba(255, 255, 255, 0.7);
}
.container-fluid {
  padding-top: 120px;
}
.card-header {
  margin-top: 12px;
}
.btn {
  margin-top: 32px;
  border-color: rgba(255, 255, 255, 0.7);
}
</style>
  
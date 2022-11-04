<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';


const store = useStore();
const signUp = (user) => store.dispatch('SignUp', user);

const user = ref(
  {
    name: "",
    email: "",
    password: "",
  }
);
</script>

<template>
  <div>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-12 col-md-6 col-xl-4">
          <div class="card text-bg-dark">
            <div class="card-header text-center fs-2">Sign Up</div>
            <form class="card-body">
              <!-- //// -->
              <div class="form-floating mb-3">
                <input id="floatingInput" type="email" class="form-control bg-dark text-bg-dark"
                  placeholder="name@example.com" v-model.trim="user.email" />
                <label for="floatingInput">Email address</label>
              </div>
              <!-- //// -->
              <div class="form-floating">
                <input id="floatingPassword" type="password" class="form-control bg-dark text-bg-dark"
                  placeholder="Password" v-model.trim="user.password" />
                <label for="floatingPassword">Password</label>
              </div>
              <!-- //// -->
              <button type="button" class="btn btn btn-outline-light w-100" @click="signUp(user)">
                Sign Up
              </button>
              <span>{{ count }}</span>
              <!-- //// -->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-fluid {
  padding-top: 120px;
}

.btn {
  margin-top: 42px;
  border-color: rgba(255, 255, 255, 0.7);
  height: 42px;
}
</style>
  
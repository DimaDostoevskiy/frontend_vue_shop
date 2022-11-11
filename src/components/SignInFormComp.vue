<template>
  <div>
    <div class="container-fluid pt-5">
      <div class="row justify-content-center">
        <div class="col-10 col-md-5 col-xl-3">
          <div class="card text-bg-dark">
            <div class="card-header text-center fs-2">Sign In</div>
            <form class="card-body">
              <!-- / Input Email / -->
              <div class="form-floating mb-3">
                <input id="floatingInput" type="email" class="form-control bg-dark text-bg-dark"
                  placeholder="name@example.com" v-model.trim="user.email" />
                <label for="floatingInput">Email address</label>
              </div>
              <!-- / Input Password / -->
              <div class="form-floating">
                <input id="floatingPassword" type="password" class="form-control bg-dark text-bg-dark"
                  placeholder="Password" v-model.trim="user.password" />
                <label for="floatingPassword">Password</label>
              </div>
              <!-- / Button 'Sign In' / -->
              <button type="button" class="my-btn-black btn btn-outline-light w-100" @click="signIn(user)">
                Sign In
              </button>
              <!-- / Error message / -->
              <div class="row text-center fs-5 text-danger mt-3">
                <span>{{ store.state.authorizeMessage }}</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue'
import { useStore } from 'vuex';

const store = useStore();

const user = ref({
  email: "",
  password: "",
});

onMounted(() => {
  store.commit('setAuthorizeMessage', '')
})

const signIn = (user) => store.dispatch('SignIn', user);

</script>

<style scoped>
.my-btn-black {
  margin-top: 42px;
  border-color: rgba(255, 255, 255, 0.7);
  height: 42px;
}
</style>
  
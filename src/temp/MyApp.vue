<template>
  <div class="app">
    <div style="color: white">{{ time }}</div>
    <input type="text" style="width: 400px" :placeholder="getSomeTime(time)">
    <div class="real-shit">
      <h3>Now we getting fucking composition API Bitch</h3>
      {{ count }}
      <h4>user <small @click="changeUser">chnage it</small></h4>
      <span>{{ userDesc }}</span>
      <input type="text" v-model.lazy="user.age">
    </div>


    <!-- <NavbarComp
      @showCreateProduct="showCreateProduct"
      @showOrdersPage="showOrdersPage"
      @showSignUp="showSignUp"
      @showSignIn="showSignIn"
      @signOut="signOut"
      :token="token"
    />

    <template v-if="!token">
      <SignInFormComp v-if="activComp === 'sign-in'" @signin="signIn" />
      <SignUpFormComp v-if="activComp === 'sign-up'" @signup="signUp" />
    </template>

    <template v-if="token">
      <StartPage v-if="activComp === 'start-page'" />
      <MainPage
        v-if="activComp === 'main-page'"
        @showUpdateProduct="showUpdateProduct"
        :token="token"
      />
      <CreateProductComp v-if="activComp === 'create-product'" :token="token" />
      <OrdersPage v-if="activComp === 'orders'" :token="token" />
      <UpdateProductComp
        v-if="activComp === 'update-product'"
        :token="token"
        :updateProduct="updateProduct"
      />
    </template> -->




  </div>
</template>


<script >
import { onMounted, ref, computed } from 'vue'
export default {
  setup(props, { emit }) {
    // Тожесамое что data
    // const state = reactive({
    //     count: 0,
    //     time: null
    // })
    console.log(props);
    console.log(emit);
    const count = ref(0);
    const time = ref(null);
    const user = ref({
      firstName: 'John',
      lastName: 'Smith',
      age: 25
    })
    // Вычесляемое свойство
    const userDesc = computed(() => {
      console.log('hello');
      return `${user.value.firstName} ${user.value.lastName} in age of ${user.value.age}`
    })

    // Хук
    onMounted(() => {
      setInterval(() => {
        time.value = Date.now();
      }, 3);
    })

    // Методы
    const changeUser = () => {
      user.value = {
        firstName: 'Mike',
        lastName: 'Tyson',
        age: 60
      }
    }
    const getSomeTime = () => {
      return `timestamp is: ${time.value}`
    }
    return {
      count,
      time,
      user,
      userDesc,
      changeUser,
      getSomeTime,
    }
  }
}







</script>

<script>
// import MainPage from "./components/MainPage.vue";
// import StartPage from "./components/StartPage.vue";
// import OrdersPage from "./components/OrdersPage.vue";
// import NavbarComp from "./components/NavbarComp.vue";
// import SignUpFormComp from "./components/SignUpFormComp.vue";
// import SignInFormComp from "./components/SignInFormComp.vue";
// import CreateProductComp from "./components/CreateProductComp.vue";
// import UpdateProductComp from "./components/UpdateProductComp.vue";

// export default {
//     name: "App",
//   components: {
//     StartPage,
//     MainPage,
//     NavbarComp,
//     OrdersPage,
//     SignUpFormComp,
//     SignInFormComp,
//     CreateProductComp,
//     UpdateProductComp,
//   },
//   data() {
//     return {
//       activComp: "",
//       token: "",
//       updateProduct: {},
//     };
//   },
//   mounted() {
//     this.token = localStorage.getItem("token");
//     if (this.token) this.activComp = "main-page";
//     else this.activComp = "start-page";
//   },
//   methods: {
//     showSignIn() {
//       this.activComp = "sign-in";
//     },
//     showSignUp() {
//       this.activComp = "sign-up";
//     },
//     showCreateProduct() {
//       this.activComp = "create-product";
//     },
//     showUpdateProduct(product) {
//       this.updateProduct = product;
//       this.activComp = "update-product";
//     },
//     showOrdersPage() {
//       this.activComp = "orders";
//     },
//     signIn(token) {
//       this.token = token;
//       this.activComp = "main-page";
//     },
//     signUp(token) {
//       this.token = token;
//       this.activComp = "main-page";
//     },
//     signOut() {
//       this.token = "";
//       this.activComp = "";
//       localStorage.removeItem("token");
//     },
//   },
// };
</script>

<style>
.app {
  font-family: Helvetica, Arial, sans-serif;
  margin: 0px;
  padding: 0px;
  min-height: 100vh;
  background-color: rgba(42, 42, 42, 1);
}

.real-shit {
  padding: 30px;
  margin: 20px;
  width: 700px;
  color: white;
  background-color: rgb(60, 58, 58);
  border-radius: 15px;
  box-shadow: 2px 2px 12px black;
}
</style>
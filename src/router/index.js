import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import MainPage from "@/components/MainPage.vue";
import SignInFormComp from "@/components/SignInFormComp.vue";
import SignUpFormComp from "@/components/SignUpFormComp.vue";
import CreateProductComp from "@/components/CreateProductComp.vue";
import UpdateProductComp from "@/components/UpdateProductComp.vue";
import OrdersPage from "@/components/OrdersPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpFormComp,
    },
    {
      path: "/signin",
      name: "signin",
      component: SignInFormComp,
    },
    {
      path: "/create",
      name: "create",
      component: CreateProductComp,
    },
    {
      path: "/update/:id",
      name: "update",
      component: UpdateProductComp,
    },
    {
      path: "/main",
      name: "mainPage",
      component: MainPage,
    },
    {
      path: "/orders",
      name: "orders",
      component: OrdersPage,
    },
  ],
});

export default router;

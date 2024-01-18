import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/home/Home.vue";
import Vocabulary from "../views/vocabulary/voucabulary.vue";
import Listening from "@/views/listening/Listening.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/vocabulary",
      name: "Vocabulary",
      component: Vocabulary,
    },
    {
      path: "/listening",
      name: "Listening",
      component: Listening,
    },
  ],
});

export default router;

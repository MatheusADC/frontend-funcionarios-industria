import { createRouter, createWebHistory } from "vue-router";
import Funcionarios from "../views/Funcionarios.vue";

const routes = [
  { path: "/", name: "Funcionarios", component: Funcionarios },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

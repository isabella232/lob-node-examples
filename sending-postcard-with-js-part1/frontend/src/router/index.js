import { createWebHistory, createRouter } from "vue-router";
import ListTemplates from "../components/ListTemplates.vue";
import Front from "../components/Front.vue";

const routes = [
  { path: "/", component: Front, name: "Home" },
  { path: "/list", component: ListTemplates, name: "ListTemplates" },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
 });

export default router;

import { createWebHistory, createRouter } from "vue-router";
import ListTemplates from "../components/ListTemplates.vue";
import Front from "../components/Front.vue";
import CreatePostcard from "../components/CreatePostcard.vue"
const routes = [
 { path: "/", component: Front, name: "Home" },
 { path: "/list", component: ListTemplates, name: "ListTemplates" },
 { path: "/create", component: CreatePostcard, name: "CreatePostcard"}
];
 
const router = createRouter({
  history: createWebHistory(),
  routes,
});
 
export default router;


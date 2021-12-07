import { createWebHistory, createRouter } from "vue-router";
import ListTemplates from "../components/ListTemplates.vue";
import Front from "../components/Front.vue";
import CreatePostcard from "../components/CreatePostcard.vue"
import ListPostcards from "../components/ListPostcards.vue"
const routes = [
{ path: "/", component: Front, name: "Home" },
{ path: "/templates/list", component: ListTemplates, name: "ListTemplates" },
{ path: "/postcards/create", component: CreatePostcard, name: "CreatePostcard"},
{ path: "/postcards/list", component: ListPostcards, name: "ListPostcards"}
];
const router = createRouter({
 history: createWebHistory(),
 routes,
});
export default router;

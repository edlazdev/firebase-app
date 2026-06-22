import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import Login from "@/views/LoginView.vue";
import Register from "@/views/RegisterView.vue";
import Edit from "@/views/EditView.vue";
import { useUserStore } from "@/stores/user";

const requireAuth = async (to, from, next) => {
    const userStore = useUserStore();
    const user = await userStore.currentUser();
    if (!user) {
        next("/login");
    } else {
        next();
    }
};

const routes = [
    { path: "/", component: Home, beforeEnter: requireAuth },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/edit/:id", component: Edit, beforeEnter: requireAuth },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;

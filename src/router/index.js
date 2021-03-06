import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../services/firebase";

function lazyLoad(view) {
    return () => import(`@/${view}.vue`);
}

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Default",
        component: lazyLoad("layouts/Default"),
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: "",
                name: "Home",
                component: lazyLoad("views/Home"),
            },
            {
                path: "profil",
                name: "Profile",
                component: lazyLoad("views/Profile"),
            },
            {
                path: "profil/:uid",
                name: "ProfileId",
                component: lazyLoad("views/ProfileId"),
                props: true,
            },
            {
                path: "keluarga",
                name: "Families",
                component: lazyLoad("views/Families"),
            },
        ],
    },
    {
        path: "/masuk",
        name: "Login",
        component: lazyLoad("views/Login"),
    },
    {
        path: "/daftar/:id",
        name: "Register",
        component: lazyLoad("views/Register"),
        props: true,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
    const destinationPath = to.path;
    const loginPath = "/masuk";
    const isGoingToDestinationPath = loginPath === destinationPath;
    const isAuthenticated =
        auth.currentUser !== null || auth.currentUser !== undefined;

    if (requiresAuth && !auth.currentUser) {
        next(loginPath);
    } else if (isAuthenticated && isGoingToDestinationPath) {
        // next("/");
        next();
    } else {
        next();
    }
});

export default router;

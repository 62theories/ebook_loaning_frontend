import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      mustLogin: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      notLogin: true,
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Register.vue"),
    meta: {
      notLogin: true,
    },
  },
  {
    path: "/mylend",
    name: "MyLend",
    component: () => import("../views/MyLend.vue"),
    meta: {
      mustLogin: true,
    },
  },
  {
    path: "/booklend/:bookId",
    name: "BookLend",
    component: () => import("../views/BookLend.vue"),
    meta: {
      mustLogin: true,
    },
  },
  {
    path: "/bookread/:lendId",
    name: "BookLend",
    component: () => import("../views/BookRead.vue"),
    meta: {
      mustLogin: true,
    },
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import("../views/notFound.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.notLogin)) {
    if (localStorage.getItem("token") != null) {
      next({
        path: "/",
      })
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.mustLogin)) {
    if (localStorage.getItem("token") == null) {
      next({
        path: "/login",
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router

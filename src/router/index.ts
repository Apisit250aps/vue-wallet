import DrawerLayout from "@/components/layouts/DrawerLayout.vue"
import { useAuthStore } from "@/stores/auth"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "Home",
    component: DrawerLayout,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("@/views/HomeView.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/LoginView.vue"),
    meta: { requiresAuth: false }
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login")
  } else {
    next()
  }
})

export default router
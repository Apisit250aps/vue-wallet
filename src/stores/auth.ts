import { defineStore } from "pinia"
import { jwtDecode } from "jwt-decode"
import router from "../router"
import apiClient from "@/api/client";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("auth_token") || null
  }),
  actions: {
    async login(credentials: {
      username: string
      password: string
    }): Promise<boolean> {
      try {
        const response = await apiClient.post(
          "http://localhost:8080/api/login",
          credentials
        )
        this.token = response.data.data.token
        console.log(jwtDecode(response.data.data.token))
        localStorage.setItem("auth_token", this.token as string)
        return true
      } catch (error) {
        console.error("Login failed", error)
        return false
      }
    },
    async register(data: {
      username: string
      password: string
    }): Promise<boolean> {
      try {
        await apiClient.post(`/api/register/`, data)
        return true
      } catch (error) {
        console.error("Registration failed", error)
        return false
      }
    },
    logout() {
      this.token = null
      localStorage.removeItem("token")
      router.push("/login")
    },
    async fetchUser() {
      try {
        const response = await apiClient.get("/auth/user")
      } catch (error) {
        this.logout()
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token
  }
})
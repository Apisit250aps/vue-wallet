// src/stores/auth.js
import { defineStore } from "pinia"
import router from "../router"
import apiClient from "@/api/client"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: jwtDecode(localStorage.getItem("auth_token") as string) || null,
    token: localStorage.getItem("auth_token") || null
  }),
  actions: {
    async login(credentials: {
      username: string
      password: string
    }): Promise<boolean> {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/login",
          credentials
        )
        this.token = response.data.data.token
        console.log(response.data.data.token)
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
        await apiClient.post("/auth/register", data)
        return true
      } catch (error) {
        console.error("Registration failed", error)
        return false
      }
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem("token")
      router.push("/login")
    },
    async fetchUser() {
      try {
        const response = await apiClient.get("/auth/user")
        this.user = response.data
      } catch (error) {
        this.logout()
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token
  }
})

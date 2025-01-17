import { defineStore } from "pinia"
import axios from "axios"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    async login(credentials: { username: string; password: string }) {
      try {
        const response = await axios.post("/api/login", credentials)
        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem("token", this.token as string)
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`
      } catch (error) {
        console.error("Login error:", error)
        throw error
      }
    },
    async register(details: { username: string; password: string }) {
      try {
        await axios.post("/api/register", details)
      } catch (error) {
        console.error("Registration error:", error)
        throw error
      }
    },
    async logout() {
      this.token = null
      this.user = null
      localStorage.removeItem("token")
      delete axios.defaults.headers.common["Authorization"]
    },
    async fetchUser() {
      if (!this.token) return
      try {
        const response = await axios.get("/api/user")
        this.user = response.data
      } catch (error) {
        console.error("Fetch user error:", error)
        this.logout()
      }
    }
  }
})

<template>
  <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <p className="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
      </div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" @submit="handleSubmit">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="username"
              className="input input-bordered"
              v-model="username"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              v-model="password"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover"
                >Forgot password?</a
              >
            </label>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth"
import { ref } from "vue"
const auth = useAuthStore()
const username = ref<string>("")
const password = ref<string>("")

interface LoginFormEvent extends Event {
  preventDefault(): void
}

const handleSubmit = async (e: LoginFormEvent): Promise<void> => {
  e.preventDefault()
  console.log(username.value, password.value)
  await auth.login({
    username: username.value,
    password: password.value
  })
}
</script>

<style scoped></style>

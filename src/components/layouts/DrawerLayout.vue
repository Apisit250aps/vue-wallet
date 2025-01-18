<template>
  <div class="drawer lg:drawer-open">
    <input id="drawer-layout" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <Navbar>
        <div class="navbar-start lg:hidden">
          <label
            for="drawer-layout"
            class="btn btn-ghost drawer-button lg:hidden"
          >
            <i class="bx bx-menu-alt-left"></i>
          </label>
        </div>
        <div class="navbar-center lg:navbar-start">
          <!-- Logo and branding here -->
          <a class="btn btn-ghost text-xl">Wallet {{ wallet.amount }} <i class="bx bx-wallet"></i></a>
        </div>
        <div class="navbar-end">
          <button class="btn btn-outline btn-error" @click="auth.logout">
            <i class="bx bx-arrow-from-left"></i>
          </button>
        </div>
      </Navbar>
      <main class="mt-3">
        <RouterView />
      </main>
    </div>
    <div class="drawer-side">
      <label
        for="drawer-layout"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <!-- Sidebar content here -->
        <li>
          <RouterLink to="/" active-class="active">Home</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router"
import Navbar from "../navigate/Navbar.vue"
import { useAuthStore } from "@/stores/auth"
import { useTransactionStore } from "@/stores/transaction"
const auth = useAuthStore()
const wallet = useTransactionStore()

</script>

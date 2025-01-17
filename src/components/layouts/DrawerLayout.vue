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
          <a class="btn btn-ghost text-xl">Wallet</a>
        </div>
        <div class="navbar-end">
          <!-- Navigation links here -->
        </div>
      </Navbar>
      <main class="mt-3 px-3">
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
        <li><a>Sidebar Item 1</a></li>
        <li><a>Sidebar Item 2</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"
import Navbar from "../navigate/Navbar.vue"
</script>

<script setup lang="ts">
import {  RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style >
/* Add your custom styles here */
/* Hide scrollbar for Chrome, Safari and Opera */
*::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
* {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
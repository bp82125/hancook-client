<script setup>
// import { ref } from 'vue'

defineProps(['path', 'name'])
</script>

<template>
  <RouterLink
    :to="path"
    class="flex items-center p-3 ps-5 rounded-lg dark:text-white hover:bg-gray-200, font-medium dark:hover:bg-gray-700 group"
  >
    <svg
      class="sidebar-icon"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <slot></slot>
    </svg>

    <span
      class="ms-3 text-gray-600 font-normal transition duration-75 dark:text-gray-400 group-hover:text-gray-900 text-md"
      >{{ name }}</span
    >
  </RouterLink>
</template>

<style scoped>
a.active-link {
  @apply bg-blue-500;
}

a.active-link svg,
a.active-link span {
  @apply text-white !important;
}
</style>

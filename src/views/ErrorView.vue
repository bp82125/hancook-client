<template>
  <div class="min-h-screen flex flex-grow items-center justify-center bg-[url('/background.jpg')]">
    <div class="rounded-lg bg-white p-8 text-center shadow-xl mx-10">
      <!-- <h1 class="mb-4 text-4xl font-bold">404</h1> -->
      <img src="/NotFound.png" class="md:h-64 object-scale-down" alt="" />
      <p class="text-gray-600">Oops! Không thể truy cập trang bạn muốn chuyển hướng đến.</p>
      <template v-if="isAdmin">
        <RouterLink
          to="/dashboard/home"
          class="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
        >
          Quay lại trang chủ
        </RouterLink>
      </template>
      <template v-else>
        <RouterLink
          to="/dashboard/dish"
          class="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
        >
          Quay lại trang chủ
        </RouterLink>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { computedAsync } from '@vueuse/core'

const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchUser()
})

const isAdmin = computedAsync(async () => {
  return await userStore.isAdmin()
}, true)
</script>

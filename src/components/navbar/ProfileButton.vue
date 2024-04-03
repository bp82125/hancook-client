<script setup>
import { onMounted, computed, ref, watchEffect } from 'vue'
import { initFlowbite } from 'flowbite'
import { signOut } from '@/services/auth'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

onMounted(() => {
  initFlowbite()
  userStore.fetchUser()
})

const user = computed(() => {
  return userStore.user
})

const name = ref('')
const position = ref('')
const phoneNumber = ref('')

watchEffect(() => {
  if (user.value) {
    name.value = user.value.name
    position.value = user.value.position.positionName
    phoneNumber.value = user.value.phoneNumber
  }
})
</script>

<template>
  <button
    type="button"
    class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
    id="user-menu-button"
    aria-expanded="false"
    data-dropdown-toggle="dropdown-profile"
  >
    <span class="sr-only">Open user menu</span>
    <img
      class="w-8 h-8 rounded-full"
      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
      alt="user photo"
    />
  </button>
  <!-- Dropdown menu -->
  <div
    class="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
    id="dropdown-profile"
  >
    <div class="py-3 px-4 space-y-1">
      <span class="block text-sm font-semibold text-gray-900 dark:text-white">{{ name }}</span>
      <span class="block text-sm text-gray-900 truncate dark:text-white">{{ position }}</span>
      <span class="block text-sm text-gray-900 truncate dark:text-white">{{ phoneNumber }}</span>
    </div>
    <ul class="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="dropdown">
      <li>
        <RouterLink
          to="/dashboard/profile"
          class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
        >
          Thông tin cá nhân
        </RouterLink>
      </li>
      <li>
        <div
          class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
        >
          <button @click="signOut">Đăng xuất</button>
        </div>
      </li>
    </ul>
  </div>
  <!-- Dropdown menu -->
</template>

<script setup>
import { login } from '@/services/auth.js'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const toast = useToast()

async function onSubmit() {
  const success = await login(username.value, password.value)
  if (!success) {
    errorMessage.value = 'Invalid username or password. Please try again.'
  } else {
    toast.success('Đăng nhập thành công')
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="my-5">
      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Tên đăng nhập</label
      >
      <input
        type="text"
        id="username"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        v-model="username"
        placeholder="Vui lòng nhập tên đăng nhập"
        required
      />
    </div>
    <div class="mb-5">
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Mật khẩu</label
      >
      <input
        type="password"
        id="password"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        v-model="password"
        placeholder="Vui lòng nhập mật khẩu"
        required
      />
    </div>
    <button
      type="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Đăng nhập
    </button>

    <p v-if="errorMessage" class="text-red-500 pt-5">{{ errorMessage }}</p>
  </form>
</template>

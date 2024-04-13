<template>
  <div class="flex flex-row gap-2 justify-center items-center">
    <fwb-input
      v-model="query"
      @input="search"
      placeholder="Nhập tên món ăn cần tìm..."
      size="md"
      class="grow"
    >
      <template #prefix>
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
      </template>
    </fwb-input>

    <fwb-button size="sm" color="dark" @click="reset">
      <h1 class="px-2 p-1">Hủy</h1>
    </fwb-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FwbButton, FwbInput } from 'flowbite-vue'
import { useDishStore } from '@/stores/dishStore'

const dishStore = useDishStore()

const query = ref('')

let timeout

const search = async () => {
  if (timeout) {
    clearTimeout(timeout)
  }

  timeout = setTimeout(async () => {
    await dishStore.searchDish(query.value)
  }, 300)
}

const reset = () => {
  query.value = ''
}
</script>

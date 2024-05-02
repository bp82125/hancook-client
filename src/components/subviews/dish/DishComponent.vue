<template>
  <div class="overflow-x-auto p-2">
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-2 mb-5 bg-white p-5 rounded-lg w-full shadow-lg"
    >
      <DishSearchBarVue></DishSearchBarVue>
      <DishSort></DishSort>
      <DishCreateModalVue v-if="isAdmin"></DishCreateModalVue>
    </div>
    <div>
      <DishTypeList></DishTypeList>
      <DishTypeCreateModal v-if="isAdmin"></DishTypeCreateModal>
      <DishTypeUpdateModal v-if="isAdmin"></DishTypeUpdateModal>
      <DishTypeDeleteModal v-if="isAdmin"></DishTypeDeleteModal>

      <DishUpdateModal v-if="isAdmin"></DishUpdateModal>
      <DishDeleteModal v-if="isAdmin"></DishDeleteModal>
      <DishAddToOrder></DishAddToOrder>
    </div>
  </div>
</template>

<script setup>
import DishTypeList from './DishTypeList.vue'
import DishSearchBarVue from './DishSearchBar.vue'
import DishCreateModalVue from './DishCreateModal.vue'
import DishTypeCreateModal from './DishTypeCreateModal.vue'
import DishUpdateModal from './DishUpdateModal.vue'
import DishDeleteModal from './DishDeleteModal.vue'
import DishTypeUpdateModal from './DishTypeUpdateModal.vue'
import DishTypeDeleteModal from './DishTypeDeleteModal.vue'
import DishAddToOrder from './DishAddToOrder.vue'
import DishSort from './DishSort.vue'

import { computedAsync } from '@vueuse/core'
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'

const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchUser()
})

const isAdmin = computedAsync(async () => {
  return await userStore.isAdmin()
}, true)
</script>
./DishTypeList.vue./DishTypeCreateModal.vue

<template>
  <div class="overflow-x-auto p-2">
    <div class="flex justify-between mb-8 bg-white p-5 rounded-lg w-full">
      <DishSearchBarVue></DishSearchBarVue>
      <DishCreateModalVue></DishCreateModalVue>
    </div>
    <div>
      <DishTypeList></DishTypeList>
      <DishTypeCreateModal></DishTypeCreateModal>
      <DishTypeUpdateModal></DishTypeUpdateModal>
      <DishTypeDeleteModal></DishTypeDeleteModal>

      <DishUpdateModal></DishUpdateModal>
      <DishDeleteModal></DishDeleteModal>
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
</script>
./DishTypeList.vue./DishTypeCreateModal.vue

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 px-8 py-4 border bg-white">
    <table class="table-auto w-full text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700">
        <tr>
          <th scope="col" class="px-6 py-3 w-36 uppercase"></th>
          <th scope="col" class="px-6 py-3 text-center w-auto uppercase">Món ăn</th>
          <th scope="col" class="py-3 uppercase">Số lượng</th>
          <th scope="col" class="px-6 py-3 min-w-36 text-end uppercase">Giá</th>
          <th scope="col" class="px-9 py-3 w-32 text-center uppercase">Ghi chú</th>
          <th scope="col" class="py-3"><OrderAddDish></OrderAddDish></th>
        </tr>
      </thead>
      <tbody class="divide-y-2">
        <tr
          v-for="detail in details"
          :key="detail.dish.id"
          class="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th scope="row" class="px-6 py-4">
            <img :src="detail.dish.imagePath" class="w-24 h-24 rounded-lg object-cover" />
          </th>
          <td class="px-6 py-4">
            <div>
              <h2 class="font-semibold text-xl text-gray-900">
                {{ detail.dish.dishName }}
              </h2>
              <h2 class="font-thin text-md text-gray-600">
                {{ detail.dish.dishType.dishTypeName }}
              </h2>
            </div>
          </td>
          <td class="py-4">
            <div class="flex flex-row space-x-1 items-center justify-center" role="group">
              <button
                @click="decreaseQuantity(detail)"
                type="button"
                class="inline-flex details-center px-3 py-2 text-sm font-medium text-gray-900 bg-transparent hover:rounded-lg hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 12h14"
                  />
                </svg>
              </button>

              <input
                v-model="detail.quantity"
                type="number"
                class="px-4 py-2 w-14 border-0 text-sm text-center font-medium text-gray-900 bg-transparent hover:bg-gray-900 rounded-lg hover:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />

              <button
                @click="increaseQuantity(detail)"
                type="button"
                class="inline-flex details-center px-3 py-2 text-sm font-medium text-gray-900 bg-transparent hover:bg-gray-900 hover:rounded-lg hover:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 12h14m-7 7V5"
                  />
                </svg>
              </button>
            </div>
          </td>
          <td class="px-6 py-4 text-end font-semibold text-gray-900">
            {{ formatPrice(getTotalPrice(detail)) }}
          </td>

          <td class="px-6 py-4">
            <textarea
              v-model="detail.note"
              rows="3"
              placeholder="
                ..."
              class="align-text-top resize-none py-2 border-0 text-sm text-gray-700 bg-transparent hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </td>
          <td class="py-4 text-center">
            <div class="flex justify-around">
              <button
                @click="saveDetail(detail)"
                type="button"
                class="px-6 py-2 text-sm font-medium bg-blue-500 rounded-lg hover:bg-blue-700 text-white focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Lưu
              </button>
              <button
                @click="$emit('deleteDetail', detail)"
                type="button"
                class="px-6 py-2 text-sm font-medium bg-red-500 rounded-lg hover:bg-red-700 text-white focus:ring-4 focus:outline-none focus:ring-red-300"
              >
                Xoá
              </button>
            </div>
          </td>
        </tr>
        <tr
          class="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th scope="row" class="px-6 py-4"></th>
          <td class="px-6 py-4"></td>
          <td class="py-4"></td>
          <td class="px-6 py-4"></td>
          <td class="px-6 py-4"></td>
          <td class="py-4">
            <button
              @click="saveAllDetails()"
              class="block w-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Lưu tất cả
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import { useToast } from 'vue-toastification'
import OrderAddDish from './OrderAddDish.vue'

const toast = useToast()

const quantity = ref(1)
const orderStore = useOrderStore()

const details = computed(() => {
  return orderStore.order.details
})

watch(quantity, (newValue, oldValue) => {
  const parsedValue = parseInt(newValue, 10)
  if (isNaN(parsedValue) || parsedValue < 1) {
    quantity.value = 1
  } else if (parsedValue > 999) {
    quantity.value = 999
  }
})

const increaseQuantity = (detail) => {
  if (detail.quantity < 999) {
    detail.quantity++
  }
}

const decreaseQuantity = (detail) => {
  if (detail.quantity > 1) {
    detail.quantity--
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

const getTotalPrice = (detail) => {
  return detail.dish.price * detail.quantity
}

const saveDetail = async (detail) => {
  const response = await orderStore.updateDetail(detail)
  if (response.data.success) {
    toast.success('Chi tiết đơn món đã được lưu thành công')
  } else {
    toast.error('Chi tiết đơn món lưu thất bại')
  }
}

const saveAllDetails = async () => {
  const success = await orderStore.updateAllDetails()
  if (success) {
    toast.success('Tất cả chi tiết đơn món đã được lưu thành công')
  } else {
    toast.error('Chi tiết đơn món lưu thất bại')
  }
}
</script>

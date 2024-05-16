<template>
  <div class="flex flex-col items-center md:items-end">
    <div class="w-full md:w-fit my-5 mx-3 flex flex-col md:items-end md:float-end gap-2">
      <p class="font-medium text-2xl text-center md:text-end">
        Tổng cộng: {{ formatPrice(getTotal()) }}
      </p>
      <button
        @click="submitForm"
        class="w-full flex justify-center items-end gap-x-2 bg-gray-800 text-white py-2 px-4 focus:ring-4 focus:ring-gray-400 hover:bg-slate-700 mt-3 rounded-lg"
        type="button"
      >
        <svg
          class="w-[24px] h-[24px]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.2"
            d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
          />
        </svg>

        <h1>Đặt món</h1>
      </button>
    </div>
    <div>
      <p class="font-semibold text-red-500">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useCartItemStore } from '@/stores/cartItemStore'
import { useUserStore } from '@/stores/userStore'
import { errorMessages } from 'vue/compiler-sfc'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()

const router = useRouter()

const cartItemStore = useCartItemStore()
const userStore = useUserStore()

const errorMessage = ref('')

onUnmounted(async () => {
  errorMessage.value = ''
  await userStore.fetchUser()
})

const details = computed(() => {
  return cartItemStore.order.details
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

const getTotalPrice = (item) => {
  return item.dish.price * item.quantity
}

const getTotal = () => {
  if (details.value.length <= 0) {
    return 0
  } else {
    return details.value.reduce((acc, item) => acc + getTotalPrice(item), 0)
  }
}

const submitForm = async () => {
  cartItemStore.order.employeeId = userStore.user.id

  if (!cartItemStore.order.table) {
    errorMessage.value = 'Bạn chưa chọn bàn để đặt đơn món'
    return
  }
  if (cartItemStore.order.details.length <= 0) {
    errorMessage.value = 'Bạn chưa chọn món ăn nào để đặt đơn'
    return
  }

  const response = await cartItemStore.createOrder()

  if (response.data.success) {
    await router.push({ name: 'order', params: { tableId: response.data.data.table.id } })
    toast.success('Đơn món được tạo thành công')
  } else {
    await router.push({ name: 'dish' })
    toast.error('Đơn món tạo thất bại')
  }
  errorMessages.value = ''
}
</script>
@/stores/cartStore

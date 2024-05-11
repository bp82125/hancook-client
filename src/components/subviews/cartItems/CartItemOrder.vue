<template>
  <div class="flex flex-col items-end">
    <div class="w-fit my-5 mx-3 flex flex-col items-end float-end gap-2">
      <p class="font-medium text-2xl text-end">Tổng cộng: {{ formatPrice(getTotal()) }}</p>
      <button
        @click="submitForm"
        class="w-full bg-gray-900 text-white inline-block py-2 px-4 focus:ring-4 focus:ring-gray-400 hover:bg-slate-700 mt-3 rounded-lg"
        type="button"
      >
        Đặt món
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

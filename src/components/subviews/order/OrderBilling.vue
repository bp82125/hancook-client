<template>
  <button
    @click="showModal"
    class="w-full flex justify-center items-center gap-x-2 bg-gray-900 text-white py-2 px-4 focus:ring-4 focus:ring-gray-400 hover:bg-slate-700 mt-3 rounded-lg"
    type="button"
  >
    <svg
      class="w-[20px] h-[20px]"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fill-rule="evenodd"
        d="M4 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4Zm0 6h16v6H4v-6Z"
        clip-rule="evenodd"
      />
      <path
        fill-rule="evenodd"
        d="M5 14a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm5 0a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Z"
        clip-rule="evenodd"
      />
    </svg>
    Thanh toán
  </button>

  <div
    id="orderPaymentModal"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Thanh toán đơn món</h3>
          <button
            @click="closeModal"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5 text-center">
          <form @submit.prevent="submitForm" id="orderPaymentForm">
            <fieldset class="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div class="sm:col-span-2">
                <label
                  for="payment"
                  class="block mb-2 text-sm text-start font-medium text-gray-900 dark:text-white"
                  >Nhập số tiền của khách hàng</label
                >
                <input
                  v-model="payment"
                  :class="{
                    '!border-red-500 focus:!border-red-600 focus:!ring-red-500': paymentNotEnough
                  }"
                  type="number"
                  name="payment"
                  id="paymentInput"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Nhập số tiền khách hàng thanh toán..."
                  required
                />
                <p v-if="paymentNotEnough" class="text-left text-red-500 text-sm !mt-1">
                  Số tiền của khách hàng phải lớn hơn hoặc bằng tổng giá trị đơn món, bao gồm cả
                  thuế.
                </p>
              </div>
            </fieldset>
          </form>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            form="orderPaymentForm"
            type="submit"
            class="text-white flex justify-center items-end gap-x-2 w-full bg-gray-800 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            <h1>Thanh toán</h1>
          </button>
          <button
            @click="closeModal"
            type="button"
            class="py-2.5 w-full px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Modal } from 'flowbite'
import { ref, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import { useUserStore } from '@/stores/userStore'
import { useToast } from 'vue-toastification'
const toast = useToast()

const userStore = useUserStore()

let modal

const router = useRouter()
const orderStore = useOrderStore()

onMounted(async () => {
  const $modalElement = document.querySelector('#orderPaymentModal')
  const modalOptions = {
    backdrop: 'static',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
  }

  if ($modalElement) {
    modal = new Modal($modalElement, modalOptions)
  }
  await userStore.fetchUser()
})

const user = computed(() => {
  return userStore.user
})

const showModal = () => {
  modal.show()
}

const closeModal = () => {
  payment.value = 0
  paymentNotEnough.value = false
  modal.hide()
}

const payment = ref(0)
const paymentNotEnough = ref(false)

watchEffect(() => {
  if (payment.value < 0) {
    payment.value = 0 // Ensure it's always larger than 1.0
  }
})

const submitForm = async () => {
  const totalPrice = orderStore.calculateTotalPrice()
  if (totalPrice > payment.value) {
    paymentNotEnough.value = true
    return
  } else {
    paymentNotEnough.value = false
    const data = {
      employeeId: user.value.id,
      customerPayment: payment.value
    }
    const response = await orderStore.payOrder(data)
    if (response.data.success) {
      toast.success('Thanh toán hóa đơn thành công')
      closeModal()
      router.push({ name: 'invoiceDetail', params: { invoiceId: response.data.data.id } })
    } else {
      toast.error('Thanh toán hóa đơn thất bại')
    }
  }
}
</script>

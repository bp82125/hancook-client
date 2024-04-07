<template>
  <div class="flex justify-end items-center">
    <button
      data-modal-target="createExpenseModal"
      data-modal-toggle="createExpenseModal"
      class="flex items-center gap-2 bg-blue-500 p-3 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-3 py-3 text-center"
    >
      <svg
        class="w-[18px] h-[18px] text-white dark:text-white me-1 pt-0.5"
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
      <div class="text-white">Thêm chi tiêu</div>
    </button>

    <div
      id="createExpenseModal"
      data-modal-backdrop="static"
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
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Thêm chi tiêu</h3>
            <button
              type="button"
              class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="createExpenseModal"
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
          <div class="p-4 md:p-5">
            <form class="space-y-4" @submit.prevent="submitForm" id="createExpenseForm">
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Tên chi tiêu</label
                >
                <input
                  v-model="name"
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Vd: Mua sốt mì cay"
                  required
                />
              </div>

              <div>
                <label
                  for="amount"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Số tiền chi</label
                >
                <input
                  v-model="amount"
                  type="number"
                  name="amount"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Vd: 900000"
                  required
                />
              </div>

              <div>
                <label
                  for="note"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Nội dung chi tiêu</label
                >
                <textarea
                  v-model="note"
                  id="note"
                  rows="4"
                  class="block p-2.5 w-full text-sm resize-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Thông tin chi tiết về chi tiêu..."
                ></textarea>
              </div>

              <div class="flex flex-row gap-x-2">
                <button
                  form="createExpenseForm"
                  data-modal-hide="createExpenseModal"
                  type="submit"
                  class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Thêm
                </button>

                <button
                  data-modal-hide="createExpenseModal"
                  type="button"
                  class="hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-black border"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { initModals } from 'flowbite'
import { ref, onMounted, computed } from 'vue'
import { useExpenseStore } from '@/stores/expenseStore'
import { useUserStore } from '@/stores/userStore'

onMounted(() => {
  initModals()
  userStore.fetchUser()
})

const expenseStore = useExpenseStore()
const userStore = useUserStore()

const user = computed(() => {
  return userStore.user
})

const name = ref('')
const amount = ref(0)
const note = ref('')

const resetModal = () => {
  name.value = ''
  amount.value = 0
  note.value = ''
}

const submitForm = async () => {
  const data = {
    employeeId: user.value.id,
    name: name.value,
    amount: amount.value,
    note: note.value
  }
  const response = await expenseStore.createExpense(data)
  resetModal()
  console.log(response)
}
</script>

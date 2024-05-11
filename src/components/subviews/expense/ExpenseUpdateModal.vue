<template>
  <div
    id="updateExpenseModal"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Chỉnh sửa chi tiêu</h3>
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
        <div class="p-4 md:p-5 space-y-4">
          <form @submit.prevent="submitForm" id="updateExpenseForm">
            <fieldset class="grid gap-4 grid-cols-1">
              <div>
                <label
                  for="nameExpenseUpdate"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Tên chi tiêu</label
                >
                <input
                  v-model="name"
                  type="text"
                  name="name"
                  id="nameExpenseUpdate"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Vd: Mua sốt mì cay"
                  required
                />
              </div>

              <div>
                <label
                  for="amountExpenseUpdate"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Số tiền chi</label
                >
                <input
                  v-model="amount"
                  type="number"
                  name="amountExpenseUpdate"
                  id="amountExpenseUpdate"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Vd: 900000"
                  required
                />
              </div>

              <div v-if="amountSmallerZero">
                <h1 class="text-red-500">Số tiền chi phải lớn hơn 0</h1>
              </div>

              <div>
                <label
                  for="noteExpenseUpdate"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Nội dung chi tiêu</label
                >
                <textarea
                  v-model="note"
                  id="noteExpenseUpdate"
                  rows="4"
                  class="block p-2.5 w-full text-sm resize-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Thông tin chi tiết về chi tiêu..."
                ></textarea>
              </div>
            </fieldset>
          </form>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            form="updateExpenseForm"
            type="submit"
            class="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Lưu
          </button>
          <button
            @click="closeModal"
            type="button"
            class="w-full py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Huỷ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'flowbite'
import { useExpenseStore } from '@/stores/expenseStore'
import { useToast } from 'vue-toastification'

const toast = useToast()

/**********                  data         *********** */
const expenseStore = useExpenseStore()
const id = ref('')
const name = ref('')
const amount = ref(0)
const note = ref('')
const employee = ref(null)
const amountSmallerZero = ref(false)
/**********                  data         *********** */

/**********                  modal        *********** */
let modal
onMounted(() => {
  const $modalElement = document.querySelector('#updateExpenseModal')
  const modalOptions = {
    backdrop: 'static',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
  }

  if ($modalElement) {
    modal = new Modal($modalElement, modalOptions)
  }
})

const closeModal = () => {
  id.value = ''
  name.value = ''
  amount.value = 0
  note.value = ''
  employee.value = null
  amountSmallerZero.value = false
  modal.toggle()
}

const openModal = (expense) => {
  id.value = expense.id
  name.value = expense.name
  amount.value = expense.amount
  note.value = expense.note
  employee.value = expense.employee
  amountSmallerZero.value = false
  modal.toggle()
}

defineExpose({ openModal })
/**********             modal        *********** */

/**********             form        *********** */
const submitForm = async () => {
  if (amount.value <= 0) {
    amountSmallerZero.value = true
    return
  }

  const expenseData = {
    employeeId: employee.value.id,
    name: name.value,
    amount: amount.value,
    note: note.value
  }
  const response = await expenseStore.updateExpense(id.value, expenseData)
  if (response.data.success) {
    toast.success(`Chi tiêu ${name.value} cập nhật thành công`)
  } else {
    toast.error(`Chi tiêu ${name.value} cập nhật thất bại`)
  }
  closeModal()
}
/**********             form        *********** */
</script>

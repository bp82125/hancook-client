<template>
  <div
    id="expenseInfoModal"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full" id="expenseInfo">
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <div class="flex justify-between items-center pb-4 rounded-t border-b dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Chi tiết chi tiêu</h3>
          <div class="flex gap-x-2">
            <button
              data-html2canvas-ignore="true"
              @click="downloadExpense"
              id="downloadExpenseInfo"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                class="w-5 h-5"
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
                  stroke-width="2"
                  d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
                />
              </svg>

              <span class="sr-only">Download expense</span>
            </button>
            <button
              data-html2canvas-ignore="true"
              @click="closeModal"
              id="closeModal"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
        </div>
        <div class="py-3">
          <div class="my-2">
            <h6 class="text-sm font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              Mã chi tiêu
            </h6>
            <p>{{ id }}</p>
          </div>

          <div class="my-2">
            <h6 class="text-sm font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              Tên chi tiêu
            </h6>
            <p>{{ name }}</p>
          </div>

          <div class="my-2">
            <h6 class="text-sm font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              Chi tiết chi tiêu
            </h6>
            <p>{{ note }}</p>
          </div>

          <div class="my-2">
            <h6 class="text-sm font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              Nhân viên lập
            </h6>
            <p>{{ employee }}</p>
          </div>

          <div class="my-2">
            <h6 class="text-sm font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              Số tiền chi
            </h6>
            <p>{{ formatAmount(amount) }}</p>
          </div>

          <div class="my-2">
            <h6 class="text-sm font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              Thời gian lập
            </h6>
            <p>{{ formatDateTime(dateTime) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'flowbite'
import { format } from 'date-fns'
import html2canvas from 'html2canvas'
import { useToast } from 'vue-toastification'

const toast = useToast()

let modal

onMounted(() => {
  const $modalElement = document.querySelector('#expenseInfoModal')
  const modalOptions = {
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
  }

  if ($modalElement) {
    modal = new Modal($modalElement, modalOptions)
  }
})

const id = ref('')
const name = ref('')
const note = ref('')
const amount = ref('')
const employee = ref('')
const dateTime = ref('2024-04-03T00:44:36')

const openModal = (expense) => {
  id.value = expense.id
  name.value = expense.name
  note.value = expense.note
  amount.value = expense.amount
  dateTime.value = expense.dateTime
  employee.value = expense.employee.name
  modal.toggle()
}

const closeModal = () => {
  id.value = ''
  name.value = ''
  note.value = ''
  amount.value = ''
  dateTime.value = '2024-04-03T00:44:36'
  employee.value = ''
  modal.toggle()
}

const formatAmount = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

const formatDateTime = (dateTime) => {
  const parsedDateTime = new Date(dateTime)

  return format(parsedDateTime, 'dd/MM/yyyy - HH:mm')
}

const downloadExpense = async () => {
  const expenseElement = document.getElementById('expenseInfo')
  if (!expenseElement) return

  try {
    const scale = 5 // Set scale factor here
    const canvas = await html2canvas(expenseElement, { scale: scale })
    const imageData = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = imageData
    a.download = `invoice_${id.value}.png`
    a.click()
    toast.success('Tải xuống thành công')
  } catch (error) {
    console.error('Error generating invoice:', error)
    toast.error('Tải xuống thất bại')
  }
}

defineExpose({ openModal })
</script>

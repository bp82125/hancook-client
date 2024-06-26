<script setup>
import { ref, computed, onMounted, watch, watchEffect } from 'vue'
import { useDishTypeStore } from '@/stores/dishTypeStore'
import { useDishStore } from '@/stores/dishStore'
import { useFileDialog } from '@vueuse/core'
import { Modal } from 'flowbite'
import { uploadImage } from '@/services/image'
import { useToast } from 'vue-toastification'

import { FwbSpinner } from 'flowbite-vue'

const dishTypeStore = useDishTypeStore()
const dishStore = useDishStore()

const name = ref('')
const price = ref(0)
const dishType = ref('')

const toast = useToast()

watchEffect(() => {
  if (price.value < 0 || !price.value) {
    price.value = 0
  }
})

let modal
onMounted(async () => {
  const $modalElement = document.querySelector('#createDishModal')
  const modalOptions = {
    backdrop: 'static',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
  }

  if ($modalElement) {
    modal = new Modal($modalElement, modalOptions)
  }

  await dishTypeStore.fetchDishTypes()
})

const openModal = () => {
  modal.toggle()
}

const resetData = () => {
  name.value = ''
  price.value = 0
  dishType.value = ''
  loadedImageUrl.value = null
  isSubmitting.value = false
  isFileLoading.value = false
  isSelectedImage.value = false
  isPriceLargerThan0.value = false
  reset()
}

const closeModal = () => {
  resetData()
  modal.toggle()
}

const dishTypes = computed(() => {
  return dishTypeStore.dishTypes
})

const { files, open, reset } = useFileDialog()
const loadedImageUrl = ref(null)
const isFileLoading = ref(false)
const isSelectedImage = ref(false)
const isPriceLargerThan0 = ref(false)

watch(files, async (newFiles) => {
  if (newFiles.length) {
    const url = await URL.createObjectURL(newFiles[0])
    loadedImageUrl.value = url
    isFileLoading.value = true
  } else {
    removePreviewImage()
    isFileLoading.value = false
  }
})

const removePreviewImage = () => {
  loadedImageUrl.value = null
  reset()
}

const isSubmitting = ref(false)
const submitForm = async () => {
  console.log(price.value)
  if (price.value == 0) {
    isPriceLargerThan0.value = true
    return
  }
  isPriceLargerThan0.value = false

  const checkImage = files.value
  if (checkImage) {
    isSubmitting.value = true
    isSelectedImage.value = false
    const data = checkImage.item(0)
    const url = await uploadImage(data, data.name)

    const dishData = {
      dishName: name.value,
      price: price.value,
      dishTypeId: dishType.value,
      imagePath: url.value
    }

    const response = await dishStore.createDish(dishData)
    if (response.data.success) {
      toast.success('Thêm món ăn thành công')
    } else {
      toast.error('Thêm món ăn thất bại')
    }
    closeModal()
  } else {
    isSelectedImage.value = true
  }
}
</script>

<template>
  <div class="flex justify-end order-first md:order-none">
    <button
      @click="openModal"
      id="createDishButton"
      type="button"
      class="flex justify-center items-center w-full md:max-w-40 gap-2 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <svg
        class="w-[18px] h-[18px] text-white dark:text-white"
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
      <div class="text-white">Thêm món ăn</div>
    </button>

    <div
      id="createDishModal"
      tabindex="-1"
      aria-hidden="true"
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
    >
      <div class="relative p-4 w-full max-w-xl max-h-full">
        <!-- Modal content -->
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <!-- Modal header -->
          <div
            class="flex justify-between items-center py-2 rounded-t border-b md:mb-5 dark:border-gray-600"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Thêm món ăn</h3>
            <button
              @click="closeModal"
              type="button"
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
          <!-- Modal body -->
          <form @submit.prevent="submitForm">
            <fieldset class="grid gap-2 sm:grid-cols-2 md:gap-6">
              <div class="sm:col-span-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Tên món ăn</label
                >
                <input
                  v-model="name"
                  type="text"
                  name="name"
                  id="nameInputCreate"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Nhập tên món ăn..."
                  required
                  :disabled="isSubmitting"
                />
              </div>
              <div class="w-full">
                <label
                  for="price"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Giá</label
                >
                <input
                  v-model="price"
                  type="number"
                  name="price"
                  id="priceInput"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder
                  required
                  :disabled="isSubmitting"
                />
                <div v-if="isPriceLargerThan0">
                  <h1 class="text-red-500">Giá món ăn phải lớn hơn 0</h1>
                </div>
              </div>

              <div class="w-full">
                <label
                  for="dishTypeSelect"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Loại món ăn</label
                >
                <select
                  v-model="dishType"
                  id="dishTypeSelect"
                  :disabled="isSubmitting"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option v-for="dishType in dishTypes" :key="dishType.id" :value="dishType.id">
                    {{ dishType.dishTypeName }}
                  </option>
                </select>
              </div>

              <div class="sm:col-span-2 mt-5">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Ảnh món ăn</label
                >

                <template v-if="loadedImageUrl">
                  <div class="flex flex-row items-center group-hover:opacity-75">
                    <button type="button" @click="open({ accept: 'image/*' })" class="flex">
                      <img
                        class="w-12 h-12 rounded-lg"
                        :src="loadedImageUrl"
                        alt="Selected Image Preview"
                      />
                      <div class="mx-3">
                        <h1 class="text-start line-clamp-1">{{ files.item(0).name }}</h1>
                        <h1 class="text-start text-sm opacity-75">
                          {{ (files.item(0).size / (1024 * 1024)).toFixed(2) }} MB
                        </h1>
                      </div>
                    </button>

                    <button type="button" @click="removePreviewImage">
                      <svg
                        class="w-[18px] h-[18px] text-gray-800 dark:text-white"
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
                          d="M6 18 18 6m0 12L6 6"
                        />
                      </svg>
                    </button>
                  </div>
                </template>
                <template v-else>
                  <button type="button" @click="open({ accept: 'image/*' })" class="w-full">
                    <div class="flex items-center justify-center w-full">
                      <div
                        class="flex flex-col items-center justify-center w-full h-40 md:h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div class="flex flex-col items-center justify-center p-4 md:pt-5 md:pb-6">
                          <svg
                            class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">Ấn vào để chọn ảnh</span> hoặc kéo và thả
                            ảnh tại đây
                          </p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            PNG, JPG or JPEG (Tối đa 1000x1000px)
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                </template>
                <div v-if="isSelectedImage">
                  <h1 class="text-red-500">Bạn chưa chọn ảnh cho món ăn</h1>
                </div>
              </div>

              <template v-if="isSubmitting">
                <button
                  disabled
                  type="submit"
                  class="mt-4 flex justify-center text-white bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center opacity-85"
                >
                  <fwb-spinner size="6" color="white" />
                </button>
              </template>

              <template v-else>
                <button
                  type="submit"
                  class="mt-4 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Thêm
                </button>
              </template>

              <button
                @click="closeModal"
                type="button"
                class="mt-4 text-gray-800 border hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                Hủy
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

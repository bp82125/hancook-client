<template>
  <div
    id="updateDishModal"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Chỉnh sửa món ăn</h3>
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
          <form @submit.prevent="submitForm" id="updateDishForm">
            <fieldset class="grid gap-4 sm:grid-cols-2 sm:gap-6">
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
                  id="nameInput"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=""
                  required
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
                />
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
                    <button type="button" @click="open({ accept: 'image/*' })">
                      <div class="flex items-center">
                        <!-- Added container div -->
                        <img
                          class="w-12 h-12 object-cover rounded-lg"
                          :src="loadedImageUrl"
                          alt="Selected Image Preview"
                        />
                        <div class="mx-3">
                          <h1>{{ files.item(0).name }}</h1>
                          <h1 class="text-start text-sm opacity-75">
                            {{ (files.item(0).size / (1024 * 1024)).toFixed(2) }} MB
                          </h1>
                        </div>
                      </div>
                    </button>

                    <button type="button" @click="removePreviewImage" class="ms-3 p-4">
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
                        class="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
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
              </div>
            </fieldset>
          </form>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            form="updateDishForm"
            type="submit"
            class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Lưu
          </button>
          <button
            @click="closeModal"
            type="button"
            class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Huỷ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect, watch } from 'vue'
import { Modal } from 'flowbite'
import { useModalStore } from '@/stores/modalStore'
import { useDishTypeStore } from '@/stores/dishTypeStore'
import { useDishStore } from '@/stores/dishStore'
import { useFileDialog } from '@vueuse/core'
import { updateImage } from '@/services/image'
import { useToast } from 'vue-toastification'

const toast = useToast()

/**********                  data         *********** */
const dishStore = useDishStore()
const dishTypeStore = useDishTypeStore()
const name = ref('')
const price = ref()
const dishType = ref()

const dishTypes = computed(() => {
  return dishTypeStore.dishTypes
})
/**********                  data         *********** */

/**********                  modal        *********** */
let modal
onMounted(() => {
  const $modalElement = document.querySelector('#updateDishModal')
  const modalOptions = {
    backdrop: 'static',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
  }

  if ($modalElement) {
    modal = new Modal($modalElement, modalOptions)
  }
  dishTypeStore.fetchDishTypes()
})

const modalStore = useModalStore()
const updateDish = computed(() => {
  return modalStore.updateDish
})

watchEffect(() => {
  if (updateDish.value) {
    modal.toggle()
    name.value = modalStore.data.dishName
    price.value = modalStore.data.price
    dishType.value = modalStore.data.dishType.id
  }
})

const closeModal = () => {
  modalStore.$reset()
  name.value = ''
  price.value = null
  dishType.value = ''
  removePreviewImage()
  modal.toggle()
}
/**********             modal        *********** */

/**********             file        *********** */
const { files, open, reset } = useFileDialog()
const loadedImageUrl = ref(null)

watch(files, async (newFiles) => {
  if (newFiles.length) {
    const url = await URL.createObjectURL(newFiles[0])
    loadedImageUrl.value = url
  } else {
    removePreviewImage()
  }
})

const removePreviewImage = () => {
  loadedImageUrl.value = null
  reset()
}
/**********             file        *********** */

/**********             form        *********** */
const submitForm = async () => {
  const dishData = {
    dishName: name.value,
    price: price.value,
    dishTypeId: dishType.value
  }

  if (loadedImageUrl.value) {
    const imageData = files.value.item(0)
    let updatedImageUrl = null
    updatedImageUrl = await updateImage(imageData, imageData.name, modalStore.data.imagePath)
    dishData.imagePath = updatedImageUrl
  } else {
    dishData.imagePath = modalStore.data.imagePath
  }

  const response = dishStore.updateDish(modalStore.data.id, dishData)
  if (response.data.success) {
    toast.success('Cập nhật món ăn thành công')
  } else {
    toast.error('Cập nhật món ăn thất bại')
  }

  closeModal()
}
/**********             form        *********** */
</script>

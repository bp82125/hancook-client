<template>
  <button
    id="cart-button"
    type="button"
    class="p-2 mr-1 text-gray-500 rounded-full hover:text-gray-900 hover:bg-gray-100"
  >
    <span class="sr-only">View cart items</span>
    <svg
      class="w-6 h-6 text-gray-800 dark:text-white"
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
        d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.3L19 7H7.3"
      />
    </svg>
  </button>
</template>

@/stores/cartStore

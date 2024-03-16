<script setup>
import LoginForm from './LoginForm.vue'
</script>

<template>
  <div class="min-w-full container flex justify-center">
    <div
      class="w-full sm:w-1/2 lg:w-1/3 p-8 mx-3 bg-white border rounded-md shadow-lg border-slate-200"
    >
      <div class="inline-flex justify-center min-w-full mt-3 mb-7">
        <img src="/logo.png" class="mr-3 h-10 md:h-9" alt="Flowbite Logo" />
        <span
          class="self-center text-xl md:text-3xl font-semibold whitespace-nowrap dark:text-white"
          >Hancook</span
        >
      </div>
      <hr />
      <LoginForm></LoginForm>
    </div>
  </div>
</template>

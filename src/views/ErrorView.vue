<template>
  <div class="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
    <div class="rounded-lg bg-white p-8 text-center shadow-xl mx-3">
      <h1 class="mb-4 text-4xl font-bold">404</h1>
      <p class="text-gray-600">Oops! Không thể truy cập trang bạn muốn chuyển hướng đến.</p>
      <RouterLink
        to="/dashboard"
        class="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
      >
        Quay lại trang chủ
      </RouterLink>
    </div>
  </div>
</template>

<script setup></script>

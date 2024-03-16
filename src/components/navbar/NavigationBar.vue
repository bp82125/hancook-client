<script setup>
import SidebarButton from './SidebarButton.vue'
import ProfileButton from './ProfileButton.vue'
import CartButton from './CartButton.vue'
</script>

<template>
  <header>
    <nav
      class="shadow-lg left-0 right-0 top-0 fixed z-50 px-4 py-2.5 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex flex-wrap justify-between items-center">
        <div class="flex justify-start items-center">
          <!-- Sidebar button -->
          <SidebarButton></SidebarButton>
          <!-- Sidebar button -->

          <!-- Brand logo and name -->
          <RouterLink to="/dashboard/" class="inline-flex mx-3">
            <img src="/logo.png" class="mr-3 h-8 md:h-9" alt="Flowbite Logo" />
            <span
              class="self-center text-xl md:text-2xl font-semibold whitespace-nowrap dark:text-white"
              >Hancook</span
            >
          </RouterLink>
        </div>
        <!-- Brand logo and name -->

        <!-- Profile button -->
        <div class="flex items-center lg:order-2">
          <CartButton></CartButton>

          <ProfileButton></ProfileButton>
        </div>
        <!-- Profile button -->
      </div>
    </nav>
  </header>
</template>

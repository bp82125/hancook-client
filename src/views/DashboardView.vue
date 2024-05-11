<script setup>
import { RouterView } from 'vue-router'
import NavigationBar from '@/components/navbar/NavigationBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import SidebarMain from '@/components/sidebar/SidebarMain.vue'
import CartDropdown from '@/components/navbar/CartDropdown.vue'
import ProfileDropdown from '@/components/navbar/ProfileDropdown.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-200">
    <NavigationBar></NavigationBar>
    <CartDropdown></CartDropdown>
    <ProfileDropdown></ProfileDropdown>
    <SidebarMain></SidebarMain>
    <div class="flex flex-1 p-2 md:p-4 lg:ml-64 h-auto mt-16">
      <RouterView></RouterView>
    </div>

    <FooterComponent></FooterComponent>
  </div>
</template>

<style scoped></style>

<script setup>
import { RouterView } from 'vue-router'
import NavigationBar from '@/components/navbar/NavigationBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import SidebarMain from '@/components/sidebar/SidebarMain.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-200">
    <NavigationBar></NavigationBar>
    <SidebarMain></SidebarMain>
    <div class="flex flex-1 p-4 sm:ml-64 h-auto pt-20">
      <RouterView></RouterView>
    </div>

    <FooterComponent></FooterComponent>
  </div>
</template>

<style scoped></style>

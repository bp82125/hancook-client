<template>
  <aside
    id="logo-sidebar"
    class="fixed shadow-lg top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full pt-20 bg-gray-50 border-r border-gray-200 lg:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div class="flex h-full px-3 pb-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul class="space-y-3 w-full">
        <li>
          <SidebarComponent v-if="isAdmin" path="/dashboard/home" name="TỔNG QUAN">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.2"
              d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"
            />
          </SidebarComponent>
        </li>

        <li>
          <SidebarComponent path="/dashboard/dish" name="MENU">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.2"
              d="M12 6v13m0-13c-2.8-.8-4.7-1-8-1a1 1 0 0 0-1 1v11c0 .6.5 1 1 1 3.2 0 5 .2 8 1m0-13c2.8-.8 4.7-1 8-1 .6 0 1 .5 1 1v11c0 .6-.5 1-1 1-3.2 0-5 .2-8 1"
            />
          </SidebarComponent>
        </li>

        <li>
          <SidebarComponent path="/dashboard/table" name="BÀN">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.2"
              d="M15 5v14M9 5v14M4 5h16c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V6c0-.6.4-1 1-1Z"
            />
          </SidebarComponent>
        </li>

        <li>
          <SidebarComponent v-if="isAdmin" path="/dashboard/expense" name="CHI TIÊU">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.2"
              d="m16.2 19 4.8-7-4.8-7H3l4.8 7L3 19h13.2Z"
            />
          </SidebarComponent>
        </li>

        <li>
          <SidebarComponent path="/dashboard/invoice" name="HOÁ ĐƠN">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.2"
              d="M9 8h6m-6 4h6m-6 4h6M6 3v18l2-2 2 2 2-2 2 2 2-2 2 2V3l-2 2-2-2-2 2-2-2-2 2-2-2Z"
            />
          </SidebarComponent>
        </li>

        <li>
          <SidebarComponent v-if="isAdmin" path="/dashboard/staff" name="NHÂN VIÊN">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="1.2"
              d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3a2.5 2.5 0 1 1 2-4.5M19.5 17h.5c.6 0 1-.4 1-1a3 3 0 0 0-3-3h-1m0-3a2.5 2.5 0 1 0-2-4.5m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3c0 .6-.4 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
            />
          </SidebarComponent>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import SidebarComponent from './SidebarComponent.vue'
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import { useUserStore } from '@/stores/userStore'
import { computedAsync } from '@vueuse/core'

const userStore = useUserStore()

onMounted(async () => {
  initFlowbite()
  await userStore.fetchUser()
})

const isAdmin = computedAsync(async () => {
  return await userStore.isAdmin()
}, true)
</script>

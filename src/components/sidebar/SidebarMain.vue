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
              stroke-width="1.8"
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
              stroke-width="1.8"
              d="M12 6v13m0-13c-2.8-.8-4.7-1-8-1a1 1 0 0 0-1 1v11c0 .6.5 1 1 1 3.2 0 5 .2 8 1m0-13c2.8-.8 4.7-1 8-1 .6 0 1 .5 1 1v11c0 .6-.5 1-1 1-3.2 0-5 .2-8 1"
            />
          </SidebarComponent>
        </li>

        <li>
          <SidebarComponent path="/dashboard/table" name="BÀN">
            <!-- <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M15 5v14M9 5v14M4 5h16c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V6c0-.6.4-1 1-1Z"
            /> -->
            <!-- <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M18.76,6l2,4H3.24l2-4H18.76M20,4H4L1,10v2H3v7H5V16H19v3h2V12h2V10L20,4ZM5,14V12H19v2Z"
            /> -->

            <g fill="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <path
                fill="currentColor"
                d="M22 7.5C22 5.57 17.52 4 12 4S2 5.57 2 7.5c0 1.81 3.95 3.31 9 3.48V15H9.35c-.82 0-1.55.5-1.86 1.26L6 20h2l1.2-3h5.6l1.2 3h2l-1.5-3.74c-.3-.76-1.04-1.26-1.85-1.26H13v-4.02c5.05-.17 9-1.67 9-3.48zM12 6c4.05 0 6.74.86 7.72 1.5C18.74 8.14 16.05 9 12 9s-6.74-.86-7.72-1.5C5.26 6.86 7.95 6 12 6z"
              />
            </g>
          </SidebarComponent>
        </li>

        <li>
          <SidebarComponent v-if="isAdmin" path="/dashboard/expense" name="CHI TIÊU">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
            />
          </SidebarComponent>
        </li>

        <li>
          <SidebarComponent path="/dashboard/invoice" name="HOÁ ĐƠN">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M10 3v4a1 1 0 0 1-1 1H5m8-2h3m-3 3h3m-4 3v6m4-3H8M19 4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1ZM8 12v6h8v-6H8Z"
            />
          </SidebarComponent>
        </li>

        <li>
          <SidebarComponent v-if="isAdmin" path="/dashboard/staff" name="NHÂN VIÊN">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="1.8"
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

<template>
  <div class="flex justify-between">
    <h1 class="text-2xl lg:text-6xl font-black text-white">App Salon</h1>
    <div class="flex flex-col space-y-5">
      <div class="flex gap-2 items-center justify-end">
        <p class="text-white text-right">Hi: User</p>
        <button
          type="button"
          class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-extrabold rounded-lg transition-colors"
        >
          Log Out
        </button>
      </div>
      <nav class="flex gap-2 justify-end items-center">
        <button
          type="button"
          class="p-3 text-gray-200 uppercase text-xs font-black rounded-lg"
        >
          My Appointments
        </button>
        <RouterLink
          :to="{ name: 'new-appointment' }"
          class="p-3 text-gray-200 uppercase text-xs font-black rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
          >New Appointment</RouterLink
        >
      </nav>
    </div>
  </div>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>

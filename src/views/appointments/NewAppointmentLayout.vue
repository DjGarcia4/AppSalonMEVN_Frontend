<template>
  <nav class="my-5 flex gap-3">
    <RouterLink
      :to="{ name: 'new-appointment' }"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white transition-colors rounded-lg"
      :class="
        route.name === 'new-appointment'
          ? 'bg-blue-600 text-white'
          : 'bg-white text-blue-500'
      "
      >Servicios</RouterLink
    >
    <RouterLink
      :to="{ name: 'appointment-details' }"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white transition-colors rounded-lg"
      :class="
        route.name === 'appointment-details'
          ? 'bg-blue-600 text-white'
          : 'bg-white text-blue-500'
      "
      >Cita y Resumen</RouterLink
    >
  </nav>
  <main class="space-y-5">
    <RouterView />
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { useAppointmentsStore } from "@/stores/appointments";
import { RouterView, RouterLink, useRoute } from "vue-router";
const route = useRoute();
const appointments = useAppointmentsStore();
onMounted(() => {
  appointments.clearAppointmentData();
});
</script>

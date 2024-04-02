<template>
  <h2 class="text-4xl font-extrabold text-white">Mis Citas</h2>
  <p class="text-white text-lg">Podras administrar tus proximas citas.</p>
  <p v-if="user.loading" class="text-white text-2xl text-center mt-5">
    Cargando...
  </p>
  <div v-else>
    <p v-if="user.noAppintments" class="text-white text-2xl text-center mt-5">
      No tienes proximas citas aún.
    </p>
    <div v-else class="grid grid-cols-1 gap-5 mt-10">
      <Appointment
        v-for="appointment in user.userAppointments"
        :key="appointment._id"
        :appointment="appointment"
      />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user.js";
import Appointment from "../../components/Appointment.vue";
const user = useUserStore();
</script>

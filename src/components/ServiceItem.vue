<template>
  <div
    @click="appointments.onServiceSelected(service)"
    class="p-5 space-y-5 rounded-lg cursor-pointer text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
    :class="
      appointments.isServiceSelected(service._id)
        ? 'bg-blue-600 text-white'
        : 'bg-white'
    "
  >
    <p class="text-2xl font-light">{{ service.name }}</p>
    <p class="text-4xl font-black">
      {{ formatCurrency(service.price) }}
    </p>
  </div>
</template>

<script setup>
import { formatCurrency } from "@/helpers/index";
import { useAppointmentsStore } from "@/stores/appointments";
const appointments = useAppointmentsStore();
defineProps({
  service: {
    type: Object,
  },
});
</script>

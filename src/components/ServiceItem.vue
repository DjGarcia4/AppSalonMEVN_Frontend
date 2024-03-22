<template>
  <div
    class="p-5 space-y-5 rounded-lg cursor-pointer bg-white text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
  >
    <p class="text-2xl font-light">{{ service.name }}</p>
    <p class="text-4xl font-black">
      {{ formatCurrency(service.price) }}
    </p>
  </div>
</template>

<script setup>
import { formatCurrency } from "@/helpers/index";
defineProps({
  service: {
    type: Object,
  },
});
</script>

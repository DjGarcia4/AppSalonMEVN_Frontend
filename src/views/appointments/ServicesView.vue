<template>
  <h2 class="text-4xl font-extrabold text-white mt-10">Services</h2>
  <p class="text-white text-lg mt-5">
    "Next, choose a service for your appointment."
  </p>
  <div class="grid grid-cols-2 gap-5 mt-5">
    <ServiceItem
      v-for="service in services.services"
      :key="service._id"
      :service="service"
    />
  </div>
</template>

<script setup>
import { useServicesStore } from "@/stores/services";
import ServiceItem from "@/components/ServiceItem.vue";

const services = useServicesStore();
</script>

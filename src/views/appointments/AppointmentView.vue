<template>
  <h2 class="text-4xl font-extrabold text-white">
    Appointment Details and Summary
  </h2>
  <p class="text-white text-lg">
    Next, verify the information and confirm your appointment.
  </p>
  <h3 class="text-3xl font-extrabold text-white">Services</h3>
  <div v-if="!appointments.isServicesEmpty" class="grid gap-5">
    <ServiceSelected
      v-for="service in appointments.services"
      :key="service._id"
      :service="service"
    />
    <p class="text-white text-right text-2xl">
      Total to Pay:
      <span class="font-black">{{
        formatCurrency(appointments.totalToPay)
      }}</span>
    </p>
  </div>
  <p v-else class="text-white text-2xl">No services selected.</p>
  <div v-if="!appointments.isServicesEmpty" class="space-y-8">
    <h3 class="text-3xl font-extrabold text-white">Date and Time</h3>
    <div class="lg:flex gap-5 items-start">
      <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
        <VueTailwindDatePicker
          :disable-date="disableDate"
          i18n="es-mx"
          as-single
          no-input
          :formatter="formatter"
          v-model="appointments.date"
        />
      </div>
      <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 lg:mt-0">
        <button
          type="button"
          v-for="hour in appointments.hours"
          class="block rounded-lg text-xl font-black p-3 hover:text-white hover:bg-blue-500 transition-all cursor-pointer"
          @click="appointments.time = hour"
          :class="
            appointments.time === hour
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-500'
          "
        >
          {{ hour }}
        </button>
      </div>
    </div>
    <div v-if="appointments.isValidReservation" class="flex justify-end">
      <button
        @click="appointments.createAppointment()"
        type="button"
        class="w-full md:w-auto bg-blue-500 p-3 rounded-lg uppercase font-black text-white hover:bg-blue-700 transition-all"
      >
        Confirm Reservation
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import ServiceSelected from "@/components/ServiceSelected.vue";
import { useAppointmentsStore } from "@/stores/appointments";
import { formatCurrency } from "@/helpers";

const appointments = useAppointmentsStore();
const formatter = ref({ date: "DD/MM/YYYY", month: "MMMM" });

const disableDate = (date) => {
  const today = new Date();
  return (
    date < today ||
    date.getMonth() > today.getMonth() + 1 ||
    [0, 6].includes(date.getDay())
  );
};
</script>

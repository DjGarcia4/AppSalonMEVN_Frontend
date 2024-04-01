import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import AppointmentAPI from "@/api/AppointmentAPI";
import { convertToISO } from "@/helpers/date.js";
import { inject } from "vue";

export const useAppointmentsStore = defineStore("appointments", () => {
  const toast = inject("toast");
  const router = useRouter();
  const services = ref([]);
  const date = ref("");
  const time = ref("");
  const hours = ref([]);

  onMounted(() => {
    const startHour = 10;
    const endhour = 19;
    for (let hour = startHour; hour <= endhour; hour++) {
      hours.value.push(hour + ":00");
    }
  });

  function onServiceSelected(service) {
    if (services.value.some((srv) => srv._id === service._id)) {
      services.value = services.value.filter((srv) => srv._id !== service._id);
    } else {
      if (services.value.length === 2) {
        alert("You can only select two services");
      } else {
        services.value.push(service);
      }
    }
  }

  async function createAppointment() {
    const apointment = {
      services: services.value.map((srv) => srv._id),
      date: convertToISO(date.value),
      time: time.value,
      totalToPay: totalToPay.value,
    };
    try {
      const { data } = await AppointmentAPI.create(apointment);
      toast.open({ message: data.msg, type: "success" });
      router.push({ name: "my-appointmens" });
      clearAppointmentData();
    } catch (error) {
      console.log(error);
    }
  }

  function clearAppointmentData() {
    services.value = [];
    date.value = "";
    time.value = "";
  }

  const isServiceSelected = computed(() => {
    return (id) =>
      services.value.some((serviceSelected) => serviceSelected._id === id);
  });
  const totalToPay = computed(() => {
    return services.value.reduce((total, item) => {
      return total + item.price;
    }, 0);
  });
  const isServicesEmpty = computed(() => services.value.length === 0);
  const isValidReservation = computed(() => {
    return services.value.length && date.value.length && time.value.length;
  });
  return {
    onServiceSelected,
    createAppointment,
    isServiceSelected,
    services,
    totalToPay,
    isServicesEmpty,
    date,
    hours,
    time,
    isValidReservation,
  };
});

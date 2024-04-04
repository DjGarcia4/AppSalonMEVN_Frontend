import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import AppointmentAPI from "@/api/AppointmentAPI";
import { convertToISO, convertToDDMMYYYY } from "@/helpers/date.js";
import { inject } from "vue";
import { useUserStore } from "./user";

export const useAppointmentsStore = defineStore("appointments", () => {
  const toast = inject("toast");
  const router = useRouter();
  const services = ref([]);
  const date = ref("");
  const appointmentId = ref("");
  const time = ref("");
  const hours = ref([]);
  const appointmentsByDate = ref([]);
  const user = useUserStore();

  onMounted(() => {
    const startHour = 10;
    const endhour = 19;
    for (let hour = startHour; hour <= endhour; hour++) {
      hours.value.push(hour + ":00");
    }
  });

  watch(date, async () => {
    time.value = "";
    if (date.value === "") return;
    //Get Appointment
    const { data } = await AppointmentAPI.getByDate(date.value);
    if (appointmentId.value) {
      appointmentsByDate.value = data.filter(
        (appointment) => appointment._id !== appointmentId.value
      );
      time.value = data.filter(
        (appointment) => appointment._id === appointmentId.value
      )[0].time;
    } else {
      appointmentsByDate.value = data;
    }
  });

  const setSelectedAppointment = (appointment) => {
    services.value = appointment.services;
    date.value = convertToDDMMYYYY(appointment.date);
    time.value = appointment.time;
    appointmentId.value = appointment._id;
  };

  function onServiceSelected(service) {
    if (services.value.some((srv) => srv._id === service._id)) {
      services.value = services.value.filter((srv) => srv._id !== service._id);
    } else {
      if (services.value.length === 2) {
        alert("Solo puedes seleccionar dos servicios");
      } else {
        services.value.push(service);
      }
    }
  }

  async function saveAppointment() {
    const apointment = {
      services: services.value.map((srv) => srv._id),
      date: convertToISO(date.value),
      time: time.value,
      totalToPay: totalToPay.value,
    };
    if (appointmentId.value) {
      try {
        const { data } = await AppointmentAPI.update(
          appointmentId.value,
          apointment
        );
        toast.open({ message: data.msg, type: "success" });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await AppointmentAPI.create(apointment);
        toast.open({ message: data.msg, type: "success" });
      } catch (error) {
        console.log(error);
      }
    }
    router.push({ name: "my-appointmens" });
    user.getAppointments();
    clearAppointmentData();
  }

  function clearAppointmentData() {
    appointmentId.value = "";
    services.value = [];
    date.value = "";
    time.value = "";
  }

  async function cancelAppointment(id) {
    if (confirm("¿Deseas cancelar esta cita?")) {
      try {
        const { data } = await AppointmentAPI.delete(id);
        toast.open({ message: data.msg, type: "success" });
        user.getAppointments();
      } catch (error) {
        toast.open({ message: error.response.data.msg, type: "error" });
      }
    }
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
  const isDateSelected = computed(() => {
    return date.value ? true : false;
  });

  const disbaleTime = computed(() => {
    return (hour) => {
      return appointmentsByDate.value.find(
        (appointment) => appointment.time === hour
      );
    };
  });
  return {
    onServiceSelected,
    saveAppointment,
    setSelectedAppointment,
    clearAppointmentData,
    cancelAppointment,
    services,
    totalToPay,
    date,
    hours,
    time,
    appointmentsByDate,
    isServiceSelected,
    isServicesEmpty,
    isValidReservation,
    isDateSelected,
    disbaleTime,
  };
});

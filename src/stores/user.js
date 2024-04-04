import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import AuthAPI from "@/api/AuthAPI";
import AppointmentAPI from "@/api/AppointmentAPI";

export const useUserStore = defineStore("user", () => {
  const user = ref({});
  const router = useRouter();
  const userAppointments = ref([]);
  const loading = ref(true);

  onMounted(async () => {
    try {
      const { data } = await AuthAPI.auth();
      user.value = data;
      await getAppointments();
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  });

  const getUserName = computed(() =>
    user.value?.name ? user.value?.name : ""
  );
  const noAppintments = computed(() => userAppointments.value.length === 0);

  async function getAppointments() {
    const { data } = await AppointmentAPI.getUserAppointments(user.value._id);
    userAppointments.value = data;
  }

  function logout() {
    localStorage.removeItem("AUTH_TOKEN");
    user.value = {};
    router.push({ name: "login" });
  }

  return {
    user,
    getUserName,
    userAppointments,
    noAppintments,
    loading,
    logout,
    getAppointments,
  };
});

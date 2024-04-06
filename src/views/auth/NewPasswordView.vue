<template>
  <div v-if="isValidToken">
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">
      Nueva Contraseña
    </h1>
    <p class="text-2xl text-white text-center my-5">
      Coloca tu nueva contraseña.
    </p>
    <FormKit
      id="newPasswordForm"
      type="form"
      :actions="false"
      incomplete-message="No se pudo iniciar sesión, revisa las notificaciones"
      @submit="handleSubmit"
    >
      <FormKit
        type="password"
        label="Contraseña"
        name="password"
        placeholder="Contraseña de Usuario - Min 8 Caracteres"
        validation="required|length:8"
        :validation-messages="{
          required: 'La Contraseña es Obligatoria',
          length: 'La Contraseña debe mantener al menos 8 caracteres',
        }"
      />
      <FormKit
        type="password"
        label="Repetir Contraseña"
        name="password_confirm"
        placeholder="Repite la contraseña"
        validation="required|confirm"
        :validation-messages="{
          required: 'La Contraseña es Obligatorio',
          confirm: 'Las contraseñas no son iguales',
        }"
      />
      <FormKit type="submit" label="Cambiar Contraseña" />
    </FormKit>
  </div>
  <p v-else class="text-center text-2xl font-black text-white">
    Token no valido!
  </p>
</template>

<script setup>
import { onMounted, inject, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AuthAPI from "@/api/AuthAPI";

const toast = inject("toast");
const route = useRoute();
const router = useRouter();
const { token } = route.params;
const isValidToken = ref(false);

const handleSubmit = async ({ password }) => {
  try {
    const { data } = await AuthAPI.changePassword(token, { password });
    toast.open({ message: data.msg, type: "success" });
    setTimeout(() => {
      router.push({ name: "login" });
    }, 2000);
  } catch (error) {
    toast.open({ message: error.response.data.msg, type: "error" });
  }
};
onMounted(async () => {
  try {
    const { data } = await AuthAPI.verifyTokenPassword(token);
    isValidToken.value = true;
  } catch (error) {
    toast.open({ message: error.response.data.msg, type: "error" });
  }
});
</script>

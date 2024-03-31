<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Inicia Sesión
  </h1>
  <p class="text-2xl text-white text-center my-5">
    Si tienes una cuenta inicia sesión.
  </p>
  <FormKit
    id="loginForm"
    type="form"
    :actions="false"
    incomplete-message="No se pudo iniciar sesión, revisa las notificaciones"
    @submit="handleSubmit"
  >
    <FormKit
      type="email"
      label="Email"
      name="email"
      placeholder="Email de usuario"
      validation="required|email"
      :validation-messages="{
        required: 'El Email es Obligatorio',
        email: 'Email no válido',
      }"
    />
    <FormKit
      type="password"
      label="Contraseña"
      name="password"
      placeholder="Contraseña de Usuario"
      validation="required"
      :validation-messages="{
        required: 'La Contraseña es Obligatoria',
      }"
    />
    <FormKit type="submit" label="Iniciar Sesión" />
  </FormKit>
</template>

<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";
import AuthAPI from "@/api/AuthAPI";

const router = useRouter();
const toast = inject("toast");
const handleSubmit = async (formData) => {
  try {
    const {
      data: { token },
    } = await AuthAPI.login(formData);
    localStorage.setItem("AUTH_TOKEN", token);
    router.push({ name: "my-appointmens" });
  } catch (error) {
    toast.open({ message: error.response.data.msg, type: "error" });
  }
};
</script>

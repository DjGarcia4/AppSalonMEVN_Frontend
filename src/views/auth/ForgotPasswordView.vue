<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Olvide mi Password
  </h1>
  <p class="text-2xl text-white text-center my-5">
    Recupera el acceso a tu cuenta.
  </p>
  <FormKit
    id="forgetPassword"
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
    <FormKit type="submit" label="Enviar Instrucciones" />
  </FormKit>
</template>

<script setup>
import { inject } from "vue";
import { reset } from "@formkit/core";
import AuthAPI from "@/api/AuthAPI";

const toast = inject("toast");
const handleSubmit = async ({ email }) => {
  try {
    const { data } = await AuthAPI.forgotPassword({ email });
    toast.open({ message: data.msg, type: "success" });
    reset("forgetPassword");
  } catch (error) {
    console.log(error);
    toast.open({ message: error.response.data.msg, type: "error" });
  }
};
</script>

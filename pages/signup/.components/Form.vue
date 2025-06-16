<script setup lang="ts">
import inputLabel from "~/components/forms/inputLabel.vue";
import { ref } from "vue";
import Error from "~/components/common/Error.vue";
import Success from "~/components/common/Success.vue";
import clearMessages from "~/composables/clearMessages";
import api from "~/server/utils/axios/api";
import useSendRedirect from "~/composables/sendRedirect";

const name = ref<string>("");
const user = ref<string>("");
const password = ref<string>("");
const confirm_password = ref<string>("");
const msgError = ref<string>("");
const msgSuccess = ref<string>("");
const { sendRedirect } = useSendRedirect();

const messageFeedback = computed(() => {
  if (!password.value || !confirm_password.value) return "";

  return password.value !== confirm_password.value
    ? "As senhas não coincidem"
    : "";
});

const handlerSignup = async () => {
  const fullname = name.value.trim().split(" ");

  if (
    !name.value ||
    !user.value ||
    !password.value ||
    !confirm_password.value
  ) {
    msgError.value = "Preencha todos os campos corretamente.";
    clearMessages(msgError);
    return;
  }

  if (fullname.length < 2) {
    msgError.value = "Digite nome e sobrenome";
    clearMessages(msgError);
    return;
  }

  try {
    const response = await api.post("/auth/register", {
      name: name.value.toLowerCase().trim(),
      user: user.value.toLowerCase().trim(),
      password: password.value.trim(),
      confirm_password: confirm_password.value.trim(),
    });

    const data = response.data;
    msgSuccess.value = data.message;
    name.value = "";
    user.value = "";
    password.value = "";
    confirm_password.value = "";
    sendRedirect("/", 3500);
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.message;

      if (status >= 400 && status < 500) {
        msgError.value = message;
        clearMessages(msgError);
        return;
      }

      if (status >= 500) {
        msgError.value = message;
        clearMessages(msgError);
        return;
      }
    } else {
      msgError.value = "Error desconhecido, tente novamente mais tarde.";
      clearMessages(msgError);
    }
  }
};
</script>

<template>
  <form
    class="w-[80%] h-[80%] grid place-items-center"
    @submit.prevent="handlerSignup"
  >
    <inputLabel
      input_name="Nome:"
      link="name"
      v-model="name"
      place="Digite seu nome completo"
    />
    <inputLabel
      input_name="usuário"
      link="user"
      v-model="user"
      place="digite seu usuário"
    />
    <inputLabel
      input_name="Senha"
      link="password"
      input-type="password"
      v-model="password"
      place="********"
    />
    <inputLabel
      input_name="Confirme sua Senha"
      link="confirm_password"
      input-type="password"
      v-model="confirm_password"
      place="********"
      :feedback="messageFeedback"
      :visible="!!messageFeedback"
    />
    <button
      type="submit"
      class="w-[120px] h-[50px] bg-white rounded-xl mt-[10px] uppercase tracking-wider font-bold text-blue-700 lg:w-[180px] lg:h-[70px] text-xl cursor-pointer"
    >
      cadastrar
    </button>
    <Error :message="msgError" :visible="!!msgError" />
    <Success :message="msgSuccess" :visible="!!msgSuccess" />
  </form>
</template>

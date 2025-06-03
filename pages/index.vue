<script setup lang="ts">
import inputLabel from "~/components/forms/inputLabel.vue";
import useSendRedirect from "~/composables/sendRedirect";
import Error from "~/components/common/Error.vue";
import Success from "~/components/common/Success.vue";
import clearMessages from "~/composables/clearMessages";
import useProfileStore from "~/store/useProfileStore";
import api from "~/server/utils/axios/api";
import { ref } from "vue";

const user = ref<string>("");
const password = ref<string>("");
const msgError = ref<string>("");
const msgSuccess = ref<string>("");
const isLoading = ref<boolean>(false);
const useProfile = useProfileStore();
const { sendRedirect } = useSendRedirect();

const handleSubmitLogin = async () => {
  if (!user.value || !password.value) {
    msgError.value = "Preencha todos os campos corretamente";
    clearMessages(msgError);
    return;
  }

  try {
    isLoading.value = true

    const response = await api.post("/auth/login", {
      user: user.value.trim().toLowerCase(),
      password: password.value.trim(),
    });

    const data = response.data;
    msgSuccess.value = data.message;
    user.value = "";
    password.value = "";
    useProfile.fetchProfile();
    sendRedirect("/dashboard");
  } catch (error: any) {
    isLoading.value = false

    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.message;

      if (status >= 400) {
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
      msgError.value =
        "Erro desconhecido ao tentar conectar com servidor, tente novamente mais tarde.";
    }
  }
};
</script>

<template>
  <main
    class="w-screen h-screen flex flex-col items-center lg:flex-row transition-all duration-500"
  >
    <figure
      class="w-screen h-[40vh] grid place-items-center lg:w-[40%] lg:h-[100vh]"
    >
      <img
        src="~/assets/img/logo.png"
        alt="Logo do aplicativo"
        class="w-[60%] lg:w-[80%]"
      />
    </figure>
    <div
      class="bg-[#116eda] w-screen h-[60vh] rounded-t-[50px] grid place-items-center lg:w-[60%] lg:h-[100vh] lg:rounded-none"
    >
      <form
        class="w-[300px] h-[300px] grid place-items-center md:w-[500px] md:h-[500px] md:text-2xl"
        @submit.prevent="handleSubmitLogin"
      >
        <inputLabel
          input_name="Usuário"
          link="user"
          v-model="user"
          place="Digite seu usuário"
        />
        <inputLabel
          input_name="Senha"
          link="password"
          v-model="password"
          place="********"
          input-type="password"
        />
        <button
          class="w-[180px] h-[50px] bg-white rounded-2xl text-blue-700 font-bold uppercase tracking-wider md:w-[200px] md:h-[70px] md:rounded-3xl md:text-2xl flex items-center justify-center"
          :disabled="isLoading"
        >
          {{ isLoading ? "Entrando" : "Entrar" }}
          <svg
            class="w-6 h-6 animate-spin ml-3"
            :class="isLoading ? 'block':'hidden'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        
        </button>
      </form>
      <p
        class="uppercase font-semibold text-gray-300 tracking-wider md:text-2xl"
      >
        Não tem um conta ?
        <nuxt-link
          to="/signup"
          class="border-b-1 hover:border-b-2 border-transparent hover:text-black hover:border-white"
        >
          cadastre-se</nuxt-link
        >
      </p>
    </div>
    <Error :message="msgError" :visible="!!msgError" />
    <Success :message="msgSuccess" :visible="!!msgSuccess" />
  </main>
</template>

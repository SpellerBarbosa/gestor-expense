<script setup lang="ts">
import Profile from "~/components/layouts/Profile.vue";
import stateMenuStore from "~/store/stateMenuStore";
import { useRouter } from "vue-router";
import api from "~/server/utils/axios/api";

const router = useRouter();
const stateMenu = stateMenuStore();

const goToPostExpenses = () => {
  stateMenu.stateMenu();
};

const goToDashboard = () => {
  router.push("/dashboard");
};

const logout = async () => {
  try {
    const response = await api.get("/logout");
    const data = response.data;

    if (data) {
      router.push("/");
    }
  } catch (error) {
    console.error(error);
  }
};

const goToStatement = () => {
  router.push("/statement");
};
</script>
<template>
  <nav
    class="w-screen h-[10vh] bg-blue-600 fixed bottom-0 lg:w-[15%] lg:h-[100vh] lg:flex lg:flex-col lg:items-center lg:left-0 z-10 lg:bg-gray-50"
  >
    <!--Menu mobile-->
    <Profile class="hidden lg:block" />
    <ul
      class="w-full h-full flex items-center justify-evenly gap-2 relative text-white lg:flex-col lg:hidden"
    >
      <li class="flex-1/2 grid place-items-center">
        <span class="material-symbols-outlined" @click="goToDashboard">
          home
        </span>
        <p class="uppercase font-semibold tracking-wider">Inicio</p>
      </li>
      <li class="flex-1/3 grid place-items-center bg-blue-600 rounded-2xl">
        <span class="material-symbols-outlined" @click="goToPostExpenses">
          add_circle
        </span>
        <p class="uppercase font-semibold tracking-wider text-xs text-center">
          lançar<br />despesas
        </p>
      </li>
      <li class="flex-1/2 grid place-items-center" @click="goToStatement">
        <span class="material-symbols-outlined"> receipt_long </span>
        <p class="uppercase font-semibold tracking-wider">extrato</p>
      </li>
      <li class="flex-1/2 grid place-items-center" @click="logout">
        <span class="material-symbols-outlined"> logout </span>
        <p class="uppercase font-semibold tracking-wider">sair</p>
      </li>
    </ul>

    <!-- menu desktop -->
    <ul
      class="w-[80%] hidden lg:flex lg:flex-col justify-center items-center lg:gap-5 uppercase lg:border-gray-300 lg:border-1 lg:w-full lg:h-full lg:justify-start"
    >
      <li
        class="w-[90%] h-[50px] font-semibold tracking-wider cursor-pointer lg:flex lg:items-center lg:gap-7"
        @click="goToDashboard"
      >
        <span class="material-symbols-outlined"> home </span>
        Inicio
      </li>
      <li
        class="w-[90%] h-[50px] font-semibold tracking-wider cursor-pointer lg:flex lg:items-center lg:gap-7"
        @click="goToPostExpenses"
      >
        <span class="material-symbols-outlined"> list_alt_add </span>
        Lançar despesas
      </li>
      <li
        class="w-[90%] h-[50px] font-semibold tracking-wider cursor-pointer lg:flex lg:items-center lg:gap-7"
        @click="goToStatement"
      >
        <span class="material-symbols-outlined"> receipt_long </span>
        Extrato
      </li>
      <li
        class="w-full h-[50px] font-semibold tracking-wider cursor-pointer lg:absolute lg:bottom-0 lg:flex lg:items-center lg:gap-7 lg:border lg:text-red-400 lg:border-gray-300"
        @click="logout"
      >
        <span class="material-symbols-outlined"> logout </span>
        sair
      </li>
    </ul>
  </nav>
</template>
<style scoped>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
  font-size: 40px;
}

@media screen and (min-width: 1280px) {
  .material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
    font-size: 20px;
  }
}
</style>

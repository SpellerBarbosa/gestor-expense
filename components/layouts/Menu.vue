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

const goToDasboard = () => {
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
</script>
<template>
  <nav
    class="w-screen h-[10vh] bg-blue-600 fixed bottom-0 lg:w-[30%] lg:h-[100vh] lg:flex lg:flex-col lg:items-center lg:left-0 z-10"
  >
    <!--Menu mobile-->
    <Profile class="hidden lg:block" />
    <ul
      class="w-full h-full flex items-center justify-evenly gap-2 relative text-white lg:flex-col lg:hidden"
    >
      <li class="flex-1/2 grid place-items-center">
        <span class="material-symbols-outlined" @click="goToDasboard">
          home
        </span>
      </li>
      <li
        class="flex-1/3 grid place-items-center scale-150 absolute -top-3 bg-blue-600 rounded-2xl"
      >
        <span class="material-symbols-outlined" @click="goToPostExpenses">
          add_circle
        </span>
      </li>
      <li class="flex-1/2 grid place-items-center" @click="logout">
        <span class="material-symbols-outlined"> logout </span>
      </li>
    </ul>

    <!-- menu desktop -->
    <ul
      class="w-[80%] hidden lg:flex lg:flex-col justify-center items-center lg:gap-5 lg:mt-[30px] uppercase"
    >
      <li
        class="w-[70%] font-semibold tracking-wider cursor-pointer"
        @click="goToDasboard"
      >
        Inicio
      </li>
      <li
        class="w-[70%] font-semibold tracking-wider cursor-pointer"
        @click="goToPostExpenses"
      >
        Lançar despesas
      </li>
      <li class="w-[70%] font-semibold tracking-wider cursor-pointer" @click="logout">sair</li>
    </ul>
  </nav>
</template>
<style scoped>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
  font-size: 40px;
}
</style>

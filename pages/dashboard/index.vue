<script setup lang="ts">
import Profile from "../../components/layouts/Profile.vue";
import SectionCards from "./.components/SectionCards.vue";
import Menu from "~/components/layouts/Menu.vue";
import HistorySection from "./.components/HistorySection.vue";
import PostExpense from "./.components/PostExpense.vue";
import stateMenuStore from "~/store/stateMenuStore";
import auth from "~/middleware/auth";



const stateMenu = stateMenuStore();

definePageMeta({
  middleware: auth
})

</script>

<template>
  <main class="w-screen h-screen flex flex-col items-center overflow-y-auto bg-gray-100">
    <Menu />
    <main
      class="w-screen flex flex-col items-center mb-[10vh] lg:w-[85%] lg:ml-[15%] bg-gray-100"
      :class="stateMenu.menu ? 'bg-gray-500 blur-xl' : ''"
    >
      <Profile class="lg:hidden" />
      <SectionCards class="h-auto "/>
      <HistorySection/>
    </main>
    <PostExpense class="mt-[10%] -translate-y-[10%]"/>
  </main>
</template>

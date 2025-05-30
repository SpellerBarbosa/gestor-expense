<script setup lang="ts">
import Profile from "../../components/layouts/Profile.vue";
import SectionCards from "./.components/SectionCards.vue";
import Menu from "~/components/layouts/Menu.vue";
import HistorySection from './.components/HistorySection.vue';


</script>

<template>
  <main class="w-screen h-screen flex flex-col items-center bg-gray-200 font-poppins lg:w-[65%] lg:ml-[35%] lg:h-screen xl:w-[75%] xl:ml-[25%] xl:h-screen overflow-auto">
    <section
    class="w-full h-[90vh] flex flex-col items-center justify-center border overflow-auto"
    >
      <Profile class="lg:hidden" />
      <SectionCards />
      <HistorySection />
    </section>
    <Menu class="lg:w-[35%] xl:w-[25%] lg:h-screen h-[10vh]" />
  </main>
</template>

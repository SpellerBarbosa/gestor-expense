<script setup lang="ts">
import Profile from "../../components/layouts/Profile.vue";
import SectionCards from "./.components/SectionCards.vue";
import Menu from "~/components/layouts/Menu.vue";
</script>

<template>
  <main>
    <section
      class="w-screen h-[90vh] flex flex-col items-center bg-gray-200 font-poppins lg:w-[65%] lg:ml-[35%] lg:h-screen xl:w-[75%] xl:ml-[25%] xl:h-screen"
    >
      <Profile class="lg:hidden" />
      <SectionCards />
    </section>
    <Menu class="lg:w-[35%] xl:w-[25%] lg:h-screen" />
  </main>
</template>

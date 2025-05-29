<script setup lang="ts">
import PostExpense from "./.components/PostExpense.vue";
import Menu from "~/components/layouts/Menu.vue";
import Top from "./.components/Top.vue";
</script>
<template>
  <main>
    <section
      class="w-screen h-[90vh] lg:ml-[35%] xl:ml-[25%] flex flex-col items-center justify-center gap-10 bg-gray-300 xl:w-[75%] xl:h-screen lg:w-[65%] lg:h-screen relative"
    >
      <Top />
      <PostExpense />
    </section>
    <Menu class="xl:w-[25%] lg:w-[35%] lg:h-screen ml-50%" />
  </main>
</template>

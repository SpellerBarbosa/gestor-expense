<script setup lang="ts">
import Form from "./.components/Form.vue";
</script>

<template>
  <main class="w-screen h-screen flex flex-col lg:flex-row">
    <figure
      class="w-full h-[30vh] grid place-items-center overflow-hidden lg:h-screen lg:w-[50%]"
    >
      <img
        src="~/assets/img/logo2.png"
        alt="imagem do logo"
        class="w-[200px] md:w-[300px]"
      />
    </figure>
    <section
      class="bg-[#116eda] w-screen h-[70vh] rounded-t-3xl grid place-items-center lg:h-screen lg:rounded-none"
    >
      <Form />
    </section>
  </main>
</template>

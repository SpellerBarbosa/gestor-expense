<script setup lang="ts">
import useProfileStore from "~/store/useProfileStore";

const useProfile = useProfileStore();
const name = useProfile.name;

</script>

<template>
  <section
    class="w-[95%] h-[20vh] mt-[20px] bg-blue-600 rounded-3xl grid place-items-center lg:bg-[#ffffff3b] lg:w-full lg:h-[30vh] lg:flex lg:flex-col lg:items-center lg:justify-evenly lg:border-1 lg:border-gray-300 lg:mt-auto lg:rounded-none"
  >
  <div
  class="w-[90%] h-full grid grid-cols-3 grid-rows-2 lg:flex lg:flex-col lg:justify-evenly"
  >
  <figure class="col-start-1 row-start-1 row-span-2 grid place-items-center  lg:w-full lg:flex lg:items-center lg:justify-center">
    <img src="~/assets/img/profile.png" alt="icon de imagem vazia">
  </figure>
      <p
        class="col-start-2 col-span-2 grid place-items-center capitalize font-semibold tracking-wider text-white lg:text-black"
      >
        Bem vindo!
      </p>
      <h1
        class="col-start-2 col-span-2 grid text-center row-start-2 w-full capitalize text-sm font-bold text-white tracking-wider lg:text-black lg:text-sm"
      >
        {{ `${name}` }}
      </h1>
    </div>
  </section>
</template>

<script setup lang="ts">
import useProfileStore from "~/store/useProfileStore";

const useProfile = useProfileStore();
const name = useProfile.name?.split(" ")[0];
const middleName = useProfile.name?.split(" ")[1];
</script>

<template>
  <section
    class="w-[95%] h-[20vh] mt-[20px] bg-blue-600 rounded-3xl grid place-items-center lg:bg-[#ffffff3b]"
  >
    <div
      class="w-[95%] h-[90%] grid grid-cols-5 grid-rows-3 place-items-center"
    >
      <p
        class="col-start-1 col-span-2 capitalize font-semibold tracking-wider text-white lg:text-black"
      >
        Bem vindo!
      </p>
      <h1
        class="w-full col-start-3 col-span-4 row-start-1 capitalize text-sm font-bold text-white tracking-wider lg:text-black lg:text-sm"
      >
        {{ `${name} ${middleName}` }}
      </h1>
      <span
        class="col-start-1 col-span-5 row-start-2 row-span-2 text-center font-semibold uppercase tracking-[1px] italic text-white lg:text-black"
        >" O Controle de suas despesas na palma da sua mão "</span
      >
    </div>
  </section>
</template>

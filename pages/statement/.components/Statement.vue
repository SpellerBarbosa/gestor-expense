<script setup lang="ts">
import useProfileStore from "~/store/useProfileStore";

const useProfile = useProfileStore();
</script>
<template>
  <section class="w-[95%]  mt-[20px] ">
    <article class="w-full h-[50px] flex justify-evenly items-center gap-3">
      <label for="dateInitial">
        <span>De: </span>
        <input type="date" placeholder="DD/MM/AAAA" />
      </label>
      <label for="dateInitial">
        <span>Até: </span>
        <input type="date" placeholder="DD/MM/AAAA" />
      </label>
    </article>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  category: string;
  fullValue: string;
  icon: string
  color?:string
}>();
</script>

<template>
  <article
    class="w-[33%] h-[100px] flex-1/3 rounded-2xl flex flex-col items-center justify-around font-semibold lg:flex-1 lg:h-[200px] lg:items-start hover:shadow-md"
  >
    <h3 :class="[`w-[50px] h-[50px]  lg:w-[80px] lg:h-[80px] text-[10px] rounded-full text-center uppercase tracking-wider flex flex-col items-center justify-center border text-xs ml-5 ${color}`]">
      <span class="material-symbols-outlined">{{ icon }}</span>
      <P class="hidden lg:block">{{ category }}</P>
    </h3>

    <p class="ml-3 tracking-[1px]">R$ {{ fullValue }}</p>
  </article>
</template>

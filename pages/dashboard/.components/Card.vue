<script setup lang="ts">
const props = defineProps<{
  category: string;
  fullValue: string;
  icon: string;
  color?: string;
  iconStyle?: string;
}>();
</script>

<template>
  <article
    class="w-[33%] h-[100px] flex-1/3 rounded-2xl flex flex-col items-center justify-around font-semibold lg:flex-1 lg:flex-wrap lg:h-[200px] lg:items-start hover:shadow-md relative"
  >
    <h3
      :class="[
        `w-[50px] h-[50px] gap-2 rounded-full lg:w-[110px] lg:h-[80px] text-[10px] xl:w-[120px] xl:h-[80px]  text-center uppercase tracking-wider flex  lg:flex-col lg:rounded-md items-center justify-center border text-xs ml-5 ${color}`,
      ]"
    >
      <span class="material-symbols-outlined" :class="[`${iconStyle}`]">{{
        icon
      }}</span>
      <P class="lg:block">{{ category }}</P>
    </h3>
    <p class="ml-3 tracking-[1px]">R$ {{ fullValue }}</p>
  </article>
</template>

<script setup lang="ts">
const props = defineProps<{
  message: String;
  visible: Boolean;
}>();
</script>

<template>
  <article
    :class="[
      'w-[70px] h-[70px] bg-red-600  top-5 absolute rounded-full overflow-hidden transition-all duration-500 opacity-0 pointer-events-none left-[50%] translate-x-[-50%] md:top-auto md:bottom-[10px] md:left-0 md:translate-none md:rounded-xl',
      visible
        ? 'w-[95%] transition-all duration-500 opacity-100 md:w-[50%]'
        : 'transition-all duration-500 ',
    ]"
  >
    <span
      :class="[
        'w-full h-full grid place-items-center font-semibold uppercase text-center text-white tracking-[1px] p-3 opacity-0',
        visible ? 'opacity-100 delay-500 transition-all duration-300 ' : '',
      ]"
      >{{ message }}</span
    >
  </article>
</template>

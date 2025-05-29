<script setup lang="ts">

const props = defineProps<{
    category: string
    fullValue: string
}>()


</script>

<template>
    <article class="w-[33%] h-[100px] flex-1/3 rounded-2xl flex flex-col justify-around font-semibold">
        <h3 class="text-center uppercase tracking-wider">{{ category }}</h3>
        <p class=" ml-3 tracking-[1px]">Total: {{ fullValue }}</p>
    </article>
</template>
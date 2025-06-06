<script setup lang="ts">
import Menu from '~/components/layouts/Menu.vue';
import Profile from '~/components/layouts/Profile.vue';
import Statement from './.components/Statement.vue';
</script>

<template>
    <main class="w-screen h-screen flex flex-col items-center">
        <Profile />
        <Menu />
        <Statement />
    </main>
</template>
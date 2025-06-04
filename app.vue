<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const showRotateWarning = ref(false)

const checkOrientation = () => {
  const isLandscape = window.matchMedia('(orientation: landscape)').matches
  const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent)

  showRotateWarning.value = isMobile && isLandscape
}

onMounted(() => {
  checkOrientation()
  window.addEventListener('resize', checkOrientation)
  window.addEventListener('orientationchange', checkOrientation)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkOrientation)
  window.removeEventListener('orientationchange', checkOrientation)
})

useSeoMeta({
  ogImage: "/despesas.png",
});
</script>
<template>
  <div>
    <div
      v-if="showRotateWarning"
      class="fixed inset-0 z-[9999] bg-white text-black text-center pt-[40vh] text-lg"
    >
      Por favor, gire seu dispositivo para o modo retrato.
    </div>

    <div v-else>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

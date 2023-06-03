<script setup lang="ts">
// Add into <script setup> on individual pages.
// Title will then be whatever is 'Title - Kitsune Reader'
// Default is Kitsune Reader if this isn't added to the <script setup>
// useHead({
//   title: ''
// })
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Kitsune Reader` : 'Kitsune Reader';
  }
})
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
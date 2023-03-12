<script setup>
const pages = [
  "Test (1).png",
  "Test (2).png",
  "Test (3).png",
]
</script>

<template>
  <div class="background">
    <div>
      Page: foo
    </div>
    <nuxt-img src='/images/test/Test (1).png' sizes="sm:20vw md:50vw lg:50vw" placeholder/>
  </div>
</template>

<style scoped>
.background {
  width: 100%;
  height: 100vh;
  background-color: var(--surface-ground);
  color: var(--text-color);
}
</style>

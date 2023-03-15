<script setup>
const pages = [
  "Test (1).png",
  "Test (2).png",
  "Test (3).png",
]

const page_id = ref(0)
const page = computed(() => "/images/test/" + pages[page_id.value])
</script>

<template>
  <div class="background">
    <div>
      Page: foo
    </div>
    <nuxt-img :src="page" sizes="sm:20vw md:50vw lg:50vw" placeholder/>
    <Button label="Previous" @click="page_id = page_id == 0 ? 2 : page_id - 1 % 3"></button>
    <Button label="Next" @click="page_id = (page_id + 1) % 3"></Button>
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

<script setup>
const images = [
  "gitlab-logo-500.png",
  "gitlab-logo-600.png",
  "gitlab-logo-700.png",
]

const image_id = ref(0)
const image = computed(() => images[image_id.value])

</script>

<template>
  <div>
    <NuxtWelcome />
    <nuxt-img :src="'/images/test/' + image" />
    <button @click="image_id = image_id == 0 ? 2 : image_id - 1 % 3">Previous</button>
    <button @click="image_id = image_id + 1 % 3">Next</button>
  </div>
</template>

<style scoped></style>

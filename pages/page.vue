<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
//TODO: Find out how to mount this extension on the splide object reference.
//import { URLHash } from "@splidejs/splide-extension-url-hash"
const splide = ref()
const page_id = ref(0)
const pages_dir = "/images/test/"
const pages = [
  "Test (1).png",
  "Test (2).png",
  "Test (3).png",
]
</script>

<template>
  <div class="background">
    <Splide ref="splide" :options="{perPage: 1, padding: '25%', gap: '100%'}">
      <SplideSlide v-for="page in pages">
        <nuxt-img :src="pages_dir + page" sizes="sm:20vw md:50vw lg:50vw" placeholder/>
      </SplideSlide>
    </Splide>
  </div>
</template>

<style scoped>

</style>

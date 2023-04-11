<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
//TODO: Find out how to mount this extension on the splide object reference.
//import { URLHash } from "@splidejs/splide-extension-url-hash"
const splide = ref()
const page_id = ref(0)
const zoom_scale = 1.5
const pages_dir = "/images/test/"
const pages = [
  "Test (1).png",
  "Test (2).png",
  "Test (3).png",
]
let splide_options = {perPage: 1, padding: '25%', gap: '100%'}

function onSlideClick(e, slide) {
  slide.slide.classList.toggle("zoom")
}

function resetSlide(e, slide) {
  slide.slide.classList.remove("zoom")
}

</script>

<template>
  <div class="background">
    <Splide ref="splide" 
    :options="splide_options" 
    @splide:click="onSlideClick" 
    @splide:inactive="resetSlide">
      <SplideSlide v-for="page in pages">
        <nuxt-img :src="pages_dir + page" sizes="sm:20vw md:50vw lg:50vw" placeholder/>
      </SplideSlide>
    </Splide>
  </div>
</template>

<style scoped>
  .zoom {
    transition: transform .2s;
    margin: 0 auto;
    transform: scale(1.5);
  }
</style>

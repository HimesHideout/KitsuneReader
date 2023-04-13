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
let splide_options = {perPage: 1, padding: '22.5%', gap: '100%'}

function onSlideClick(splide, slide, e) {
  let zoom = slide.slide.classList.toggle("zoom")
  if (zoom) {
    let slide_rect = slide.slide.getBoundingClientRect()
    let base_x = (slide_rect.width / 2) + slide_rect.left
    let base_y = (slide_rect.height / 2) + slide_rect.top
    let x = -(e.clientX - base_x) / 2
    let y = -(e.clientY - base_y) / 2
    slide.slide.style.transform = `scale(${zoom_scale}) translate(${x}px, ${y}px)`
  } else {
    slide.slide.style.transform = `scale(1)`
  }
}

function resetSlide(splide, slide) {
  slide.slide.style.transform = `scale(1)`
  slide.slide.classList.remove("zoom")
}

</script>

<template>
  <div class="background">
    <Splide ref="splide" 
    :options="splide_options" 
    @splide:click="onSlideClick" 
    @splide:inactive="resetSlide">
      <SplideSlide v-for="page in pages" class="flex align-items-center h-screen">
        <nuxt-img :src="pages_dir + page" sizes="50vw sm:50vw md:50vw lg:50vw" class="cursor-pointer" placeholder/>
      </SplideSlide>
    </Splide>
  </div>
</template>

<style scoped>
  .zoom {
    transition: transform .2s;
    margin: 0 auto;
    transform: scale(1.5) translate(-100px, -100px);
  }
</style>

<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
//TODO: Find out how to mount this extension on the splide object reference.
//import { URLHash } from "@splidejs/splide-extension-url-hash"
const splide = ref()
const page_id = ref(0)
const visible_sidebar = ref(false)
const zoom_scale = 1.5
const pages_dir = "/test/"
const pages = [
  "Test_1_hh1li7.png",
  "Test_2_bzkis5.png",
  "Test_3_t1h0eg.png",
]
let {data: chapters} = await useFetch("/api/chapters")
let splide_options = {
  perPage: 1, 
  gap: '100%',
  pagination: false,
}

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
    <Sidebar v-model:visible="visible_sidebar">
      <h2>Chapters</h2>
      <ul>
        <li v-for="chapter in chapters" class="text-primary">
          <NuxtLink :to="'/reader/' + chapter.chapter_number">
            <p class="text-color appearance-none">{{chapter.type}} {{ chapter.type_number }}: {{ chapter.title }}</p>
          </NuxtLink>
        </li>
      </ul>
    </Sidebar>
    <NuxtLink to="/chapters" class="absolute">
      <Button icon="pi pi-angle-left" class="forefront" text></Button>
    </NuxtLink>
    <Button icon="pi pi-arrow-right" @click="visible_sidebar = true" class="sidebar-button"></Button>
    <Splide ref="splide" 
    :options="splide_options" 
    @splide:click="onSlideClick" 
    @splide:inactive="resetSlide"
    class="h-screen">
      <SplideSlide v-for="page in pages" class="flex justify-content-center">
        <nuxt-img :src="pages_dir + page" sizes="100vw sm:100vw md:80vw lg:60vw xl:35vw" class="cursor-pointer" placeholder/>
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
  .forefront {
    z-index: 1;
  }
  .sidebar-button {
    margin-left: 5%;
  }
</style>

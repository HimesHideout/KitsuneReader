<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
//TODO: Find out how to mount this extension on the splide object reference.
//import { URLHash } from "@splidejs/splide-extension-url-hash"
const splide = ref()
const page_id = ref(0)
const visible_sidebar = ref(false)
const fullscreen = ref(false)
const splide_options = ref({
  perPage: 1, 
  gap: '100%',
  pagination: false,
  keyboard: true,
  arrows: true
})
const zoom_scale = 1.5
const pages_dir = "/test/"
const pages = [
  "Test_1.png",
  "Test_2.png",
  "Test_3.png",
]
let {data: chapters} = await useFetch("/api/chapters")

function onSlideClick(splide, slide, e) {
  fullscreen.value = !fullscreen.value
  document.getElementById("link-back").classList.toggle("hidden")
  document.getElementById("sidebar-button").classList.toggle("hidden")
  splide_options.value.arrows = !fullscreen.value
}

function resetSlide(splide, slide) {
  console.log("test")
}

</script>

<template>
  <div class="background">
    <Sidebar v-model:visible="visible_sidebar" position="right">
      <h2>Chapters</h2>
      <ul>
        <li v-for="chapter in chapters" class="text-primary">
          <NuxtLink :to="'/reader/' + chapter.chapter_number">
            <p class="text-color appearance-none">{{chapter.type}} {{ chapter.type_number }}: {{ chapter.title }}</p>
          </NuxtLink>
        </li>
      </ul>
    </Sidebar>
    <header class="relative">
      <NuxtLink to="/chapters" class="absolute" id="link-back">
        <Button icon="pi pi-angle-left" class="forefront" text></Button>
      </NuxtLink>
      <Button icon="pi pi-bars" @click="visible_sidebar = true" id="sidebar-button" class="absolute" text></Button>
    </header>
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
  #sidebar-button {
    top: 0px;
    right: 0px;
  }
</style>

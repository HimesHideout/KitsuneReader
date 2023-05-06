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
const route = useRoute()
let { data } = await useFetch("/api/chapter/" + route.params.chapter)
let {data: chapters} = await useFetch("/api/chapters")
const pages_dir = "/" + route.params.chapter + "/"
let pages = []

let j = 0
for (let i = 1; i <= data.value.pages_count; i++) {
  if (data.value.pages.length == 0) {
    break
  } 
  let page
  if (data.value.pages[j].page_number == i) {
    page = data.value.pages[j]
    if (page.image === undefined) {
      page.image = pages_dir + i + ".png"
    } else {
      page.image = pages_dir + page.image
    }
    j++
  } else {
    page = {page_number: i, image: pages_dir + i + ".png"}
  }

  pages.push(page)
}

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
    <NuxtLink to="/chapters" class="absolute" id="link-back">
      <Button icon="pi pi-angle-left" class="forefront" text></Button>
    </NuxtLink>
    <Button icon="pi pi-bars" @click="visible_sidebar = true" id="sidebar-button" text></Button>
    <Splide ref="splide" 
    :options="splide_options" 
    @splide:click="onSlideClick" 
    @splide:inactive="resetSlide"
    class="h-screen">
      <SplideSlide v-for="page in pages" class="flex justify-content-center">
        <nuxt-img :src="page.image" sizes="100vw sm:100vw md:80vw lg:60vw xl:35vw" class="cursor-pointer" placeholder/>
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
    margin-left: 95%;
  }
</style>

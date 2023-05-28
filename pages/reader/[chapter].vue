<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { URLHash } from "@splidejs/splide-extension-url-hash"

//I don't want to hardcode the effects but Nuxt doesn't like
//dynamic components so it's either this or a 
//whacky workaround. >:(
const EffectNormal = resolveComponent('EffectNormal')
const EffectConstellation = resolveComponent('EffectConstellation')
const EffectMorning = resolveComponent('EffectMorning')
const EffectTwilight = resolveComponent('EffectTwilight')
const EffectLightPrism = resolveComponent('EffectLightPrism')
const EffectDarkPrism = resolveComponent('EffectDarkPrism')
const EffectDayTornado = resolveComponent('EffectDayTornado')
const EffectFancy = resolveComponent('EffectFancy')
const EffectHexagon = resolveComponent('EffectHexagon')
const EffectRainbow = resolveComponent('EffectRainbow')
const EffectSunTornado = resolveComponent('EffectSunTornado')
const EffectClouds = resolveComponent("EffectClouds")

const splide = ref()
const page_id = ref(0)
const visible_sidebar = ref(false)
const fullscreen = ref(false)
const splide_options = ref({
  perPage: 1, 
  gap: '100%',
  pagination: false,
  keyboard: "global",
  arrows: true
})
const zoom_scale = 1.5
const route = useRoute()
let { data } = await useFetch("/api/chapter/" + route.params.chapter)
let {data: chapters} = await useFetch("/api/chapters")
const effects = {
  "Normal": EffectNormal,
  "Constellation": EffectConstellation, 
  "Morning": EffectMorning, 
  "Twilight": EffectTwilight, 
  "LightPrism": EffectLightPrism, 
  "DarkPrism": EffectDarkPrism, 
  "DayTornado": EffectDayTornado, 
  "Fancy": EffectFancy, 
  "Hexagon": EffectHexagon, 
  "Rainbow": EffectRainbow, 
  "SunTornado": EffectSunTornado,
  "Clouds": EffectClouds
}
const currentEffect = ref("Normal")
const currentEffectComponent = computed(() => effects[currentEffect.value])

const pages_dir = "/" + route.params.chapter + "/"
let pages = []

function init() {
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
      if (page.effects === null || page.effects === undefined) {
        page.effects = "Normal"
      }
      j++
    } else {
      page = {page_number: i, image: pages_dir + i + ".png", effects: "Normal"}
    }

    pages.push(page)
  }
  if (pages.length > 0) {
    currentEffect.value = pages[0].effects
  }
}

init()

function onSlideClick(splide, slide, e) {
  let left_touch = e.clientX < window.innerWidth / 3
  let right_touch = e.clientX > (window.innerWidth / 3) * 2
  if (left_touch) {
    splide.go('<')
  } else if (right_touch) {
    splide.go('>')
  } else {
    fullscreen.value = !fullscreen.value
    document.getElementById("link-back").classList.toggle("hidden")
    document.getElementById("sidebar-button").classList.toggle("hidden")
    splide_options.value.arrows = !fullscreen.value
  }
}

function onSlideMoved(splide, newIndex, prevIndex, destIndex) {
  let currentPage = pages[newIndex]
  currentEffect.value = currentPage.effects
}

function navigateToPage(n) {
  splide.value.splide.go(n - 1)
}

onMounted(() => {
  let arrows = document.getElementsByClassName("splide__arrow")
  for (let arrow of arrows) {
    arrow.classList.add("hidden")
    arrow.classList.add("sm:block")
  }
})
</script>

<template>
  <div class="background">
    <Sidebar v-model:visible="visible_sidebar" position="right">
      <h2>Chapters</h2>
      <Accordion :activeIndex="parseInt(route.params.chapter - 1)">
        <AccordionTab v-for="chapter in chapters" :header="chapter.type + ' ' + chapter.type_number + ': ' + chapter.title">
          <NuxtLink :to="'/reader/' + chapter.chapter_number + '/#' + n" v-for="n in chapter.pages_count">
            <Button class="m-1 border-circle" :label="n.toString()" @click="chapter.chapter_number == route.params.chapter ? navigateToPage(n) : ''"></Button>
          </NuxtLink>
        </AccordionTab>
      </Accordion>
    </Sidebar>
    <NuxtLink to="/chapters" class="absolute" id="link-back">
      <Button icon="pi pi-angle-left" class="forefront" text></Button>
    </NuxtLink>
    <Button icon="pi pi-bars" @click="visible_sidebar = true" id="sidebar-button" class="absolute forefront" text></Button>
    <Transition>
      <component :is="currentEffectComponent"/>
    </Transition>
    <Splide ref="splide" 
    :options="splide_options" 
    @splide:click="onSlideClick" 
    @splide:moved="onSlideMoved"
    :extensions="{'url-hash': URLHash}"
    class="h-screen">
      <SplideSlide v-for="page in pages" class="flex justify-content-center" :data-splide-hash="page.page_number">
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
    top: 0px;
    right: 0px;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>

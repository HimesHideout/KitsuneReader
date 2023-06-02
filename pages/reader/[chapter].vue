<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { URLHash } from "@splidejs/splide-extension-url-hash"
import panzoom from "panzoom"

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
const settings_panel = ref()
const panzoom_instance = ref(null)
const exit_fullscreen = ref(true)
const next_chapter_arrow = ref()
const prev_chapter_arrow = ref()
const mobile_click = ref()
const page_id = ref(0)
const visible_sidebar = ref(false)
const fullscreen = ref(false)
const settings = ref({
  effectsEnabled: true,
  direction: false
})
const splide_options = ref({
  perPage: 1, 
  gap: '100%',
  pagination: false,
  keyboard: "global",
  arrows: true,
  direction: "ltr",
  drag: "true"
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
  if (fullscreen.value && !exit_fullscreen.value) {
    exit_fullscreen.value = true
    return
  }
  
  let left_touch = e.clientX < window.innerWidth / 3
  let right_touch = e.clientX > (window.innerWidth / 3) * 2
  
  if (left_touch && !fullscreen.value) {
    splide.go('<')
    // if (slide.index == 0) {
    //   navigateTo('/reader/' + (parseInt(route.params.chapter) - 1) + '/#1')
    // }
  } else if (right_touch && !fullscreen.value) {
    splide.go('>')
    // if (slide.index == pages.length - 1) {
    //   navigateTo('/reader/' + (parseInt(route.params.chapter) + 1) + '/#1')
    // }
  } else {
    fullscreen.value = !fullscreen.value
    if (route.params.chapter != 0) {
      prev_chapter_arrow.value[0].classList.toggle("opacity-0")
    }
    if (route.params.chapter < (chapters.value.length - 1)) {
      next_chapter_arrow.value[0].classList.toggle("opacity-0")
    }
    document.getElementById("link-back").classList.toggle("hidden")
    document.getElementById("sidebar-button").classList.toggle("hidden")
    if (window.innerWidth >= 576) {
      splide_options.value.arrows = !fullscreen.value
    } else {
      splide_options.value.arrows = false
    }
    //This starts the panzoom code
    if (fullscreen.value) {
      panzoom_instance.value = panzoom(slide.slide, {
        transformOrigin: {x: 0.5, y: 0.5},
        bounds: true,
        boundsPadding: 0.4,
        minZoom: 0.5,
        maxZoom: 3,
        initialZoom: 1.50
      })
      const coordinates = slide.slide.getElementsByClassName("cursor-pointer")[0].getBoundingClientRect()
      panzoom_instance.value.moveTo(-((e.clientX) - (coordinates.width / 2)), -((e.clientY) - (coordinates.height / 2)))
      panzoom_instance.value.on("panstart", e => exit_fullscreen.value = false)
      mobile_click.value = (e) => {onSlideClick(splide, slide, e);}
      slide.slide.addEventListener("touchend", mobile_click.value)
      splide_options.value.drag = false
      exit_fullscreen.value = true
    } else {
      panzoom_instance.value.dispose()
      panzoom_instance.value = panzoom(slide.slide, {
        transformOrigin: {x: 0.5, y: 0.5},
        bounds: true,
        boundsPadding: 0.4,
        minZoom: 0.5,
        maxZoom: 3,
      })
      panzoom_instance.value.zoomTo(0, 0, 1/panzoom_instance.value.getTransform().scale)
      const x = panzoom_instance.value.getTransform().x
      const y = panzoom_instance.value.getTransform().y
      panzoom_instance.value.smoothMoveTo(0, 0)
      panzoom_instance.value.dispose()
      panzoom_instance.value = null
      slide.slide.removeEventListener("touchend", mobile_click.value)
      splide_options.value.drag = true
      exit_fullscreen.value = false
    }
  }
}

function onSlideMoved(splide, newIndex, prevIndex, destIndex) {
  let right_arrow = document.getElementsByClassName("splide__arrow--next")[0]
  let left_arrow = document.getElementsByClassName("splide__arrow--prev")[0]

  if (newIndex == (pages.length - 1) && route.params.chapter < (chapters.value.length - 1)) {
    right_arrow.classList.add("opacity-0")
    right_arrow.classList.add("z-0")
    next_chapter_arrow.value[0].classList.remove("opacity-0")
  } else if (right_arrow.classList.contains("opacity-0")) {
      right_arrow.classList.remove("opacity-0")
      right_arrow.classList.remove("z-0")
      console.log("a")
  }
  if (newIndex == 0 && route.params.chapter > 0) {
    left_arrow.classList.add("opacity-0")
    left_arrow.classList.add("z-0")
    prev_chapter_arrow.value[0].classList.remove("opacity-0")
  } else if (left_arrow.classList.contains("opacity-0")) {
      left_arrow.classList.remove("opacity-0")
      left_arrow.classList.remove("z-0")
  }
  let currentPage = pages[newIndex]
  currentEffect.value = currentPage.effects
}

function changeDirection(value) {
  splide_options.value.direction = value ? "rtl" : "ltr"
  localStorage.setItem("direction", value ? "rtl" : "ltr")
}

function toggleEffects(value) {
  localStorage.setItem("effects-enabled", value)
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
  const effectsEnabled = localStorage.getItem("effects-enabled") ?? true
  const direction = localStorage.getItem("direction") ?? "ltr"
  settings.value.effectsEnabled = effectsEnabled == true
  settings.value.direction = direction == "rtl"
  splide_options.value.direction = direction
  if (arrows[0] === undefined) {
    if (route.params.chapter != 0) {
      prev_chapter_arrow.value[0].classList.add("opacity-0")
    }
    if (route.params.chapter < (chapters.value.length - 1)) {
      next_chapter_arrow.value[0].classList.add("opacity-0")
    }
    return
  }
  if (route.hash.slice(1) == (pages.length) && route.params.chapter < (chapters.value.length - 1)) {
    arrows[1]?.classList.add("opacity-0")
    arrows[1]?.classList.add("z-0")
  } else if (route.hash.slice(1) == 1 && route.params.chapter > 0) {
    arrows[0]?.classList.add("opacity-0")
    arrows[0]?.classList.add("z-0")
  }
})
</script>

<template>
  <div class="background">
    <Sidebar v-model:visible="visible_sidebar" position="right">
      <h2>Chapters</h2>
      <Accordion :activeIndex="parseInt(route.params.chapter)">
        <AccordionTab v-for="chapter in chapters" :header="chapter.type + (chapter.type == 'Chapter' ? ` ${chapter.type_number}` : '') + ': ' + chapter.title">
          <NuxtLink :to="'/reader/' + chapter.chapter_number + '/#' + n" :external="true" v-for="n in chapter.pages_count">
            <Button class="m-1 border-circle" :label="n.toString()" @click="chapter.chapter_number == route.params.chapter ? navigateToPage(n) : ''"></Button>
          </NuxtLink>
        </AccordionTab>
      </Accordion>
      <OverlayPanel ref="settings_panel">
        <div class="flex flex-column justify-content-between">
          <h4 class="my-2">Settings</h4>
          <div class="flex justify-content-around align-items-center">
            <label class="m-2">Enable effects</label>
            <InputSwitch class="m-2" v-model="settings['effectsEnabled']" @input="toggleEffects"/>
          </div>
          <div class="flex justify-content-around align-items-center">
            <label class="my-2 mx-4">Right-to-Left</label>
            <InputSwitch class="my-2 mx-4" v-model="settings['direction']" @input="changeDirection"/>
          </div>
        </div>
      </OverlayPanel>
      <Button icon="pi pi-cog" text rounded @click="(event) => settings_panel.toggle(event)"/>
    </Sidebar>
    <NuxtLink to="/chapters" class="absolute" id="link-back">
      <Button icon="pi pi-angle-left" class="forefront h-3rem w-3rem" text></Button>
    </NuxtLink>
    <Button icon="pi pi-bars" @click="visible_sidebar = true" id="sidebar-button" class="absolute forefront h-3rem w-3rem" text></Button>
    <Transition v-if="settings['effectsEnabled']">
      <component :is="currentEffectComponent"/>
    </Transition>
    <Splide ref="splide" 
    :options="splide_options" 
    @splide:click="onSlideClick" 
    @splide:moved="onSlideMoved"
    :extensions="{'url-hash': URLHash}"
    class="h-screen">
      <SplideSlide v-for="page in pages" class="flex justify-content-center" :class="{'mr-0': settings['direction']}" :data-splide-hash="page.page_number">
        <nuxt-img 
        :src="page.image" 
        
        class="cursor-pointer w-screen sm:w-9 md:w-7 lg:w-6 xl:w-4"
        quality="100"
        format="png" 
        />
        <div v-if="(route.params.chapter < (chapters.length - 1)) && (page.page_number == pages.length)" id="next-chapter-arrow" class="flex flex-column justify-content-center align-items-center absolute z-5" ref="next_chapter_arrow">
          <NuxtLink :to="'/reader/' + (parseInt(route.params.chapter)+1) + '/#' + 1" :external="true" class="no-underline text-primary">
            <Button icon="pi pi-angle-right" size="large" text/>
            <h3 class="text-xl">Next chapter</h3>
          </NuxtLink>
        </div>
        <div v-if="(route.params.chapter > 0) && (page.page_number == 1)" id="prev-chapter-arrow" class="flex flex-column justify-content-center align-items-center absolute z-5" ref="prev_chapter_arrow">
          <NuxtLink :to="'/reader/' + (parseInt(route.params.chapter)-1) + '/#' + 1" :external="true" class="no-underline text-primary">
            <Button icon="pi pi-angle-left" size="large" text/>
            <h3 class="text-xl">Previous chapter</h3>
          </NuxtLink>         
        </div>
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

  .hidden-arrow {
    z-index: 0;
  }

  #sidebar-button {
    top: 0px;
    right: 0px;
  }

  #next-chapter-arrow {
    right: 6%;
    top: 44%;
  }

  #prev-chapter-arrow {
    left: 6%;
    top: 44%;
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

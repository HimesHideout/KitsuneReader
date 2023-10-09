<script setup>
let {data: messages} = await useFetch("/api/anniversary")

let columns = [[], [], []]

let column = 0
for (let message of messages.value) {
  columns[column].push(message)
  column = (column + 1) % 3
}
</script>

<template>
  <div
    class="bg-image"
    style="background-image: url('/images/effects/Dark_Starry_Sky.svg');
    background-size: cover"
  >
    <header>
        <NuxtLink to="/" id="link-back-messages" class="absolute">
            <Button icon="pi pi-angle-left" class="forefront" text></Button>
        </NuxtLink>
        <div class="flex align-items-center justify-content-around">
          <h2>ANNIVERSARY MESSAGES</h2>
        </div>
    </header>
    <div class="flex flex-column md:flex-row justify-content-evenly gap-3">
      <div class="flex flex-column" v-for="n in 3">
        <!-- Yes, we're using 2 nested image components to take advantage of
        PrimeVue's preview feature. -->
          <Image v-for="message in columns[n - 1]"
              class="flex flex-column"
              preview
          >
            <template #image>
              <nuxt-img
              :src="`/anniversary/${message['name']}`" 
              quality="100" 
              class="my-3 w-12 align-self-center" 
              format="png"
              loading="lazy"
              />
            </template>
            <template #preview>
              <div class="flex flex-column">
                <nuxt-img
                :src="`/anniversary/${message['name']}`" 
                quality="100" 
                class="m-5 w-10 align-self-center md:w-8 lg:w-6"
                format="png"
                loading="lazy"
                @click="onPreviewImageClick"
                />
              </div>
            </template>
            <!-- This disables the buttons on the preview, because they 
            require way more work to work with custom preview elements. -->
            <template #refresh><span></span></template>
            <template #undo><span></span></template>
            <template #zoomout><span></span></template>
            <template #zoomin><span></span></template>
          </Image>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
